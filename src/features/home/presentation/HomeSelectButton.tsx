import { A } from "@solidjs/router";
import { SubTitle, Title } from "~/shared/components";

interface HomeSelectButtonProps {
  title: string;
  icon: string;
  subtitle: string;
  href: string;
}

export default function HomeSelectButton({
  title,
  icon,
  subtitle,
  href,
}: HomeSelectButtonProps) {
  return (
    <A
      href={href}
      class="grid h-25 w-full cursor-pointer place-items-center rounded-2xl bg-white focus:outline-none active:opacity-40"
    >
      <div class="flex flex-col items-start gap-1">
        <div class="flex items-center gap-2">
          <Title>{title}</Title>
          <span class="font-tossface text-xl">{icon}</span>
        </div>
        <SubTitle>{subtitle}</SubTitle>
      </div>
    </A>
  );
}
