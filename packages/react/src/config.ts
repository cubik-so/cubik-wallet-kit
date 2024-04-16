import { Cluster } from '@solana/web3.js'

export type WalletKitConfig = {
    env: Cluster
    autoConnect: boolean
}
