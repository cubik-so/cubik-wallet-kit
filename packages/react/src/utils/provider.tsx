import React from 'react'
import { WALLET_KIT_DEFAULT_CONTEXT } from './default'
import type { WalletKitContextState } from './default'

export const WalletKitContext = React.createContext<WalletKitContextState>(
    WALLET_KIT_DEFAULT_CONTEXT as WalletKitContextState,
)

export const useWalletKitContext = (): WalletKitContextState => {
    return React.useContext(WalletKitContext)
}
