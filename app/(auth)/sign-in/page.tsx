"use client";

import AuthForm from "@/components/forms/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth.action";
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
        onSubmit={signInWithCredentials}
      />
    </div>
  );
};

export default SignIn;
