import { NextRequest } from 'next/server';
import { dateDiffController } from './../../../controllers/dateDiffController'

export async function GET(req: NextRequest) {
  const outer = req.nextUrl.searchParams.get('outer');
  const inner = req.nextUrl.searchParams.get('inner');

  try {
    const ranges = await dateDiffController(outer!, inner!);
    return Response.json({ data: ranges });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}
