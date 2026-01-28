import { createSignal } from "solid-js";

interface SubjectiveAnswerInputProps {
  value: string;
  maxLength?: number;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function SubjectiveAnswerInput(
  props: SubjectiveAnswerInputProps
) {
  const maxLength = () => props.maxLength ?? 5000;
  const currentLength = () => props.value.length;

  const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    if (value.length <= maxLength()) {
      props.onChange(value);
    }
  };

  return (
    <div class="relative flex flex-col">
      <textarea
        value={props.value}
        onInput={handleInput}
        placeholder={props.placeholder ?? "답변을 입력하세요"}
        class="min-h-[200px] w-full rounded-lg border-2 border-gray-003 bg-gray-001 p-4 text-base text-gray-008 placeholder:text-gray-004 focus:border-blue-004 focus:outline-none"
        maxLength={maxLength()}
        aria-label="답변 입력"
      />
      <div class="absolute bottom-3 right-3 text-sm text-gray-005">
        {currentLength()}/{maxLength().toLocaleString()}
      </div>
    </div>
  );
}
