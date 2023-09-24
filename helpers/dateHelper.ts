import { useTranslation } from 'react-i18next'

export const useGetDateString = (): string => {
    const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const { t } = useTranslation()
    const now = new Date()
    let hh: number | string = now.getHours()
    let mm: number | string = now.getMinutes()
    hh = hh < 10 ? '0' + hh : hh
    mm = mm < 10 ? '0' + mm : mm
    const time = hh + ':' + mm
    const day = t(week[now.getDay()])

    return `${day} ${now.toLocaleDateString()} ${time}`
}
