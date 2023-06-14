import React, { useState } from "react";
import { motion } from "framer-motion";
import BookShort from "../types/BookShort";
import AuthorsBooks from "./AuthorsBooks";

interface BookProps {
  book: BookShort;
  onSelect: () => void;
  isSelected: boolean;
}

const Book: React.FC<BookProps> = ({ book, onSelect, isSelected }) => {
  const [showAuthorsBooks, setShowAuthorsBooks] = useState(false);

  const rowStyle = isSelected ? { backgroundColor: "yellow" } : {};

  const handleToggleAuthorsBooks = () => {
    setShowAuthorsBooks(!showAuthorsBooks);
  };

  return (
    <div style={rowStyle}>
      <tr className='cursor-pointer grid grid-cols-4' onClick={onSelect}>
        <td>{book.id}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.kind}</td>
      </tr>
      {isSelected && (
        <div className='overflow-hidden'>
          <tr className='flex flex-col'>
            <td colSpan={4}>
              {!book.description ? "No description" : book.description}
            </td>
            <td colSpan={4}>
              <button onClick={handleToggleAuthorsBooks}>Show Books</button>
            </td>
          </tr>
        </div>
      )}
      {isSelected && showAuthorsBooks && (
        <div className='overflow-hidden'>
          <tr className='flex flex-col'>
            <td colSpan={4}>
              <AuthorsBooks author={book.author} />
            </td>
          </tr>
        </div>
      )}
    </div>
  );
};

export default Book;
