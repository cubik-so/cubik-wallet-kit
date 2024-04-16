import { WalletProvider } from '@solana/wallet-adapter-react'
import { Adapter } from '@solana/wallet-adapter-base'
import { WalletKitConfig } from '../config.js'
import React from 'react'
import { WalletKitValueProvider } from './wallet-kit-value-provider.js'

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
    return (
        <WalletProvider
            autoConnect={config.autoConnect} // Automatically connect to the wallet on load, if configured.
            onError={() => {
                // Placeholder for error handling logic. Implement specific error handling here.
            }}
            wallets={formattedWallet ? [] : wallets} // Pass formatted or original wallets array based on the formattedWallet prop.
        >
            <WalletKitValueProvider>{children}</WalletKitValueProvider>
        </WalletProvider>
    )
}
