import {useTranslation} from 'react-i18next'

export const useGetDateString = (): string => {
    const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const {t} = useTranslation()
    const now = new Date()
    const day = t(week[now.getDay()])
    return `${day} ${now.toLocaleDateString()} ${new Date().toLocaleTimeString()}`
}
