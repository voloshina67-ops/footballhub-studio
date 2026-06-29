import FlashscoreBar from "./components/FlashscoreBar";
import EditorContent from "./components/EditorContent";
import ProjectControls from "./components/ProjectControls";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#102a5f_0%,#071321_32%,#020817_100%)] px-4 py-5 text-white sm:px-6 lg:px-8">

      <div className="pointer-events-none absolute left-[-300px] top-[-300px] h-[700px] w-[700px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-250px] top-[-250px] h-[600px] w-[600px] rounded-full bg-red-600/10 blur-[140px]" />

      <div className="relative mx-auto flex max-w-[1900px] flex-col gap-4">
        <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/45 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl sm:px-5">
          <div className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-emerald-100/65">
            FootballHub Studio
          </div>
          <div className="mt-1 text-xl font-black uppercase tracking-wide text-white sm:text-2xl">
            Broadcast Lineup Builder
          </div>
        </div>

        <FlashscoreBar />

        <ProjectControls />

        <EditorContent />
      </div>

    </main>
  );
}
