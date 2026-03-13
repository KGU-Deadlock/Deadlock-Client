import { useFlow } from "@/app/stackflow";
import { Button } from "@/components/common";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function LoginPage() {
  const { push } = useFlow();
  const handleKakaoLogin = () => {
    push("OnboardingNamePage", {});
  };

  return (
    <AppScreen className="relative">
      <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center">
        <img src="/logo.svg" />
        <p className="-mt-1">꾸준히 준비하는 CS 면접</p>
      </div>
      <div className="px-gutter bottom-footer absolute right-0 left-0">
        <Button
          size="large"
          state="kakao"
          className="mt-40"
          onClick={handleKakaoLogin}
        >
          <RiKakaoTalkFill className="mr-2" size={24} />
          카카오로 시작하기
        </Button>
      </div>
    </AppScreen>
  );
}
