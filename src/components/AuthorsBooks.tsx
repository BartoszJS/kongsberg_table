import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(
            author
          )}&maxResults=5&orderBy=newest&key=AIzaSyAMBoDWms1ft0BHXZqkWlSfPwzKYyz4ks8`
        );

        const formattedBooks: BookShort[] = response.data.items.reduce(
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [author]);

  return (
    <div>
      <h2>Author: {author}</h2>
      <h3>Books written by {author}:</h3>
      {authorBooks.length > 0 ? (
        <ul>
          {authorBooks.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <p>No books</p>
      )}
    </div>
  );
};

export default AuthorsBooks;
