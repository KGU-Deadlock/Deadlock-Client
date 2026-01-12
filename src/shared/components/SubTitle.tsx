import { JSX } from "solid-js";

export default function SubTitle({ children }: { children: JSX.Element }) {
  return <p class="text-sm text-gray-500">{children}</p>;
}
