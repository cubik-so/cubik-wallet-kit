'use client'

import { WalletKitProvider } from '@wallet-kit/react'

import { SquaresProvider } from '@squaress/ui/provider'
import { ThemeProvider } from '@squaress/ui/useTheme'
import './globals.css'
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
                                messageToSign: `Welcome to Cubik\n The genesis for leading Solana Initiatives\n By signing this message you agree to the teams and conditions 🌱`,
                            }}
                            onSignInMessage={(e) => {
                                alert(e)
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
