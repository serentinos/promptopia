'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useEffect } from 'react';

import Profile from '@/components/Profile';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([])

  const handleEdit = (post: PromptFromServer) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async () => {

  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/users/${session?.user?.id}/posts`);
        const data = await res.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (session?.user?.id) {
      fetchPosts();
    }
  }, [])
  
  return (
    <Profile 
      name='My'
      desc="Welcome to your personalized page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile