import { useMemo } from 'react'
import { MoongateWalletAdapter } from '@moongate/moongate-adapter'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { CoinbaseWalletAdapter } from '@solana/wallet-adapter-coinbase'
import { KeystoneWalletAdapter } from '@solana/wallet-adapter-keystone'
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger'
import { NightlyWalletAdapter } from '@solana/wallet-adapter-nightly'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { WalletConnectWalletAdapter } from '@solana/wallet-adapter-walletconnect'
import { TipLinkWalletAdapter } from '@tiplink/wallet-adapter'
import type { BaseSignerWalletAdapter, WalletAdapter } from '@solana/wallet-adapter-base'

export type WalletAdapterWithMutableSupportedTransactionVersions<T> = Omit<
    T,
    'supportedTransactionVersions'
> & {
    supportedTransactionVersions: BaseSignerWalletAdapter['supportedTransactionVersions']
}

export const useFormattedWallet = () => {
    const wallets: WalletAdapter[] = useMemo(() => {
        const allWalletAdapters = {
            SolflareWalletAdapter,
            PhantomWalletAdapter,
            LedgerWalletAdapter,
            CoinbaseWalletAdapter,
            KeystoneWalletAdapter,
            NightlyWalletAdapter,
            MoongateWalletAdapter,
        }
        const walletAdapters = Object.keys(allWalletAdapters)
            .filter((key) => key.includes('Adapter'))
            .map((key) => (allWalletAdapters as any)[key])
            .map((walletAdapter: any) => new walletAdapter()) // Intentional any, TS were being annoying

        const walletConnectWalletAdapter: WalletAdapterWithMutableSupportedTransactionVersions<BaseSignerWalletAdapter> | null =
            (() => {
                const adapter: WalletAdapterWithMutableSupportedTransactionVersions<BaseSignerWalletAdapter> =
                    new WalletConnectWalletAdapter({
                        network: WalletAdapterNetwork.Mainnet,
                        options: {},
                    })

                return adapter
            })()

        return [
            ...walletAdapters,
            walletConnectWalletAdapter,
            new TipLinkWalletAdapter({
                theme: 'dark',
                clientId: '3d1dd0d4-f05c-4ecd-9eaa-7f03e39ffc42',
                title: 'Cubik',
            }),
        ].filter((item) => item && item.name && item.icon)
    }, [])

    return wallets
}
