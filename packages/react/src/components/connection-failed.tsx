import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button, EmptyState } from '../lib/ui'
import { useWalletKit } from '../context/wallet-kit-value-provider'
import { useHandleConnect } from '../hooks/handle-connect'
import { useWalletKitContext } from '../context/wallet-kit-provider'

const ConnectionFailed = () => {
    const { lastConnected } = useWalletKitContext()
    const { handleConnectClick } = useHandleConnect()
    return (
        <EmptyState
            title={'Connection Failed'}
            description={
                'Connecting to wallet failed. Try again or go back to try with a new wallet.'
            }
            icon={'danger-skull-duo-solid'}
        >
            <Button
                //can add onclick and isLoading
                className="w-full md:w-fit"
                variant="primary"
                onClick={(e) => lastConnected && handleConnectClick(e, lastConnected)}
            >
                Retry {lastConnected?.name || 'NA'}
            </Button>
            <Button
                //can add onclick and isLoading
                className="w-full md:w-fit no-underline"
                variant="link"
            >
                Go Back
            </Button>
        </EmptyState>
    )
}

export default ConnectionFailed
