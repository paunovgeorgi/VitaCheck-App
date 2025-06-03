'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const navItems = [
    {label: 'Home', href: '/'},
    {label: 'My Supplements', href: '/my-supplements'},
];

const NavItems = () => {

    const pathName = usePathname();

  return (
    <nav className='flex items-center gap-4'>
        {navItems.map(({label, href}) =>  (
            <Link href={href} key={label} className={cn(pathName === href ? 'text-accent font-semibold' : 'hover:text-accent transition duration-300')}>
              {label}
              </Link>
        ))}
    </nav>
  )
}

export default NavItems