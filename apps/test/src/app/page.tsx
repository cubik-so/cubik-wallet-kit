'use client'

import { Button } from '@squaress/ui'
import { useWalletKitContext } from '@wallet-kit/react/src/context/wallet-kit-provider'

export default function Home() {
    const { onOpen, open, onClose } = useWalletKitContext()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 h-screen">
            <Button onClick={() => (open ? onClose() : onOpen())}>
                Connect {JSON.stringify(open)}
            </Button>
        </main>
    )
}
