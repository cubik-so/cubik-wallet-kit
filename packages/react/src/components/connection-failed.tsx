import { Button, EmptyState } from '../lib/ui'
import { useHandleConnect } from '../hooks/handle-connect'
import { useWalletKitContext } from '../utils/provider'
import { useWalletKit } from '../context/wallet-kit-value-provider'

const ConnectionFailed = () => {
    const { lastConnected, setError } = useWalletKitContext()
    const { connecting } = useWalletKit()
    const { handleConnectClick } = useHandleConnect()
    return (
        <EmptyState
            title={'Connection Failed'}
            description={
                'You have rejected the connection request or it has failed due to some reason. Please try again!'
            }
            icon={'danger-skull-duo-solid'}
        >
            <Button
                //can add onclick and isLoading
                className="w-full md:w-fit"
                variant="primary"
                isLoading={connecting}
                onClick={(e) => lastConnected && handleConnectClick(e, lastConnected)}
                leftIconName="rotate-right"
                loadingText="Connecting"
            >
                Retry
            </Button>
            <Button
                onClick={() => setError(null)}
                //can add onclick and isLoading
                className="w-full md:w-fit no-underline"
                variant="link"
            >
                Go Back
            </Button>
        </EmptyState>
    )
}

export default ConnectionFailed
