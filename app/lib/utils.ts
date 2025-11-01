export function formatDate(
    date: string | Date, 
    includeRelative = false, 
    format: 'short' | 'long' | 'month-date' | 'short-month-date' = 'short'
) {
    // Convert Date object to string if needed
    const dateString = typeof date === 'string' ? date : date.toISOString()
    
    if (!dateString.includes('T')) {
        const fullDate = `${dateString}T00:00:00`
        var targetDate = new Date(fullDate)
    } else {
        var targetDate = new Date(dateString)
    }

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
