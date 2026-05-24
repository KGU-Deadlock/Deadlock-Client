import { useCallback, useRef, useState } from "react";

// Web Speech API minimal types (lib.dom 미포함)
export interface SpeechRecognitionEvent {
  readonly resultIndex: number;
  readonly results: {
    length: number;
    [i: number]: { isFinal: boolean; [j: number]: { transcript: string } };
  };
}
export interface SpeechRecognitionErrorEvent {
  readonly error: string;
}
export interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}
export type WindowWithSpeech = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

export function getSpeechRecognitionAPI():
  | SpeechRecognitionConstructor
  | undefined {
  const w = window as WindowWithSpeech;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export type SpeechRecognitionState = "idle" | "recording" | "done" | "error";

/**
 * Web Speech API를 사용한 음성 인식 훅.
 * - `start()` : 인식 시작, transcript 초기화
 * - `stop()`  : 인식 중단 → state "done"
 * - `reset()` : 전체 초기화 → state "idle"
 */
export function useSpeechRecognition() {
  const [state, setState] = useState<SpeechRecognitionState>("idle");
  const [transcript, setTranscript] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const accumulatedRef = useRef("");

  const start = useCallback(() => {
    const SpeechRecognitionAPI = getSpeechRecognitionAPI();

    if (!SpeechRecognitionAPI) {
      setErrorMessage("이 브라우저는 음성 인식을 지원하지 않아요.");
      setState("error");
      return;
    }

    accumulatedRef.current = "";
    setTranscript(null);
    setErrorMessage(null);
    setState("recording");

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "ko-KR";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        }
      }
      if (final) {
        accumulatedRef.current +=
          (accumulatedRef.current ? " " : "") + final;
        setTranscript(accumulatedRef.current);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") return;
      setErrorMessage("음성 인식 중 오류가 발생했어요.");
      setState("error");
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      setState((prev) => (prev === "recording" ? "done" : prev));
      setTranscript(accumulatedRef.current || null);
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setState("done");
    setTranscript(accumulatedRef.current || null);
  }, []);

  const reset = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    accumulatedRef.current = "";
    setState("idle");
    setTranscript(null);
    setErrorMessage(null);
  }, []);

  return { start, stop, reset, state, transcript, errorMessage };
}
