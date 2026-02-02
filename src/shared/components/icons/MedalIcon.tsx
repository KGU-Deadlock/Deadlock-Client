interface MedalIconProps {
  rank: 1 | 2 | 3;
}

export default function MedalIcon(props: MedalIconProps) {
  const getMedalColor = () => {
    switch (props.rank) {
      case 1:
        return "text-[#FFD700]";
      case 2:
        return "text-gray-300";
      case 3:
        return "text-[#CD7F32]";
    }
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class={getMedalColor()}
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}
