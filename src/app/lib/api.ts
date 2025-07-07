export async function getDateDiff(outer: string, inner: string): Promise<string[]> {
    const params = new URLSearchParams({
      outer,
      inner,
    });
    const res = await fetch(`/api/date-diff?${params.toString()}`);
    const data = await res.json();
    return data.data || [];
  }
  