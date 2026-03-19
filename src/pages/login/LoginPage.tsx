import { authQueries } from "@/api/auth/api.query";
import { END_POINTS } from "@/api/config/api-endpoints";
import { useFlow } from "@/app/stackflow";
import { Button, Footer } from "@/components/common";
import { useAuthStore } from "@/model/auth/auth-store";
import { toastError } from "@/utils/toast";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function LoginPage() {
  const { replace } = useFlow();
  const { setAccessToken, setIsInitialized } = useAuthStore();
  const code = new URLSearchParams(window.location.search).get("code");
  const state = new URLSearchParams(window.location.search).get("state");

  const { refetch, isPending } = useQuery(
    authQueries.kakaoLoginQuery(code ?? "", state ?? ""),
  );

  const handleKakaoLogin = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    window.location.assign(`${baseUrl}${END_POINTS.AUTH.LOGIN}`);
  };

  useEffect(() => {
    if (code && state) {
      refetch()
        .then((res) => {
          if (res.data) {
            setAccessToken(res.data.accessToken);
            if (res.data.isUser) {
              setIsInitialized(true);
              replace("HomePage", {}, { animate: false });
            } else {
              setIsInitialized(false);
              replace("OnboardingNamePage", {}, { animate: false });
            }
          }
        })
        .catch((error) => {
          toastError(error.message);
          replace("LoginPage", {}, { animate: false });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, refetch]);

  return (
    <AppScreen className="relative">
      <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center">
        <img src="/logo.svg" />
        <p className="text-blue-004 -mt-1">꾸준히 준비하는 CS 면접</p>
      </div>
      <Footer>
        <Button
          size="large"
          state="kakao"
          className="mt-40"
          onClick={handleKakaoLogin}
          disabled={!isPending}
        >
          <RiKakaoTalkFill className="mr-2" size={24} />
          카카오로 시작하기
        </Button>
      </Footer>
    </AppScreen>
  );
}
