import { auth } from "@/lib/auth";
export async function GET() {
  const session = await auth();
  console.log(session);
  return Response.json({ session });
}
