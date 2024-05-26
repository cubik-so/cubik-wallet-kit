import { useState } from 'react'
import { utils } from '@coral-xyz/anchor'
import { Button, EmptyState } from '../lib/ui'
import { createMessage } from '../utils/createMessage'
import { useWalletKit } from '../context/wallet-kit-value-provider'
import { useWalletKitContext } from '../utils/provider'

export const generateSession = async (nonce: string) => {
    const hash = nonce + process.env.SECRET?.slice(0, 10)
    const final = utils.sha256.hash(hash)
    return final
}

const SignWallet = () => {
    const [signing, setSigning] = useState(false)
    const { signMessage } = useWalletKit()
    const { onClose, setError } = useWalletKitContext()

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
                onClick={async (e) => {
                    setSigning(true)
                    //  if (!signMessage || !publicKey) {
                    //      throw new Error('Sign message is undefined')
                    //  }
                    const nonce = Math.random().toString(36).substring(2, 15)
                    const message = await generateSession(nonce)
                    const msg = createMessage(message)
                    if (!msg) {
                        throw new Error('Message is undefined')
                    }
                    const sigBuffer = await signMessage(msg)
                    const signature = utils.bytes.bs58.encode(sigBuffer)
                    console.log('signature', signature)
                    if (signature) {
                        setSigning(false)
                        onClose()
                    }
                }}
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
