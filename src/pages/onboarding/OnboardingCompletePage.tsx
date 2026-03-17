import { useFlow } from "@/app/stackflow";
import { Button, Footer, Title } from "@/components/common";
import { AppScreen } from "@stackflow/plugin-basic-ui";

export default function OnboardingCompletePage() {
  const { push } = useFlow();

  const handleComplete = () => {
    push("HomePage", {});
  };

  return (
    <AppScreen className="relative">
      <div className="px-gutter absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center">
        <span className="font-tossface text-[100px]">🥳</span>
        <Title className="text-2xl">가입이 완료되었어요.</Title>
        <Title className="text-2xl">공부를 시작해 볼까요?</Title>
      </div>
      <Footer>
        <Button size="large" state="active" onClick={handleComplete}>
          시작하기
        </Button>
      </Footer>
    </AppScreen>
  );
}
