import React from 'react'
import { WALLET_KIT_DEFAULT_CONTEXT } from './default.js'
import type { WalletKitContextState } from './default.js'

export const WalletKitContext = React.createContext<WalletKitContextState>(
    WALLET_KIT_DEFAULT_CONTEXT as WalletKitContextState,
)

export const useWalletKitContext = (): WalletKitContextState => {
    return React.useContext(WalletKitContext)
}
