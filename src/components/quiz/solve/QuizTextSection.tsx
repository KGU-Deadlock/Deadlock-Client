import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useShallow } from "zustand/react/shallow";

import {
  BackButton,
  Button,
  Footer,
  Header,
  PageTitle,
} from "@/components/common";
import QuizLayout from "@/components/quiz/QuizLayout";

import {
  QUIZ_SOLVE_TOTAL_COUNT,
  useQuizSolveStore,
} from "@/model/quiz/quiz-solve-store";

/** 단답형 문항이 있을 때 */
export function QuizTextInputSection() {
  const {
    question,
    current,
    inputValue,
    setInputValue,
    handleTextNext,
    isLastQuiz,
    canGoNext,
  } = useQuizSolveStore(
    useShallow((s) => {
      const q = s.shortQuizzes[s.textIndex];
      const isLastText = s.textIndex >= s.shortQuizzes.length - 1;
      const textQuizNumber = s.priorUserAnswersBase.length + s.textIndex + 1;
      const canGoNext =
        s.shortQuizzes.length === 0 ||
        Boolean(q && s.inputValue.trim() !== "");

      return {
        question: q?.content ?? "",
        current: textQuizNumber,
        inputValue: s.inputValue,
        setInputValue: s.setInputValue,
        handleTextNext: s.handleTextNext,
        isLastQuiz: isLastText,
        canGoNext,
      };
    }),
  );

  return (
    <QuizLayout
      current={current}
      total={QUIZ_SOLVE_TOTAL_COUNT}
      footer={
        <Footer>
          <Button
            size="large"
            state={canGoNext ? "active" : "disabled"}
            onClick={handleTextNext}
          >
            {isLastQuiz ? "완료" : "다음 문제"}
          </Button>
        </Footer>
      }
    >
      <PageTitle className="m-0 flex flex-wrap px-0! wrap-break-word whitespace-normal">
        {question}
      </PageTitle>
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="답을 입력하세요"
        className="border-gray-004 focus:border-blue-004 h-[200px] resize-none rounded-xl border bg-white px-4 py-3 text-base outline-none"
        autoFocus
      />
    </QuizLayout>
  );
}

/** OX·객관식만 있고 단답형이 없을 때 제출 유도 */
export function QuizTextEmptySection() {
  const submitTextEmpty = useQuizSolveStore((s) => s.submitTextEmpty);

  return (
    <AppScreen className="relative">
      <Header left={<BackButton />} />
      <PageTitle>
        <span>단답형 퀴즈가 없어요</span>
      </PageTitle>
      <div className="px-gutter mt-12 flex flex-col gap-6 text-sm">
        <p className="text-gray-005">지금까지 푼 답안을 제출할까요?</p>
        <Footer>
          <Button size="large" state="active" onClick={submitTextEmpty}>
            제출하기
          </Button>
        </Footer>
      </div>
    </AppScreen>
  );
}
