import { getDateDiff } from '../use-cases/getDateDiff';

export async function dateDiffController(outer: string, inner: string) {
  if (!outer || !inner) throw new Error('Missing daterange parameters');
  return await getDateDiff(outer, inner);
}
