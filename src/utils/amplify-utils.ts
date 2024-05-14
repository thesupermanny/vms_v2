// Importing necessary modules from AWS Amplify and Next.js
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import outputs from '@/../../amplify_outputs.json'; // Importing Amplify configuration outputs
import { cookies } from 'next/headers'; // Importing cookies utility from Next.js
import { getCurrentUser } from 'aws-amplify/auth/server'; // Importing server-side authentication utility from AWS Amplify

// Creating a server runner with Amplify configuration
export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

// Function to check if the user is authenticated
export const isAuthenticated = async () =>
  await runWithAmplifyServerContext({
    nextServerContext: { cookies }, // Passing cookies to the server context
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec); // Getting the current user from the context
        // console.log('User:', user);
        return !!user; // Return true if user is authenticated, otherwise false
      } catch (error) {
        // console.error('Authentication error:', error);
        return false; // Return false if there's an authentication error
      }
    },
  });
