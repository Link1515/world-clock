import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getUserTimezone,
  getAvailableTimezones,
  getTimezones,
  updateTimezonesLocalStorageByClocks
} from '~/services/timezoneService'

describe('timezoneService', () => {
  beforeEach(() => {
    // 重置 localStorage
    localStorage.clear()
    // 重置模擬
    vi.resetAllMocks()
  })

  it('should get user timezone', () => {
    // 模擬 Intl.DateTimeFormat
    const mockTimeZone = 'Asia/Taipei'
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({
      timeZone: mockTimeZone
    })

    const result = getUserTimezone()
    expect(result).toBe(mockTimeZone)
  })

  it('should get available timezones', () => {
    const mockTimezones = ['Asia/Taipei', 'America/New_York']
    vi.spyOn(Intl, 'supportedValuesOf').mockReturnValue(mockTimezones)

    const result = getAvailableTimezones()
    expect(result).toEqual(mockTimezones)
  })

  it('should get timezones from localStorage', () => {
    const mockTimezones = ['Asia/Taipei', 'America/New_York']
    localStorage.setItem('timezones', JSON.stringify(mockTimezones))

    const result = getTimezones()
    expect(result).toEqual(mockTimezones)
  })

  it('should return user timezone when localStorage is empty', () => {
    const mockTimeZone = 'Asia/Taipei'
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({
      timeZone: mockTimeZone
    })

    const result = getTimezones()
    expect(result).toEqual([mockTimeZone])
  })

  it('should update timezones in localStorage', () => {
    const clocks = [
      { timezone: 'Asia/Taipei' },
      { timezone: 'America/New_York' }
    ]

    updateTimezonesLocalStorageByClocks(clocks)

    const storedTimezones = JSON.parse(localStorage.getItem('timezones'))
    expect(storedTimezones).toEqual(['Asia/Taipei', 'America/New_York'])
  })
}) 