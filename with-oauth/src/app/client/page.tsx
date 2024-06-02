"use client";
// Remember you must use an AuthProvider for
// client components to useSession
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserCard from "@/components/UserCard";

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  /* if (session?.user.role !== "admin" && session?.user.role !== "manager") {
    return <h1 className="text-3xl">Access Denied!!</h1>;
  }*/
  //we can handle like this or we can simply handle these protection in middleware
  if (!session?.user) return;
  return (
    <section className="flex flex-col gap-6">
      <UserCard user={session?.user} pagetype={"Client"} />
    </section>
  );
}
