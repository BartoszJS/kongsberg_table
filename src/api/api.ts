import axios from "axios";
import BookType from "../types/BookType";
import BookShort from "../types/BookShort";

export const fetchBooks = async (searchTerm: string) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=10&key=${process.env.REACT_APP_API_KEY}`
    );

    const formattedBooks: BookShort[] = response.data.items
      ? response.data.items.map((item: BookType) => {
          const {
            id,
            volumeInfo: {
              title,
              authors,
              description,
              pageCount,
              publishedDate,
              categories,
              imageLinks = { smallThumbnail: "" },
            },
          } = item;

          const author = authors ? authors.join(", ") : "Unknown";

          return {
            id,
            title,
            author,
            description,
            pageCount,
            publishedDate,
            categories,
            imageLinks: { smallThumbnail: imageLinks.smallThumbnail },
          };
        })
      : [];

    return formattedBooks;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export async function fetchAuthorBooks(author: string): Promise<any> {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(
        author
      )}&maxResults=10&orderBy=newest&key=${process.env.REACT_APP_API_KEY}`
    );

    return response.data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
