import { JSX } from "solid-js";

export default function QuizLayout(props: { children: JSX.Element }) {
  return (
    <div class="mx-auto min-h-screen overflow-hidden">{props.children}</div>
  );
}
