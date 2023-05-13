'use client'

import { useAccount } from 'wagmi'
import { Connect } from './Connect'

export function Connected({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()

  if (!isConnected) return <Connect />
  return <>{children}</>
}
