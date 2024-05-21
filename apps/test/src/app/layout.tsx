'use client'

import { WalletKitProvider } from '@wallet-kit/react/src/context/wallet-kit-provider'

import './globals.css'
import { SquaresProvider, ThemeProvider } from '@squaress/ui'
import '@squaress/ui/styles.css'

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
                            formattedWallet={false}
                            wallets={[]}
                        >
                            {children}
                        </WalletKitProvider>
                    </ThemeProvider>
                </SquaresProvider>
            </body>
        </html>
    )
}
