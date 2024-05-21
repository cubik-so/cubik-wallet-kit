import React from 'react'
import { Button, EmptyState } from 'lib/ui'

const ConfirmWallet = () => {
    return (
        <EmptyState
            title={'Confirm Wallet'}
            description={
                'Sign a message in your connected wallet to confirm ownership of the wallet.'
            }
            icon={'SmartContractDuoSolid'}
        >
            <Button
                //can add onclick and isLoading
                className="w-full md:w-fit"
                variant="primary"
            >
                Sign & Confirm
            </Button>
        </EmptyState>
    )
}

export default ConfirmWallet
