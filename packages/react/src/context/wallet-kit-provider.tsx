import { WalletProvider } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'
import { AnimatePresence, MotionDiv } from '../lib/framer.js'
import { ModalWallet } from '../components/index.js'
import { WalletKitContext } from '../utils/provider.js'
import { WalletKitValueProvider } from './wallet-kit-value-provider.js'
import type { WalletKitConfig } from '../config.js'
import type { WalletAdapter, WalletError } from '@solana/wallet-adapter-base'
import type { WalletKitContextState } from '../utils/default.js'

// Define the props expected by the WalletKitProvider component.
interface WalletKitProviderProps {
    config: WalletKitConfig // Configuration options for the wallet provider.
    children: React.ReactNode // Children components that will have access to the wallet context.
    onSignInMessage: WalletKitContextState['onSignInMessage']
}

// Component to provide wallet connections to the application.
export const WalletKitProvider = ({
    config,
    children,
    onSignInMessage,
}: WalletKitProviderProps) => {
    const [open, setOpen] = useState<boolean>(false)

    const [error, setError] = useState<WalletError | null>(null)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [lastConnected, setLastConnected] = useState<WalletAdapter | null>(null)

    const onClose = () => {
        setLastConnected(null)
        setError(null)
        setOpen(false)
    }
    const onOpen = () => {
        setLastConnected(null)
        setError(null)
        setOpen(true)
    }

    return (
        <WalletKitContext.Provider
            value={{
                onSignInMessage,
                onClose,
                onOpen,
                toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),
                setLastConnected: (e) => setLastConnected(e),
                open,
                error,
                theme,
                lastConnected,
                setError: (e) => setError(e),
                withSignIn: config.withSignIn,
                messageToSign: config.messageToSign,
            }}
        >
            <WalletProvider
                autoConnect={config.autoConnect} // Automatically connect to the wallet on load, if configured.
                onError={(e) => {
                    // Setting Error
                    setError(e)
                }}
                wallets={[]} // Pass formatted or original wallets array based on the formattedWallet prop.
            >
                <WalletKitValueProvider>
                    <MotionDiv
                        layout
                        // key={key}
                        style={{
                            // width: isMobileDevice ? '100%' : '400px',
                            maxWidth: '100vw',
                        }}
                    >
                        <div>
                            <AnimatePresence mode="wait">
                                <MotionDiv
                                    layout
                                    // animate on acitveslide change

                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col justify-center items-center text-center w-full max-w-[330px] gap-2"
                                >
                                    <ModalWallet onClose={onClose} onOpen={onOpen} open={open} />
                                </MotionDiv>
                            </AnimatePresence>
                        </div>
                    </MotionDiv>
                    {children}
                </WalletKitValueProvider>
            </WalletProvider>
        </WalletKitContext.Provider>
    )
}
