interface VoiceInputAreaProps {
  transcribedText?: string;
  isRecording?: boolean;
}

export default function VoiceInputArea(props: VoiceInputAreaProps) {
  const transcribedText = () => props.transcribedText ?? "";
  const isRecording = () => props.isRecording ?? false;
  const isEmpty = () => transcribedText().trim().length === 0;

  return (
    <div class="relative min-h-[120px] w-full rounded-lg border-2 border-gray-003 bg-white p-4">
      {isEmpty() && !isRecording() ? (
        <div class="flex items-start gap-2">
          <span class="text-gray-004 text-2xl">...</span>
        </div>
      ) : (
        <p class="text-base text-gray-008 whitespace-pre-wrap">
          {transcribedText()}
        </p>
      )}
    </div>
  );
}
