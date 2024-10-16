import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <div className="text-white text-xl font-bold">
          <Link href="/">CraftsByAash</Link>
        </div>

        <ul className="hidden md:flex md:space-x-8 text-white uppercase text-sm font-semibold">
          <li>
            <Link href="/shop">SHOP</Link>
          </li>
          <li>
            <Link href="/about">ABOUT US</Link>
          </li>
          <li>
            <Link href="/contact">CONTACT</Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4 text-white">
          <MenuIcon />
          <SearchIcon />
          <div className="border-r border-white h-6"></div>
          <Link href="/cart">
            <ShoppingCartIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
