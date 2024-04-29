import { WalletProvider } from '@solana/wallet-adapter-react'
import React from 'react'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { WalletKitValueProvider } from './wallet-kit-value-provider'
import type { Adapter } from '@solana/wallet-adapter-base'
import type { WalletKitConfig } from '../config'
import { TestCard } from '../test'

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
    const defaultWallets = [new SolflareWalletAdapter(), new PhantomWalletAdapter()] as any
    return (
        <WalletProvider
            autoConnect={config.autoConnect} // Automatically connect to the wallet on load, if configured.
            onError={() => {
                // Placeholder for error handling logic. Implement specific error handling here.
            }}
            wallets={formattedWallet ? [] : wallets.length === 0 ? defaultWallets : wallets} // Pass formatted or original wallets array based on the formattedWallet prop.
        >
            <WalletKitValueProvider>
                <TestCard wallets={defaultWallets} />
                {/* {children} */}
            </WalletKitValueProvider>
        </WalletProvider>
    )
}
