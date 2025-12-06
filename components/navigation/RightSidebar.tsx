import routes from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TagCard from "../cards/TagCard";
import { getHotQuestions } from "@/lib/actions/question.action";
import DataRenderer from "../DataRenderer";
import { getTopTags } from "@/lib/actions/tag.action";

const popularTags = [{ _id: "1", name: "react", questions: 100 }];

const RightSidebar = async () => {
  const { success, data: hotQuestions, error } = await getHotQuestions();
  const {
    success: topTagSuccess,
    data: topTags,
    error: topTagsError,
  } = await getTopTags();

  return (
    <section
      className="custom-scrollbar background-light900_dark200 border-l light-border h-screen pt-36 p-6 shadow-light-300
     dark:shadow-none sticky right-0 top-0 flex flex-col overflow-y-auto w-[350px] gap-6 max-xl:hidden"
    >
      <div>
        <h3 className="h3-bold text_dark200_light900">Top Questions</h3>
        <DataRenderer
          data={hotQuestions}
          empty={{
            title: "No questions found",
            message: "No questions have  been asked yet",
          }}
          success={success}
          error={error}
          render={(hotQuestions) => (
            <div className="mt-7 flex w-full flex-col gap-[30px]">
              {hotQuestions.map((question) => (
                <Link
                  key={question._id}
                  href={routes.QUESTIONS(question._id)}
                  className="flex cursor-pointer justify-between items-center gap-3"
                >
                  <div className="flex gap-2">
                    <Image
                      src={"/icons/question.svg"}
                      width={20}
                      height={20}
                      alt="top-question"
                      className="invert-colors"
                    />
                    <p className="body-medium text-dark500_light700">
                      {question.title}
                    </p>
                  </div>
                  <Image
                    src="/icons/chevron-right.svg"
                    width={20}
                    height={20}
                    alt="chevron"
                    className="invert-colors"
                  />
                </Link>
              ))}
            </div>
          )}
        />
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          <DataRenderer
            data={topTags}
            empty={{
              title: "No tags found",
              message: "No tags have  been asked yet",
            }}
            success={topTagSuccess}
            error={topTagsError}
            render={(topTags) => (
              <div className="mt-7 flex w-full flex-col gap-[30px]">
                {topTags.map((topTag) => (
                  <TagCard
                    key={topTag._id}
                    _id={topTag._id}
                    name={topTag.name}
                    questions={topTag.questions}
                    showCount
                    compact
                  />
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
