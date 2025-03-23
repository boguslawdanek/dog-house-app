import DogsContainer from "@/components/DogsContainer";

export default function Home() {
  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 pb-16 sm:pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-4 sm:gap-[32px] row-start-2 items-center sm:items-start w-full">
          <DogsContainer />
        </main>
      </div>
    </>
  );
}
