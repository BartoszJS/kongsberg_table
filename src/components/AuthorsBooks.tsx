import React, { useEffect, useState } from "react";

import { fetchAuthorBooks } from "../api/api";
import Loader from "./Loader";

interface BookShort {
  id: string;
  title: string;
  author: string;
}

interface BookDetailsProps {
  author: string;
}

const AuthorsBooks: React.FC<BookDetailsProps> = ({ author }) => {
  const [authorBooks, setAuthorBooks] = useState<BookShort[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const books = await fetchAuthorBooks(author);

        const formattedBooks: BookShort[] = books.reduce(
          (books: BookShort[], item: any) => {
            const {
              id,
              volumeInfo: { title, authors },
            } = item;

            const bookAuthor = authors ? authors.join(", ") : "Unknown";

            const newBook: BookShort = {
              id,
              title,
              author: bookAuthor,
            };

            const isBookAlreadyAdded = books.some(
              (book) => book.title === newBook.title
            );

            if (!isBookAlreadyAdded) {
              return [...books, newBook];
            }

            return books;
          },
          []
        );

        setAuthorBooks(formattedBooks);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [author]);

  return (
    <div>
      {isLoading ? (
        <Loader height={100} width={100} />
      ) : (
        <>
          {authorBooks.length > 0 ? (
            <ul className='mx-4 mb-8'>
              {authorBooks.map((book) => (
                <li className='m-2' key={book.id}>
                  {book.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className='mb-8'>No books</p>
          )}
        </>
      )}
    </div>
  );
};

export default AuthorsBooks;
