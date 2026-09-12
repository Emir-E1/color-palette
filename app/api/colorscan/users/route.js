import { connectDB } from "@/db/mongodb";
import User from "@/db/models/User";
export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const newUser = await User.create(body);
  return Response.json(newUser);
}

export async function GET() {
  await connectDB();
  const users = await User.find({});
  return Response.json(users);
}
