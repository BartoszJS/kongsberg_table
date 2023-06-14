export default interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  pageCount: number;
  publishedDate: string;
  categories: string;
  imageLinks: { smallThumbnail: string };
}
