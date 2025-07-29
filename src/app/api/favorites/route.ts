import { NextRequest, NextResponse } from "next/server";
import Favorite from "@/models/Favorite";
import { dbConnect } from "@/db/DbConnect";

// GET /api/favorites to get all fovorites for a user
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    await dbConnect();
    const favorites = await Favorite.find({ userId });
    return NextResponse.json({ favorites }, { status: 200 });
  } catch (err) {
    console.error("Error fetching favorites:", err);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}


// POST /api/favorites to add post to favorite
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { userId, type, contentId, content } = body;

    if (!userId || !type || !contentId || !content) {
      return NextResponse.json(
        { error: "Missing required fields (userId, type, contentId, content)" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existing = await Favorite.findOne({ contentId });

    if (existing) {
      return NextResponse.json({ message: "Already favorited" }, { status: 200 });
    }

    const favorite = await Favorite.create({
      userId,
      type,
      contentId,
      content,
    });

    return NextResponse.json({ favorite }, { status: 200 });

  } catch (err) {
    console.error("Error adding favorite:", err);
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
  }
}
