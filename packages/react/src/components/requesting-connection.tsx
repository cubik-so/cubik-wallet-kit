import React from 'react'
import { Button, EmptyState } from '../lib/ui'

const RequestingConnection = () => {
    return (
        <EmptyState
            title={'Requesting Connetion...'}
            description={
                'Click on the connect wallet button in the wallet popup or open the wallet'
            }
            icon={'wallet-plus-duo-solid'}
            iconColor="var(--color-fg-info-base)"
            bgColor="var(--color-surface-info-transparent)"
        >
            <Button
                //can add onclick and isLoading
                className="w-full md:w-fit"
                variant="primary"
            >
                Loading
            </Button>
        </EmptyState>
    )
}

export default RequestingConnection
