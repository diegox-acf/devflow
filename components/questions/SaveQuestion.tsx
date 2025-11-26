"use client";

import { toast } from "@/hooks/use-toast";
import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { use, useState } from "react";

type Props = {
  questionId: string;
  hasSavedQuestionPromise: Promise<ActionResponse<{ saved: boolean }>>;
};

const SaveQuestion = ({ questionId, hasSavedQuestionPromise }: Props) => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const [isLoading, setIsLoading] = useState(false);

  const { data } = use(hasSavedQuestionPromise);
  const { saved } = data || {};

  const handleSave = async () => {
    if (isLoading) {
      return;
    }

    if (!userId) {
      return toast({
        title: "You need to be logged in to save a question",
        variant: "destructive",
      });
    }
    setIsLoading(true);
    try {
      const { success, data, error } = await toggleSaveQuestion({ questionId });
      if (!success) {
        throw new Error(error?.message || "An error ocurred");
      }
      toast({
        title: `Question ${data?.saved ? "saved" : "unsaved"} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error ocurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Image
      src={saved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
      alt="save"
      width={18}
      height={18}
      className={`cursor-pointer ${isLoading && "opacity-50"}`}
      aria-label="Save question"
      onClick={handleSave}
    />
  );
};

export default SaveQuestion;
