import { Suspense } from 'react';
import Link from 'next/link';

import NewsList from '@/components/news-list';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';

async function FilterHeader({ year, month }) {
  const availableYears = await getAvailableNewsYears();

  let links;
  if (year && month) {
    links = [];
  } else if (year) {
    links = getAvailableNewsMonths(year);
  } else {
    links = availableYears;
  }

  if (
    (year && !availableYears.includes(year)) ||
    (month && !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error('Invalid filter.');
  }

  return (
    <header id='archive-header'>
      <nav>
        <ul>
          {links.map(link => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;

            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({ year, month }) {
  let news = [];
  if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  } else if (year) {
    news = await getNewsForYear(year);
  }

  return news?.length > 0 ? (
    <NewsList news={news} />
  ) : (
    <p>No news found for the selected period.</p>
  );
}

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  return (
    <>
      {/* <Suspense fallback={<p>Loading filter...</p>}>
      </Suspense> */}
      <Suspense fallback={<p>Loading news...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
