import React, { useMemo } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { DEFAULT_CONTEXT } from '@/utils/default'
import type { WalletKitValueState } from '@/utils/default'

interface Props {
    children: React.ReactNode
}
// Create a context to manage and provide the wallet connection state throughout the app.
export const WalletKitValueContext = React.createContext<WalletKitValueState>(
    DEFAULT_CONTEXT as WalletKitValueState,
)

// Custom hook to provide easy access to the wallet connection state using the WalletKitValueContext.
export const useWalletKit = (): WalletKitValueState => {
    return React.useContext(WalletKitValueContext)
}

export const WalletKitValueProvider = ({ children }: Props) => {
    const defaultWalletContext = useWallet()
    const value = useMemo(() => {
        return {
            ...defaultWalletContext,
            connect: async () => {
                try {
                    // if (defaultWalletContext.wallet?.adapter.name.includes('Mobile')) {
                    //   return;
                    // }
                    return await defaultWalletContext.connect()
                } catch (error) {
                    // when wallet is not installed
                }
            },
        }
    }, [defaultWalletContext])
    return <WalletKitValueContext.Provider value={value}>{children}</WalletKitValueContext.Provider>
}
