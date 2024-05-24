'use client'

import { Button } from '@squaress/ui/button'
import { Text } from '@squaress/ui/text'
import { useWalletKitContext } from '@wallet-kit/react/src/context/wallet-kit-provider'
import { useWalletKit } from '@wallet-kit/react/src/context/wallet-kit-value-provider'

export default function Home() {
    const { onOpen, open, onClose } = useWalletKitContext()
    const { connected, wallet, wallets, publicKey, disconnect } = useWalletKit()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 h-screen">
            <Text>{publicKey?.toBase58() || 'N/A'}</Text>
            <Button onClick={() => (open ? onClose() : onOpen())}>
                Connect {JSON.stringify(open)}
            </Button>
            <Button disabled={!connected} onClick={() => disconnect()}>
                disconnect{' '}
            </Button>
        </main>
    )
}
