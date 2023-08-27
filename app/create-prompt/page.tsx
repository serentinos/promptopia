'use client'

import Form from '@/components/Form'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'


const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState<Prompt>({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id
        })
      });

      if (res.ok) {
        router.push('/');
      }
    } catch(error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt