export interface UnsplashPhoto {
    id: string
    description: string | null
    alt_description: string | null
    width: number
    height: number
    created_at: string
    urls: {
        raw: string
        full: string
        regular: string
        small: string
        thumb: string
    }
    links: {
        html: string
        download: string
    }
    location: {
        name: string | null
        city: string | null
        country: string | null
    } | null
    likes: number
    views: number
}
