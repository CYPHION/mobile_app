// import toast from 'react-hot-toast'
import { Dimensions } from 'react-native'
import Toast from 'react-native-toast-message'
import { URL } from '../network/httpService'
import { store } from '../store'
import { logoutUser } from '../store/thunk'

export const screenDimensions = Dimensions.get('window')


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

//Custom toast function

export const customToast = (type, message) => { //type = error || success || info
    Toast.show({
        type: type,
        text1: message,
        position: 'top'
    })
}


export const CheckForHttpErrors = error => {
    const { response } = error



    if (!response) {
        customToast('error', 'No response from server')
        return 'Server not responding'
    }

    switch (response.status) {
        case 401:
            response.data.message
                ?
                customToast('error', response.data.message)
                :
                customToast('error', 'Your session is expired, please login again')
            store.dispatch(logoutUser())
            break
        case 440:
            response.data.message
                ? customToast('error', response.data.message)
                : customToast('error', 'Your session is expired, please login again')
            store.dispatch(logoutUser())
            break
        default:
            return {
                message: response.data.message || 'No response from server',
                status: response.status,
                data: response.data
            }
    }
}

export const removeError = (err, property) => {
    // console.log("-=", { ...err, [property]: "" })
    return { ...err, [property]: "" }
}

export function getImage(file) {
    if (file) {
        const image = `${URL}/upload/${file}`
        return image
    } else {
        return null
    }
}