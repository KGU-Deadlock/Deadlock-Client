import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, Modal, Subtitle } from "@/components/common";

import { useAuthStore } from "@/model/auth/useAuthStore";
import { useModalClose } from "@/model/common";
import { useUserStore } from "@/model/user/useUserStore";

import { userQueries } from "@/api/user/api.query";

import { cn } from "@/utils/cn";
import { toastError, toastSuccess } from "@/utils/toast";

interface UserWithdrawConfirmModalProps {
  onClose: () => void;
}

export default function UserWithdrawConfirmModal({
  onClose,
}: UserWithdrawConfirmModalProps) {
  const queryClient = useQueryClient();
  const logout = useAuthStore((s) => s.logout);
  const resetUser = useUserStore((s) => s.reset);

  const { mutate: withdraw, isPending } = useMutation({
    ...userQueries.deleteUserWithdrawMutation(),
    onSuccess: () => {
      queryClient.clear();
      logout();
      resetUser();
      toastSuccess("회원 탈퇴가 완료되었어요.");
      onClose();
    },
    onError: (error) => {
      toastError(
        error instanceof Error ? error.message : "회원 탈퇴에 실패했어요.",
      );
    },
  });

  return (
    <Modal
      onClose={onClose}
      title="회원 탈퇴"
      footer={
        <UserWithdrawConfirmModalFooter
          withdraw={withdraw}
          isPending={isPending}
        />
      }
    >
      <Subtitle className="text-center text-base leading-relaxed">
        정말 탈퇴하시겠어요? ㅠㅠ
      </Subtitle>
    </Modal>
  );
}

function UserWithdrawConfirmModalFooter({
  withdraw,
  isPending,
}: {
  withdraw: () => void;
  isPending: boolean;
}) {
  const close = useModalClose();

  return (
    <div className="flex gap-2">
      <Button
        size="large"
        state={isPending ? "disabled" : "ghost_background"}
        className="flex-1"
        onClick={close}
      >
        취소
      </Button>
      <Button
        size="large"
        state={isPending ? "disabled" : "active"}
        className={cn("flex-1", !isPending && "bg-red-500 text-white")}
        onClick={() => withdraw()}
        disabled={isPending}
      >
        {isPending ? "처리 중..." : "탈퇴하기"}
      </Button>
    </div>
  );
}
