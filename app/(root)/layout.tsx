import { ReactNode } from "react";

import Navbar from "../../components/navigation/navbar";
import LeftSideBar from "../../components/navigation/LeftSideBar";
import RightSidebar from "../../components/navigation/RightSidebar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="background-light850_dark100">
      <Navbar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex flex-col min-h-screen pt-36 flex-1 px-6 pb-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default RootLayout;
