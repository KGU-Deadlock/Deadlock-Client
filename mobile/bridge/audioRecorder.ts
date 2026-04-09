import { Audio } from "expo-av";

async function sendAudioToServer(audioData: {
  uri: string | null;
}): Promise<string> {
  // TODO: 서버 전송 구현 예정
  // e.g. const formData = new FormData();
  //      formData.append("audio", { uri: audioData.uri, type: "audio/m4a", name: "recording.m4a" } as any);
  //      const res = await fetch("https://your-stt-api/transcribe", { method: "POST", body: formData });
  //      return (await res.json()).text;
  return "안녕하세요, 테스트 음성입니다."; // mock STT result
}

// 진행중인 녹음 인스턴스
let activeRecording: Audio.Recording | null = null;

export async function startRecording(): Promise<void> {
  if (activeRecording !== null) {
    throw new Error("RECORDING_ALREADY_IN_PROGRESS");
  }

  // 1. 마이크 권한 요청
  const { status } = await Audio.requestPermissionsAsync();
  if (status !== "granted") {
    throw new Error("MIC_PERMISSION_DENIED");
  }

  // 2. iOS 녹음 모드 설정
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });

  // 3. 녹음 시작
  const { recording } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY,
  );

  activeRecording = recording;
}

export async function stopRecording(): Promise<string> {
  if (activeRecording === null) {
    throw new Error("NO_ACTIVE_RECORDING");
  }

  const recording = activeRecording;
  activeRecording = null;

  await recording.stopAndUnloadAsync();
  const uri = recording.getURI() ?? null;
  await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
  return await sendAudioToServer({ uri });
}
