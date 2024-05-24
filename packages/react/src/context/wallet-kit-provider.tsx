/* eslint-disable no-nested-ternary */
import { WalletProvider } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'
import { ModalWallet } from '../components'
import { WalletKitContext } from '../utils/provider'
import { WalletKitValueProvider } from './wallet-kit-value-provider'
import type { WalletKitConfig } from '../config'
import type { WalletAdapter, WalletError } from '@solana/wallet-adapter-base'

// Define the props expected by the WalletKitProvider component.
interface WalletKitProviderProps {
    config: WalletKitConfig // Configuration options for the wallet provider.
    children: React.ReactNode // Children components that will have access to the wallet context.
}

// Component to provide wallet connections to the application.
export const WalletKitProvider = ({ config, children }: WalletKitProviderProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [error, setError] = useState<WalletError | null>(null)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [lastConnected, setLastConnected] = useState<WalletAdapter | null>(null)

    const onClose = () => {
        setOpen(false)
    }
    const onOpen = () => {
        setLastConnected(null)
        setError(null)
        setOpen(true)
    }

    return (
        <WalletKitContext.Provider
            value={{
                onClose,
                onOpen,
                toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),
                setLastConnected: (e) => setLastConnected(e),
                open,
                error,
                theme,
                lastConnected,
            }}
        >
            <WalletProvider
                autoConnect={config.autoConnect} // Automatically connect to the wallet on load, if configured.
                onError={(e) => {
                    // Setting Error
                    setError(e)
                }}
                wallets={[]} // Pass formatted or original wallets array based on the formattedWallet prop.
            >
                <WalletKitValueProvider>
                    <ModalWallet onClose={onClose} onOpen={onOpen} open={open} />
                    {children}
                </WalletKitValueProvider>
            </WalletProvider>
        </WalletKitContext.Provider>
    )
}
