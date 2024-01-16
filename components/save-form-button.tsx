import React, { useTransition } from "react";
import { DiscIcon, ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

import { UpdateFormContent } from "@/actions/form";
import useDesigner from "@/hooks/use-designer";

function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <DiscIcon className="h-4 w-4" />
      Save
      {loading && <ReloadIcon className="animate-spin" />}
    </Button>
  );
}

export default SaveFormBtn;
