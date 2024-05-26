'use client'

import { WalletKitProvider } from '@wallet-kit/react'

import './globals.css'
import { SquaresProvider } from '@squaress/ui/provider'
import { ThemeProvider } from '@squaress/ui/useTheme'
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
                                withSignIn: true,
                            }}
                        >
                            {children}
                        </WalletKitProvider>
                    </ThemeProvider>
                </SquaresProvider>
            </body>
        </html>
    )
}
