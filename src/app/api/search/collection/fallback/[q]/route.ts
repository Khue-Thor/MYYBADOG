import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { q: string } }) {
  try {
    const q = params.q;

    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
      next: {
        revalidate: 86400, // 24 hrs in sec
      },
    };

    const url = 'https://restapi.nftscan.com/api/v2/collections/filters';
    const headers = {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.NEXT_PUBLIC_NFTSCAN_API_KEY as string,
    };
    const data = JSON.stringify({
      show_collection: 'false',
      sort_direction: 'asc',
      sort_field: 'create_block_number',
      limit: '5',
      name: q,
      name_fuzzy_search: 'true',
    });

    const request = await fetch(url, {
      method: 'POST',
      headers,
      body: data,
    });

    const result = await request.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve' }, { status: 500 });
  }
}
