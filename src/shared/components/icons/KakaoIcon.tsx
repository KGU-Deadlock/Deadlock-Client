export default function KakaoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 말풍선 모양 */}
      <path
        d="M10 2C5.58172 2 2 5.58172 2 10C2 12.5 3.5 14.7 5.8 15.8L5 18.5L7.7 17.7C8.4 17.8 9.2 17.9 10 17.9C14.4183 17.9 18 14.3183 18 10C18 5.58172 14.4183 2 10 2Z"
        fill="black"
      />
      {/* 왼쪽 눈 */}
      <circle cx="7.5" cy="9.5" r="1" fill="white" />
      {/* 오른쪽 눈 */}
      <circle cx="12.5" cy="9.5" r="1" fill="white" />
      {/* 입 */}
      <path
        d="M7 12.5C7 13.3284 8.17157 14 10 14C11.8284 14 13 13.3284 13 12.5C13 11.6716 11.8284 11 10 11C8.17157 11 7 11.6716 7 12.5Z"
        fill="white"
      />
    </svg>
  );
}
