import ChevronRightIcon from "~/shared/components/icons/ChevronRightIcon";
import CheckboxIcon from "~/shared/components/icons/CheckboxIcon";
import type { AgreementItem as AgreementItemType } from "../domain/types";

interface AgreementItemProps {
  agreement: AgreementItemType;
  isChecked: boolean;
  onToggle: () => void;
  onViewDetails?: () => void;
}

export default function AgreementItem(props: AgreementItemProps) {
  const handleClick = () => {
    props.onToggle();
  };

  const handleViewDetails = (e: Event) => {
    e.stopPropagation();
    props.onViewDetails?.();
  };

  return (
    <div class="flex items-center gap-3 py-3">
      <button
        onClick={handleClick}
        class="flex-shrink-0"
        aria-label={`${props.agreement.label} ${props.isChecked ? "동의 취소" : "동의"}`}
      >
        <CheckboxIcon isChecked={props.isChecked} />
      </button>
      <span
        class="flex-1 text-base font-medium"
        classList={{
          "text-gray-008": props.isChecked,
          "text-gray-005": !props.isChecked,
        }}
      >
        {props.agreement.label}
      </span>
      {props.agreement.onViewDetails && (
        <button
          onClick={handleViewDetails}
          class="text-gray-004 flex-shrink-0"
          aria-label="상세 보기"
        >
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
}
