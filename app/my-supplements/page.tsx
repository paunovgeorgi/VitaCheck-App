import ManageSupplements from '@/components/supplements/ManageSupplements'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const MySupplements = async () => {

const {userId} = await auth();
if(!userId){
    redirect('/sign-in');
}

  return (
    <div className='flex justify-center items center w-full'>
        <ManageSupplements />
    </div>
  )
}

export default MySupplements