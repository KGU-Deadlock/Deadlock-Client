import { useState, useCallback } from "react";
import { bridge } from "./index";

type RecordingState = "idle" | "recording" | "processing" | "done" | "error";

export function useMicRecording() {
  const [state, setState] = useState<RecordingState>("idle");
  const [transcript, setTranscript] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const start = useCallback(async () => {
    setState("recording");
    setTranscript(null);
    setErrorMessage(null);

    const result = await bridge.startRecording();
    if (result.status === "error") {
      setErrorMessage(result.errorMessage ?? "녹음 시작에 실패했습니다.");
      setState("error");
    }
  }, []);

  const stop = useCallback(async () => {
    setState("processing");

    const result = await bridge.stopRecording();
    if (result.status === "success" && result.text !== undefined) {
      setTranscript(result.text);
      setState("done");
    } else {
      setErrorMessage(result.errorMessage ?? "STT 처리에 실패했습니다.");
      setState("error");
    }
  }, []);

  const reset = useCallback(() => {
    setState("idle");
    setTranscript(null);
    setErrorMessage(null);
  }, []);

  return { start, stop, reset, state, transcript, errorMessage };
}
