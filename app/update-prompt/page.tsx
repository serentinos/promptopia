'use client'

import Form from '@/components/Form'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useState, useEffect } from 'react'


const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const router = useRouter();
  const [post, setPost] = useState<Prompt>({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptFromServer = async () => {
      try {
        const res = await fetch(`/api/prompt/${promptId}`)
        const promptFromServer = await res.json();

        setPost({
          prompt: promptFromServer.prompt,
          tag: promptFromServer.tag,
        })
      } catch (error) {
        console.log(error);
      }
    }

    if (promptId) {
      getPromptFromServer();
    }
  }, [promptId]);

  const updatePrompt = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert('Prompt ID not found');

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      });

      if (res.ok) {
        router.push('/profile');
      }
    } catch(error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <Form 
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt