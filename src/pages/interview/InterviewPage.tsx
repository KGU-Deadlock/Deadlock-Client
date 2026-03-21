import { AppScreen } from "@stackflow/plugin-basic-ui";

import { Header } from "@/components/common";
import { BackButton } from "@/components/common";

export default function InterviewPage() {
  return (
    <AppScreen>
      <Header left={<BackButton />} />
      <div className="pt-header px-gutter text-gray-005 grid h-[80vh] w-full place-items-center">
        모의 면접 기능은 아직 개발중이에요!
      </div>
    </AppScreen>
  );
}
