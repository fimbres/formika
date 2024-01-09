'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ReloadIcon } from '@radix-ui/react-icons';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { toast } from './ui/use-toast'
import { CreateForm } from '@/actions/form';

const formSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
})

function CreateFormButton() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: ''
    },
  });
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formId = await CreateForm(values);
      toast({
        title: "Success",
        description: "Form created successfully",
      });
      router.push(`/builder/${formId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses from users around all the world
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="w-full mt-4">
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && <ReloadIcon className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateFormButton
