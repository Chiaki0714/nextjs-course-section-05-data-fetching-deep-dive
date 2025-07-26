import NewsList from '@/components/news-list';
import {
  getAvailableNewsYears,
  getAvailableNewsMonths,
  getNewsForYear,
  getAllNews,
  getNewsForYearAndMonth,
} from '@/lib/news';
import Link from 'next/link';

export default function FilterdNewsPage({ params }) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let news = getAllNews();
  let links = getAvailableNewsYears();
  let newsContent = <p>No news found for the selected period.</p>;

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }
  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  if (
    (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
  ) {
    throw new Error('Invalid filter');
  }

  return (
    <>
      <header id='archive-header'>
        <nav>
          <ul>
            {links.map(link => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link.id}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
