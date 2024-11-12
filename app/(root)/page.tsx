"use client";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { signOut } from "next-auth/react";

const Home = () => {
  return (
    <>
      <div className="font-sans min-h-screen flex items-center justify-center">
        <Button
          onClick={() => {
            signOut({
              redirectTo: ROUTES.SIGN_IN,
            });
          }}
        >
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;
