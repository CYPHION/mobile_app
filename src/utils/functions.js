export const formattedDate = (dateString, format) => {
    const date = new Date(dateString)

    if (isNaN(date.getTime()) || !dateString) {
        return 'N/A'
    }

    const day = date.getDate()
    const month = date.getMonth() + 1 // Months are zero-based
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: format?.includes('EEE') ? 'short' : undefined })
    const dayOfWeekInLong = date.toLocaleDateString('en-US', { weekday: format?.includes('EEEE') ? 'long' : undefined })
    const monthName = date.toLocaleDateString('en-US', { month: 'short' })
    const monthNameLong = date.toLocaleDateString('en-US', { month: 'long' })
    const period = hours >= 12 ? 'PM' : 'AM'

    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')} ${period}`
    const formattedTimewithoutampm = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    const formattedTimeWithoutSecond = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`
    const formattedTimeWithoutSecondWithAMPM = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}  ${period}`

    return format
        .replace('dd', day.toString().padStart(2, '0'))
        .replace('MMMM', monthNameLong)
        .replace('EEEE', dayOfWeekInLong)
        .replace('yyyy', year)
        .replace('EEE', dayOfWeek)
        .replace('MMM', monthName)
        .replace('MM', month.toString().padStart(2, '0'))
        .replace('hh:mm:x', formattedTimeWithoutSecond)
        .replace('hh:mm:z', formattedTimeWithoutSecondWithAMPM)
        .replace('hh:mm:ss:s', formattedTimewithoutampm)
        .replace('hh:mm:ss a', formattedTime)
}