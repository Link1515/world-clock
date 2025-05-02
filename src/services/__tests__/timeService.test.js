import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DateTime } from 'luxon'
import { getCurrentTime } from '~/services/timeService'
import { HOUR_DISPLAY } from '~/constants/time'

describe('timeService', () => {
  beforeEach(() => {
    // 重置 DateTime.now 的模擬
    vi.resetAllMocks()
  })

  it('should return time in 24-hour format', () => {
    // 模擬當前時間
    const mockNow = DateTime.fromISO('2024-01-01T15:30:45')
    vi.spyOn(DateTime, 'now').mockReturnValue(mockNow)

    const result = getCurrentTime('Asia/Taipei', HOUR_DISPLAY.HOUR_24)
    expect(result).toBe('15:30:45')
  })

  it('should return time in 12-hour format', () => {
    // 模擬當前時間
    const mockNow = DateTime.fromISO('2024-01-01T15:30:45')
    vi.spyOn(DateTime, 'now').mockReturnValue(mockNow)

    const result = getCurrentTime('Asia/Taipei', HOUR_DISPLAY.HOUR_12)
    expect(result).toMatch(/^3:30:45 (PM|AM)$/)
  })

  it('should handle different timezones correctly', () => {
    // 模擬當前時間
    const mockNow = DateTime.fromISO('2024-01-01T15:30:45')
    vi.spyOn(DateTime, 'now').mockReturnValue(mockNow)

    const result = getCurrentTime('America/New_York', HOUR_DISPLAY.HOUR_24)
    // 紐約時間比台北時間慢 13 小時
    expect(result).toBe('02:30:45')
  })
}) 