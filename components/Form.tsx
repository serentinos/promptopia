import React from 'react'

interface Props {
  type: 'Create',
  post: Prompt,
  setPost: React.Dispatch<React.SetStateAction<Prompt>>,
  submitting: boolean,
  handleSubmit?: () => {}
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
    </section>
  )
}

export default Form