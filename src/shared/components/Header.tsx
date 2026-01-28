import { useNavigate } from "@solidjs/router";
import ChevronLeftIcon from "./icons/ChevronLeftIcon";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export default function Header(props: HeaderProps) {
  const navigate = useNavigate();
  const showBackButton = () => props.showBackButton ?? true;
  const title = () => props.title;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header class="flex h-16 w-full items-center px-4">
      {showBackButton() && (
        <button
          onClick={handleBack}
          class="flex items-center justify-center"
          aria-label="뒤로 가기"
        >
          <ChevronLeftIcon />
        </button>
      )}
      {title() && (
        <h1 class="flex-1 text-center text-lg font-bold">{title()}</h1>
      )}
      {showBackButton() && title() && <div class="w-6"></div>}
    </header>
  );
}
