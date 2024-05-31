import type {
    Adapter,
    MessageSignerWalletAdapterProps,
    SendTransactionOptions,
    SignInMessageSignerWalletAdapterProps,
    SignerWalletAdapterProps,
    WalletAdapter,
    WalletAdapterProps,
    WalletError,
    WalletName,
    WalletReadyState,
} from '@solana/wallet-adapter-base'
import type { Connection, PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js'

export interface Wallet {
    adapter: Adapter
    readyState: WalletReadyState
}

function constructMissingProviderErrorMessage(action: string, valueName: string) {
    return (
        'You have tried to ' +
        ` ${action} "${valueName}"` +
        ' on a WalletContext without providing one.' +
        ' Make sure to render a WalletProvider' +
        ' as an ancestor of the component that uses ' +
        'WalletContext'
    )
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
    onSignInMessage: (args: {
        sig: string
        wallet: string
        timeStamp: number
        message: string
    }) => void
}

export const WALLET_KIT_DEFAULT_CONTEXT: Partial<WalletKitContextState> = {
    onClose: () => {
        return Promise.reject(constructMissingProviderErrorMessage('call', 'onClose'))
    },
    onOpen: () => {
        return Promise.reject(constructMissingProviderErrorMessage('call', 'onOpen'))
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
    onSignInMessage: (args) => {
        return args
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

export const WALLETKIT_VALUE_DEFAULT_CONTEXT = {
    autoConnect: false,
    connecting: false,
    connected: false,
    disconnecting: false,
    select(_name: WalletName | null) {
        console.error(constructMissingProviderErrorMessage('get', 'select'))
    },
    connect() {
        return Promise.reject(console.error(constructMissingProviderErrorMessage('get', 'connect')))
    },
    disconnect() {
        return Promise.reject(
            console.error(constructMissingProviderErrorMessage('get', 'disconnect')),
        )
    },
    sendTransaction(
        _transaction: VersionedTransaction | Transaction,
        _connection: Connection,
        _options?: SendTransactionOptions,
    ) {
        return Promise.reject(
            console.error(constructMissingProviderErrorMessage('get', 'sendTransaction')),
        )
    },
    signTransaction(_transaction: Transaction) {
        return Promise.reject(
            console.error(constructMissingProviderErrorMessage('get', 'signTransaction')),
        )
    },
    signAllTransactions(_transaction: Transaction[]) {
        return Promise.reject(
            console.error(constructMissingProviderErrorMessage('get', 'signAllTransactions')),
        )
    },
    signMessage(_message: Uint8Array) {
        return Promise.reject(
            console.error(constructMissingProviderErrorMessage('get', 'signMessage')),
        )
    },
} as WalletKitValueState
