import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { RiUser3Fill } from "react-icons/ri";

import { useFlow } from "@/app/stackflow";

import {
  Button,
  Header,
  Scrollable,
  Subtitle,
  Title,
} from "@/components/common";
import { BackButton } from "@/components/common";
import {
  UserProfileEditModal,
  UserWithdrawConfirmModal,
} from "@/components/user";

import { useUserStore } from "@/model/user/useUserStore";

import { quizQueries } from "@/api/quiz/api.query";

import {
  formatNicknameInput,
  NICKNAME_MAX_LENGTH,
} from "@/utils/formatNicknameInput";
import { tokenStorage } from "@/utils/token";

export default function UserPage() {
  const { push } = useFlow();
  const { profile, name, interest } = useUserStore();
  const [editOpen, setEditOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.cancelQueries();
    queryClient.clear();
    tokenStorage.logout();
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

  const resolvedTopicIdFromProfile = useMemo(() => {
    const first = profile?.interests?.[0];
    if (!first) return null;
    const list = topicResponse?.data ?? [];
    return list.find((t) => t.name === first)?.id ?? null;
  }, [profile?.interests, topicResponse?.data]);

  const editInitialNickname =
    formatNicknameInput(profile?.nickname ?? name ?? "").slice(
      0,
      NICKNAME_MAX_LENGTH,
    ) || "";
  const editInitialTopicId =
    interest > 0 ? interest : resolvedTopicIdFromProfile;

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
            <div className="bg-gray-002 grid size-[100px] place-items-center rounded-full">
              <RiUser3Fill className="text-gray-004" size={32} />
            </div>
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
            <Button
              size="small"
              state="ghost_background"
              className="mt-2"
              onClick={() => setEditOpen(true)}
            >
              프로필 수정
            </Button>
          </div>
          {editOpen ? (
            <UserProfileEditModal
              onClose={() => setEditOpen(false)}
              initialNickname={editInitialNickname}
              initialTopicId={editInitialTopicId}
            />
          ) : null}
          {withdrawOpen ? (
            <UserWithdrawConfirmModal onClose={() => setWithdrawOpen(false)} />
          ) : null}
          <div className="gap-colgap-small flex flex-col">
            <Title>활동</Title>
            <div className="divide-gray-002 flex flex-col divide-y">
              <Button
                size="large"
                state="ghost"
                className="flex justify-start rounded-none"
                onClick={() => push("UserGradeLogPage", {})}
              >
                <span>내 공부</span>
              </Button>
              <Button
                size="large"
                state="ghost"
                className="flex justify-start rounded-none"
              >
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
                className="flex justify-start rounded-none"
                onClick={handleLogout}
              >
                <span>로그아웃</span>
              </Button>
              <Button
                size="large"
                state="ghost"
                className="flex justify-start rounded-none"
                onClick={() => setWithdrawOpen(true)}
              >
                <span>탈퇴하기</span>
              </Button>
            </div>
          </div>
        </section>
      </Scrollable>
    </AppScreen>
  );
}
