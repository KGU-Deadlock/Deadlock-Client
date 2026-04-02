import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

import { useFlow } from "@/app/stackflow";

import {
  BackButton,
  Button,
  Footer,
  Header,
  LoadingSpinner,
  PageTitle,
  Subtitle,
} from "@/components/common";

import { useQuizSolveStore } from "@/model/quiz/useQuizStore";

import { quizQueries } from "@/api/quiz/api.query";

import { toastError } from "@/utils/toast";

import { QUIZ_MODE, type QuizMode } from "@/constants/quiz/quiz";

const MIN_LOADING_MS = 2000;

interface QuizLoadingPageProps {
  topic: number | string;
  mode: QuizMode;
}

type LoadPhase = "loading" | "ready" | "error";

const QuizLoadingPage: ActivityComponentType<QuizLoadingPageProps> = ({
  params,
}) => {
  const { replace, pop } = useFlow();
  const { mutateAsync: fetchQuizList } = useMutation(
    quizQueries.postQuizListMutation(),
  );
  const fetchQuizListRef = useRef(fetchQuizList);
  fetchQuizListRef.current = fetchQuizList;

  const [phase, setPhase] = useState<LoadPhase>("loading");
  const [quizDataJson, setQuizDataJson] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const runLoad = useCallback(async () => {
    const topicId = Number(params.topic);
    if (Number.isNaN(topicId)) {
      if (!mountedRef.current) return;
      setErrorMessage("잘못된 분야 정보예요.");
      setPhase("error");
      toastError("잘못된 분야 정보예요.");
      return;
    }

    if (mountedRef.current) {
      setPhase("loading");
      setErrorMessage(null);
      setQuizDataJson(null);
    }

    try {
      const [quizResponse] = await Promise.all([
        fetchQuizListRef.current({
          topicIds: [topicId],
          mode: params.mode,
        }),
        new Promise<void>((resolve) => {
          setTimeout(resolve, MIN_LOADING_MS);
        }),
      ]);

      if (!mountedRef.current) return;

      const payload = quizResponse.data;
      if (payload == null) {
        throw new Error("퀴즈 데이터가 비어 있어요.");
      }

      const json = JSON.stringify(payload);

      useQuizSolveStore.getState().reset();
      if (params.mode === QUIZ_MODE.STANDARD) {
        useQuizSolveStore.getState().init(json);
      }

      setQuizDataJson(json);
      setPhase("ready");
    } catch (error) {
      if (!mountedRef.current) return;
      useQuizSolveStore.getState().reset();
      const message =
        error instanceof Error
          ? error.message
          : "퀴즈를 불러오지 못했어요. 잠시 후 다시 시도해주세요.";
      setErrorMessage(message);
      setPhase("error");
      toastError(message);
    }
  }, [params.mode, params.topic]);

  useEffect(() => {
    void runLoad();
  }, [runLoad]);

  const handleGoSolve = () => {
    if (!quizDataJson) return;
    const targetPage =
      params.mode === QUIZ_MODE.VOICE ? "QuizVoicePage" : "QuizSolvePage";
    replace(
      targetPage,
      {
        topic: String(params.topic),
        mode: params.mode,
        quizData: quizDataJson,
      },
      { animate: false },
    );
  };

  return (
    <AppScreen className="relative">
      <Header left={<BackButton />} />
      <div className="flex-col items-center justify-center gap-6">
        {phase === "loading" && (
          <>
            <PageTitle>
              <span>퀴즈를</span>
              <span>준비하는 중이에요</span>
            </PageTitle>
            <div className="mt-1" />
            <Subtitle className="px-gutter text-center">
              잠시만 기다려 주세요
              <span className="font-tossface"> ✨</span>
            </Subtitle>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <LoadingSpinner className="size-14" />
            </div>
          </>
        )}

        {phase === "error" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="font-tossface text-6xl">😢</span>
            <PageTitle>
              <span>불러오지</span>
              <span>못했어요</span>
            </PageTitle>
            <Subtitle>{errorMessage}</Subtitle>
            <Button size="large" state="active" onClick={() => void runLoad()}>
              다시 시도
            </Button>
            <Button size="large" state="ghost_background" onClick={() => pop()}>
              이전으로
            </Button>
          </div>
        )}

        {phase === "ready" && (
          <>
            <PageTitle>
              <span>퀴즈가</span>
              <span>준비됐어요</span>
            </PageTitle>
            <div className="mt-1" />
            <Subtitle className="px-gutter text-center">
              아래 버튼을 눌러 퀴즈를 시작해 보세요!
              <span className="font-tossface"> ✨</span>
            </Subtitle>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <span className="font-tossface text-7xl">🎯</span>
            </div>
          </>
        )}
      </div>

      {phase === "ready" && quizDataJson && (
        <Footer>
          <Button size="large" state="active" onClick={handleGoSolve}>
            퀴즈 풀러 가기
          </Button>
        </Footer>
      )}
    </AppScreen>
  );
};

export default QuizLoadingPage;
