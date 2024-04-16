import type {
    Adapter,
    MessageSignerWalletAdapterProps,
    SignerWalletAdapterProps,
    SignInMessageSignerWalletAdapterProps,
    WalletAdapterProps,
    WalletName,
    WalletReadyState,
} from '@solana/wallet-adapter-base'
import type { PublicKey } from '@solana/web3.js'

export interface Wallet {
    adapter: Adapter
    readyState: WalletReadyState
}

export interface WalletContextState {
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
    signMessage: MessageSignerWalletAdapterProps['signMessage'] | undefined
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

export const DEFAULT_CONTEXT: Partial<WalletContextState> = {
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
