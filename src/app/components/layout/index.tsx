import { ReactNode } from "react";
import Header from "../header";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/";

  return (
    <>
      {!isLoginPage && <Header />}
      <main>{children}</main>
    </>
  );
}
