import React from "react";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import Search from "../components/Search";

function Header() {
  const router = useRouter();
  return (
    <div>
      <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-4 md:px-10">
        <div
          onClick={() => router.push("/")}
          className="relative flex items-center h-5 cursor-pointer my-auto"
        >
          <Image
            src="/logo.png"
            layout="fill"
            style={{
              objectPosition: "left",
              objectFit: "contain",
              layout: "fill",
            }}
          />
        </div>
        <div>
          <Search />
        </div>
        <div className="flex items-center space-x-4 justify-end text-gray-500">
          <div
            onClick={() => alert("Just a Dummy One!!")}
            className="flex items-center space-x-2 border-2 p-2 rounded-full border-teal-400 cursor-pointer"
          >
            <Bars3Icon className="h-6" />
            <UserIcon className="h-6" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
