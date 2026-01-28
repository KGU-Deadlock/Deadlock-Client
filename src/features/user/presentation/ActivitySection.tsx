import MenuListItem from "./MenuListItem";
import BoxIcon from "~/shared/components/icons/BoxIcon";

interface ActivitySectionProps {
  onMyStudyClick?: () => void;
  onInquiryClick?: () => void;
}

export default function ActivitySection(props: ActivitySectionProps) {
  const handleMyStudyClick = () => {
    props.onMyStudyClick?.();
  };

  const handleInquiryClick = () => {
    props.onInquiryClick?.();
  };

  return (
    <section class="flex flex-col gap-4 px-4 py-6">
      <h2 class="text-lg font-bold text-gray-008">활동</h2>
      <div class="flex flex-col divide-y divide-gray-002 rounded-lg bg-white">
        <MenuListItem
          icon={BoxIcon}
          label="내 공부"
          onClick={handleMyStudyClick}
        />
        <MenuListItem
          icon={BoxIcon}
          label="문의하기"
          onClick={handleInquiryClick}
        />
      </div>
    </section>
  );
}
