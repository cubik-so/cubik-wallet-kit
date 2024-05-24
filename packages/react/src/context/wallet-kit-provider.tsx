/* eslint-disable no-nested-ternary */
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import React, { useState } from 'react'
import { WALLET_KIT_DEFAULT_CONTEXT } from '../utils/default'
import { MainScreen } from '../components/main-screen'
import { ResponsiveModal } from '../lib/ui'
import { WalletKitValueProvider } from './wallet-kit-value-provider'
import type { WalletKitContextState } from '../utils/default'
import type { WalletKitConfig } from '../config'
import type { Adapter, WalletAdapter, WalletError } from '@solana/wallet-adapter-base'

export const WalletKitContext = React.createContext<WalletKitContextState>(
    WALLET_KIT_DEFAULT_CONTEXT as WalletKitContextState,
)

export const useWalletKitContext = (): WalletKitContextState => {
    return React.useContext(WalletKitContext)
}

// Define the props expected by the WalletKitProvider component.
interface WalletKitProviderProps {
    wallets: Adapter[] // Array of wallet adapters.
    formattedWallet: boolean // Flag to determine if wallets should be formatted.
    config: WalletKitConfig // Configuration options for the wallet provider.
    children: React.ReactNode // Children components that will have access to the wallet context.
}

// Component to provide wallet connections to the application.
export const WalletKitProvider = ({
    wallets,
    formattedWallet = true,
    config,
    children,
}: WalletKitProviderProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const defaultWallets = [new SolflareWalletAdapter(), new PhantomWalletAdapter()] as any
    const [error, setError] = useState<WalletError | null>(null)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [lastConnected, setLastConnected] = useState<WalletAdapter | null>(null)
    return (
        <WalletKitContext.Provider
            value={{
                onClose: () => setOpen(false),
                onOpen: () => setOpen(true),
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
                wallets={formattedWallet ? [] : wallets.length === 0 ? defaultWallets : wallets} // Pass formatted or original wallets array based on the formattedWallet prop.
            >
                <WalletKitValueProvider>
                    <ResponsiveModal
                        onClose={() => setOpen(false)}
                        open={open}
                        dialogSize="lg"
                        onOpenChange={() => setOpen(true)}
                    >
                        <MainScreen />
                    </ResponsiveModal>
                    {children}
                </WalletKitValueProvider>
            </WalletProvider>
        </WalletKitContext.Provider>
    )
}
