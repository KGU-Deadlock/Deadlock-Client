import { Header } from "@/components/common";
import { BackButton } from "@/components/common";
import { AppScreen } from "@stackflow/plugin-basic-ui";

export default function QuizHomePage() {
  return (
    <AppScreen>
      <Header left={<BackButton />} />
      <div>QuizHome</div>
    </AppScreen>
  );
}
