import AllAnswers from "@/components/answers/AllAnswers";
import TagCard from "@/components/cards/TagCard";
import Preview from "@/components/editor/Preview";
import AnswerForm from "@/components/forms/AnswerForm";
import SaveQuestion from "@/components/questions/SaveQuestion";
import Metric from "@/components/Metric";
import UserAvatar from "@/components/UserAvatar";
import Votes from "@/components/votes/Votes";
import routes from "@/constants/routes";
import { getAnswers } from "@/lib/actions/answer.action";
import { hasSavedQuestion } from "@/lib/actions/collection.action";
import { getQuestion, incrementViews } from "@/lib/actions/question.action";
import { hasVoted } from "@/lib/actions/vote.action";
import { formatNumber, getElapsedTime } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { Suspense } from "react";

const QuestionDetails = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;

  const { page, pageSize, filter } = await searchParams;

  after(async () => {
    await incrementViews({ questionId: id });
  });

  const { success, data: question } = await getQuestion({ questionId: id });

  if (!success || !question) {
    return redirect("/404");
  }

  const {
    success: areAnswersLoaded,
    data: answersData,
    error: answersError,
  } = await getAnswers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter,
    questionId: id,
  });

  const hasVotedPromise = hasVoted({
    targetId: question._id,
    targetType: "question",
  });

  const hasSavedQuestionPromise = hasSavedQuestion({
    questionId: question._id,
  });

  const { author, createdAt, answers, views, tags, title, content } = question;

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={author._id}
              name={author.name!}
              imageUrl={author.image}
              className="size-[22px]"
              fallbackClassName="text-[10px]"
            />
            <Link href={routes.PROFILE(author._id)}>
              <p className="paragraph-semibold text-dark300_light700">
                {author.name}
              </p>
            </Link>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Suspense fallback={<div>Loading...</div>}>
              <Votes
                upvotes={question.upvotes}
                downvotes={question.downvotes}
                targetType="question"
                targetId={question._id}
                hasVotedPromise={hasVotedPromise}
              />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <SaveQuestion
                questionId={question._id}
                hasSavedQuestionPromise={hasSavedQuestionPromise}
              />
            </Suspense>
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full">
          {title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/icons/clock.svg"
          alt="clock"
          value={` asked ${getElapsedTime(new Date(createdAt))}`}
          title=""
          textStyles="small-regular text-dark400_light700"
        />{" "}
        <Metric
          imgUrl="/icons/message.svg"
          alt="message  "
          value={answers}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
        <Metric
          imgUrl="/icons/eye.svg"
          alt="eye"
          value={formatNumber(views)}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
      </div>
      <Preview content={content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagCard
            key={tag._id}
            _id={tag._id as string}
            name={tag.name}
            compact
          />
        ))}
      </div>
      <section className="my-5">
        <AllAnswers
          page={Number(page) || 1}
          isNext={answersData?.isNext || false}
          data={answersData?.answers}
          success={areAnswersLoaded}
          error={answersError}
          totalAnswers={answersData?.totalAnswers || 0}
        />
      </section>
      <section className="my-5">
        <AnswerForm
          questionId={question._id}
          questionTitle={question.title}
          questionContent={question.content}
        />
      </section>
    </>
  );
};

export default QuestionDetails;
