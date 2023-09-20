"use client";

import BoxTable from "@/components/BoxTable";
import React, { useEffect, useState } from "react";
import { generateCustomId } from "../utils/customIdGenerator";
import PopUpOrder from "@/components/PopUpOrder";

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

export default function Order() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [orders, setOrder] = useState<OrderItem[]>([]);

  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const [selectedTable, setSelectedTable] = useState<number>(0);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem>();
  const [quantity, setQuantity] = useState<number>(1);

  const handleBoxClick = (id: number) => {
    setSelectedTable(id);
  };

  interface BoxData {
    id: number;
    name: string;
  }

  const listTable: BoxData[] = [
    { id: 1, name: "Table 1" },
    { id: 2, name: "Table 2" },
    { id: 3, name: "Table 3" },
    { id: 4, name: "Table 4" },
    { id: 5, name: "Table 5" },
    { id: 6, name: "Table 6" },
    { id: 7, name: "Table 7" },
    { id: 8, name: "Table 8" },
    { id: 9, name: "Table 9" },
  ];

  const handleAddOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedTable) {
      const currentOrder = orders.find(
        (order) =>
          order.tableId === selectedTable && order.isCompleted === false
      );
      // Jika ada order dengan meja yang sama tetapi belum complete
      if (currentOrder) {
        const currentMenu = currentOrder.menus.find(
          (menu) => menu.menu.id === selectedMenu?.id
        );
        // jika menu yang mau ditambahkan sudah ada di order.
        if (currentMenu) {
          const totalQuantity = quantity + currentMenu.quantity;
          const newOrders = orders.map((order) => {
            if (order.id === currentOrder.id) {
              const newMenus = order.menus.map((menu) => {
                if (menu.menu.id === currentMenu.menu.id) {
                  return { ...menu, quantity: totalQuantity };
                }
                return menu;
              });
              return {
                ...order,
                menus: newMenus,
              };
            }
            return order;
          });

          const jsonData = JSON.stringify(newOrders);
          localStorage.setItem("orders", jsonData);
          setOrder(newOrders);
        }
        // Jika menu tidak ada
        else {
          const newOrders = orders.map((order) => {
            if (order.id === currentOrder.id) {
              return {
                ...order,
                menus: [{ menu: selectedMenu!, quantity }, ...order.menus],
              };
            }
            return order;
          });

          const jsonData = JSON.stringify(newOrders);
          localStorage.setItem("orders", jsonData);
          setOrder(newOrders);
        }
      }
      // jika order tidak ada
      else {
        const generateId = generateCustomId();
        const newOrders = [
          ...orders,
          {
            id: generateId,
            tableId: selectedTable,
            menus: [{ menu: selectedMenu!, quantity }],
            isCompleted: false,
          },
        ];
        const jsonData = JSON.stringify(newOrders);
        localStorage.setItem("orders", jsonData);
        setOrder(newOrders);
      }
      setShowPopUp(true);
    }
  };

  useEffect(() => {
    let getMenu = localStorage.getItem("menus") || undefined;
    let getOrder = localStorage.getItem("orders") || undefined;

    // MENU
    if (getMenu) {
      const parsedMenu = JSON.parse(getMenu);
      setMenus(parsedMenu);
    } else {
      const dataObj = [
        { id: generateCustomId(), name: "Ayam Bakar Rica-rica" },
        { id: generateCustomId(), name: "Ayam Bakar Taliwang" },
        { id: generateCustomId(), name: "Ayam Bakar Madu" },
      ];
      const jsonData = JSON.stringify(dataObj);
      localStorage.setItem("menus", jsonData);
      setMenus(dataObj);
    }

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
    <div className="flex flex-col gap-1">
      {/* <button className="w-3/12 mb-4 text-white py-1.5 px-4 bg-gray-400 hover:bg-gray-500 rounded-md">
        Add Table
      </button> */}
      {selectedTable ? (
        <div className="text-gray-500">*Please select a table.</div>
      ) : (
        <div className="text-red-500">*Please select a table.</div>
      )}
      <div className="grid grid-cols-3 rounded-md bg-white border-2 overflow-hidden ">
        {listTable.map((box) => (
          <BoxTable
            key={box.id}
            id={box.id}
            name={box.name}
            selected={selectedTable === box.id}
            totalTables={listTable.length}
            onClick={handleBoxClick}
          />
        ))}
      </div>
      <form onSubmit={handleAddOrder} className="flex flex-col gap-3">
        <div className="grid grid-cols-3 grid-rows-2 gap-x-5 items-center">
          <div className="col-span-2">Menu</div>
          <div className="col-span-1">Quantiy</div>
          <select
            required
            onChange={(e) => {
              if (e.target.value) {
                setSelectedMenu({
                  id: e.target.value,
                  name: menus.find((menu) => menu.id === e.target.value)!.name,
                });
              }
            }}
            className="col-span-2 px-1 py-2 bg-white rounded-md"
          >
            <option key={""} value={""}>
              Select menu
            </option>
            {menus.map((menu) => {
              return (
                <option key={menu.id} value={menu.id} content="">
                  {menu.name}
                </option>
              );
            })}
          </select>
          <input
            id="quantity"
            type="number"
            required
            min={1}
            defaultValue={1}
            onChange={(e) => {
              setQuantity(parseInt(e.target.value));
            }}
            className="col-span-1 text-right px-2 py-2 bg-white rounded-md"
          />
        </div>
        <button
          type="submit"
          className="p-5 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
        >
          Submit
        </button>
      </form>
      <PopUpOrder
        visible={showPopUp}
        setVisible={setShowPopUp}
        message="Menu successfully added to order."
      />
    </div>
  );
}
