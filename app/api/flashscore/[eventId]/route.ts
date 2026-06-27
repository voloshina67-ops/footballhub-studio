export async function GET(
  request: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;

  const response = await fetch(
    `https://35.ds.lsapp.eu/pq_graphql?_hash=dlie2&eventId=${eventId}&projectId=35`,
    {
      headers: {
        Origin: 'https://www.flashscore.ua',
        Referer: 'https://www.flashscore.ua/'
      }
    }
  );

  const data = await response.json();

  return Response.json(data);
}
