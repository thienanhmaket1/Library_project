import * as moment from 'moment-timezone'

export const dateTimeInString = (date, format = 'DD-MM-YYYY HH:mm:ss') => {
    if (moment(date).isValid()) {
        return moment(date).format(format)
    } else {
        return date
    }
}

export const displayIsDeleted = (isDeleted) => {
    const isDeletedInBoolean = /true/i.test(isDeleted)
    return isDeletedInBoolean ? 'Deactivated' : 'Activated'
}

export const convertStringBooleanToBoolean = (booleanInString) => {
    return /true/i.test(booleanInString)
}
