import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import User from "@/models/User";
import { dbConnect } from "@/db/DbConnect";


// POST Updates User Preferences
export async function POST(req: NextRequest) {
  await dbConnect();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { movie, news, social } = await req.json();

  try {
    const user = await User.findOneAndUpdate(
      { email: token.email },
      {
        moviePreferences: movie,
        newsPreferences: news,
        socialPreferences: social,
      },
      { new: true }
    );

    // console.log(user)

    return NextResponse.json({ success: true, user, msg: "Preferences updated successfully" });
  } catch (error) {
    console.error("Update failed", error);
    return NextResponse.json({ error: "Failed to update preferences" }, { status: 500 });
  }
}