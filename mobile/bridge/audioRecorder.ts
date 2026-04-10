import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { SttClient } from "./sttClient";

// iOS: WAV (LinearPCM), Android: AAC/M4A (서버에서 WAV만 지원 시 iOS만 정상 동작)
const STT_RECORDING_OPTIONS: Audio.RecordingOptions = {
  android: {
    extension: ".m4a",
    outputFormat: Audio.AndroidOutputFormat.MPEG_4,
    audioEncoder: Audio.AndroidAudioEncoder.AAC,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: ".wav",
    outputFormat: Audio.IOSOutputFormat.LINEARPCM,
    audioQuality: Audio.IOSAudioQuality.HIGH,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 256000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: "audio/wav",
    bitsPerSecond: 128000,
  },
};

// 청크당 녹음 시간 (ms). 3초 청크 → 16kHz·16bit·mono 기준 약 96KB < 512KB 제한
const CHUNK_INTERVAL_MS = 3000;

let isRecording = false;
let sttClient: SttClient | null = null;
let chunkSequence = 0;
let stopSignal: (() => void) | null = null;
let chunkTimer: ReturnType<typeof setTimeout> | null = null;
let chunkingPromise: Promise<void> | null = null;
let resultPromise: Promise<string> | null = null;

/**
 * 청크 단위 녹음 루프.
 * isRecording 이 false 가 될 때까지 CHUNK_INTERVAL_MS 마다 청크를 전송하고,
 * 마지막 청크에 isFinalChunk: true 를 붙여 서버에 전달 완료를 알립니다.
 */
async function runChunking(): Promise<void> {
  while (isRecording) {
    // 새 청크 녹음 시작
    const { recording } = await Audio.Recording.createAsync(
      STT_RECORDING_OPTIONS,
    );

    // CHUNK_INTERVAL_MS 후 또는 stopRecording() 호출 시 즉시 깨어남
    await new Promise<void>((resolve) => {
      stopSignal = resolve;
      chunkTimer = setTimeout(resolve, CHUNK_INTERVAL_MS);
    });
    stopSignal = null;
    if (chunkTimer) {
      clearTimeout(chunkTimer);
      chunkTimer = null;
    }

    const isFinalChunk = !isRecording;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    if (uri) {
      try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        sttClient?.sendChunk(base64, chunkSequence++, isFinalChunk);
      } finally {
        await FileSystem.deleteAsync(uri, { idempotent: true });
      }
    }
  }
}

export async function startRecording(): Promise<void> {
  if (isRecording) {
    throw new Error("RECORDING_ALREADY_IN_PROGRESS");
  }

  const { status } = await Audio.requestPermissionsAsync();
  if (status !== "granted") {
    throw new Error("MIC_PERMISSION_DENIED");
  }

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });

  sttClient = new SttClient();
  await sttClient.connect();
  resultPromise = sttClient.waitForResult();

  isRecording = true;
  chunkSequence = 0;
  chunkingPromise = runChunking();
}

export async function stopRecording(): Promise<string> {
  if (!isRecording || !sttClient) {
    throw new Error("NO_ACTIVE_RECORDING");
  }

  // 청크 루프를 즉시 깨워 현재 녹음을 최종 청크로 전송
  isRecording = false;
  stopSignal?.();

  // 마지막 청크가 전송될 때까지 대기
  await chunkingPromise;

  // 서버 STT 결과 수신 대기
  const text = await resultPromise!;

  sttClient.disconnect();
  sttClient = null;
  chunkingPromise = null;
  resultPromise = null;

  await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

  return text;
}
