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
