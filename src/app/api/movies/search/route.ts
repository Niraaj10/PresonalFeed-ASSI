import { NextResponse } from 'next/server';
import axios from 'axios';

// GET to get movies besed on search
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    console.error("TMDB_ACCESS_TOKEN is not defined");
    return NextResponse.json({ error: "Server config error" }, { status: 500 });
  }

  if (!query) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 });
  }

  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        query,
        language: 'en-US',
        page,
      },
      timeout: 8000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log('Movie search results:', response.data.results[0]);
    return NextResponse.json(response.data.results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}
