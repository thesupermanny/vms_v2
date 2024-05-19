'use client';

import { createCustomer } from '../app/_actions/actions';

const CustomerForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    await createCustomer(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-4 flex flex-col items-center gap-4'
    >
      <input type='text' name='name' placeholder='Name' required />
      <input type='email' name='email' placeholder='Email' required />
      <input type='tel' name='phone' placeholder='Phone' required />
      <button type='submit' className='text-white bg-teal-600 rounded p-4'>
        Create Customer
      </button>
    </form>
  );
};

export default CustomerForm;
