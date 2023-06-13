import React from "react";
import { motion } from "framer-motion";
import BookShort from "../types/BookShort";
import AuthorsBooks from "./AuthorsBooks";

interface BookProps {
  book: BookShort;
  onSelect: () => void;
  isSelected: boolean;
}

const Book: React.FC<BookProps> = ({ book, onSelect, isSelected }) => {
  const rowStyle = isSelected ? { backgroundColor: "yellow" } : {};

  return (
    <motion.div layout style={rowStyle}>
      <motion.tr
        className='cursor-pointer grid grid-cols-4'
        layout
        onClick={onSelect}
      >
        <motion.td layout>{book.id}</motion.td>
        <motion.td layout>{book.title}</motion.td>
        <motion.td layout>{book.author}</motion.td>
        <motion.td layout>{book.kind}</motion.td>
      </motion.tr>
      {isSelected && (
        <motion.div className='overflow-hidden'>
          <motion.tr layout className='flex flex-col'>
            <motion.td colSpan={4} layout>
              {!book.description ? "No description" : book.description}
            </motion.td>
            <motion.td colSpan={4} layout>
              <AuthorsBooks author={book.author} />
            </motion.td>
          </motion.tr>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Book;
