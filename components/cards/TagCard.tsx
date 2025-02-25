import { Badge } from "@/components/ui/badge";
import routes from "@/constants/routes";
import { getDevIconClassName } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TagCardProps {
  id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: TagCardProps) => {
  const Content = (
    <>
      <Badge
        className="subtle-medium background-light800_dark300 text-light400_light500
      rounded-md border-none px-4 p-2 uppercase flex flex-row gap-2"
      >
        <div className="flex-center space-x-2">
          <i className={getDevIconClassName(name)} />
          <span>{name}</span>
        </div>
        {remove ? (
          <Image
            src="/icons/close.svg"
            width={12}
            height={12}
            alt="close"
            className="cursor-pointer invert-0 dark:invert"
            onClick={handleRemove}
          />
        ) : null}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{questions}</p>
      )}
    </>
  );
  if (compact) {
    return isButton ? (
      <div className="flex justify-between gap-2">{Content}</div>
    ) : (
      <Link
        href={routes.TAGS(id)}
        className="flex justify-between gap-2 items-center"
      >
        {Content}
      </Link>
    );
  }
};

export default TagCard;
