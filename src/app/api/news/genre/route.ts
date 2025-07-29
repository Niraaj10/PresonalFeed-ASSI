import { NextResponse } from 'next/server';
import axios from 'axios';

const genreMap: Record<number, string> = {
    28: 'sports',
    35: 'entertainment',
    18: 'world',
    10749: 'lifestyle',
    27: 'health',
    99: 'Documentary',
    22: 'technology',
    23: 'finance',
    24: 'business',
};

// GET to get news besed on specific genre
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const genreIds = searchParams.get('genres')?.split(',').map(Number) || [];
    const topic = genreMap[genreIds[0]] || 'general';

    const language = searchParams.get('language') || 'en';
    const country = searchParams.get('country') || 'in';
    const limit = 10;
    const page = searchParams.get("page") || "1";
    console.log('Fetching news for genres:' + topic + ' page:' + page);


    try {
        const response = await axios.get('https://news-api14.p.rapidapi.com/v2/trendings', {
            params: {
                topic,
                language,
                country,
                limit,
                page
            },
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_NEWS_KEY ,
                // 'x-rapidapi-key': process.env.NEWS_API_KEY1,
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