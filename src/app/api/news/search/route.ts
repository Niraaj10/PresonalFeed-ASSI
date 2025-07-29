// app/api/search/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';


// GET to get news besed on user search
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  const token = process.env.RAPIDAPI_NEWS_KEY;

  if (!token) {
    console.error("TMDB_ACCESS_TOKEN is not defined");
    return NextResponse.json({ error: "Server config error" }, { status: 500 });
  }

  if (!query) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 });
  }

  try {
    const response = await axios.get('https://news-api14.p.rapidapi.com/v2/search/articles', {
      params: {
        query,
        language: 'en-US',
        page,
      },
      headers: {
        'x-rapidapi-key': token ,
        // 'x-rapidapi-key': process.env.NEWS_API_KEY1 ,
        'x-rapidapi-host': 'news-api14.p.rapidapi.com',
      },
    });

    // console.log(response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}
