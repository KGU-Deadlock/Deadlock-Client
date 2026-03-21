import { FaChevronLeft } from "react-icons/fa6";

import { useFlow } from "@/app/stackflow";

interface BackButtonProps {
  onClick?: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  const { pop } = useFlow();

  return (
    <button onClick={onClick || (() => pop())}>
      <FaChevronLeft size={18} color="black" />
    </button>
  );
}
