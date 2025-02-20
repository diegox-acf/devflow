"use client";

import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";
import React from "react";

const SignUp = () => {
  return (
    <div>
      <AuthForm
        formType="signup"
        schema={SignUpSchema}
        defaultValues={{
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          username: "",
        }}
        onSubmit={signUpWithCredentials}
      />
    </div>
  );
};

export default SignUp;
