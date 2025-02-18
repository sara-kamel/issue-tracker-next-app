'use client'
import React from 'react'
import Link from 'next/link'
import { FaBug } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text
} from '@radix-ui/themes'
import { useSession } from 'next-auth/react'

const NavBar = () => {
  return (
    <nav className='px-5 mb-5 border-b py-3'>
      <Container>
        <Flex justify='between'>
          <Flex gap='3' align='center'>
            <Link href='/'>
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname()

  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/issue/list', label: 'Issues' }
  ]

  return (
    <ul className='flex'>
      {navLinks.map(link => (
        <li key={link.href}>
          <Link
            className={`${
              link.href === currentPath
                ? 'text-zinc-900 hover:text-zinc-800 ml-3 transition-colors'
                : 'nav-link '
            } `}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
const AuthStatus = () => {
  const { status, data: session } = useSession()
  if (status === 'loading') return null
  if (status === 'unauthenticated')
    return (
      <Link className='nav-link ' href='/api/auth/signin'>
        Login
      </Link>
    )
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user?.image!}
            fallback='?'
            size='2'
            radius='full'
            className='cursor-pointer'
            referrerPolicy='no-referrer'
          ></Avatar>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='3'>{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href='/api/auth/signout'>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}
export default NavBar
