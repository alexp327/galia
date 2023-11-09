'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Review } from '@/shared/review.interface';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { BASE_API_CLIENT_LINK } from '@/shared/environments/environment.local';
import { useRouter } from 'next/navigation';
import { ProjectType } from '@/shared/projecttype';

interface ReviewFormProps {
  update?: boolean;
  id?: number;
  artist?: string;
  title?: string;
  projectType?: string;
  genres?: string;
  releaseYear?: string;
  recommender?: string;
  imageLink?: string;
  rating?: string;
  bestTracks?: string;
  notes?: string;
  hasVinyl?: boolean;
  needsReduxReview?: boolean;
}

const formSchema = z.object({
  artist: z.string().min(1),
  title: z.string().min(1),
  projectType: z.string().min(1),
  genres: z.string().min(1),
  releaseYear: z.string().regex(new RegExp('^[0-9]{4}$')),
  recommender: z.string().min(1),
  imageLink: z.string().url(),
  rating: z.string().regex(new RegExp('^[1-5]$')),
  bestTracks: z.string().min(1),
  notes: z.string(),
  hasVinyl: z.boolean(),
  needsReduxReview: z.boolean(),
});

const AddReviewForm = ({
  update = false,
  id = -1,
  artist = '',
  title = '',
  projectType = ProjectType.ALBUM,
  genres = '',
  releaseYear = '',
  recommender = '',
  imageLink = '',
  rating = '',
  bestTracks = '',
  notes = '',
  hasVinyl = false,
  needsReduxReview = false,
}: ReviewFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artist: artist,
      title: title,
      projectType: projectType,
      genres: genres,
      releaseYear: releaseYear,
      recommender: recommender,
      imageLink: imageLink,
      rating: rating,
      bestTracks: bestTracks,
      notes: notes,
      hasVinyl: hasVinyl,
      needsReduxReview: needsReduxReview,
    },
  });

  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);

    const review: Review = {
      artist: values.artist,
      title: values.title,
      projectType: values.projectType,
      genres: values.genres.split(',').map((genre) => genre.trim()),
      releaseYear: parseInt(values.releaseYear),
      recommender: values.recommender,
      imageLink: values.imageLink,
      rating: parseInt(values.rating),
      bestTracks: values.bestTracks.split(',').map((genre) => genre.trim()),
      notes: values.notes,
      hasVinyl: values.hasVinyl,
      needsReduxReview: values.needsReduxReview,
    };
    console.log(review);

    if (update) {
      updateReview(id, review);
    } else {
      createNewReview(review);
    }
  };

  const createNewReview = async (review: Review) => {
    try {
      const res = await fetch(BASE_API_CLIENT_LINK + '/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      }).then((response) => {
        console.log(response);
        setIsPending(false);
        router.refresh();
        router.push('/reviews/list');
      });
    } catch (e) {
      console.error(e);
      setIsPending(false);
    }
  };

  const updateReview = async (id: number, review: Review) => {
    try {
      const res = await fetch(BASE_API_CLIENT_LINK + '/api/review/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      }).then((response) => {
        console.log(response);
        setIsPending(false);
        router.push('/reviews/list');
      });
    } catch (e) {
      console.error(e);
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='artist'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='projectType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='album'>Album</SelectItem>
                  <SelectItem value='mixtape'>Mixtape</SelectItem>
                  <SelectItem value='ep'>EP</SelectItem>
                  <SelectItem value='compilation'>Compilation</SelectItem>
                  <SelectItem value='single'>Single</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='genres'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genres</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='genre 1, genre 2, genre 3...'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A comma-separated list of genres.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='releaseYear'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Year</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Recommender(s)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='imageLink'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Link</FormLabel>
              <FormControl>
                <Input placeholder='https://image-link.com' {...field} />
              </FormControl>
              <FormDescription>
                A link to the picture for the album.
              </FormDescription>
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
                <Input {...field} />
              </FormControl>
              <FormDescription>Rate the album 1-5.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bestTracks'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Best Tracks</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='track 1, track 2, track 3...'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A comma-separated list of tracks.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='I love/hate this album because...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-7'>
          <FormField
            control={form.control}
            name='hasVinyl'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Own Vinyl?</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='needsReduxReview'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Mark for re-review?</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {!isPending && <Button type='submit'>Submit</Button>}
        {isPending && (
          <Button disabled>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Submitting
          </Button>
        )}
      </form>
    </Form>
  );
};

export default AddReviewForm;

