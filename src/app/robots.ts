const baseUrl = 'https://dir-diare.vercel.app'

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
