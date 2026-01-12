import { useNavigate } from "@solidjs/router";

export default function Header() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header class="flex h-16 w-full items-center px-4">
      <button onClick={handleBack}>이전으로</button>
    </header>
  );
}
