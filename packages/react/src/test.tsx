import { useWalletKit } from './context/wallet-kit-value-provider'
import type { Wallet } from 'core'

interface Props {
    wallets: any[]
}

export const TestCard = ({ wallets }: Props) => {
    console.log(wallets)
    const data = useWalletKit()
    return (
        <>
            {wallets.map((e, index) => {
                return (
                    <button
                        onClick={async () => {
                            data.select(e.name)

                            await data.connect()
                        }}
                        key={e.name}
                    >
                        {e.wallet}
                    </button>
                )
            })}
        </>
    )
}
