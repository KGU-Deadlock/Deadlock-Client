import { Header, Title } from "@/components/common";
import { BackButton } from "@/components/common";
import { AppScreen } from "@stackflow/plugin-basic-ui";

export default function UserPage() {
  return (
    <AppScreen>
      <Header left={<BackButton />} center={<Title>마이페이지</Title>} />
      <div className="px-gutter pt-header">User</div>
    </AppScreen>
  );
}
