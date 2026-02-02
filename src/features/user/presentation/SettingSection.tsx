import MenuListItem from "./MenuListItem";
import BoxIcon from "~/shared/components/icons/BoxIcon";

interface SettingSectionProps {
  onLogoutClick?: () => void;
  onWithdrawClick?: () => void;
}

export default function SettingSection(props: SettingSectionProps) {
  const handleLogoutClick = () => {
    props.onLogoutClick?.();
  };

  const handleWithdrawClick = () => {
    props.onWithdrawClick?.();
  };

  return (
    <section class="flex flex-col gap-4 px-4 py-6">
      <h2 class="text-lg font-bold text-gray-008">설정</h2>
      <div class="flex flex-col divide-y divide-gray-002 rounded-lg bg-white">
        <MenuListItem
          icon={BoxIcon}
          label="로그아웃"
          onClick={handleLogoutClick}
        />
        <MenuListItem
          icon={BoxIcon}
          label="탈퇴하기"
          onClick={handleWithdrawClick}
        />
      </div>
    </section>
  );
}
