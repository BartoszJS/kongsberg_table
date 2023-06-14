import React, { useEffect, useState } from "react";
import axios from "axios";
import BookType from "../types/BookType";
import BookShort from "../types/BookShort";
import Book from "./Book";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<BookShort[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookShort | null>(null);
  const [searchTerm, setSearchTerm] = useState("react");
  const [searchInput, setSearchInput] = useState("react");
  const [breadcrumb, setBreadcrumb] = useState<(string | BookShort)[]>([
    searchInput,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyAMBoDWms1ft0BHXZqkWlSfPwzKYyz4ks8`
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

    if (searchTerm !== "") {
      fetchData();
    }
  }, [searchTerm]);

  const handleBookSelect = (book: BookShort) => {
    setSelectedBook((prevSelectedBook) => {
      if (prevSelectedBook && prevSelectedBook.id === book.id) {
        setBreadcrumb([searchInput]);
        return null;
      }
      setBreadcrumb([searchInput, book]);
      return book;
    });
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTerm(searchInput);
    setBreadcrumb([searchInput]);
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) {
      setSelectedBook(null);
    }
  };

  return (
    <div>
      <h1>Lista książek</h1>
      {breadcrumb.length > 0 && (
        <div>
          {breadcrumb.map((item, index) => (
            <button key={index} onClick={() => handleBreadcrumbClick(index)}>
              {typeof item === "string" ? item : item.title}
              {">"}
            </button>
          ))}
        </div>
      )}
      <form onSubmit={handleSearch}>
        <input
          type='text'
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder='Wyszukaj książkę...'
        />
        <button type='submit'>Szukaj</button>
      </form>
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
