import React from "react";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Search from "../components/Search";
import { useRouter } from "next/router";

function Header({ change }) {
  const router = useRouter();
  const handleClick = () => {
    if (router.pathname == "/") {
      router.reload();
    } else {
      router.push("/");
    }
  };
  return (
    <div>
      <header className="sticky top-0 z-50 flex justify-between items-center bg-white shadow-md p-4 md:px-10">
        <div
          onClick={handleClick}
          className="relative flex items-center w-36 h-5 cursor-pointer"
        >
          <Image
            src="/logo.png"
            width={130}
            height={40}
            style={{
              objectPosition: "left",
              objectFit: "contain",
            }}
            priority={true}
            alt="image-logo"
          />
        </div>
        <div className="w-1/3">
          <Search handleQueryChange={change} />
        </div>
        <div className="flex items-center space-x-4 justify-end text-gray-500">
          <div
            onClick={() => alert("Just a Dummy One!!")}
            className="flex items-center space-x-2 border-2 p-2 rounded-full border-teal-500 cursor-pointer"
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
