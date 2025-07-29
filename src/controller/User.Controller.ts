import { dbConnect } from "@/db/DbConnect";
import User from "@/models/User";

interface AuthUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export async function findOrCreateUser(user: AuthUser) {
  await dbConnect();

  const existingUser = await User.findOne({ email: user.email });

  if (existingUser) return existingUser;

  const newUser = await User.create({
    name: user.name,
    email: user.email,
    image: user.image,
  });

  return newUser;
}
