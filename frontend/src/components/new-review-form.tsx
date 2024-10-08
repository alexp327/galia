'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { toast } from './hooks/use-toast';

const formSchema = z.object({
  release_id: z.number().min(1, { message: 'Release ID is required.' }),
  rating: z
    .number()
    .min(1)
    .max(10, { message: 'Rating must be between 1 and 10.' }),
  recommender: z.string().min(1, { message: 'Recommender is required.' }),
  favorite_tracks: z.string().optional(),
  notes: z.string().optional(),
  own_physical: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  release_id: undefined,
  rating: undefined,
  recommender: '',
  favorite_tracks: '',
  notes: '',
  own_physical: false,
};

export function NewReviewForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('submitting new review form');
    console.log(values);

    try {
      // construct a POST request that submits the form data to the server
      const response = await fetch('/api/reviews/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values }),
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
          name='release_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release ID</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Enter release ID'
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='rating'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Enter rating'
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                />
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
          name='favorite_tracks'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite Tracks</FormLabel>
              <FormControl>
                <Textarea placeholder='Enter favorite tracks' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder='Enter notes' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='own_physical'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Own Physical Copy</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

export default NewReviewForm;

