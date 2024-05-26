import { WalletProvider } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'
import { AnimatePresence, MotionDiv } from '../lib/framer'
import { ModalWallet } from '../components'
import { WalletKitContext } from '../utils/provider'
import { WalletKitValueProvider } from './wallet-kit-value-provider'
import type { WalletKitConfig } from '../config'
import type { WalletAdapter, WalletError } from '@solana/wallet-adapter-base'

// Define the props expected by the WalletKitProvider component.
interface WalletKitProviderProps {
    config: WalletKitConfig // Configuration options for the wallet provider.
    children: React.ReactNode // Children components that will have access to the wallet context.
    onSignInMessage: (message: string) => void
}

// Component to provide wallet connections to the application.
export const WalletKitProvider = ({ config, children }: WalletKitProviderProps) => {
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
                    <ModalWallet onClose={onClose} onOpen={onOpen} open={open} />
                    <MotionDiv
                        layout
                        // key={key}
                        style={{
                            // width: isMobileDevice ? '100%' : '400px',
                            maxWidth: '100vw',
                        }}
                    >
                        <div className="w-full bg-[var(--modal-body-surface)] rounded-xl px-6 py-10 pb-6 flex flex-col items-center justify-center gap-6 md:gap-8">
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
                                    {children}
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
