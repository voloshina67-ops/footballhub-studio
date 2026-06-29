import FlashscoreBar from "./components/FlashscoreBar";
import EditorContent from "./components/EditorContent";
import ProjectControls from "./components/ProjectControls";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#0f2a5f_0%,#071321_30%,#020817_100%)] p-6">

      <div className="pointer-events-none absolute left-[-300px] top-[-300px] h-[700px] w-[700px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-250px] top-[-250px] h-[600px] w-[600px] rounded-full bg-red-600/10 blur-[140px]" />

      <div className="mx-auto max-w-[1900px]">

        <FlashscoreBar />

        <ProjectControls />

        <EditorContent />

      </div>

    </main>
  );
}
