"use client";

import React, { useEffect, useState } from "react";
import PopUpOrder from "@/components/PopUpOrder";
import { OrderItem } from "@/interfaces/OrderItem";

export default function Cashier() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem>();
  const [selectedTableId, setSelectedTableId] = useState<number>(0);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const handleClearTable = () => {
    const newOrders = orders.filter(
      (order) => order.tableId !== selectedTableId
    );
    const jsonData = JSON.stringify(newOrders);
    localStorage.setItem("orders", jsonData);
    setOrders(newOrders);
    setSelectedTableId(0);
    setSelectedOrder(undefined);
    setShowPopUp(true);
  };

  useEffect(() => {
    let getOrder = localStorage.getItem("orders") || undefined;
    // ORDER
    if (getOrder) {
      const parsedMenu = JSON.parse(getOrder);
      setOrders(parsedMenu);
    } else {
      const jsonData = JSON.stringify([]);
      localStorage.setItem("orders", jsonData);
      setOrders([]);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="font-medium">Table</div>
      <div className="flex justify-between">
        <div className="flex w-7/12 gap-2">
          <select
            onChange={(e) => {
              setSelectedTableId(parseInt(e.target.value));
            }}
            className="w-7/12 bg-white py-2 px-3 rounded-md"
          >
            <option key="" value="0">
              Select Table
            </option>
            {orders
              .sort((a, b) => a.tableId - b.tableId)
              .map((order) => {
                return (
                  <option key={order.id} value={order.tableId}>
                    Table {order.tableId}
                  </option>
                );
              })}
          </select>
          <button
            onClick={() => {
              if (selectedTableId) {
                const getOrder = orders.find(
                  (order) => order.tableId === selectedTableId
                );
                setSelectedOrder(getOrder);
              } else {
                setSelectedOrder(undefined);
              }
            }}
            className="w-4/12 p-2 bg-gray-500 text-white rounded-md text-sm"
          >
            Print Struck
          </button>
        </div>
        <button
          onClick={handleClearTable}
          className={`${
            selectedTableId ? "visible" : "invisible"
          } w-3/12 bg-red-500 p-2 text-white rounded-md`}
        >
          Clear Table
        </button>
      </div>
      {selectedOrder && (
        <>
          <table className="table-fixed text-left ">
            <thead className="border-b">
              <tr className="text-gray-400">
                <th className="h-12 font-medium">Menu</th>
                <th className="h-12 font-medium text-right">Quantity</th>
                <th className="h-12 font-medium text-center">Price</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {selectedOrder &&
                selectedOrder.menus.map((menu) => {
                  return (
                    <tr key={menu.id} className="border-b">
                      <td className="h-12">{menu.name}</td>
                      <td className="text-right">{menu.quantity}</td>
                      <td className="text-center">Free</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="text-center text-sm text-gray-500 font-medium">
            Terima kasih sudah makan di{" "}
            <span className="text-gray-600 font-bold">Restoran</span>
          </div>
        </>
      )}
      <PopUpOrder
        visible={showPopUp}
        setVisible={setShowPopUp}
        message="Table successfully clear."
      />
    </div>
  );
}
