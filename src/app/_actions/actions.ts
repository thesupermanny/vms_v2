'use server';

import { cookieBasedClient } from '@/utils/amplify-utils';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export async function createCustomer(formData: FormData) {
  const customerId = uuidv4(); // Generate a unique customerId

  const {} = await cookieBasedClient.models.Customer.create({
    customerId: customerId, // Include the generated customerId
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phoneNumber: formData.get('phone') as string,
  });
  redirect('/');
}
