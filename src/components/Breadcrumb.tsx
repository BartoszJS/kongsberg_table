import React from "react";
import BookShort from "../types/BookShort";

interface BreadcrumbProps {
  breadcrumb: (string | BookShort)[];
  onBreadcrumbClick: (index: number) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumb,
  onBreadcrumbClick,
}) => {
  return (
    <div className='flex justify-center items-center text-blue-100 '>
      {breadcrumb.map((item, index) => (
        <button key={index} onClick={() => onBreadcrumbClick(index)}>
          {typeof item === "string" ? (
            <span className='border-b border-blue-100'>{item}</span>
          ) : (
            <span className='border-b border-blue-100'>{item.title}</span>
          )}
          {<span>{">"}</span>}
        </button>
      ))}
    </div>
  );
};

export default Breadcrumb;
