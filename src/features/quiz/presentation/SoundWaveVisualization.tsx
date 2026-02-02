import { createMemo, For } from "solid-js";

interface SoundWaveVisualizationProps {
  isRecording?: boolean;
}

export default function SoundWaveVisualization(
  props: SoundWaveVisualizationProps
) {
  const isRecording = () => props.isRecording ?? false;

  // 파형 데이터 (더미) - 고정된 패턴 사용
  const waves = createMemo(() => {
    const baseHeights = [
      25, 30, 35, 40, 45, 50, 45, 40, 35, 30, 25, 30, 35, 40, 45, 50, 45, 40,
      35, 30,
    ];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      height: isRecording() ? baseHeights[i] : 10,
      delay: i * 50,
    }));
  });

  return (
    <div class="flex h-24 items-center justify-center gap-1 px-4">
      <For each={waves()}>
        {(wave) => (
          <div
            class="w-1 rounded-full transition-all duration-300"
            style={{
              height: `${wave.height}px`,
              "transition-delay": `${wave.delay}ms`,
            }}
            classList={{
              "bg-blue-004": isRecording() && wave.height > 40,
              "bg-blue-003": isRecording() && wave.height > 30,
              "bg-blue-002": isRecording() && wave.height <= 30,
              "bg-gray-003": !isRecording(),
            }}
          />
        )}
      </For>
    </div>
  );
}
