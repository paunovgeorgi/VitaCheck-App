'use client';

import Image from "next/image"
import Link from "next/link"
import NavItems from "./NavItems"
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SignInButton, SignUpButton, SignedIn, SignedOut,  UserButton,} from '@clerk/nextjs';

const NavBar = () => {
   const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 1000;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <nav className={cn('navbar', scrolled && 'scrolled')}>
        <Link href='/'>
            <div className="flex items-center gap-2.5 cursor-pointer">
                <Image src="/images/vitalogo-1.png" alt="logo" width={60} height={58} className="animate-pulse"/>
            </div>
        </Link>
        <div className="flex items-center gap-8">
            <NavItems />
            <SignedOut>
                <SignInButton>
                  <button className="btn-signin">Sign In</button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
    </nav>
  )
}

export default NavBar