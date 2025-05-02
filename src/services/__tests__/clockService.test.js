import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DateTime } from 'luxon'
import {
  createClock,
  getClocksFromTimezones,
  addClock,
  removeClock,
  handleDragEnd,
  refreshClocks
} from '~/services/clockService'
import { updateTimezonesLocalStorageByClocks } from '~/services/timezoneService'
import { HOUR_DISPLAY } from '~/constants/time'

// 模擬 timezoneService
vi.mock('~/services/timezoneService', () => ({
  updateTimezonesLocalStorageByClocks: vi.fn()
}))

describe('clockService', () => {
  beforeEach(() => {
    // 重置模擬
    vi.resetAllMocks()
    // 模擬當前時間
    const mockNow = DateTime.fromISO('2024-01-01T15:30:45')
    vi.spyOn(DateTime, 'now').mockReturnValue(mockNow)
  })

  it('should create a clock with correct timezone and time', () => {
    const timezone = 'Asia/Taipei'
    const clock = createClock(timezone, HOUR_DISPLAY.HOUR_24)
    
    expect(clock).toEqual({
      timezone,
      time: '15:30:45'
    })
  })

  it('should create multiple clocks from timezones', () => {
    const timezones = ['Asia/Taipei', 'America/New_York']
    const clocks = getClocksFromTimezones(timezones, HOUR_DISPLAY.HOUR_24)
    
    expect(clocks).toHaveLength(2)
    expect(clocks[0]).toEqual({
      timezone: 'Asia/Taipei',
      time: '15:30:45'
    })
    expect(clocks[1]).toEqual({
      timezone: 'America/New_York',
      time: '02:30:45'
    })
  })

  it('should add a new clock', () => {
    const clocks = []
    const timezone = 'Asia/Taipei'
    
    addClock(clocks, timezone, HOUR_DISPLAY.HOUR_24)
    
    expect(clocks).toHaveLength(1)
    expect(clocks[0]).toEqual({
      timezone,
      time: '15:30:45'
    })
    expect(updateTimezonesLocalStorageByClocks).toHaveBeenCalledWith(clocks)
  })

  it('should remove a clock by timezone', () => {
    const clocks = [
      { timezone: 'Asia/Taipei', time: '15:30:45' },
      { timezone: 'America/New_York', time: '02:30:45' }
    ]
    
    removeClock(clocks, 'Asia/Taipei', HOUR_DISPLAY.HOUR_24)
    
    expect(clocks).toHaveLength(1)
    expect(clocks[0].timezone).toBe('America/New_York')
    expect(updateTimezonesLocalStorageByClocks).toHaveBeenCalledWith(clocks)
  })

  it('should handle drag end by updating localStorage', () => {
    const clocks = [
      { timezone: 'Asia/Taipei', time: '15:30:45' },
      { timezone: 'America/New_York', time: '02:30:45' }
    ]
    
    handleDragEnd(clocks)
    
    expect(updateTimezonesLocalStorageByClocks).toHaveBeenCalledWith(clocks)
  })

  it('should refresh clocks with current time', () => {
    const clocks = [
      { timezone: 'Asia/Taipei', time: 'old time' },
      { timezone: 'America/New_York', time: 'old time' }
    ]
    
    refreshClocks(clocks, HOUR_DISPLAY.HOUR_24)
    
    expect(clocks[0].time).toBe('15:30:45')
    expect(clocks[1].time).toBe('02:30:45')
  })
}) 