import type { Cluster } from '@solana/web3.js'

export type WalletKitConfig = {
    env: Cluster
    autoConnect: boolean
    withSignIn: boolean
    messageToSign?: string
}
