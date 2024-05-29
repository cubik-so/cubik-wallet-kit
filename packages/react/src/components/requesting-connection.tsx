import React from 'react'
import { Avatar } from '@squaress/ui/avatar'
import { Button, Text } from '../lib/ui/index.js'
import { useWalletKitContext } from '../utils/provider.js'

const RequestingConnection = () => {
    const { lastConnected } = useWalletKitContext()
    return (
        <>
            <div
                className={`mx-auto w-fit rounded-full flex flex-col gap-4 items-center max-w-[280px] md:max-w-[360px] py-10 md:py-16`}
            >
                <Avatar
                    src={lastConnected?.icon as string}
                    alt={'wallet adapter'}
                    size={'xl'}
                    variant={'square'}
                />
                <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
                    <Text color="primary" className="b1-heavy md:b2-heavy">
                        Requesting Connection
                    </Text>

                    <Text color="tertiary" className="b4-light">
                        Click on the connect wallet button in the wallet popup or open the wallet.
                    </Text>
                </div>

                <div className=" w-full flex items-center gap-2 flex-col">
                    <Button
                        variant="secondary"
                        isLoading={true}
                        className="w-full"
                        loadingText="Connecting"
                    ></Button>

                    <Button onClick={() => {}} size="md" variant="tertiary">
                        Connect another wallet
                    </Button>
                </div>
            </div>
        </>
    )
}

export default RequestingConnection
