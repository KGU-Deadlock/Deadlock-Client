import {
  Button,
  Header,
  Scrollable,
  Subtitle,
  Title,
} from "@/components/common";
import { BackButton } from "@/components/common";
import { AppScreen } from "@stackflow/plugin-basic-ui";

export default function UserPage() {
  const handleLogout = () => {
    window.location.replace("/login");
  };

  return (
    <AppScreen>
      <Scrollable>
        <Header
          left={<BackButton />}
          sticky
          center={<Title>마이페이지</Title>}
        />
        <section className="px-gutter pt-header gap-colgap flex flex-col">
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <div className="bg-gray-002 size-[100px] rounded-full" />
            <div className="flex flex-col items-center justify-center gap-1">
              <Title>전상현</Title>
              <Subtitle>경기대학교 컴퓨터공학과</Subtitle>
            </div>
            <Button size="small" state="ghost_background" className="mt-2">
              프로필 수정
            </Button>
          </div>
          <div className="gap-colgap-small flex flex-col">
            <Title>활동</Title>
            <div className="divide-gray-002 flex flex-col divide-y">
              <Button size="large" state="ghost" className="flex justify-start">
                <span>내 공부</span>
              </Button>
              <Button size="large" state="ghost" className="flex justify-start">
                <span>문의하기</span>
              </Button>
            </div>
          </div>

          <div className="gap-colgap-small flex flex-col">
            <Title>설정</Title>
            <div className="divide-gray-002 flex flex-col divide-y">
              <Button
                size="large"
                state="ghost"
                className="flex justify-start"
                onClick={handleLogout}
              >
                <span>로그아웃</span>
              </Button>
              <Button size="large" state="ghost" className="flex justify-start">
                <span>탈퇴하기</span>
              </Button>
            </div>
          </div>
        </section>
      </Scrollable>
    </AppScreen>
  );
}
