import { useState } from 'react'
import { utils } from '@coral-xyz/anchor'
import { toast } from '@squaress/ui/toast'
import { useMediaQuery } from 'usehooks-ts'
import Icon from '@squaress/ui/icons'

import { Button, Text } from '../lib/ui/index.js'
import { useWalletKit } from '../context/wallet-kit-value-provider.js'
import { useWalletKitContext } from '../utils/provider.js'
import { AnimatePresence, MotionDiv } from '../lib/framer.js'

const SignWallet = () => {
    const isMobileDevice = useMediaQuery('only screen and (max-width : 768px)')

    const [signing, setSigning] = useState(false)
    const [signError, setSignError] = useState(false)
    const { signMessage, connected, publicKey } = useWalletKit()
    const { onClose, setError, messageToSign, onSignInMessage } = useWalletKitContext()

    const verifySignature = async () => {
        setSigning(true)
        if (!signMessage || !connected || !publicKey) {
            throw new Error('Sign message is undefined')
        }
        try {
            const timeStamp = Date.now()
            const message =
                messageToSign +
                `
              wallet:${publicKey?.toBase58()}
              timestamp:${timeStamp}
              `
            const data = new TextEncoder().encode(message)
            const sigBuffer = await signMessage(data)

            const signature = utils.bytes.bs58.encode(sigBuffer)

            if (signature) {
                onSignInMessage({
                    sig: signature,
                    timeStamp: timeStamp,
                    wallet: publicKey?.toBase58(),
                    message: message,
                })
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
            <MotionDiv
                layout
                // key={key}
                style={{
                    width: isMobileDevice ? '100%' : '380px',
                }}
            >
                {isMobileDevice}
                <div className="w-full h-fit bg-[var(--modal-body-surface)] rounded-xl px-4 py-8 flex flex-col items-center justify-center gap-4">
                    <MotionDiv
                        className={`mx-auto w-fit rounded-full bg-[var(--color-surface-negative-transparent)] p-4`}
                    >
                        <Icon
                            name={'wallet-reload-duo-solid'}
                            width={44}
                            height={44}
                            strokeWidth={1.8}
                            color={'var(--color-fg-negative-base)'}
                        />
                    </MotionDiv>
                    <AnimatePresence mode="wait">
                        <MotionDiv
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col justify-center items-center text-center w-full max-w-[330px] gap-2"
                        >
                            <Text className="h3 md:h4" color={'primary'}>
                                Connection Failed
                            </Text>
                            <Text
                                className="px-4 md:l2-light l1-light max-w-[330px]"
                                color={'secondary'}
                            >
                                You have rejected the connection request or it has failed due to
                                some reason. Please try again!
                            </Text>
                        </MotionDiv>
                    </AnimatePresence>
                    <div className="w-full flex items-center gap-2 flex-col">
                        <Button
                            className="w-full"
                            variant="secondary"
                            isLoading={signing}
                            onClick={verifySignature}
                            leftIconName="rotate-right"
                            loadingText="Signing"
                            size="xl"
                        >
                            Retry
                        </Button>
                        <Button
                            onClick={() => setError(null)}
                            //can add onclick and isLoading
                            className="w-full text-color-fg-primary-subdued"
                            variant="unStyled"
                        >
                            Go Back
                        </Button>
                    </div>
                </div>
            </MotionDiv>
            // <EmptyState
            //     title={'Connection Failed'}
            //     description={
            //         'You have rejected the connection request or it has failed due to some reason. Please try again!'
            //     }
            //     icon={'danger-skull-duo-solid'}
            //     className="!md:py-0 px-4"
            // >
            //     <Button
            //         className="w-full"
            //         variant="secondary"
            //         isLoading={signing}
            //         onClick={verifySignature}
            //         leftIconName="rotate-right"
            //         loadingText="Signing"
            //         size="xl"
            //     >
            //         Retry
            //     </Button>
            //     <Button
            //         onClick={() => setError(null)}
            //         //can add onclick and isLoading
            //         className="w-full text-color-fg-primary-subdued"
            //         variant="unStyled"
            //     >
            //         Go Back
            //     </Button>
            // </EmptyState>
        )
    }

    return (
        <MotionDiv
            layout
            // key={key}
            style={{
                width: isMobileDevice ? '100%' : '380px',
            }}
        >
            {isMobileDevice}
            <div className="w-full h-fit bg-[var(--modal-body-surface)] rounded-xl px-4 py-8 flex flex-col items-center justify-center gap-4">
                <MotionDiv
                    className={`mx-auto w-fit rounded-full bg-[var(--color-surface-innovative-transparent)] p-4`}
                >
                    <Icon
                        name={'wallet-link-duo-solid'}
                        width={44}
                        height={44}
                        strokeWidth={1.8}
                        color={'var(--color-fg-innovative-base)'}
                    />
                </MotionDiv>
                <AnimatePresence mode="wait">
                    <MotionDiv
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col justify-center items-center text-center w-full max-w-[330px] gap-2"
                    >
                        <Text className="h3 md:h4" color={'primary'}>
                            Verify Wallet
                        </Text>
                        <Text
                            className="px-4 md:l2-light l1-light max-w-[330px]"
                            color={'secondary'}
                        >
                            Sign a message in your connected wallet to confirm ownership of the
                            wallet.
                        </Text>
                    </MotionDiv>
                </AnimatePresence>
                <div className="w-full flex items-center gap-2 flex-col">
                    <Button
                        //can add onclick and isLoading
                        className="w-full"
                        variant="secondary"
                        isLoading={signing}
                        onClick={verifySignature}
                        size="xl"
                    >
                        Sign & Confirm
                    </Button>
                    <Button
                        onClick={() => setError(null)}
                        //can add onclick and isLoading
                        className="w-full text-color-fg-primary-subdued"
                        variant="unStyled"
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        </MotionDiv>
    )
}

export default SignWallet
