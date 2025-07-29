"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SessionProvider } from "next-auth/react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased hiddenScroll`}
      >
        <SessionProvider>
          <Provider store={store}>
            {children}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
