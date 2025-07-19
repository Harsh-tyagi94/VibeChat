import { db } from "@/lib/db";
import DatabaseDeletedModal from "@/components/DatabaseDeletedModal";

export default async function Home() {
  await db.set("name", "John Doe");

  return (
    <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <div className="text-red-500 text-2xl">RealTime Chatting App!!</div>
      <DatabaseDeletedModal />
    </main>
  );
}
