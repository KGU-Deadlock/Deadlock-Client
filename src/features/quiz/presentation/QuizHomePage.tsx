import { Button, Header, Title } from "~/shared/components";
import { createSignal } from "solid-js";
import QuizSelectButton from "./QuizSelectButton";

export default function QuizHomePage() {
  const [selected, setSelected] = createSignal<string>("");

  return (
    <div class="flex h-screen flex-col">
      <Header />
      <div class="px-4">
        <Title.PageTitle>
          공부 방법을
          <br />
          선택해주세요
        </Title.PageTitle>
      </div>
      <div class="flex flex-1 flex-col justify-center gap-2 px-4">
        <QuizSelectButton
          isSelected={() => selected() === "text"}
          onClick={() => setSelected("text")}
          icon="👨‍💻"
          title="일반 문제 풀이"
          subtitle={
            <>
              음성으로 응답을 하는 퀴즈
              <br />
              3문항이 출제돼요.
              <br />
              자신 있게 질문에 답해보세요!
            </>
          }
        />
        <QuizSelectButton
          isSelected={() => selected() === "voice"}
          onClick={() => setSelected("voice")}
          icon="🎤"
          title="음성 문제 풀이"
          subtitle={
            <>
              음성으로 응답을 하는 퀴즈
              <br />
              3문항이 출제돼요.
              <br />
              자신 있게 질문에 답해보세요!
            </>
          }
        />
      </div>
      <div class="mb-16 flex flex-col justify-end px-4">
        <Button
          className="w-full"
          variant={!selected() ? "disabled" : "default"}
          size="large"
        >
          계속
        </Button>
      </div>
    </div>
  );
}
