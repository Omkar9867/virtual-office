import { hash } from "bcryptjs";
import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(req) {
  const { email, password } = await req.json();
  await connectToDatabase();

  const hashedPassword = await hash(password, 10);
  try {
    const user = await User.create({ email, password: hashedPassword });
    return new Response(JSON.stringify({ user }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }
}
