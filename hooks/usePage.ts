import { useRouter } from "next/router"

type Page = 'albums' | 'tracks'

export const usePage = (page: Page): boolean => {
    const router = useRouter()
    return router.pathname.includes(page)
} 
