import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 p-5 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
