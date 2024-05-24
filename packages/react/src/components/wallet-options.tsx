import Icon from '@squaress/ui/icons'
import React, { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletKit } from '../context/wallet-kit-value-provider'
import { Divider, Text } from '../lib/ui'
import { AnimatePresence, MotionButton, MotionDiv, motion } from '../lib/framer'
import { useFormattedWallet } from '../hooks/useFormatWallet'
import { useHandleConnect } from '../hooks/handle-connect'
import { WalletIcon } from './wallet-icon'
import type { WalletAdapter } from '@solana/wallet-adapter-base'

const FooterComponent = ({ text, icon }: { icon: string; text: string }) => {
    return (
        <div className="flex item-start gap-2 space-x-3">
            <div className="min-w-[18px] md:pt-[3px]">
                <Icon
                    name={icon}
                    color="var(--color-fg-primary-subdued)"
                    width={18}
                    height={18}
                    strokeWidth={1.5}
                />
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

    let containerWidth = '410px'
    if (isMobileDevice) {
        containerWidth = '100%'
    } else {
        if (showMore) {
            containerWidth = '510px'
        }
    }

    return (
        <MotionDiv
            layout
            className="rounded-xl bg-[var(--modal-body-surface)] overflow-hidden "
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
                    <Text color="primary" className="text-[var(--color-fg-primary-depth)] h6">
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
                        <Icon
                            name="cross"
                            width={20}
                            color="var(--modal-header-cancel-icon)"
                            height={20}
                        />
                    </motion.button>
                </MotionDiv>
                {/* Modal body */}
                <AnimatePresence mode="wait">
                    <MotionDiv
                        layout
                        className={`z-0 no-scrollbar flex flex-row justify-start items-center py-2`}
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
                                    icon={'eye-open2'}
                                />
                                <FooterComponent
                                    text={'Transparent, audited and Open Source'}
                                    icon={'shield-check'}
                                />
                                <FooterComponent
                                    text={'Trusted by 2,500+ Users'}
                                    icon={'user-love'}
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
