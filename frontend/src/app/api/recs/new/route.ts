import { Recommendation } from '@/src/lib/types';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response('You must be logged in to submit a recommendation.', {
      status: 401,
    });
  }

  const body: Recommendation = await request.json();

  // validate the request body
  if (
    !body.release_group_id ||
    !body.recommender ||
    !body.priority ||
    !body.recommended_on
  ) {
    return NextResponse.json(
      { message: 'Missing required fields.' },
      { status: 400 }
    );
  }

  // insert the new recommendation into the database
  const { error } = await supabase.from('recommendations').insert([
    {
      release_group_id: body.release_group_id,
      user_id: user.id,
      recommender: body.recommender,
      recommended_on: body.recommended_on,
      priority: body.priority,
    },
  ]);

  if (error) {
    if (error.code === '23505') {
      // Unique violation error code
      return NextResponse.json(
        {
          message:
            'You have already submitted a recommendation for this release.',
        },
        { status: 409 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      message: `Recommendation for release group ${body.release_group_id} by user ${user.email} successfully created.`,
    },
    { status: 201 }
  );
}

