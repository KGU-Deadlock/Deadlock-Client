import { useNavigate } from "@solidjs/router";
import Button from "~/shared/components/Button";
import KakaoIcon from "~/shared/components/icons/KakaoIcon";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    // TODO: 카카오톡 로그인 API 연동
    console.log("카카오톡 로그인 시작");
    // 임시로 홈으로 이동
    navigate("/");
  };

  return (
    <main class="mx-auto flex min-h-screen max-w-[500px] flex-col items-center justify-between bg-white px-4 py-12">
      {/* Logo Section */}
      <div class="flex flex-1 flex-col items-center justify-center">
        <div class="mb-4 flex flex-col items-center">
          {/* Hello CS! Logo */}
          <div class="mb-2 flex items-baseline gap-1">
            <img src="/logo.svg" alt="Hello CS!" class="size-32" />
          </div>
          {/* Tagline */}
          <p class="text-gray-007 text-base">꾸준히 준비하는 CS 면접</p>
        </div>
      </div>

      {/* Login Button */}
      <div class="w-full pb-8">
        <button
          onClick={handleKakaoLogin}
          class="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#FEE500] px-4 py-3 text-lg font-semibold text-black transition-colors hover:brightness-95 focus:outline-none"
        >
          <KakaoIcon />
          <span>카카오로 시작하기</span>
        </button>
      </div>
    </main>
  );
}
