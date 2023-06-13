import React, { useEffect, useState } from "react";
import axios from "axios";
import BookType from "../types/BookType";
import BookShort from "../types/BookShort";
import Book from "./Book";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<BookShort[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=polishsupervisora&key=AIzaSyAMBoDWms1ft0BHXZqkWlSfPwzKYyz4ks8"
        );

        const formattedBooks: BookShort[] = response.data.items.map(
          (item: BookType) => {
            const {
              id,
              kind,
              volumeInfo: {
                title,
                authors,
                description,
                pageCount,
                publishedDate,
              },
            } = item;

            const author = authors ? authors.join(", ") : "Unknown";

            return {
              id,
              title,
              author,
              kind,
              description,
              pageCount,
              publishedDate,
            };
          }
        );

        setBooks(formattedBooks);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lista książek</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => (
            <Book key={index} book={book} />
          ))}
        </ul>
      ) : (
        <p>Loading books...</p>
      )}
    </div>
  );
};

export default BookList;
