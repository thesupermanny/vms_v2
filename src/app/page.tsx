import NavBar from '@/components/NavBar';
import Sidebar from '@/components/SideBar';
import { cookieBasedClient } from '@/utils/amplify-utils';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default async function Home() {
  const { data: customers } = await cookieBasedClient.models.Customer.list({
    selectionSet: ['customerId', 'name', 'email', 'phoneNumber'],
  });

  return (
    <div className='flex flex-row '>
      <Sidebar />
      <main className='flex min-h-screen flex-col items-center justify-center p-6 md:p-24 w-full  m-auto bg-gray-400'>
        <h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>
          WELCOME TO THE HOME PAGE!
        </h1>

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {customers.map((customer) => (
            <div
              key={customer.customerId}
              className='bg-white p-6 rounded-lg shadow-md'
            >
              <h2 className='text-2xl font-semibold text-blue-600 mb-2'>
                {customer.name}
              </h2>
              <p className='text-gray-700'>{customer.email}</p>
              <p className='text-gray-700'>{customer.phoneNumber}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// import { cookieBasedClient } from '@/utils/amplify-utils';
// import Image from 'next/image';

// export default async function Home() {
//   const { data: Customers } = await cookieBasedClient.models.Customer.list({
//     selectionSet: ['customerId', 'name', 'email', 'phoneNumber'],
//   });

//   console.log('This is the list: ', Customers);

//   return (
//     <main className='flex min-h-screen flex-col items-center justify-between p-24 w-1/2 m-auto'>
//       <h1>WELCOME TO THE HOME PAGE!</h1>
//       {Customers.map((customer) => (
//         <div key={customer.customerId}>
//           <h2>{customer.name}</h2>
//           <h2>{customer.email}</h2>
//           <h2>{customer.phoneNumber}</h2>
//         </div>
//       ))}
//     </main>
//   );
// }
