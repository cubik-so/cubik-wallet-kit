import type {
    Adapter,
    MessageSignerWalletAdapterProps,
    SignInMessageSignerWalletAdapterProps,
    SignerWalletAdapterProps,
    WalletAdapter,
    WalletAdapterProps,
    WalletError,
    WalletName,
    WalletReadyState,
} from '@solana/wallet-adapter-base'
import type { PublicKey } from '@solana/web3.js'

export interface Wallet {
    adapter: Adapter
    readyState: WalletReadyState
}

// Handles the global State of wallet modal/drawer
export interface WalletKitContextState {
    onOpen: () => void
    onClose: () => void
    open: boolean
    withSignIn: boolean
    error: Error | null
    setError: (error: WalletError | null) => void
    theme: 'light' | 'dark'
    toggleTheme: () => void
    lastConnected: WalletAdapter | null
    setLastConnected: (adapter: WalletAdapter) => void
    messageToSign?: string
    onSignInMessage: (sig: string) => void
}

export const WALLET_KIT_DEFAULT_CONTEXT: Partial<WalletKitContextState> = {
    onClose: () => {
        return Promise.reject(logMissingProviderError('call', 'onClose'))
    },
    onOpen: () => {
        return Promise.reject(logMissingProviderError('call', 'onOpen'))
    },
    open: false,
    withSignIn: false,
    error: null,
    setError: () => {
        return null
    },
    messageToSign: undefined,
    theme: 'light',
    lastConnected: null,
    setLastConnected: (adapter: WalletAdapter) => {
        return adapter
    },
    toggleTheme: () => {
        return null
    },
    onSignInMessage: (sig: string) => {
        return sig
    },
}

// Handles the value for the connected adapter
export interface WalletKitValueState {
    autoConnect: boolean
    wallets: Wallet[]
    wallet: Wallet | null
    publicKey: PublicKey | null
    connecting: boolean
    connected: boolean
    disconnecting: boolean

    select(walletName: WalletName | null): void
    connect(): Promise<void>
    disconnect(): Promise<void>

    sendTransaction: WalletAdapterProps['sendTransaction']
    signTransaction: SignerWalletAdapterProps['signTransaction'] | undefined
    signAllTransactions: SignerWalletAdapterProps['signAllTransactions'] | undefined
    signMessage: MessageSignerWalletAdapterProps['signMessage']
    signIn: SignInMessageSignerWalletAdapterProps['signIn'] | undefined
}

function logMissingProviderError(action: string, property: string) {
    const error = new Error(
        `You have tried to ${action} "${property}" on a WalletContext without providing one. ` +
            'Make sure to render a WalletProvider as an ancestor of the component that uses WalletContext.',
    )
    console.error(error)
    return error
}

export const DEFAULT_CONTEXT: Partial<WalletKitValueState> = {
    autoConnect: false,
    connecting: false,
    connected: false,
    disconnecting: false,
    select() {
        logMissingProviderError('call', 'select')
    },
    connect() {
        return Promise.reject(logMissingProviderError('call', 'connect'))
    },
    disconnect() {
        return Promise.reject(logMissingProviderError('call', 'disconnect'))
    },
    sendTransaction() {
        return Promise.reject(logMissingProviderError('call', 'sendTransaction'))
    },
    signTransaction() {
        return Promise.reject(logMissingProviderError('call', 'signTransaction'))
    },
    signAllTransactions() {
        return Promise.reject(logMissingProviderError('call', 'signAllTransactions'))
    },
    signMessage() {
        return Promise.reject(logMissingProviderError('call', 'signMessage'))
    },
    signIn() {
        return Promise.reject(logMissingProviderError('call', 'signIn'))
    },
}
