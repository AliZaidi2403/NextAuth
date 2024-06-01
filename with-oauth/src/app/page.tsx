import { Options } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import UserCard from "./../components/UserCard";
export default async function Home() {
  const session = await getServerSession(Options);
  return (
    <>
      {session ? (
        <UserCard user={session?.user} pagetype={"Home"} />
      ) : (
        <h1 className="text-5xl">You shall not pass</h1>
      )}
    </>
  );
}
