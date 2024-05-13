'use client';

import React, { useEffect, useState } from 'react';

import { Flex, Icon, Text, Button, Link } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { Hub } from 'aws-amplify/utils';
import { signOut } from 'aws-amplify/auth';

export default function NavBar({ isSignedIn }: { isSignedIn: boolean }) {
  const [authCheck, setAuthCheck] = useState(isSignedIn);
  console.log('Is signed in?', isSignedIn);

  const router = useRouter();

  useEffect(() => {
    const hubListenerCancel = Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signedIn':
          setAuthCheck(true);
          router.push('/');
          break;
        case 'signedOut':
          setAuthCheck(false);
          router.push('/');
          break;
      }
    });
    return () => hubListenerCancel();
  }, [router]);

  const signOutSignIn = async () => {
    if (authCheck) {
      await signOut();
    } else {
      router.push('/signin');
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
      loggedIn: true,
    },
  ];

  const routes = defaultRoutes.filter(
    (route) => route.loggedIn === authCheck || route.loggedIn === undefined
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
