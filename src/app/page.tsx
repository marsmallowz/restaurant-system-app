"use client";

import { useEffect, useState } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { generateCustomId } from "./utils/customIdGenerator";
import { MenuItem } from "@/interfaces/MenuItem";
import { Mode } from "@/types/Mode";

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [input, setInput] = useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState<MenuItem>();
  const [modeDelete, setModeDelete] = useState<Mode>("DEFAULT");

  useEffect(() => {
    let getMenu = localStorage.getItem("menus") || undefined;
    if (getMenu) {
      const parsedMenu = JSON.parse(getMenu);
      setMenu(parsedMenu);
    } else {
      const dataObj = [
        { id: generateCustomId(), name: "Ayam Bakar Rica-rica" },
        { id: generateCustomId(), name: "Ayam Bakar Taliwang" },
        { id: generateCustomId(), name: "Ayam Bakar Madu" },
      ];
      const jsonData = JSON.stringify(dataObj);
      localStorage.setItem("menus", jsonData);
      setMenu(dataObj);
    }
  }, []);

  const handleAddMenu = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let generateId: string = generateCustomId();
    const jsonData = JSON.stringify([{ id: generateId, name: input }, ...menu]);
    localStorage.setItem("menus", jsonData);
    setMenu([{ id: generateId, name: input }, ...menu]);
    setInput("");
  };

  const handleUpdateMenu = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedMenu = menu.map((item) => {
      if (item.id === selectedMenu?.id) {
        return { ...item, name: selectedMenu.name };
      }
      return item;
    });
    const jsonData = JSON.stringify(updatedMenu);
    localStorage.setItem("menus", jsonData);
    setMenu(updatedMenu);
    setModeDelete("DEFAULT");
    setSelectedMenu(undefined);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="font-medium">Menu Makanan</div>
        <form
          onSubmit={handleAddMenu}
          className="flex gap-2 flex-wrap sm:flex-nowrap"
        >
          <input
            type="text"
            value={input}
            required={true}
            placeholder="Tambahkan disini..."
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="basis-5/6 rounded-md py-1 pl-3"
          />
          <button
            type="submit"
            className="basis-1/6 text-white py-1.5 px-4 bg-gray-500 hover:bg-gray-400 rounded-md"
          >
            Tambah
          </button>
        </form>
      </div>
      {menu.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          Tidak ada menu yang tersedia.
        </div>
      ) : (
        <table className="table-fixed text-left ">
          <thead className="border-b">
            <tr className="text-gray-400">
              <th className="h-12 font-medium">ID</th>
              <th className="h-12 font-medium">Menu</th>
              <th className="h-12 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {menu.map((item: MenuItem) => {
              return (
                <tr key={item.id} className="border-b">
                  <td className="h-12">{item.id}</td>
                  <td>{item.name}</td>
                  <td className="flex h-12 justify-end items-center text-xl text-gray-600">
                    <div
                      onClick={() => {
                        setSelectedMenu({ id: item.id, name: item.name });
                        setModeDelete("EDIT");
                      }}
                      className="cursor-pointer text-gray-500 hover:text-yellow-400"
                    >
                      <MdModeEdit />
                    </div>
                    <div
                      onClick={() => {
                        setSelectedMenu({ id: item.id, name: item.name });
                        setModeDelete("DELETE");
                      }}
                      className="cursor-pointer text-gray-500 hover:text-red-400"
                    >
                      <MdDelete />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div
        className={`${modeDelete !== "DEFAULT" ? "relative" : "hidden"} z-10`}
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 ">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative overflow-hidden rounded-md bg-white text-left shadow-xl transition-all w-full max-w-lg">
              <div className="bg-white p-6 pb-4">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 ">
                  {modeDelete === "DELETE"
                    ? "Delete Menu"
                    : modeDelete === "EDIT" && "Edit Menu"}
                </h3>
                <div className="mt-2">
                  {modeDelete === "DELETE"
                    ? `Are you sure want to delete Menu ${selectedMenu?.name}?`
                    : modeDelete === "EDIT" && (
                        <div className="flex flex-col mt-1">
                          <div className="text-sm font-medium">Name</div>
                          <form
                            onSubmit={handleUpdateMenu}
                            className="flex gap-2"
                          >
                            <input
                              type="text"
                              placeholder="Update Name"
                              minLength={2}
                              required={true}
                              defaultValue={selectedMenu?.name}
                              onChange={(e) => {
                                if (selectedMenu) {
                                  setSelectedMenu({
                                    id: selectedMenu?.id,
                                    name: e.target.value,
                                  });
                                }
                              }}
                              className="border p-2 w-full"
                            />
                            <button
                              type="submit"
                              className="bg-yellow-500 hover:bg-yellow-600 text-white py-1.5 px-4 rounded-md"
                            >
                              Update
                            </button>
                          </form>
                        </div>
                      )}
                </div>
              </div>
              <div
                className={`flex ${
                  modeDelete === "EDIT" ? "flex-row" : "flex-row-reverse"
                } bg-gray-50 py-3 gap-2 px-6`}
              >
                {modeDelete === "DELETE" && (
                  <button
                    type="button"
                    onClick={() => {
                      const updatedMenu = menu.filter(
                        (item) => item.id !== selectedMenu?.id
                      );
                      const jsonData = JSON.stringify(updatedMenu);
                      localStorage.setItem("menu", jsonData);
                      setMenu(updatedMenu);
                      setModeDelete("DEFAULT");
                      setSelectedMenu(undefined);
                    }}
                    className={`
                      bg-rose-600 hover:bg-rose-500 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:bg-gray-400 sm:ml-3 sm:w-auto`}
                  >
                    DELETE
                  </button>
                )}
                <button
                  onClick={() => {
                    setModeDelete("DEFAULT");
                    setSelectedMenu(undefined);
                  }}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
