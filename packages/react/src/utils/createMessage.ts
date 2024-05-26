export const createMessage = (hash: string) => {
    try {
        const message = `Welcome to Cubik\n
The genesis for leading Solana Initiatives \n
By signing this message you agree to the teams and conditions 🌱 \n
session: ${hash}\n`

        const data = new TextEncoder().encode(message)
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}
