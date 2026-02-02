import { createSignal } from "solid-js";
import Header from "~/shared/components/Header";
import ActivitySection from "./ActivitySection";
import SettingSection from "./SettingSection";
import UserProfileSection from "./UserProfileSection";
import type { User } from "../domain/types";

interface MyPageProps {
  user?: User;
  onEditProfile?: () => void;
  onMyStudyClick?: () => void;
  onInquiryClick?: () => void;
  onLogoutClick?: () => void;
  onWithdrawClick?: () => void;
}

export default function MyPage(props: MyPageProps) {
  // TODO: 실제 API 연동 시 createResource로 변경
  const [user] = createSignal<User>(
    props.user ?? {
      id: "1",
      name: "김민재",
      university: "경기대학교",
      position: "백엔드",
    }
  );

  const handleEditProfile = () => {
    props.onEditProfile?.();
  };

  const handleMyStudyClick = () => {
    props.onMyStudyClick?.();
  };

  const handleInquiryClick = () => {
    props.onInquiryClick?.();
  };

  const handleLogoutClick = () => {
    props.onLogoutClick?.();
  };

  const handleWithdrawClick = () => {
    props.onWithdrawClick?.();
  };

  return (
    <main class="mx-auto min-h-screen max-w-[500px] bg-gray-001">
      <Header title="마이페이지" />
      <div class="flex flex-col">
        <UserProfileSection user={user()} onEditProfile={handleEditProfile} />
        <ActivitySection
          onMyStudyClick={handleMyStudyClick}
          onInquiryClick={handleInquiryClick}
        />
        <SettingSection
          onLogoutClick={handleLogoutClick}
          onWithdrawClick={handleWithdrawClick}
        />
      </div>
    </main>
  );
}
