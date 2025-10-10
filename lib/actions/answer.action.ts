"use server";

import Answer, { IAnswerDoc } from "@/database/answer.model";
import { AnswerServerSchema } from "../validations";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { startSession } from "mongoose";
import { Question } from "@/database";
import { revalidatePath } from "next/cache";
import routes from "@/constants/routes";

export async function createAnswer(
  params: CreateAnswerParams
): Promise<ActionResponse<IAnswerDoc>> {
  console.log("🚀 ~ createAnswer ~ params:", params);
  const validationResult = await action({
    params,
    schema: AnswerServerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { content, questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  const session = await startSession();
  session.startTransaction();
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error("Question not found");
    }
    const [newAnswer] = await Answer.create(
      [
        {
          author: userId,
          question: questionId,
          content,
        },
      ],
      { session }
    );
    if (!newAnswer) {
      throw new Error("Failed to create Answer");
    }
    question.answers = question.answers + 1;
    await question.save({ session });

    await session.commitTransaction();

    revalidatePath(routes.QUESTIONS(questionId));
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newAnswer)),
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}
