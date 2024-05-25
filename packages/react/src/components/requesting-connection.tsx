import React from 'react'
import { Button, EmptyState, Text } from '../lib/ui'
import { useWalletKitContext } from '../utils/provider'
import { Avatar } from '@squaress/ui/avatar'
import Icon from '@squaress/ui/icons'

const RequestingConnection = () => {
    const { lastConnected } = useWalletKitContext()
    return (
        <>
            <div className={`mx-auto w-fit rounded-full`}>
                <Avatar
                    src={lastConnected?.icon as string}
                    alt={'wallet adapter'}
                    size={'xl'}
                    variant={'square'}
                />

                <div className=" w-full flex items-center gap-2 flex-col">
                    <Button
                        className="w-full"
                        size="xl"
                        variant="secondary"
                        isLoading={true}
                        onClick={() => {}}
                    >
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                gap: '8px',
                            }}
                        >
                            <Text className="l1-heavy">Connecting</Text>
                        </span>
                    </Button>
                    <Button onClick={() => {}} size="md" variant="tertiary">
                        Connect another wallet
                    </Button>
                    {/* ) : (
                        ''
                      )}
                    </AnimatePresence> */}
                </div>
            </div>
        </>
        // <EmptyState
        //     title={'Requesting Connetion...'}
        //     description={
        //         'Click on the connect wallet button in the wallet popup or open the wallet'
        //     }
        //     icon={'wallet-plus-duo-solid'}
        //     iconColor="var(--color-fg-info-base)"
        //     bgColor="var(--color-surface-info-transparent)"
        // >
        //     <Button
        //         //can add onclick and isLoading
        //         className="w-full md:w-fit"
        //         variant="primary"
        //     >
        //         Loading
        //     </Button>
        // </EmptyState>
    )
}

export default RequestingConnection
