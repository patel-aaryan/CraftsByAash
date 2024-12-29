import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/Navbar";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/userContext";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import { authRoutes } from "@/utils/constants";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  const gradient = [...authRoutes, "/not-found", "/contact"].includes(pathname)
    ? "relative bg-gradient-to-b from-[#5EA3EB] to-[#C8E1FF] to-80%"
    : "";
  return (
    <SessionProvider>
      <UserProvider>
        {!authRoutes.includes(pathname) && <NavBar />}
        <div className={gradient}>
          <Box minHeight="80vh" overflow="hidden">
            <Component {...pageProps} />
          </Box>
        </div>

        {!authRoutes.includes(pathname) && <Footer />}
      </UserProvider>
    </SessionProvider>
  );
}
