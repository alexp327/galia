'use client';

import { XCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { deleteReview } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const deleteModal = (props: { title: string; id: string }) => {
  const router = useRouter();
  const toast = useToast();

  const handleDeleteReview = async () => {
    let deleted = await deleteReview(props.id, true);
    if (!deleted) {
      toast.toast({
        variant: 'destructive',
        title: 'Error: Delete Review',
        description: 'There was a problem with your request.',
      });
    } else {
      router.refresh();
      router.push('/reviews/list');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>
          <XCircle className='mr-2' />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            review for {props.title}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteReview}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default deleteModal;

