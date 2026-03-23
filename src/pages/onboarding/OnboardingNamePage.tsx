import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useEffect, useState } from "react";

import { useFlow } from "@/app/stackflow";

import {
  BackButton,
  Button,
  Footer,
  Header,
  PageTitle,
} from "@/components/common";

import {
  formatNicknameInput,
  NICKNAME_MAX_LENGTH,
} from "@/utils/formatNicknameInput";

interface OnboardingNamePageProps {
  name: string;
}

const OnboardingNamePage: ActivityComponentType<OnboardingNamePageProps> = ({
  params,
}) => {
  const { name: initialName = "" } = params;
  const { push } = useFlow();
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleNext = () => {
    push("OnboardingInterestPage", { name });
  };

  return (
    <AppScreen className="relative">
      <Header left={<BackButton />} />
      <PageTitle>
        <span>안녕하세요!</span>
        <span>어떻게 불러드릴까요?</span>
      </PageTitle>
      <div className="px-gutter mt-20 flex w-full flex-col gap-4">
        <label className="text-gray-005 text-sm">이름(닉네임)</label>
        <input
          className="border-gray-003 w-full border-b pb-2 text-lg focus:outline-none"
          placeholder="최대 13자 / 공백, 특수기호 불가"
          value={name}
          maxLength={NICKNAME_MAX_LENGTH}
          onChange={(e) =>
            setName(
              formatNicknameInput(e.target.value).slice(0, NICKNAME_MAX_LENGTH),
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") handleNext();
          }}
        />
        <p className="text-gray-005 text-end text-sm">
          {name.length}/{NICKNAME_MAX_LENGTH}
        </p>
      </div>
      <Footer>
        <Button
          size="large"
          state={name ? "active" : "disabled"}
          onClick={handleNext}
        >
          다음
        </Button>
      </Footer>
    </AppScreen>
  );
};

export default OnboardingNamePage;
