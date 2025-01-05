"use client";

import AuthForm from "@/components/forms/AuthForm";
import { SignInSchema, SignUpSchema } from "@/lib/validations";
import React from "react";

const SignIn = () => {
  return (
    <div>
      <AuthForm
        formType="signin"
        schema={SignInSchema}
        defaultValues={{
          email: "",
          password: "",
        }}
        onSubmit={(data) =>
          Promise.resolve({
            success: true,
            data,
          })
        }
      />
    </div>
  );
};

export default SignIn;
