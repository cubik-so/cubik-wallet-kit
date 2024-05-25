import { useWalletKit } from '../context/wallet-kit-value-provider'
import { useWalletKitContext } from '../utils/provider'
import { AnimatePresence } from '../lib/framer'
import { MotionDiv } from '../lib/framer'
import RequestingConnection from './requesting-connection'
import WalletOptions from './wallet-options'
import ConnectionFailed from './connection-failed'

export const MainScreen = () => {
    const { connected, connecting, disconnecting } = useWalletKit()

    const { error } = useWalletKitContext()

    if (!connected && !connecting && !disconnecting && !error) {
        return <WalletOptions />
    }
    if (connecting && !disconnecting && !error) {
        return (
            <AnimatePresence mode="wait">
                <MotionDiv
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-center items-center text-center w-full max-w-[330px] gap-2"
                >
                    <RequestingConnection />
                </MotionDiv>
            </AnimatePresence>
        )
    }

    if (error) {
        return (
            <MotionDiv
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-center items-center text-center w-full max-w-[330px] gap-2"
            >
                <ConnectionFailed />
            </MotionDiv>
        )
    }
    return <></>
}
