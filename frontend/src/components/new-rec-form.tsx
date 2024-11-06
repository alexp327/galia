'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { Checkbox } from '@/src/components/ui/checkbox';
import { Button } from '@/src/components/ui/button';
import { toast } from './hooks/use-toast';

const formSchema = z.object({
  release_group_id: z.string().min(1, { message: 'Release ID is required.' }),
  recommender: z.string().min(1, { message: 'Recommender is required.' }),
  priority: z.boolean(),
  recommended_on: z
    .string()
    .min(1, { message: 'Recommended on date is required.' }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  release_group_id: '',
  recommender: '',
  priority: false,
  recommended_on: new Date().toISOString().split('T')[0], // YYYY-MM-DD
};

export function NewRecommendationForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: FormValues) {
    try {
      const response = await fetch('/api/recs/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'An error occurred');
      }

      toast({
        title: 'Success',
        description: responseData.message,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='release_group_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release ID</FormLabel>
              <FormControl>
                <Input placeholder='Enter release ID' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='recommender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recommender</FormLabel>
              <FormControl>
                <Input placeholder='Enter recommender' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='recommended_on'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recommended On</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='priority'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Priority</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

export default NewRecommendationForm;

