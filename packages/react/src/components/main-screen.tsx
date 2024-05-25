import { useWalletKit } from '../context/wallet-kit-value-provider'
import { useWalletKitContext } from '../utils/provider'
import RequestingConnection from './requesting-connection'
import WalletOptions from './wallet-options'
import ConnectionFailed from './connection-failed'

export const MainScreen = () => {
    const { connected, connecting, disconnecting } = useWalletKit()

    const { error } = useWalletKitContext()

    if (!connected && !connecting && !disconnecting && !error) {
        return <WalletOptions />
    }
    if (connecting && !disconnecting && !error) {
        return <RequestingConnection />
    }

    if (error) {
        return <ConnectionFailed />
    }
    return <></>
}
