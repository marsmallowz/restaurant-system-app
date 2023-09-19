"use client";

import React from "react";

interface BoxTableProps {
  id: number;
  name: string;
  selected: boolean;
  totalTables: number;
  onClick: (id: number) => void;
}

export default function BoxTable(props: BoxTableProps) {
  const selectedBox = props.selected
    ? "text-white bg-gray-400 hover:bg-gray-400"
    : "hover:bg-gray-200";

  return (
    <button
      onClick={() => {
        props.onClick(props.id);
      }}
      className={`${selectedBox} first-line:px-10 py-5 cursor-pointer`}
    >
      {props.name}
    </button>
  );
}
