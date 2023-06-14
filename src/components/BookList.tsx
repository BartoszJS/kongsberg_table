import React, { useEffect, useState } from "react";

import { fetchBooks } from "../api/api";
import BookShort from "../types/BookShort";
import Book from "./Book";
import Breadcrumb from "./Breadcrumb";
import Loader from "./Loader";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<BookShort[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookShort | null>(null);
  const [searchTerm, setSearchTerm] = useState("habits");
  const [searchInput, setSearchInput] = useState("habits");
  const [breadcrumb, setBreadcrumb] = useState<(string | BookShort)[]>([
    searchInput,
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (searchTerm !== "") {
        const formattedBooks = await fetchBooks(searchTerm);
        setBooks(formattedBooks);
      }

      setIsLoading(false);
    };

    fetchData();
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
    setBreadcrumb((prevBreadcrumb) => prevBreadcrumb.slice(0, index + 1));
    if (index === 0) {
      setSelectedBook(null);
    }
  };

  return (
    <div className='text-white max-w-7xl mx-auto mt-10 mb-10'>
      <h1 className='text-3xl font-semibold text-center'>BOOK LIST</h1>
      <div className='flex flex-col justify-between lg:flex-row'>
        <Breadcrumb
          breadcrumb={breadcrumb}
          onBreadcrumbClick={handleBreadcrumbClick}
        />
        <form className='flex justify-end m-2' onSubmit={handleSearch}>
          <input
            type='text'
            className='text-black h-8 rounded-l-md pl-1'
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder='Search...'
          />
          <button
            className='bg-[#00000033] pl-4 pr-4 rounded-r-md hover:bg-[#00000066]'
            type='submit'
          >
            Search
          </button>
        </form>
      </div>

      {isLoading ? (
        <Loader height={200} width={200} />
      ) : (
        <table>
          {books.length > 0 && (
            <thead>
              <tr className='hidden md:grid grid-cols-4 gap-4 text-left my-2 text-lg'>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
              </tr>
            </thead>
          )}
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <Book
                  key={index}
                  book={book}
                  onSelect={() => handleBookSelect(book)}
                  isSelected={selectedBook?.id === book.id}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4}>No books found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;
