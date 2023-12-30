import { Logo, ArrowDown, Plus, VerticalDots } from "@/components/icons";
import { Button } from "@/components/ui";

export const Toolbar = () => {
  return (
    <header className="px-4 h-[var(--height-toolbar)] flex items-center bg-white">
      <Logo />
      <Button variant="ghost" className="rounded-md gap-2 ml-1">
        <span className="text-h-lg text-black">Platform Launch</span>
        <ArrowDown className="relative top-0.5" />
      </Button>

      <Button size="icon" className="ml-auto">
        <Plus />
      </Button>

      <VerticalDots className="ml-4" />
    </header>
  );
};
