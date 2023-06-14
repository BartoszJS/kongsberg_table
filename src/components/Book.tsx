import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import defaultBook from "../assets/default-river.png";
import BookShort from "../types/BookShort";
import AuthorsBooks from "./AuthorsBooks";

interface BookProps {
  book: BookShort;
  onSelect: () => void;
  isSelected: boolean;
}

const Book: React.FC<BookProps> = ({ book, onSelect, isSelected }) => {
  const [showAuthorsBooks, setShowAuthorsBooks] = useState(false);

  const rowStyle = isSelected ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : {};

  const handleToggleAuthorsBooks = () => {
    setShowAuthorsBooks(!showAuthorsBooks);
  };

  useEffect(() => {
    setShowAuthorsBooks(false);
  }, [isSelected]);

  return (
    <>
      <motion.tr
        className='cursor-pointer grid grid-cols-2 md:grid-cols-4 border-t pt-2 pb-2 '
        style={rowStyle}
        onClick={onSelect}
      >
        <td className='flex justify-center items-center'>
          {book.imageLinks.smallThumbnail ? (
            <img
              src={book.imageLinks.smallThumbnail}
              alt={book.title}
              width='100'
              height='150'
            />
          ) : (
            <img src={defaultBook} alt={book.title} width='100' height='150' />
          )}
        </td>
        <td className='hidden md:flex justify-start items-center'>
          {book.title}
        </td>
        <td className='hidden md:flex justify-start items-center'>
          {book.author}
        </td>
        <td className='hidden md:flex justify-start items-center'>
          {book.categories ? book.categories : "Unknown category"}
        </td>
        <td className='flex md:hidden flex-col justify-center items-start'>
          <div>Title: {book.title}</div>
          <div>Author: {book.author}</div>
          <div>
            Category: {book.categories ? book.categories : "Unknown category"}
          </div>
        </td>
      </motion.tr>
      <AnimatePresence>
        {isSelected && (
          <motion.tr
            key='description'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className='flex flex-col bg-[#00000033] overflow-hidden'
          >
            <td colSpan={4} className='md:mx-10 mx-2 my-2 text-justify'>
              <p>Description:</p>
              {!book.description
                ? "No description"
                : book.description.length > 500
                ? `${book.description.slice(0, 500)}...`
                : book.description}
            </td>
            <div className='flex justify-between'>
              <td className='md:mx-10 mx-2 my-2 w-full flex justify-center'>
                {book.pageCount ? book.pageCount : "Unknown number of "} pages
              </td>
              <td className='md:mx-10 mx-2 my-2 w-full flex justify-center'>
                Published date {book.publishedDate}
              </td>
            </div>

            <td colSpan={4} className='mx-auto'>
              <button
                className='md:mx-10 mx-2 p-2 mb-8 bg-[#00000033] pl-4 pr-4 rounded hover:bg-[#00000066]'
                onClick={handleToggleAuthorsBooks}
              >
                {showAuthorsBooks
                  ? `Hide ${book.author} books`
                  : `Show ${book.author} books`}
              </button>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
      {isSelected && showAuthorsBooks && (
        <motion.tr
          key='authorsBooks'
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className='flex flex-col bg-[#00000033] overflow-hidden mx-auto'
        >
          <td colSpan={4} className='mx-auto '>
            <AuthorsBooks author={book.author} />
          </td>
        </motion.tr>
      )}
    </>
  );
};

export default Book;
