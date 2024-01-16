import React from "react";

import { GetFormContentByUrl } from "@/actions/form";

import { FormElementInstance } from "@/components/form-elements";
import FormSubmitComponent from "@/components/form-submit-component";

async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
}

export default SubmitPage;
