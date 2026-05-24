import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { useFlow } from "@/app/stackflow";

import {
  BackButton,
  Button,
  Footer,
  Header,
  PageTitle,
  Subtitle,
} from "@/components/common";

import { interviewQueries } from "@/api/interview/api.query";

import { toastError } from "@/utils/toast";

export default function InterviewPage() {
  const { replace } = useFlow();
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");

  const { mutateAsync: startInterview, isPending } = useMutation(
    interviewQueries.startInterviewMutation(),
  );

  const handleStart = async () => {
    const trimmedCompany = companyName.trim();
    const trimmedPosition = position.trim();

    if (!trimmedCompany || !trimmedPosition) {
      toastError("회사명과 직무를 입력해주세요.");
      return;
    }

    try {
      const res = await startInterview({
        companyName: trimmedCompany,
        position: trimmedPosition,
      });

      const data = res.data;
      if (!data?.interviewId || !data.questions?.length) {
        toastError("면접 정보를 받지 못했어요.");
        return;
      }

      replace(
        "InterviewSolvePage",
        {
          interviewId: data.interviewId,
          questions: JSON.stringify(data.questions),
        },
        { animate: false },
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "면접 시작에 실패했어요.";
      toastError(message);
    }
  };

  const isDisabled = isPending || !companyName.trim() || !position.trim();

  return (
    <AppScreen>
      <Header left={<BackButton />} />
      <div className="px-gutter pt-header flex flex-col gap-6">
        <div>
          <PageTitle>
            <span>모의 면접</span>
          </PageTitle>
          <Subtitle className="mt-2">
            회사명과 직무를 입력하면 AI가 맞춤 질문을 준비해요.
          </Subtitle>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-005 text-sm font-medium">회사명</label>
            <input
              className="border-gray-003 focus:border-blue-004 rounded-xl border px-4 py-3 text-sm outline-none transition-colors"
              placeholder="예) 카카오"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-005 text-sm font-medium">직무</label>
            <input
              className="border-gray-003 focus:border-blue-004 rounded-xl border px-4 py-3 text-sm outline-none transition-colors"
              placeholder="예) 백엔드 개발자"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Footer>
        <Button
          size="large"
          state={isDisabled ? "disabled" : "active"}
          disabled={isDisabled}
          onClick={() => void handleStart()}
        >
          {isPending ? "준비 중..." : "면접 시작하기"}
        </Button>
      </Footer>
    </AppScreen>
  );
}
