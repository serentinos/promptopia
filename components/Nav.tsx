"use client"

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react';
import { ClientSafeProvider, LiteralUnion, getProviders, signIn, signOut, useSession } from 'next-auth/react';

type BuiltInProviderType = 'Google'; 

const Nav = () => {
  const { data: session } = useSession();
  
  const [authProviders, setAuthProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>  | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)
  
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setAuthProviders(response);
    }

    setProviders();
  }, [])
  
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image 
          src="/assets/images/logo.svg"
          alt='Logo img'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* desc*/}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link 
              href="/create-prompt"
              className='black_btn'
            >
              Create Post
            </Link>

            <button 
              type='button'
              onClick={async () => await signOut()}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image 
                src={session.user?.image || ''}
                width={37}
                height={37}
                className='rounded-full'
                alt='Profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {authProviders && 
              Object.values(authProviders).map(provider => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image 
              src={session.user?.image || ''}
              width={37}
              height={37}
              className='rounded-full'
              alt='Profile'
              onClick={() => setToggleDropdown(prev => !prev)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href="/profile"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type='button'
                  className='mt-5 w-full black_btn'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {authProviders && 
              Object.values(authProviders).map(provider => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  signIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav