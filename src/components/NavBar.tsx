"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ResetButton from "./ResetButton";

export default function NavBar() {
  const pathname = usePathname();
  const listNavLinks = [
    { name: "Menu", href: "/" },
    { name: "Order", href: "/order" },
    { name: "Kitchen", href: "/kitchen" },
    { name: "Cashier", href: "/cashier" },
  ];
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-3xl">System Restaurant</div>
        <div className="text-gray-500 text-sm">
          Test Code Challenge #Alsandy Maulana
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 flex-wrap-reverse">
        <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-md text-sm">
          {listNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                href={link.href}
                key={link.name}
                className={`${
                  isActive ? "bg-white shadow-sm" : ""
                } py-1.5 px-6 rounded-md`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        <ResetButton />
      </div>
    </>
  );
}
