'use client'
import React from 'react'
import Link from 'next/link'
import { FaBug } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/issue', label: 'Issues' }
  ]
  const currentPath = usePathname()
  return (
    <nav className='flex space-x-6 p-4 mb-3 border-b-2 h-14 items-center'>
      <Link href='/'>
        <FaBug />
      </Link>
      {navLinks.map(link => (
        <ul className='flex'>
          <Link
            className={`${
              link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'
            } hover:text-zinc-800 `}
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        </ul>
      ))}
    </nav>
  )
}

export default NavBar
