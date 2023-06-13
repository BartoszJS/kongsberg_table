import React from "react";
import BookShort from "../types/BookShort";

interface BookProps {
  book: BookShort;
}

const Book: React.FC<BookProps> = ({ book }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-4'>
      <h2 className='text-xl font-semibold mb-2'>{book.title}</h2>
      <p className='text-gray-700 mb-2'>
        <span className='font-semibold'>ID:</span> {book.id}
      </p>
      <p className='text-gray-700 mb-2'>
        <span className='font-semibold'>Author:</span> {book.author}
      </p>
      <p className='text-gray-700 mb-2'>
        <span className='font-semibold'>Kind:</span> {book.kind}
      </p>
      <p className='text-gray-700 mb-2'>
        <span className='font-semibold'>Description:</span> {book.description}
      </p>
      <p className='text-gray-700 mb-2'>
        <span className='font-semibold'>Page Count:</span> {book.pageCount}
      </p>
      <p className='text-gray-700 mb-2'>
        <span className='font-semibold'>Published Date:</span>{" "}
        {book.publishedDate}
      </p>
    </div>
  );
};

export default Book;
