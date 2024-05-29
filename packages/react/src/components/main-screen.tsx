import { useWalletKit } from '../context/wallet-kit-value-provider.js'
import { useWalletKitContext } from '../utils/provider.js'
import { AnimatePresence } from '../lib/framer.js'
import { MotionDiv } from '../lib/framer.js'
import RequestingConnection from './requesting-connection.js'
import WalletOptions from './wallet-options.js'
import ConnectionFailed from './connection-failed.js'
import SignWallet from './sign-wallet.js'

export const MainScreen = () => {
    const { connected, connecting, disconnecting } = useWalletKit()

    const { error, withSignIn } = useWalletKitContext()

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

    if (error && !connected) {
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

    if (connected && withSignIn) {
        return (
            <>
                {/*
          sign in state
            */}
                <SignWallet />
            </>
        )
    }

    return <></>
}
