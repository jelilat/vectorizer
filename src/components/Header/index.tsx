'use client'

import { useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronDown, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import styles from './Header.module.css'

export function Header() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className={styles.header}>
        <Image src="/vectorizer.png" width={50} height={50} alt="vectorizer" />
        <div className={styles.buttonContainer}>
            {
                isConnected && (
                    <div>
                        <button className={styles.button} >
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                            {
                                dropdownOpen ? (
                                    <FontAwesomeIcon icon={faCircleChevronUp} className={styles.icon}
                                        onClick={() => setDropdownOpen(!dropdownOpen)} />
                                ) : <FontAwesomeIcon icon={faCircleChevronDown} className={styles.icon}
                                onClick={() => setDropdownOpen(!dropdownOpen)} />
                            }
                            
                        </button>
                        {dropdownOpen && (
                            <div className={styles.dropdown}>
                                <button onClick={() => disconnect()}>Disconnect</button>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    </div>
  )
}
