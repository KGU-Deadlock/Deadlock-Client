export default function Title({ children }: { children: any }) {
  return <p class="text-lg font-medium">{children}</p>;
}

const PageTitle = ({ children }: { children: any }) => {
  return <p class="pt-10 text-2xl font-semibold">{children}</p>;
};

Title.PageTitle = PageTitle;
