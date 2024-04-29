'use client'

import { useHandleConnect } from '@wallet-kit/react/src/hooks/handle-connect'

export default function Home() {
    const connect = useHandleConnect()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <button onClick={() => connect()}>Connect</button>
        </main>
    )
}
