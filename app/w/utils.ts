import fs from 'fs'
import path from 'path'

type Metadata = {
    title: string
    publishedAt: string
    summary: string
    tag: string
    image?: string
}

export function parseFrontmatter(fileContent: string) {
    let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
    let match = frontmatterRegex.exec(fileContent)
    let frontMatterBlock = match![1]
    let content = fileContent.replace(frontmatterRegex, '').trim()
    let frontMatterLines = frontMatterBlock.trim().split('\n')
    let metadata: Partial<Metadata> = {}

    frontMatterLines.forEach((line) => {
        let [key, ...valueArr] = line.split(': ')
        let value = valueArr.join(': ').trim()
        value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
        metadata[key.trim() as keyof Metadata] = value
    })

    return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath) {
    let rawContent = fs.readFileSync(filePath, 'utf-8')
    return parseFrontmatter(rawContent)
}

function getMDXData(dir) {
    let mdxFiles = getMDXFiles(dir)
    return mdxFiles.map((file) => {
        let { metadata, content } = readMDXFile(path.join(dir, file))
        let slug = path.basename(file, path.extname(file))

        return {
            metadata,
            slug,
            content,
        }
    })
}

export function getBlogPosts() {
    return getMDXData(path.join(process.cwd(), 'content'))
}


export function formatDate(
    date: string, 
    includeRelative = false, 
    format: 'short' | 'long' | 'month-date' | 'short-month-date' = 'short'
) {
    if (!date.includes('T')) {
        date = `${date}T00:00:00`
    }
    let targetDate = new Date(date)

    const formatOptions: Intl.DateTimeFormatOptions = {
        month: format === 'short' || format === 'short-month-date' ? 'short' : 'long',
        day: 'numeric',
        year: format === 'month-date' || format === 'short-month-date' ? undefined : 'numeric',
    }

    let formattedDate = targetDate.toLocaleDateString('en-us', formatOptions)

    if (!includeRelative) {
        return formattedDate
    }

    return formattedDate
}
