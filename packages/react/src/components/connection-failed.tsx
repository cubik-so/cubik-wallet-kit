import Icon from '@squaress/ui/icons'

import { useMediaQuery } from 'usehooks-ts'
import { Button, EmptyState, Text } from '../lib/ui/index.js'
import { useHandleConnect } from '../hooks/handle-connect.js'
import { useWalletKitContext } from '../utils/provider.js'
import { useWalletKit } from '../context/wallet-kit-value-provider.js'
import { AnimatePresence, MotionDiv } from '../lib/framer.js'

const ConnectionFailed = () => {
    const { lastConnected, setError } = useWalletKitContext()
    const { connecting } = useWalletKit()
    const { handleConnectClick } = useHandleConnect()
    const isMobileDevice = useMediaQuery('only screen and (max-width : 768px)')
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
                        <Text className="h4" color={'primary'}>
                            Connection Failed
                        </Text>
                        <Text
                            className="px-4 md:l2-light l1-light max-w-[330px]"
                            color={'secondary'}
                        >
                            You have rejected the connection request or it has failed due to some
                            reason. Please try again!
                        </Text>
                    </MotionDiv>
                </AnimatePresence>
                <div className="w-full flex items-center gap-2 flex-col">
                    <Button
                        className="w-full"
                        variant="secondary"
                        isLoading={connecting}
                        onClick={(e) => lastConnected && handleConnectClick(e, lastConnected)}
                        leftIconName="rotate-right"
                        loadingText="Connecting"
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
    )
}

export default ConnectionFailed
