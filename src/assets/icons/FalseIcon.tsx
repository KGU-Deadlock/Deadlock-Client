interface FalseIconProps {
  isSelected?: boolean;
}

export default function FalseIcon(props: FalseIconProps) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class={props.isSelected ? "text-blue-003" : "text-gray-004"}
    >
      <path
        d="M25 25L55 55M55 25L25 55"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
