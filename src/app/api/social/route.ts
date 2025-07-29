// app/api/social/route.ts
import { socialMediaPosts } from "@/lib/Socials";
import { NextResponse } from "next/server";

export interface SocialMediaPost {
  post: string;
  image: string;
  author: string;
  hashtags: string[];
}



// Optional: map genre IDs to example hashtags
const genreToHashtag: Record<number, string[]> = {
  28: ["#action", "#adventure"],
  35: ["#comedy", "#funny"],
  99: ["#documentary", "#facts"],
  18: ["#drama", "#storytelling"],
  10749: ["#romance", "#love"],
  27: ["#horror", "#thriller"],
  22: ["#programming", "#tech"],
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const genres = searchParams.get("genres")?.split(",").map(Number) || [];

  try {
    let filteredPosts = socialMediaPosts;

    if (genres.length > 0) {
      const hashtags = genres.flatMap((g) => genreToHashtag[g] || []);
      filteredPosts = socialMediaPosts.filter((post) =>
        post.hashtags.some((tag) => hashtags.includes(tag))
      );
    }

    return NextResponse.json({ data: filteredPosts.slice(0, 10) });
  } catch (error) {
    console.error("Error fetching social posts:", error);
    return NextResponse.json({ error: "Failed to fetch social posts" }, { status: 500 });
  }
}
