import { query } from '../data-access/db';

type RangeRow = { range: string };

export async function getDateDiff(outer: string, inner: string): Promise<string[]> {
  const sql = 'SELECT * FROM extract_range($1::daterange, $2::daterange)';
  const rows = await query(sql, [outer, inner]) as RangeRow[];
  console.log('DB Result:', rows);
  return rows.map((r) => r.range);
}
