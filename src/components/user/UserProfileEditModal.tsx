import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { Button, Modal, Subtitle } from "@/components/common";

import { useModalClose } from "@/model/common";
import { useUserStore } from "@/model/user/user-store";

import { quizQueries } from "@/api/quiz/api.query";
import { rankingKeys } from "@/api/ranking/api.query";
import { userKeys, userQueries } from "@/api/user/api.query";

import {
  formatNicknameInput,
  NICKNAME_MAX_LENGTH,
} from "@/utils/formatNicknameInput";
import { toastError, toastSuccess } from "@/utils/toast";

interface UserProfileEditModalProps {
  onClose: () => void;
  initialNickname: string;
  initialTopicId: number | null;
}

export default function UserProfileEditModal({
  onClose,
  initialNickname,
  initialTopicId,
}: UserProfileEditModalProps) {
  const queryClient = useQueryClient();
  const { profile, interest, setProfile, setName, setInterest } =
    useUserStore();

  const [nickname, setNickname] = useState(() =>
    formatNicknameInput(initialNickname).slice(0, NICKNAME_MAX_LENGTH),
  );
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(
    () => initialTopicId,
  );

  const {
    data: topicResponse,
    isPending: isTopicsPending,
    isError: isTopicsError,
  } = useQuery(quizQueries.getQuizTopicQuery());
  const topics = topicResponse?.data ?? [];

  const resolvedTopicIdFromProfile = useMemo(() => {
    const first = profile?.interests?.[0];
    if (!first) return null;
    const list = topicResponse?.data ?? [];
    const found = list.find((t) => t.name === first);
    return found?.id ?? null;
  }, [profile?.interests, topicResponse?.data]);

  const { mutate: patchProfile, isPending } = useMutation(
    userQueries.patchUserProfileMutation(),
  );

  const handleSubmit = (close: () => void) => {
    const trimmed = nickname.trim();
    const topicIdToSend =
      selectedTopicId ?? (interest > 0 ? interest : resolvedTopicIdFromProfile);

    if (!trimmed) {
      toastError("닉네임을 입력해 주세요.");
      return;
    }
    if (trimmed.length > NICKNAME_MAX_LENGTH) {
      toastError(
        `닉네임은 최대 ${NICKNAME_MAX_LENGTH}자까지 입력할 수 있어요.`,
      );
      return;
    }
    if (topicIdToSend == null && topics.length > 0) {
      toastError("관심 분야를 선택해 주세요.");
      return;
    }

    patchProfile(
      {
        nickname: trimmed,
        ...(topicIdToSend != null ? { interestTopicIds: [topicIdToSend] } : {}),
      },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: userKeys.profile() }),
            queryClient.invalidateQueries({ queryKey: rankingKeys.all }),
          ]);
          try {
            const fresh = await queryClient.fetchQuery(
              userQueries.getUserProfileQuery(),
            );
            const next = fresh?.data ?? null;
            setProfile(next);
            setName(next?.nickname ?? trimmed);
            if (topicIdToSend != null) setInterest(topicIdToSend);
          } catch {
            setName(trimmed);
            if (topicIdToSend != null) setInterest(topicIdToSend);
          }
          toastSuccess("프로필이 수정되었어요.");
          close();
        },
        onError: (error) => {
          toastError(
            error instanceof Error
              ? error.message
              : "프로필 수정에 실패했어요.",
          );
        },
      },
    );
  };

  const canSave = Boolean(nickname.trim()) && !isPending;

  return (
    <Modal
      onClose={onClose}
      title="프로필 수정"
      footer={
        <UserProfileEditModalFooter
          canSave={canSave}
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-gray-005 text-sm" htmlFor="profile-nickname">
            이름(닉네임)
          </label>
          <input
            id="profile-nickname"
            type="text"
            value={nickname}
            onChange={(e) =>
              setNickname(
                formatNicknameInput(e.target.value).slice(
                  0,
                  NICKNAME_MAX_LENGTH,
                ),
              )
            }
            placeholder="최대 13자 / 공백, 특수기호 불가"
            maxLength={NICKNAME_MAX_LENGTH}
            className="border-gray-002 focus:border-blue-004 h-12 w-full rounded-xl border bg-white px-4 text-base text-black outline-none"
            autoComplete="nickname"
          />
          <p className="text-gray-005 text-end text-sm">
            {nickname.length}/{NICKNAME_MAX_LENGTH}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Subtitle className="text-gray-005 text-sm">관심 분야</Subtitle>
          {isTopicsPending && (
            <p className="text-gray-005 text-sm">불러오는 중...</p>
          )}
          {isTopicsError && (
            <p className="text-red text-sm">
              관심 분야를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
            </p>
          )}
          {!isTopicsPending && !isTopicsError && (
            <div className="grid grid-cols-2 gap-3">
              {topics.map((topic) => (
                <Button
                  key={`${topic.id}-${topic.name}`}
                  size="large"
                  className="h-[52px]"
                  type="button"
                  state={
                    selectedTopicId === topic.id
                      ? "outline"
                      : "disabled_outline"
                  }
                  onClick={() =>
                    setSelectedTopicId(topic.id != null ? topic.id : null)
                  }
                >
                  {topic.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

function UserProfileEditModalFooter({
  canSave,
  isPending,
  onSubmit,
}: {
  canSave: boolean;
  isPending: boolean;
  onSubmit: (close: () => void) => void;
}) {
  const close = useModalClose();

  return (
    <div className="flex gap-2">
      <Button
        size="large"
        state="ghost_background"
        className="flex-1"
        onClick={close}
        disabled={isPending}
      >
        취소
      </Button>
      <Button
        size="large"
        state={canSave ? "active" : "disabled"}
        className="flex-1"
        onClick={() => onSubmit(close)}
        disabled={!canSave}
      >
        {isPending ? "저장 중..." : "저장"}
      </Button>
    </div>
  );
}
