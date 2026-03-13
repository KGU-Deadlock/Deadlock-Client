import { Header, Title } from "@/components/common";
import { BackButton } from "@/components/common";
import { AppScreen } from "@stackflow/plugin-basic-ui";

export default function RankingPage() {
  return (
    <AppScreen>
      <Header left={<BackButton />} center={<Title>실시간 랭킹</Title>} />
      <div>Ranking</div>
    </AppScreen>
  );
}
