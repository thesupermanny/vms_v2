import Dashboard from '@/components/Dashboard';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { cookieBasedClient } from '@/utils/amplify-utils';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default async function Home() {
  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='flex-grow'>
        <Dashboard />
      </div>
    </div>
  );
}
