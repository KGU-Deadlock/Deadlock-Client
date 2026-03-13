import { useFlow } from "@/app/stackflow";
import { IconBack } from "@stackflow/plugin-basic-ui";

export default function BackButton() {
  const { pop } = useFlow();

  return (
    <button onClick={() => pop()}>
      <IconBack />
    </button>
  );
}
