import { redirect } from "next/navigation";

export default async function Home() {
  // const session = await auth();

  // if(session?.user.role === 'VIEWER') return redirect("/w");
  return redirect("/home");
}
