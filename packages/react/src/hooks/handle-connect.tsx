import { useCallback, useEffect } from 'react'
import { WalletReadyState } from '@solana/wallet-adapter-base'
import { useWalletKit } from '../context/wallet-kit-value-provider'
import type { Adapter } from '@solana/wallet-adapter-base'

export const useHandleConnect = () => {
    const { autoConnect, connect, wallet, select } = useWalletKit()

    useEffect(() => {
        if (wallet?.adapter.name) {
            try {
                connect()
            } catch (error) {
                console.log(error)
                // setIsError(error);
                // when wallet is not installed
            }
        }
    }, [wallet?.adapter.name])

    const handleConnectClick = useCallback(
        async (event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>, adapter: Adapter) => {
            event.preventDefault()
            try {
                // Might throw WalletReadyState.WalletNotReady
                select(adapter.name)

                if (adapter.readyState === WalletReadyState.NotDetected) {
                    throw WalletReadyState.NotDetected
                }
            } catch (e) {
                const error = e as Error
                console.log(error)
            }
        },
        [select, autoConnect],
    )
    return handleConnectClick
}
