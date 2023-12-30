import { Button } from "@/components/ui";

export const EmptyBoardMessage = () => {
  return (
    <div className="text-center grid gap-6 h-full content-center justify-items-center">
      <p className="text-h-lg">
        This board is empty. Create a new <br /> column to get started.
      </p>

      <Button size="lg">+ Add New Column</Button>
    </div>
  );
};
