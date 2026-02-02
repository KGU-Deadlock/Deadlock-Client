import MicrophoneIcon from "~/shared/components/icons/MicrophoneIcon";
import SendIcon from "~/shared/components/icons/SendIcon";
import CloseIcon from "~/shared/components/icons/CloseIcon";

interface VoiceControlButtonsProps {
  isRecording?: boolean;
  hasTranscribedText?: boolean;
  onCancel?: () => void;
  onRecord?: () => void;
  onStop?: () => void;
  onSubmit?: () => void;
}

export default function VoiceControlButtons(props: VoiceControlButtonsProps) {
  const isRecording = () => props.isRecording ?? false;
  const hasTranscribedText = () => props.hasTranscribedText ?? false;

  const handleRecordClick = () => {
    if (isRecording()) {
      props.onStop?.();
    } else {
      props.onRecord?.();
    }
  };

  return (
    <div class="flex items-center justify-center gap-6 px-4 py-6">
      {/* Cancel Button */}
      <button
        onClick={props.onCancel}
        class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-002 transition-colors hover:bg-gray-003"
        aria-label="취소"
      >
        <CloseIcon />
      </button>

      {/* Record Button */}
      <button
        onClick={handleRecordClick}
        class="flex h-20 w-20 items-center justify-center rounded-full transition-all"
        classList={{
          "bg-negative": isRecording(),
          "bg-gray-003": !isRecording(),
        }}
        aria-label={isRecording() ? "녹음 중지" : "녹음 시작"}
      >
        <MicrophoneIcon />
      </button>

      {/* Submit Button */}
      <button
        onClick={props.onSubmit}
        disabled={!hasTranscribedText()}
        class="flex h-12 w-12 items-center justify-center rounded-full transition-colors disabled:bg-gray-002 disabled:opacity-50"
        classList={{
          "bg-blue-004 hover:bg-blue-003": hasTranscribedText(),
          "bg-gray-002": !hasTranscribedText(),
        }}
        aria-label="제출"
      >
        <SendIcon />
      </button>
    </div>
  );
}
