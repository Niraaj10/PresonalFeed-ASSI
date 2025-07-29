import { NextResponse } from 'next/server';
import axios from 'axios';

// GET to get movies besed on specific genre
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const genres = searchParams.get("genres") || "";
    const page = searchParams.get("page") || "1";
    console.log('Fetching movies for genres:' + genres + ' page:' + page);


    try {
        const response = await axios.get(
            'https://api.themoviedb.org/3/discover/movie', {
            params: {
                with_genres: genres,
                language: 'en-US',
                sort_by: 'popularity.desc',
                page: page
            },
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            },
        });


        // console.log(response)

        return NextResponse.json({ data: response.data.results });
    } catch (error) {
        console.error('Error fetching movies:', error);
        return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
}
