interface CheckboxIconProps {
  isChecked: boolean;
}

export default function CheckboxIcon(props: CheckboxIconProps) {
  if (props.isChecked) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-004"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" />
        <path
          d="M8 12L11 15L16 9"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-003"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
      />
    </svg>
  );
}
