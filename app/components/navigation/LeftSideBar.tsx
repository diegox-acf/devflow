import React from "react";
import NavLinks from "./navbar/NavLinks";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Image from "next/image";
const LeftSideBar = () => {
  return (
    <section
      className="custom-scrollbar background-light900_dark200 border-r light-border h-screen pt-36 p-6 shadow-light-300
     dark:shadow-none sticky left-0 top-0 flex flex-col justify-between overflow-y-auto lg:w-[266px] max-sm:hidden"
    >
      <div className="flex flex-col flex-1 gap-6">
        <NavLinks />
      </div>
      <div className="flex flex-col gap-3">
        <Button
          asChild
          className="small-medium w-full light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] rounded-lg border px-4 py-3 shadow-none text-primary-gradient"
        >
          <Link href={ROUTES.SIGN_IN}>
            <Image
              src="/icons/account.svg"
              alt="account"
              width={20}
              height={20}
              className="invert-colors"
            />
            <span className="primary-text-gradient max-lg:hidden">Log In</span>
          </Link>
        </Button>
        <Button
          asChild
          className="small-medium w-full light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] rounded-lg border px-4 py-3 shadow-none"
        >
          <Link href={ROUTES.SIGN_UP}>
            <Image
              src="/icons/sign-up.svg"
              alt="account"
              width={20}
              height={20}
              className="invert-colors"
            />
            <span className="max-lg:hidden">Sign up</span>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default LeftSideBar;
