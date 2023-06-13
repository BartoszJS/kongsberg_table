import React, { useEffect, useState } from "react";
import axios from "axios";
import BookType from "../types/BookType";
import BookShort from "../types/BookShort";
import Book from "./Book";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<BookShort[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookShort | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=react&key=AIzaSyAMBoDWms1ft0BHXZqkWlSfPwzKYyz4ks8"
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
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBookSelect = (book: BookShort) => {
    setSelectedBook((prevSelectedBook) => {
      if (prevSelectedBook && prevSelectedBook.id === book.id) {
        return null;
      }
      return book;
    });
  };

  return (
    <div>
      <h1>Lista książek</h1>
      {books.length > 0 ? (
        <table>
          <thead>
            <tr className='grid grid-cols-4'>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Kind</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <Book
                key={index}
                book={book}
                onSelect={() => handleBookSelect(book)}
                isSelected={selectedBook?.id === book.id}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading books...</p>
      )}
    </div>
  );
};

export default BookList;
