'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useEffect } from 'react';

import Profile from '@/components/Profile';

const UserProfile = ({ params }: { params : {userId: string}}) => {
  const [posts, setPosts] = useState<PromptFromServer[]>([]);
  const [userData, setUserData] = useState<UserFromServer | null>(null)

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/users/${params.userId}/posts`);
      const data = await res.json();

      setPosts(data);
      setUserData(data[0].creator)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (params.userId) {
      fetchPosts();
    }
  }, [])
  
  return (
    <>
      {userData && (
        <Profile 
        name={userData.username}
        desc={`Welcome to ${userData.username} personalized page`}
        data={posts}
      />
      )}
    </>
  )
}

export default UserProfile