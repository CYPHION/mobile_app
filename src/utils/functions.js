// import toast from 'react-hot-toast'
import { Dimensions } from 'react-native'
import Toast from 'react-native-toast-message'
import { URL } from '../network/httpService'
import { store } from '../store'
import { logoutUser } from '../store/thunk'
import { Color } from './color'

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
        position: 'top',
        text1Style: {
            maxWidth: '100%'
        }
    })
}


export const CheckForHttpErrors = error => {
    const { response } = error



    if (!response) {
        customToast("error", 'No response from server')
        return 'Server not responding'
    }

    switch (response.status) {
        case 401:
            response.data.message
                ?
                customToast("error", response.data.message)
                :
                customToast("error", 'Your session is expired, please login again')
            store.dispatch(logoutUser())
            break
        case 440:
            response.data.message
                ? customToast("error", response.data.message)
                : customToast("error", 'Your session is expired, please login again')
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

export const getDepartmentDropdown = list => {
    return (
        list?.map(elem => ({
            value: elem.id,
            name: elem.name || elem.fullName
        })) || []
    )
}

export const getParentDropdown = (list, isDisable) => {
    return isDisable ? list?.map(elem => ({
        value: elem.id,
        name: `${elem.mainId ? `${elem.mainId} -` : ''}  ${elem.name} `,
        disable: elem.disable
    })) : list?.map(elem => {
        const isBooster = elem?.BoosterStudents?.length > 0 ? true : false
        return {
            value: elem.id,
            name: `${elem.mainId ? `${elem.mainId} -` : ''}  ${elem.name || elem?.fullName} ${isBooster ? '(Booster)' : ''}`,

        }
    })
}

export function calculateFee(child, timeperiod, isMonthly, startDate, isBooster) {
    const totalClassCharges = isMonthly ? Math.ceil((child.weeklyFee * 52) / 12) * timeperiod : child.weeklyFee * timeperiod
    const endDate = new Date(startDate)
    endDate?.setDate(endDate.getDate() + timeperiod * 7)

    const nextMonth = new Date(startDate)
    nextMonth.setMonth(nextMonth.getMonth() + timeperiod);
    nextMonth.setDate(nextMonth.getDate());

    let boosterCharges = 0
    if (isBooster && child?.BoosterStudents?.length > 0 && child?.BoosterStudents[0].paidAmount === 0) {
        boosterCharges = Number(child?.BoosterStudents[0]?.totalPackagePrice)
    }


    const obj = {
        totalLectures: child.totalLectures * timeperiod,
        totalHours: child.totalHours * timeperiod,
        classDues: child.classDues ? child.classDues : 0,
        classCharges: totalClassCharges,
        bookCharges: child?.bookDues,
        boosterCharges,
        boosterDues: child.boosterDues,
        endDate: formattedDate(isMonthly ? nextMonth : endDate, 'dd-MMMM-yyyy'),
        totalCharges: totalClassCharges + boosterCharges,
    }

    return obj;
}

export const bgColor = {
    active: Color.active,
    inactive: Color.error,
    pending: Color.pending,
    freeze: Color.freeze
}