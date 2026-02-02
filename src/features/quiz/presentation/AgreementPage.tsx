import { createMemo, createSignal, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Button from "~/shared/components/Button";
import Header from "~/shared/components/Header";
import CheckboxIcon from "~/shared/components/icons/CheckboxIcon";
import AgreementItem from "./AgreementItem";
import type { AgreementItem as AgreementItemType } from "../domain/types";

interface AgreementPageProps {
  agreements?: AgreementItemType[];
  onComplete?: () => void;
}

export default function AgreementPage(props: AgreementPageProps) {
  const navigate = useNavigate();

  // TODO: 실제 API 연동 시 createResource로 변경
  const [agreements] = createSignal<AgreementItemType[]>(
    props.agreements ?? [
      {
        id: "terms",
        label: "(필수) 서비스 이용약관 동의",
        isRequired: true,
        onViewDetails: () => {
          // TODO: 약관 상세 페이지로 이동
          console.log("서비스 이용약관 상세 보기");
        },
      },
      {
        id: "microphone",
        label: "(필수) 마이크 접근 권한 동의",
        isRequired: true,
        onViewDetails: () => {
          // TODO: 마이크 권한 상세 페이지로 이동
          console.log("마이크 접근 권한 상세 보기");
        },
      },
    ],
  );

  const [checkedItems, setCheckedItems] = createSignal<Set<string>>(new Set());

  const allAgreed = createMemo(() => {
    const checked = checkedItems();
    return agreements().every((agreement) => checked.has(agreement.id));
  });

  const handleToggleAll = () => {
    const current = checkedItems();
    if (allAgreed()) {
      setCheckedItems(new Set<string>());
    } else {
      setCheckedItems(new Set<string>(agreements().map((a) => a.id)));
    }
  };

  const handleToggleItem = (id: string) => {
    const current = checkedItems();
    const newSet = new Set(current);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCheckedItems(newSet);
  };

  const handleNext = () => {
    if (!allAgreed()) return;

    props.onComplete?.();
    // TODO: 실제 음성 퀴즈 페이지로 이동
    navigate("/quiz/voice");
  };

  return (
    <main class="mx-auto flex min-h-screen max-w-[500px] flex-col bg-white">
      <Header />
      <div class="flex flex-1 flex-col px-4 py-6">
        {/* Title */}
        <div class="mb-8">
          <h1 class="text-blue-004 text-2xl font-bold">
            음성 퀴즈를 위해
            <br />
            마이크 권한이
            <br />
            필요해요
          </h1>
        </div>

        {/* Agreement Section */}
        <div class="mb-6 flex flex-col">
          {/* Agree to All */}
          <div class="bg-gray-001 mb-4 rounded-lg p-4">
            <button
              onClick={handleToggleAll}
              class="flex w-full items-center gap-3"
              aria-label="전체 동의하기"
            >
              <CheckboxIcon isChecked={allAgreed()} />
              <span
                class="text-base font-medium"
                classList={{
                  "text-gray-008": allAgreed(),
                  "text-gray-005": !allAgreed(),
                }}
              >
                전체 동의하기 (선택 포함)
              </span>
            </button>
          </div>

          {/* Individual Agreements */}
          <div class="flex flex-col">
            <For each={agreements()}>
              {(agreement) => (
                <AgreementItem
                  agreement={agreement}
                  isChecked={checkedItems().has(agreement.id)}
                  onToggle={() => handleToggleItem(agreement.id)}
                  onViewDetails={agreement.onViewDetails}
                />
              )}
            </For>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div class="p-4">
        <Button
          variant={allAgreed() ? "default" : "disabled"}
          size="large"
          onClick={handleNext}
          className="w-full"
        >
          다음
        </Button>
      </div>
    </main>
  );
}
