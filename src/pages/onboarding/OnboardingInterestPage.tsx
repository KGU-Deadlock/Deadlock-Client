import { useFlow } from "@/app/stackflow";
import {
  BackButton,
  Button,
  Footer,
  Header,
  PageTitle,
} from "@/components/common";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useState } from "react";

const interests = [
  { id: 1, name: "알고리즘" },
  { id: 2, name: "웹 개발" },
  { id: 3, name: "모바일 개발" },
  { id: 4, name: "시스템/운영체제" },
  { id: 5, name: "네트워크" },
  { id: 6, name: "정보보안" },
  { id: 7, name: "데이터베이스" },
  { id: 8, name: "인공지능/머신러닝" },
  { id: 9, name: "클라우드/인프라" },
  { id: 10, name: "임베디드/IoT" },
];

export default function OnboardingInterestPage() {
  const { push } = useFlow();
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);

  const handleSelectInterest = (interest: string) => {
    setSelectedInterest(interest);
  };

  const handleComplete = () => {
    push("OnboardingCompletePage", {});
  };

  return (
    <AppScreen className="relative">
      <Header left={<BackButton />} />
      <PageTitle>
        <span>관심 분야를</span>
        <span>선택해주세요</span>
      </PageTitle>
      <div className="px-gutter mt-20 flex w-full flex-col gap-6">
        <label className="text-gray-005 text-sm">관심 분야</label>
        <div className="grid w-full grid-cols-2 gap-4">
          {interests.map((interest) => (
            <Button
              key={interest.id}
              size="large"
              className="h-[60px]"
              state={
                selectedInterest === interest.name
                  ? "outline"
                  : "disabled_outline"
              }
              onClick={() => handleSelectInterest(interest.name)}
            >
              {interest.name}
            </Button>
          ))}
        </div>
      </div>
      <Footer>
        <Button
          size="large"
          state={selectedInterest ? "active" : "disabled"}
          onClick={handleComplete}
        >
          가입 완료
        </Button>
      </Footer>
    </AppScreen>
  );
}
