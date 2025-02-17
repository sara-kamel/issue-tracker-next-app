'use client'
import React from 'react'
import Link from 'next/link'
import { FaBug } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { Box } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
const NavBar = () => {
  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/issue/list', label: 'Issues' }
  ]
  const currentPath = usePathname()
  const { status, data: session } = useSession()
  return (
    <nav className='flex space-x-6 p-4 mb-3 border-b-2 h-14 items-center'>
      <Link href='/'>
        <FaBug />
      </Link>
      <ul className='flex'>
        {navLinks.map(link => (
          <li key={link.href}>
            <Link
              className={`${
                link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'
              } hover:text-zinc-800 ml-3 `}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && (
          <Link href='/api/auth/signout'>Log Out</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href='/api/auth/signin'>Login</Link>
        )}
      </Box>
    </nav>
  )
}

export default NavBar
