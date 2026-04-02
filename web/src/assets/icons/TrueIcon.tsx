interface TrueIconProps {
  isSelected?: boolean;
}

export default function TrueIcon(props: TrueIconProps) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.isSelected ? "text-red" : "text-gray-004"}
    >
      <circle
        cx="40"
        cy="40"
        r="35"
        stroke="currentColor"
        stroke-width="4"
        fill="none"
      />
    </svg>
  );
}
