"use client";

import React, { useEffect, useState } from "react";
import { OrderItem } from "@/interfaces/OrderItem";

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
      {!orders.length ? (
        <div className="w-full text-center text-gray-500 font-medium">
          No Order.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 w-full">
          {orders.map((order) => {
            return (
              <div key={order.id} className="flex flex-col">
                <div className="text-xl font-medium">Table {order.tableId}</div>
                {order.menus.map((menu) => {
                  return (
                    <div key={menu.id} className="">
                      {menu.quantity}x {menu.name}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
