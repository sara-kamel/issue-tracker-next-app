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
  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/issue/list', label: 'Issues' }
  ]
  const currentPath = usePathname()
  const { status, data: session } = useSession()
  return (
    <nav className='px-5 mb-5 border-b py-3'>
      <Container>
        <Flex justify='between'>
          <Flex gap='3' align='center'>
            <Link href='/'>
              <FaBug />
            </Link>
            <ul className='flex'>
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    className={`${
                      link.href === currentPath
                        ? 'text-zinc-900'
                        : 'text-zinc-500'
                    } hover:text-zinc-800 ml-3 `}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user?.image!}
                    fallback='?'
                    size='2'
                    radius='full'
                    className='cursor-pointer'
                  ></Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size='3'>{session.user?.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar
