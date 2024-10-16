import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/navbar";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/cartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <CartProvider>
        <NavBar />
        <div className="px-4 py-2">
          <Component {...pageProps} />
        </div>
      </CartProvider>
    </SessionProvider>
  );
}
