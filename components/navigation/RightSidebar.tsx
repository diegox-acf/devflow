import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TagCard from "../cards/TagCard";
const hotQuestions = [
  { _id: "1", title: "How to create a custom hook in React?" },
  { _id: "2", title: "How to create a custom hook in React?" },
  { _id: "3", title: "How to create a custom hook in React?" },
  { _id: "4", title: "How to create a custom hook in React?" },
  { _id: "5", title: "How to create a custom hook in React?" },
];

const popularTags = [
  { _id: "1", name: "react", questions: 100 },
  { _id: "2", name: "javascript", questions: 200 },
  { _id: "3", name: "java", questions: 50 },
  { _id: "4", name: "typescript", questions: 63 },
  { _id: "5", name: "nextjs", questions: 412 },
  { _id: "6", name: "tailwindcss", questions: 4 },
  { _id: "7", name: "kumbiaphp", questions: 1 },
  { _id: "8", name: "bun", questions: 1000 },
];

const RightSidebar = () => {
  type Greeting = "Hello" | "Hi" | "Welcome";

  let greeting: Greeting = "Welcome";

  return (
    <section
      className="custom-scrollbar background-light900_dark200 border-l light-border h-screen pt-36 p-6 shadow-light-300
     dark:shadow-none sticky right-0 top-0 flex flex-col overflow-y-auto w-[350px] gap-6 max-xl:hidden"
    >
      <div>
        <h3 className="h3-bold text_dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>
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
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, name, questions }) => (
            <TagCard
              key={_id}
              id={_id}
              name={name}
              questions={questions}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
