import React from "react";

export default function Loading() {
  return (
    <div className=" bg-black/40 z-10 h-screen fixed w-full flex items-center justify-center top-0 left-0">
      <div>
        <div className="loading"></div>
      </div>
    </div>
  );
}
