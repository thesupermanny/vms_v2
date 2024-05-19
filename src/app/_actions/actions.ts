'use server';

// Import necessary modules and functions
import { cookieBasedClient } from '@/utils/amplify-utils';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a new customer record using the provided form data.
 * Generates a unique customerId and redirects to the home page upon completion.
 *
 * @param {FormData} formData - The form data containing customer information.
 */
export async function createCustomer(formData: FormData) {
  const customerId = uuidv4(); // Generate a unique customerId

  // Create a new customer record using the form data and generated customerId
  const {} = await cookieBasedClient.models.Customer.create({
    customerId: customerId as string, // Include the generated customerId
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phoneNumber: formData.get('phone') as string,
  });
  redirect('/'); // Redirect to the home page
}

/**
 * Updates an existing customer record using the provided form data.
 * Redirects to the home page upon completion.
 *
 * @param {FormData} formData - The form data containing updated customer information.
 */
export async function updateCustomer(formData: FormData) {
  // Update the customer record using the form data
  const {} = await cookieBasedClient.models.Customer.update({
    customerId: formData.get('customerId') as string,
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phoneNumber: formData.get('phone') as string,
  });
  redirect('/'); // Redirect to the home page
}

/**
 * Deletes a customer record identified by the provided customerId.
 * Redirects to the home page upon completion.
 *
 * @param {string} customerId - The unique identifier of the customer to be deleted.
 */
export async function deleteCustomer(customerId: string) {
  // Delete the customer record identified by customerId
  const {} = await cookieBasedClient.models.Customer.delete({ customerId });
  redirect('/'); // Redirect to the home page
}
