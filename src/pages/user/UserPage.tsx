import {
  Button,
  Header,
  Scrollable,
  Subtitle,
  Title,
} from "@/components/common";
import { BackButton } from "@/components/common";
import { quizQueries } from "@/api/quiz/api.query";
import { useUserStore } from "@/model/user/user-store";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useQuery } from "@tanstack/react-query";

export default function UserPage() {
  const { profile, name, interest } = useUserStore();

  const handleLogout = () => {
    window.location.replace("/login");
  };

  const {
    data: topicResponse,
    isPending,
    isError,
  } = useQuery(quizQueries.getQuizTopicQuery());
  const topics = topicResponse?.data ?? [];
  const interestName =
    topics.find((topic) => topic.id === interest)?.name ??
    (profile?.interests && profile.interests.length > 0
      ? profile.interests.join(", ")
      : undefined);

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
              <Title>{profile?.nickname ?? name ?? "사용자"}</Title>
              <Subtitle>
                {isPending
                  ? "관심 분야를 불러오는 중..."
                  : isError
                    ? "관심 분야를 불러오지 못했어요"
                    : (interestName ?? "관심 분야를 설정해 주세요")}
              </Subtitle>
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
