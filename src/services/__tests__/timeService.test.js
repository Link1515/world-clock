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
    // 模擬當前時間，使用 UTC 時區
    const mockNow = DateTime.fromISO('2024-01-01T15:30:45Z')
    vi.spyOn(DateTime, 'now').mockReturnValue(mockNow)

    const result = getCurrentTime('Asia/Taipei', HOUR_DISPLAY.HOUR_24)
    // 台北時間比 UTC 快 8 小時
    expect(result).toBe('23:30:45')
  })

  it('should return time in 12-hour format', () => {
    // 模擬當前時間，使用 UTC 時區
    const mockNow = DateTime.fromISO('2024-01-01T15:30:45Z')
    vi.spyOn(DateTime, 'now').mockReturnValue(mockNow)

    const result = getCurrentTime('Asia/Taipei', HOUR_DISPLAY.HOUR_12)
    // 台北時間比 UTC 快 8 小時
    expect(result).toMatch(/^11:30:45 (PM|AM)$/)
  })

  it('should handle different timezones correctly', () => {
    // 模擬當前時間，使用 UTC 時區
    const mockNow = DateTime.fromISO('2024-01-01T15:30:45Z')
    vi.spyOn(DateTime, 'now').mockReturnValue(mockNow)

    const result = getCurrentTime('America/New_York', HOUR_DISPLAY.HOUR_24)
    // 紐約時間比 UTC 慢 5 小時
    expect(result).toBe('10:30:45')
  })
}) 