import NewsList from '@/components/news-list';

export default async function NewsPage() {
  const response = await fetch('http://localhost:8080/news', {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Fail to fetch news');
  }

  const data = await response.json();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={data} />
    </>
  );
}
