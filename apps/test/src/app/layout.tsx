'use client'

import { WalletKitProvider } from '@wallet-kit/react/src/context/wallet-kit-provider'

import './globals.css'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
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
            </body>
        </html>
    )
}
