'use client'

import Link from 'next/link'
import React, { FormEvent } from 'react'

interface Props {
  type: 'Create',
  post: Prompt,
  setPost: React.Dispatch<React.SetStateAction<Prompt>>,
  submitting: boolean,
  handleSubmit: (e: FormEvent) => {}
}

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: Props) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>

      <p className='desc text-left max-w-md'>
        {type} and share amazing prompt with the world, and let your imagination run wild with any AI-powered platform
      </p>

      <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI prompt
          </span>

          <textarea
            value={post.prompt}
            className='form_textarea'
            placeholder='Write your prompt here'
            required
            onChange={(e) => setPost(prev => (
              {
                ...prev,
                prompt: e.target.value
              }
            ))}
          ></textarea>
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag
            <span>(#product, #idea, #webdev)</span>
          </span>

          <input
            value={post.tag}
            className='form_input'
            placeholder='#tag'
            required
            onChange={(e) => setPost(prev => (
              {
                ...prev,
                tag: e.target.value
              }
            ))}
          ></input>
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link
            href='/'
            className='text-gray-500 text-sm'
          >
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...` : type} 
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form