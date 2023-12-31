import { Toolbar } from "@/components/ui";
import { DialogContainers, EmptyBoardMessage } from "@/components/app";

function App() {
  return (
    <>
      <Toolbar />

      <main className="h-[calc(100vh-var(--height-toolbar))]">
        <EmptyBoardMessage />
      </main>

      <DialogContainers />
    </>
  );
}

export default App;
