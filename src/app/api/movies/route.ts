import { NextResponse } from 'next/server';
import axios from 'axios';

// GET get trending movies 
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';

    const token = process.env.TMDB_ACCESS_TOKEN;

    if (!token) {
        console.error("TMDB_ACCESS_TOKEN is not defined");
        return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                language: 'en-US',
                page,
            },
            timeout: 8000,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // const res = JSON.stringify(response.data.results);
        console.log('Response Data:', response.data.results[0]);


        return NextResponse.json(response.data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
        return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
}