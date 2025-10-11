import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

export const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." })
      .max(30, { message: "Username cannot exceed 30 characters." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores.",
      }),

    name: z
      .string()
      .min(1, { message: "Name is required." })
      .max(50, { message: "Name cannot exceed 50 characters." })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Name can only contain letters and spaces.",
      }),

    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Please provide a valid email address." }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(100, { message: "Password cannot exceed 100 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The password did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(6, { message: "Title is required." })
    .max(100, { message: "Title cannot exceed 100 characters." }),
  content: z.string().min(1, { message: "Body is required." }),
  tags: z
    .array(
      z
        .string()
        .min(1, "Tag is required.")
        .max(15, "Tag cannot exceed 15 characters.")
    )
    .min(1, { message: "Please add at least one tag." })
    .max(5, { message: "You can add up to 5 tags." }),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, { message: "Question ID is required." }),
});

export const UserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name cannot exceed 50 characters."),
  username: z
    .string()
    .min(3, "Username is required.")
    .max(30, "Username cannot exceed 30 characters."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please provide a valid email address."),
  bio: z.string().optional(),
  image: z.string().url({ message: "Please provide a valid URL." }).optional(),
  location: z.string().optional(),
  portfolio: z.string().url().optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name cannot exceed 50 characters."),
  userId: z
    .string()
    .min(1, "User ID is required.")
    .refine((value) => value.match(/^[0-9a-fA-F]{24}$/), {
      message: "Please provide a valid user ID.",
    }),
  image: z.string().url({ message: "Please provide a valid URL." }).optional(),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please provide a valid email address."),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .optional(),
  provider: z
    .string()
    .min(1, "Provider is required.")
    .refine((value) => ["github", "google"].includes(value), {
      message: "Please provide a valid provider.",
    }),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." }),
});

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z.string().min(1, "Provider Account ID is required."),
  user: z.object({
    name: z.string().min(1, "Name is required."),
    username: z.string().min(3, "Username must be at least 3 characters long."),
    email: z
      .string()
      .email({ message: "Please provide a valid email address." }),
    image: z
      .string()
      .url({ message: "Please provide a valid image URL." })
      .optional(),
  }),
});

export const GetQuestionSchema = z.object({
  questionId: z.string().min(1, { message: "Question ID is required." }),
});

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, { message: "Tag ID is required." }),
});

export const IncrementViewsSchema = z.object({
  questionId: z.string().min(1, { message: "Question ID is required." }),
});

export const AnswerSchema = z.object({
  content: z
    .string()
    .min(100, { message: "Answer must be at least 100 characters long." }),
});

export const AnswerServerSchema = AnswerSchema.extend({
  questionId: z.string().min(1, { message: "Question ID is required." }),
});

export const GetAnswersSchema = PaginatedSearchParamsSchema.extend({
  questionId: z.string().min(1, { message: "Question ID is required." }),
});
