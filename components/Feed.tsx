'use client'

import React, { ChangeEvent, FC, useCallback, useMemo } from 'react'

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import { debounce } from '@/utils/debounce';

interface PromptCardListProps {
  data: PromptFromServer[],
  handleTagClick: React.Dispatch<React.SetStateAction<string>>
}

const PromptCardList:FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [querySearch, setQuerySearch] = useState('')
  const [posts, setPosts] = useState<PromptFromServer[]>([]);
  const searchTimeout = 500;

  const filteredPosts = useMemo(() => {
    return querySearch
      ? posts.filter((post) => {
        const regex = new RegExp(querySearch.trim(), 'i');
  
        return regex.test(post.creator.username)
          || regex.test(post.prompt)
          || regex.test(post.tag) 
      })
      : posts
  }, [posts, querySearch])


  const handleSearch = useCallback((textToSearch: string) => {
    setQuerySearch(textToSearch);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebouncedSearch = useCallback(debounce(handleSearch, searchTimeout), []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    handleDebouncedSearch(searchText);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/prompt');
        const data = await res.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPosts();
  }, [])

  useEffect(() => {
    handleDebouncedSearch(searchText);
  }, [handleDebouncedSearch, searchText]);
  
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text"
          placeholder='Search for tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList 
        data={filteredPosts}
        handleTagClick={setSearchText}
      />
    </section>
  )
}

export default Feed