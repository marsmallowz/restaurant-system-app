"use client";

import React, { useEffect, useState } from "react";

interface MenuItem {
  id: string;
  name: string;
}

interface OrderItem {
  id: string;
  tableId: number;
  isCompleted: boolean;
  menus: { menu: MenuItem; quantity: number }[];
}

export default function Kitchen() {
  const [orders, setOrder] = useState<OrderItem[]>([]);

  useEffect(() => {
    let getOrder = localStorage.getItem("orders") || undefined;
    // ORDER
    if (getOrder) {
      const parsedMenu = JSON.parse(getOrder);
      setOrder(parsedMenu);
    } else {
      const jsonData = JSON.stringify([]);
      localStorage.setItem("orders", jsonData);
      setOrder([]);
    }
  }, []);

  return (
    <div className="flex">
      <div className="grid grid-cols-2 gap-2 w-full">
        {orders.map((order) => {
          return (
            <div key={order.id} className="flex flex-col">
              <div className="text-xl font-medium">Table {order.tableId}</div>
              {order.menus.map((menu) => {
                return (
                  <div key={menu.menu.id} className="">
                    {menu.quantity}x {menu.menu.name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
