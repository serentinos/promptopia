'use client'

import Form from '@/components/Form'
import React, { useState } from 'react'


const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Prompt>({
    prompt: '',
    tag: '',
  });

  // createPrompt = async (e) => {

  // }


  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      // handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt