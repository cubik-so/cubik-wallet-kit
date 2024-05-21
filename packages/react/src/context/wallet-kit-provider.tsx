import type { Adapter, WalletError } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { ResponsiveModal } from '@squaress/ui'
import { MainScreen } from '../components/main-screen'
import type { WalletKitContextState } from 'core'
import { WALLET_KIT_DEFAULT_CONTEXT } from 'core'
import React, { useState } from 'react'
import type { WalletKitConfig } from '../config'
import { WalletKitValueProvider } from './wallet-kit-value-provider'
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
    return (
        <WalletKitContext.Provider
            value={{
                onClose: () => setOpen(false),
                onOpen: () => setOpen(true),
                open: open,
                error: error,
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
                        dialogSize="md"
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
