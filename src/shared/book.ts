import { Book } from '../types';

type DetailRow = {
  title: string,
  value: string | number,
}

export function getSearchDescription(book: Book): string {
  let res = book.searchInfo?.textSnippet;
  if (!res) {
    res = book.volumeInfo.description;
  }
  return res;
}

export function getTitle(book: Book): string {
  let { title } = book.volumeInfo;
  const { subtitle } = book.volumeInfo;
  if (subtitle) {
    title += `: ${subtitle}`;
  }
  return title;
}

export function getDetails(book: Book): DetailRow[] {
  let identifiers = (book.volumeInfo.industryIdentifiers || [])
    .filter((item) => item.type.startsWith('ISBN'));
  const hasIsbn = identifiers.length !== 0;
  if (!hasIsbn) {
    identifiers = (book.volumeInfo.industryIdentifiers || []);
  }
  const rows = [
    {
      title: 'Authors',
      value: (book.volumeInfo.authors || []).join(', '),
    },
    {
      title: 'Publisher',
      value: book.volumeInfo.publisher,
    },
    {
      title: 'Publication date',
      value: book.volumeInfo.publishedDate,
    },
    {
      title: 'Number of pages',
      value: book.volumeInfo.pageCount,
    },
  ];
  if (identifiers.length !== 0) {
    rows.push({
      title: hasIsbn ? 'ISBN' : 'Identifiers',
      value: identifiers.map(({ identifier }) => identifier).join(', '),
    });
  }
  return rows;
}
