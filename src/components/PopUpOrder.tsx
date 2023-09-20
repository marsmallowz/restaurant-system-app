"use client";
import React, { useEffect } from "react";

export default function PopUpOrder({
  message,
  visible,
  setVisible,
}: {
  message: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        clearTimeout(timer);
      }, 3000);
    }
  }, [visible, setVisible]);

  return (
    <div
      className={`${
        visible ? "visible" : "invisible"
      } mt-1 font-medium text-gray-500`}
    >
      {message}
    </div>
  );
}
