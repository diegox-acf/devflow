"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import routes from "@/constants/routes";
import { toPascalCase } from "@/lib/utils";
import Link from "next/link";
import { ActionResponse } from "@/types/global";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "signin" | "signup";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;
    if (result?.success) {
      toast({
        title: "Success",
        description:
          formType === "signin"
            ? "Signed in successfully"
            : "Signed up successfully",
      });
      router.push(routes.HOME);
    } else {
      toast({
        title: `Error ${result.status}`,
        description: result?.error?.message,
        variant: "destructive",
      });
    }
  };

  const buttonText = formType === "signin" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {toPascalCase(field.name)}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={
                      field.name.toLocaleLowerCase().includes("password")
                        ? "password"
                        : field.name.includes("email")
                          ? "email"
                          : "text"
                    }
                    {...field}
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing In..."
              : "Signing up..."
            : buttonText}
        </Button>
        {formType === "signin" ? (
          <p>
            Don't have an account?{" "}
            <Link
              className="paragraph-semibold primary-text-gradient"
              href={routes.SIGN_UP}
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              className="paragraph-semibold primary-text-gradient"
              href={routes.SIGN_IN}
            >
              Sign in
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
