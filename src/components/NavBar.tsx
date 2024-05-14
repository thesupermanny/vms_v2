'use client';

// Importing necessary modules and components from React, AWS Amplify, and Next.js
import React, { useEffect, useState } from 'react';
import { Flex, Icon, Text, Button, Link } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { Hub } from 'aws-amplify/utils';
import { signOut } from 'aws-amplify/auth';

export default function NavBar({ isSignedIn }: { isSignedIn: boolean }) {
  const [authCheck, setAuthCheck] = useState(isSignedIn); // State to keep track of authentication status
  // console.log('Is signed in?', isSignedIn);
  // console.log('Auth check?', signOut);

  const router = useRouter(); // Hook to manage routing

  useEffect(() => {
    const hubListenerCancel = Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signedIn':
          setAuthCheck(true); // Update authCheck to true on sign-in event
          router.push('/'); // Redirect to home page
          break;
        case 'signedOut':
          setAuthCheck(false); // Update authCheck to false on sign-out event
          router.push('/'); // Redirect to home page
          break;
      }
    });
    return () => hubListenerCancel(); // Cleanup listener on component unmount
  }, [router]); // Dependency array includes router

  const signOutSignIn = async () => {
    if (authCheck) {
      await signOut(); // Sign out if authenticated
    } else {
      router.push('/signin'); // Redirect to sign-in page if not authenticated
    }
  };

  const defaultRoutes = [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/add',
      label: 'Add note',
      loggedIn: true, // This route is only accessible when logged in
    },
  ];

  const routes = defaultRoutes.filter(
    (route) => route.loggedIn === authCheck || route.loggedIn === undefined // Filter routes based on authentication status
  );

  return (
    <>
      <Flex
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        padding='1rem'
      >
        <Flex as='nav' alignItems='center' gap='3rem' margin='0 2rem'>
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Text>{route.label}</Text>
            </Link>
          ))}
        </Flex>
        <Button
          variation='primary'
          borderRadius='2 rem'
          className='mr-4'
          onClick={signOutSignIn}
        >
          {authCheck ? 'Sign Out' : 'Sign In'}
        </Button>
      </Flex>
    </>
  );
}
