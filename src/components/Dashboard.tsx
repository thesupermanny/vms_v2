import React from 'react';

const Dashboard: React.FC = () => {
  const queues = [
    { id: 'phone-queue', title: 'Phone Queue' },
    { id: 'rep-locator', title: 'Rep Locator' },
    { id: 'other-queue', title: 'Other Queue' },
  ];

  return (
    <div className='flex flex-col gap-4 p-4 w-full'>
      {queues.map((queue) => (
        <div
          key={queue.id}
          className='bg-white shadow-md rounded-lg p-4 w-full'
        >
          <h2 className='text-xl font-semibold mb-4'>{queue.title}</h2>
          <div className='h-64 overflow-y-auto border-t border-b border-gray-200'>
            {/* Add your queue items here */}
            <div className='p-2 border-b border-gray-200'>Item 1</div>
            <div className='p-2 border-b border-gray-200'>Item 2</div>
            <div className='p-2 border-b border-gray-200'>Item 3</div>
            <div className='p-2 border-b border-gray-200'>Item 4</div>
            <div className='p-2 border-b border-gray-200'>Item 5</div>
            <div className='p-2 border-b border-gray-200'>Item 6</div>
            <div className='p-2 border-b border-gray-200'>Item 7</div>
            <div className='p-2 border-b border-gray-200'>Item 8</div>
            <div className='p-2 border-b border-gray-200'>Item 9</div>
            <div className='p-2 border-b border-gray-200'>Item 10</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
