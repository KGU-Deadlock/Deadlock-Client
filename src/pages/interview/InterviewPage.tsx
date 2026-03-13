import { Header } from "@/components/common";
import { BackButton } from "@/components/common";
import { AppScreen } from "@stackflow/plugin-basic-ui";

export default function InterviewPage() {
  return (
    <AppScreen>
      <Header left={<BackButton />} />
      <div>Interview</div>
    </AppScreen>
  );
}
