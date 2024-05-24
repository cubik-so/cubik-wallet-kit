'use client'

import { WalletKitProvider } from '@wallet-kit/react/src/context/wallet-kit-provider'

import './globals.css'
import { SquaresProvider } from '@squaress/ui/provider'
import { ThemeProvider } from '@squaress/ui/useTheme'
import '@squaress/ui/styles.css'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html data-theme="light" lang="en">
            <body>
                <SquaresProvider>
                    <ThemeProvider>
                        <WalletKitProvider
                            config={{
                                autoConnect: true,
                                env: 'mainnet-beta',
                            }}
                            formattedWallet={true}
                            wallets={[new PhantomWalletAdapter(), new SolflareWalletAdapter()]}
                        >
                            {children}
                        </WalletKitProvider>
                    </ThemeProvider>
                </SquaresProvider>
            </body>
        </html>
    )
}
