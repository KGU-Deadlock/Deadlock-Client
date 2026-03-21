import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useShallow } from "zustand/react/shallow";

import {
  BackButton,
  Button,
  Footer,
  Header,
  PageTitle,
} from "@/components/common";

import type { QuizSolveStoreState } from "@/model/quiz/useQuizStore";
import { useQuizSolveStore } from "@/model/quiz/useQuizStore";

/** 단답형 문항이 있을 때 (본문만 — QuizLayout은 QuizSolvePage) */
export function QuizTextInputSection() {
  const { question, inputValue, setInputValue } = useQuizSolveStore(
    useShallow((s: QuizSolveStoreState) => {
      const q = s.shortQuizzes[s.textIndex];
      return {
        question: q?.content ?? "",
        inputValue: s.inputValue,
        setInputValue: s.setInputValue,
      };
    }),
  );

  return (
    <>
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
    </>
  );
}

/** OX·객관식만 있고 단답형이 없을 때 제출 유도 (별도 풀스크린) */
export function QuizTextEmptySection() {
  const submitTextEmpty = useQuizSolveStore(
    (s: QuizSolveStoreState) => s.submitTextEmpty,
  );

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
