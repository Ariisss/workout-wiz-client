"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Loading from './loading'

export default function Home() {
  const router = useRouter()
  useEffect(() => {               // auto redirect to login
    router.replace("/auth/login")
  }, [])

  return (
    <></>
  )
}
