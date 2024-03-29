import React from 'react';
import { Link } from 'react-router-dom';
import { path } from 'src/constant/path';

export default function PageNotFound() {
  return (
    <div>
      <main className='flex min-h-[300px] w-full flex-col items-center justify-center '>
        <h1 className='text-9xl font-extrabold tracking-widest text-orange'>404</h1>
        <div className='absolute rotate-12 rounded bg-orange px-2 text-sm text-white'>Page Not Found</div>
        <button className='mt-5'>
          <Link
            to={path.home}
            className='active:text-orange-500 group relative inline-block text-sm font-medium text-[#FF6A3D] focus:outline-none focus:ring'
          >
            <span className='absolute inset-0 translate-x-0.5 translate-y-0.5 bg-orange transition-transform group-hover:translate-y-0 group-hover:translate-x-0' />
            <span className='relative block border border-current bg-white px-8 py-3 text-orange transition-all hover:bg-orange hover:text-white'>
              <span>Go Home</span>
            </span>
          </Link>
        </button>
      </main>
    </div>
  );
}
