import { Rating } from '@/src/lib/types';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response('You must be logged in to submit a review.', {
      status: 401,
    });
  }

  const body: Rating = await request.json();

  // validate the request body
  // this might be superfluous due to zod on frontend and supabase constraints
  if (body.rating < 1 || body.rating > 10) {
    return NextResponse.json(
      { message: 'Rating must be between 1 and 10.' },
      { status: 400 }
    );
  }

  // insert the new review into the database
  const { error } = await supabase.from('ratings').insert([
    {
      release_group_id: body.release_group_id,
      rating: body.rating,
      recommender: body.recommender,
      favorite_tracks: body.favorite_tracks,
      notes: body.notes,
      own_physical: body.own_physical,
      recommended_on: body.recommended_on,
      user_id: user.id,
    },
  ]);

  if (error) {
    if (error.code === '23505') {
      // Unique violation error code
      return NextResponse.json(
        { message: 'You have already submitted a review for this release.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      message: `Review of ${body.release_group_id} for user ${user.email} successfully created.`,
    },
    { status: 201 }
  );
}

