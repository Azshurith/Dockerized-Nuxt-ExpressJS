import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    userId: number
    username: string
    exp: number
}

export const useAuthUser = () => {
    const token = useCookie<string | null>('token', { watch: true })
    const user = computed(() => {
        if (!token.value) return null
        try {
            const decoded = jwtDecode<DecodedToken>(token.value)
            return { username: decoded.username }
        } catch {
            return null
        }
    })

    return { user }
}
