import { NextResponse } from 'next/server';
import axios from 'axios';


// GET to get Trending news
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get('topic') || 'General';
  const language = searchParams.get('language') || 'en';
  const country = searchParams.get('country') || 'in';
  const limit = searchParams.get('limit') || '10';
  const page = searchParams.get("page") || "1";

  try {
    const response = await axios.get('https://news-api14.p.rapidapi.com/v2/trendings', {
      params: {
        topic,
        language,
        country,
        limit,
        page,
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_NEWS_KEY ,
        // 'x-rapidapi-key': process.env.NEWS_API_KEY1 ,
        'x-rapidapi-host': 'news-api14.p.rapidapi.com',
      },
    });

    // console.log('Fetched news:', response.data);

    return NextResponse.json(response.data.articles || response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}


