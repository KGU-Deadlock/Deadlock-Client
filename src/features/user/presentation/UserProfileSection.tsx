import { JSX } from "solid-js";
import Button from "~/shared/components/Button";
import type { User } from "../../domain/types";

interface UserProfileSectionProps {
  user: User;
  onEditProfile?: () => void;
}

export default function UserProfileSection(props: UserProfileSectionProps) {
  const handleEditProfile = () => {
    props.onEditProfile?.();
  };

  return (
    <section class="flex flex-col items-center gap-3 px-4 py-6">
      <div class="relative">
        {props.user.profileImageUrl ? (
          <img
            src={props.user.profileImageUrl}
            alt={`${props.user.name} 프로필`}
            class="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div class="flex h-24 w-24 items-center justify-center rounded-full bg-gray-003">
            <span class="text-2xl font-medium text-gray-006">
              {props.user.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <h2 class="text-lg font-bold text-gray-008">{props.user.name}</h2>
      <p class="text-sm text-gray-005">
        {props.user.university} · {props.user.position}
      </p>
      <Button
        variant="select"
        size="medium"
        onClick={handleEditProfile}
        className="mt-2 w-full max-w-[200px]"
      >
        프로필 수정
      </Button>
    </section>
  );
}
