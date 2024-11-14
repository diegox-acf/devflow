import { Badge } from "@/components/ui/badge";
import ROUTES from "@/constants/routes";
import { getDevIconClassName } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  id: string;
  name: string;
  questions: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagCard = ({ id, name, questions, showCount, compact }: Props) => {
  return (
    <Link
      href={ROUTES.TAGS(id)}
      className="flex justify-between gap-2 items-center"
    >
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 p-2 uppercase">
        <div className="flex-center space-x-2">
          <i className={getDevIconClassName(name)} />
          <span>{name}</span>
        </div>
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </Link>
  );
};

export default TagCard;
