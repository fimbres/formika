import React from 'react'
import { Form } from '@prisma/client'
import { formatDistance } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowRightIcon, EyeOpenIcon, Pencil1Icon, RocketIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

interface FormCardProp {
  form: Form;
}

function FormCard({ form }: FormCardProp) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <EyeOpenIcon className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <RocketIcon className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/forms/${form.id}`}>
              View Submissions <ArrowRightIcon />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4">
            <Link href={`/builder/${form.id}`}>
              Edit Form <Pencil1Icon />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default FormCard
