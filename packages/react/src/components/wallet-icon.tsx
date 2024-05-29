'use client'

import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Avatar } from '@squaress/ui/avatar'
import { useMediaQuery } from 'usehooks-ts'
import { Spinner } from '@squaress/ui/spinner'
import { Text } from '@squaress/ui/text'
import { useWalletKitContext } from '../utils/provider.js'
import type { Adapter, WalletName } from '@solana/wallet-adapter-base'
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

export interface WalletIconProps
    extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    wallet: Adapter | null
}

export const WalletIcon = ({ wallet }: WalletIconProps) => {
    //const [hasError, setHasError] = React.useState(false);
    const { theme } = useWalletKitContext()
    const [isHovered, setIsHovered] = useState(false)
    const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')
    const hoverTimeoutRef = useRef<any>(null) // the connect text is only shown if user hovers for more than 600ms on the wallet icon

    const handleMouseEnter = () => {
        // Set a timeout to change the state after 1 second
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovered(true)
        }, 800)
    }

    const handleMouseLeave = () => {
        // Clear the timeout if it exists
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
        }
        setIsHovered(false)
    }

    // const onError = useCallback(() => setHasError(true), []);
    const variants = {
        initial: {
            opacity: 0,
            y: -4,
            transition: {
                delay: 1,
                duration: 0.2, // Duration of 0.3 seconds
                ease: [0.17, 0.67, 0.83, 0.67], // Easing function for the animation
            },
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.17, 0.67, 0.83, 0.67],
            },
        },
        exit: {
            opacity: 0,
            y: 4,
            transition: {
                duration: 0.3,
                ease: 'easeIn',
            },
        },
    }

    const glareVariants = {
        initial: { x: '-100%' },
        animate: {
            x: '100%',
            transition: { duration: 0.8, ease: 'easeInOut' },
        },
    }

    const ledgerLogo =
        'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/120ba1ba-2a48-4030-a74d-096e88174300/public'
    const walletConnectLogo =
        'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/a9fb3d4f-d423-4f6f-be3b-3298717f0b00/public'
    const KeystoneLogo =
        'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/27e8a706-afc1-48c1-8c1f-c927aa314c00/public'

    const getWalletLogo = (logo: string, name: string) => {
        if (name === 'Ledger') {
            return ledgerLogo
        } else if (name === 'WalletConnect') {
            return walletConnectLogo
        } else if (name === 'Keystone') {
            return KeystoneLogo
        } else {
            return logo
        }
    }

    const changeWalletName = (adapterName: string) => {
        if (adapterName === 'Google via TipLink') {
            return 'TipLink' as WalletName<'TipLink'>
        }
        if (adapterName === 'Ethereum Wallet') {
            return 'Ethereum' as WalletName<'Ethereum'>
        }
        if (adapterName === 'Coinbase Wallet') {
            return 'Coinbase' as WalletName<'Coinbase'>
        }

        return adapterName as WalletName
    }
    if (wallet && wallet.icon) {
        // && !hasError
        return (
            <div
                style={{
                    width: 'clamp(92px, 16vw, 102px)',
                    height: '100px',
                    //  position: 'relative',
                    //  overflow: 'hidden',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex flex-col transform active:scale-95 items-center justify-center gap-2 w-fit"
            >
                {/* Glare Effect */}

                {/* Wallet icon */}
                {wallet.connecting ? (
                    <div className="w-12 h-12 flex justify-center items-center">
                        <Spinner color="black" />
                    </div>
                ) : (
                    <div className="relative overflow-visible">
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    key={`glare-${wallet.name}`} // Ensure key is unique for each wallet icon
                                    className="absolute z-1 top-0 left-0 right-0 bottom-0"
                                    variants={glareVariants}
                                    initial="initial"
                                    animate="animate"
                                    style={{
                                        zIndex: 1,
                                        background:
                                            theme === 'dark'
                                                ? ''
                                                : 'linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <Avatar
                            alt={wallet.name}
                            layoutId={wallet.name}
                            src={getWalletLogo(wallet.icon, wallet.name)}
                            size={isSmallDevice ? 'lg' : 'md'}
                        />
                    </div>
                )}
                {/*animated text */}
                <AnimatePresence mode="wait" initial={false}>
                    {isHovered ? (
                        <motion.span
                            layout
                            key={'connect - ' + wallet.name}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <Text className="b3 md:b4-light line-clamp-1" color={'primary'}>
                                Connect
                            </Text>
                        </motion.span>
                    ) : (
                        <motion.span
                            layout
                            key={'wallet - ' + wallet.name}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={{
                                maxWidth: '84px',
                                overflow: 'hidden',
                            }}
                        >
                            <Text className="b3 md:b4-light line-clamp-1" color={'primary'}>
                                {changeWalletName(wallet.name)}
                            </Text>
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        )
    } else {
        return <div>?</div>
    }
}
