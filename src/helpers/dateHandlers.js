import moment from "moment"

const howManyHours = (firstHour, secondHour) => {
    let startHour = new Date(firstHour)
    let endHour = new Date(secondHour)

    const diffTime = Math.abs(endHour - startHour)
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    return diffHours
}

export const convertToFullDate = (value, hour) => {
    let date = moment(value).format("LL")

    return date + " " + hour
}

export const hoursOfDay = (value, doctor, doctorAppointments) => {
    const dayOfTheWeek = doctor ? doctor.workingHours.filter((day) => day.day === moment(value).format("dddd")) : []

    if (dayOfTheWeek.length > 0) {
        let hoursArray = []

        for (let i = 0; i < dayOfTheWeek.length; i++) {
            const startHour = convertToFullDate(value, dayOfTheWeek[i].startHour)

            const endHour = convertToFullDate(value, dayOfTheWeek[i].endHour)

            const workingHours = howManyHours(startHour, endHour)

            let startingHour = moment(startHour).format("HH:mm")

            let addHalfHour = moment(startHour).add(30, "minutes")

            let arr = [startingHour.toString()]

            for (let j = 0; j < workingHours * 2; j++) {
                let hour = moment(addHalfHour).format("HH:mm")
                arr.push(hour.toString())
                addHalfHour = moment(addHalfHour).add(30, "minutes")
            }

            const selectedDayAppointments = doctorAppointments
                .filter(
                    (appointment) =>
                        moment(appointment.startDate).format("MMMM Do YYYY") === moment(value).format("MMMM Do YYYY")
                )
                .map((appointment) => {
                    let date = new Date(appointment.startDate)

                    return `${
                        date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours()
                    }:${date.getUTCMinutes()}${date.getUTCMinutes() === 0 ? "0" : ""}`
                })

            if (selectedDayAppointments.length > 0) {
                arr = arr.filter((appointment) => !selectedDayAppointments.includes(appointment))
            }

            hoursArray = [...hoursArray, ...arr]
        }

        if (value.getDay() === new Date().getDay()) {
            const valueHour = moment(value).format("HH:mm")

            let bigerHours = []

            for (let i = 0; i < hoursArray.length; i++) {
                if (parseInt(hoursArray[i].split(":")[0]) > parseInt(valueHour.split(":")[0]) + 1.5) {
                    bigerHours.push(hoursArray[i])
                }
            }

            hoursArray = bigerHours
        }

        return hoursArray
    } else {
        return []
    }
}
