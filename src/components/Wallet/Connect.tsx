'use client'

import { BaseError } from 'viem'
import { useAccount, useConnect } from 'wagmi'
import Image from 'next/image'
import styles from './Connect.module.css'

export function Connect() {
  const { connector } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      chainId: 5600
    })

  return (
    <div className={styles.container}>
      <Image src="/vectorizer.png" width={250} height={250} alt="vectorizer" />
      <h1>Make powerful semantic searches on BNB Greenfield decentralized data storage</h1>
      <div>
        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => x.name == "MetaMask" && (
            <button key={x.id} className={styles.button}
              onClick={() => connect({ connector: x })}>
              Connect wallet
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}
      </div>

      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  )
}
