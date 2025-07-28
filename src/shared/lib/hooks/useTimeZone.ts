import { useMemo } from 'react'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'

// УКАЗЫВАТЬ СРАЗУ ОБА ТИПА, ВХОДНОЕ ВРЕМЯ И ВЫХОДНОЕ
interface Options {
  inputZone?: 'utc' | 'local'
  outputZone?: 'utc' | 'local'
}

export const useConvertedDate = (inputDate: string | Date, options?: Options) => {
  const { inputZone = 'utc', outputZone = 'local' } = options ?? {}

  return useMemo(() => {
    const dateObj = new Date(inputDate)
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    if (inputZone === outputZone) return dateObj

    if (inputZone === 'utc' && outputZone === 'local') {
      return utcToZonedTime(dateObj, userTimeZone)
    }

    if (inputZone === 'local' && outputZone === 'utc') {
      return zonedTimeToUtc(dateObj, userTimeZone)
    }

    return dateObj
  }, [inputDate, inputZone, outputZone])
}
