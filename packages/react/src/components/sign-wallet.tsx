import { useState } from 'react'
import { utils } from '@coral-xyz/anchor'
import { toast } from '@squaress/ui/toast'
import { Button, EmptyState } from '../lib/ui'
import { useWalletKit } from '../context/wallet-kit-value-provider'
import { useWalletKitContext } from '../utils/provider'

const SignWallet = () => {
    const [signing, setSigning] = useState(false)
    const [signError, setSignError] = useState(false)
    const { signMessage, connected } = useWalletKit()
    const { onClose, setError, messageToSign, onSignInMessage } = useWalletKitContext()

    const verifySignature = async () => {
        setSigning(true)
        if (!signMessage || !connected) {
            throw new Error('Sign message is undefined')
        }
        try {
            const data = new TextEncoder().encode(messageToSign || '')

            const sigBuffer = await signMessage(data)
            const signature = utils.bytes.bs58.encode(sigBuffer)
            if (signature) {
                onSignInMessage(signature)
                setSigning(false)
                onClose()
            }
        } catch (error) {
            setSignError(true)
            setSigning(false)
            toast.error('Signature failed')
            console.log(error)
        }
    }
    if (signError) {
        return (
            <EmptyState
                title={'Connection Failed'}
                description={
                    'You have rejected the connection request or it has failed due to some reason. Please try again!'
                }
                icon={'danger-skull-duo-solid'}
            >
                <Button
                    className="w-full md:w-fit"
                    variant="primary"
                    isLoading={signing}
                    onClick={verifySignature}
                    leftIconName="rotate-right"
                    loadingText="Signing"
                >
                    Retry
                </Button>
                <Button
                    onClick={() => setError(null)}
                    //can add onclick and isLoading
                    className="w-full md:w-fit no-underline"
                    variant="link"
                >
                    Go Back
                </Button>
            </EmptyState>
        )
    }

    return (
        <EmptyState
            title={'Verify Wallet'}
            description={
                'Sign a mesasge in your connected wallet to confirm ownership of the wallet.'
            }
            icon={'wallet-link-duo-solid'}
            iconColor="var(--color-fg-info-base)"
            bgColor="var(--color-surface-info-transparent)"
        >
            <Button
                //can add onclick and isLoading
                className="w-full md:w-fit"
                variant="primary"
                isLoading={signing}
                onClick={verifySignature}
            >
                Sign & Confirm
            </Button>
            <Button
                onClick={() => setError(null)}
                //can add onclick and isLoading
                className="w-full md:w-fit no-underline"
                variant="link"
            >
                Go Back
            </Button>
        </EmptyState>
    )
}

export default SignWallet