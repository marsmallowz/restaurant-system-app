import React from "react";

import { generateCustomId } from "@/utils/customIdGenerator";
import { GrPowerCycle } from "react-icons/gr";

export default function ResetButton() {
  return (
    <button
      onClick={() => {
        const dataObj = [
          { id: generateCustomId(), name: "Ayam Bakar Rica-rica" },
          { id: generateCustomId(), name: "Ayam Bakar Taliwang" },
          { id: generateCustomId(), name: "Ayam Bakar Madu" },
        ];
        const jsonData = JSON.stringify(dataObj);
        localStorage.setItem("menus", jsonData);
        localStorage.setItem("orders", "[]");
        window.location.reload();
      }}
      className="flex gap-1.5 items-center py-2 px-6 rounded-md border bg-white"
    >
      <GrPowerCycle />
      <div className="text-sm">Reset</div>
    </button>
  );
}
