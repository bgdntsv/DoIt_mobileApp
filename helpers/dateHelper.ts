import {useTranslation} from 'react-i18next'

export const useGetDateString = (): string => {
    const week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    const {t} = useTranslation()
    const now = new Date()
    const day = t(week[now.getDay()+1])

    return `${day} ${now.toLocaleDateString()} ${new Date().toLocaleTimeString()}`
}
