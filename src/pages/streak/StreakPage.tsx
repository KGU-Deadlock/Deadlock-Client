import { Card, Header, Title, Scrollable } from "@/components/common";
import { BackButton } from "@/components/common";
import { StreakBoard, StreakCalendar } from "@/components/streak";
import { AppScreen } from "@stackflow/plugin-basic-ui";

export default function StreakPage() {
  return (
    <AppScreen>
      <Scrollable>
        <Header
          left={<BackButton />}
          sticky
          center={<Title>연속 스트릭</Title>}
        />
        <section className="pt-header px-gutter gap-colgap flex flex-col">
          <StreakBoard />
          <div className="gap-colgap-small grid grid-cols-3">
            <Card className="bg-gray-002 grid place-items-center">
              <span className="text-sm">연속 학습</span>
              <span className="text-lg font-semibold">4일</span>
            </Card>
            <Card className="bg-gray-002 grid place-items-center">
              <span className="text-sm">해결한 문제</span>
              <span className="text-lg font-semibold">4개</span>
            </Card>
            <Card className="bg-gray-002 grid place-items-center">
              <span className="text-sm">해결한 분야</span>
              <span className="text-lg font-semibold">4개</span>
            </Card>
          </div>
        </section>
        <div className="bg-gray-002 my-colgap h-1 w-full" />
        <StreakCalendar />
      </Scrollable>
    </AppScreen>
  );
}
