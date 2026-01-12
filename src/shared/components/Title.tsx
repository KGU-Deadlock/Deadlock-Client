import { JSX } from "solid-js";

export default function Title({ children }: { children: JSX.Element }) {
  return <p class="text-lg font-medium">{children}</p>;
}

const PageTitle = ({ children }: { children: JSX.Element }) => {
  return <p class="pt-10 text-2xl font-semibold">{children}</p>;
};

Title.PageTitle = PageTitle;
