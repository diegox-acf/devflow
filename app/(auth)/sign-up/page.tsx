"use client";

import AuthForm from "@/components/forms/AuthForm";
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

export default SignUp;
