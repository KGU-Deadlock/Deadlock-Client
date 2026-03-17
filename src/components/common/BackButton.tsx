import { useFlow } from "@/app/stackflow";
import { FaChevronLeft } from "react-icons/fa6";

export default function BackButton() {
  const { pop } = useFlow();

  return (
    <button onClick={() => pop()}>
      <FaChevronLeft size={18} color="black" />
    </button>
  );
}
