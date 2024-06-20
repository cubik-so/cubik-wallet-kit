import React, { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { useWalletKit } from '../context/wallet-kit-value-provider.js'
import { Divider, Text } from '../lib/ui/index.js'
import { AnimatePresence, MotionDiv, motion } from '../lib/framer.js'
import { useFormattedWallet } from '../hooks/useFormatWallet.js'
import { useHandleConnect } from '../hooks/handle-connect.js'

import { WalletIcon } from './wallet-icon.js'
import type { ReactNode } from 'react'
import type { WalletAdapter } from '@solana/wallet-adapter-base'

const FooterComponent = ({ text, icon }: { icon: ReactNode; text: string }) => {
    return (
        <div className="flex items-center gap-2 space-x-3">
            <div className="min-w-[18px] md:pt-[3px]">
                {/* <Icon
                    name={icon}
                    color="var(--color-fg-primary-subdued)"
                    width={18}
                    height={18}
                    strokeWidth={1.5}
                /> */}
                {icon}
            </div>
            <Text className="l1-light md:l2-light" color="tertiary">
                {text}
            </Text>
        </div>
    )
}

const WalletOptions = () => {
    const { wallet } = useWalletKit()
    const wallets = useFormattedWallet()
    console.log(wallets)
    const isMobileDevice = useMediaQuery('(max-width: 768px)')
    const [showMore, setShowMore] = useState<boolean>(false)
    const { handleConnectClick } = useHandleConnect()

    const renderWallets = (walletsAvailable: WalletAdapter[]) =>
        walletsAvailable.map((adapter, idx) => (
            <div
                key={idx}
                className="cursor-pointer pointer-events-auto w-fit"
                onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    handleConnectClick(event, adapter)
                }}
            >
                <WalletIcon wallet={adapter} />
            </div>
        ))

    let containerWidth = '100%'
    if (isMobileDevice) {
        containerWidth = '100%'
    } else {
        if (showMore) {
            containerWidth = '100%'
        }
    }

    return (
        <MotionDiv
            layout
            className="rounded-xl bg-[var(--modal-body-surface)] overflow-hidden px-2"
            style={{
                width: containerWidth,
                height: 'fit-content',
            }}
        >
            <>
                {/* Modal header */}
                <MotionDiv
                    layout
                    className="md:flex hidden w-full justify-between items-center h-[48px] px-[24px]"
                >
                    <Text color="primary" className="text-[var(--color-fg-primary-depth)] h6 px-2">
                        Connect Wallet
                    </Text>
                    <motion.button
                        whileHover={{
                            scale: 1,
                            backgroundColor: 'var(--color-surface-primary-transparent)',
                        }}
                        whileTap={{ scale: 0.85, backgroundColor: 'transparent' }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 17,
                            duration: 2,
                        }}
                        className="pointer-events-auto p-1 rounded-md"
                        // onClick={onClose}
                    >
                        {/* <Icon
                            name="cross"
                            width={20}
                            color="var(--modal-header-cancel-icon)"
                            height={20}
                        /> */}
                    </motion.button>
                </MotionDiv>
                {/* Modal body */}
                <AnimatePresence mode="wait">
                    <MotionDiv
                        layout
                        className={`z-0 no-scrollbar flex flex-row justify-start items-center py-2 w-full mx-auto`}
                        style={{
                            flexWrap: isMobileDevice && !showMore ? 'nowrap' : 'wrap',
                            maxHeight: '320px',
                            overflowY: 'scroll',
                        }}
                    >
                        {renderWallets(wallets)}
                        {isMobileDevice ? renderWallets(wallets) : <></>}
                    </MotionDiv>
                </AnimatePresence>
                <AnimatePresence initial={false}>
                    {/* Optional footer */}
                    {showMore ? (
                        <div className="z-1 flex flex-col gap-6 ">
                            <MotionDiv
                                layout
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 100 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 25,
                                    opacity: { duration: 0.4 },
                                    y: { duration: 0.2 },
                                }}
                                style={{
                                    cursor: 'pointer',
                                    height: '64px',
                                }}
                                className="flex items-center justify-center"
                                onClick={() => setShowMore(false)}
                            >
                                <Text className="b3 md:b4-light" color="secondary">
                                    Show less
                                </Text>
                            </MotionDiv>
                        </div>
                    ) : (
                        <MotionDiv
                            layout
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 25,
                                opacity: { duration: 0.3 },
                                y: { duration: 0.2 },
                            }}
                            className="flex flex-col gap-6"
                        >
                            <Divider />

                            <div className="flex flex-col py-2 gap-4 px-2">
                                <FooterComponent
                                    text={
                                        'View only permissions. We will never do anything without your approval.'
                                    }
                                    icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M3 14C3 11.8125 5.7 7 12 7C18.3 7 21 11.8125 21 14M15 14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14Z"
                                                stroke="var(--color-fg-primary-subdued)"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    }
                                />
                                <FooterComponent
                                    text={'Transparent, audited and Open Source'}
                                    icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M9.1334 12.0191L11.1401 14.0237C12.1242 12.303 13.499 10.8499 15.1334 9.73381M10.8837 2.36804L5.4961 4.31356C4.34691 4.72854 3.56421 5.799 3.51725 7.01992L3.39 10.3285C3.23232 14.4282 5.36929 18.2749 8.93337 20.3071L10.454 21.1741C11.3549 21.6878 12.4571 21.6998 13.3689 21.2059L14.8575 20.3995C18.6748 18.3318 20.9189 14.2123 20.586 9.88366L20.359 6.93316C20.2685 5.7566 19.4967 4.74238 18.3868 4.34159L12.9216 2.36804C12.2631 2.13025 11.5422 2.13025 10.8837 2.36804Z"
                                                stroke="var(--color-fg-primary-subdued)"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    }
                                />
                                <FooterComponent
                                    text={'Trusted by 2,500+ Users'}
                                    icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M10.4023 21H6C4.89543 21 4 20.1046 4 19C4 16.7909 5.79086 15 8 15H9.21484M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM17 21.3193C16.6 21.3193 13 19.375 13 16.6528C13 15.2918 14.2 14.3196 15.4 14.3196C15.9896 14.3196 16.6 14.514 17 15.0973C17.4 14.514 18 14.3111 18.6 14.3196C19.8 14.3365 21 15.2918 21 16.6528C21 19.375 17.4 21.3193 17 21.3193Z"
                                                stroke="var(--color-fg-primary-subdued)"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    }
                                />
                            </div>
                            <div />
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </>
        </MotionDiv>
    )
}

export default WalletOptions
