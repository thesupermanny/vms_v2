import React from 'react';
import Link from 'next/link';

const SideBar: React.FC = () => {
  return (
    <div className='h-screen w-64 bg-gray-500 text-white flex flex-col'>
      <nav className='flex-grow'>
        <ul>
          <li className='p-4 hover:bg-gray-700'>
            <Link href='/search-customer'>Search</Link>
          </li>
          <li className='p-4 hover:bg-gray-700'>
            <Link href='/add-customer'>Add Customer</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
