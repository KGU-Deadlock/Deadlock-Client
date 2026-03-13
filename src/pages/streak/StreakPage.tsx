import { Header, Title } from "@/components/common";
import { BackButton } from "@/components/common";
import { AppScreen } from "@stackflow/plugin-basic-ui";

export default function StreakPage() {
  return (
    <AppScreen>
      <Header left={<BackButton />} center={<Title>연속 스트릭</Title>} />
      <div>Streak</div>
    </AppScreen>
  );
}
