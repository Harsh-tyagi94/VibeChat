// 'use client'

import { db } from "@/lib/db";

export default async function Home() {
  await db.set("name", "John Doe");
  return (
    <div className="text-red-500">RealTime Chatting App!!</div>
  );
}
