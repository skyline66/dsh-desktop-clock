import assert from 'node:assert/strict'
import test from 'node:test'
import {
  DEFAULT_SETTINGS,
  DEFAULT_TIMER,
  clampPosition,
  clockAngles,
  clockParts,
  formatDateLine,
  formatDuration,
  sanitizeSettings,
  sanitizeTimer,
  timerRemaining,
} from '../src/clock-model.js'

test('sanitizeSettings keeps valid values and rejects junk', () => {
  const settings = sanitizeSettings({
    view: 'analog',
    theme: 'ember',
    size: 'large',
    hour12: true,
    opacity: 0.2,
    fontScale: 2,
    position: { x: 12.4, y: 40.6 },
    locked: true,
  })
  assert.equal(settings.view, 'analog')
  assert.equal(settings.theme, 'ember')
  assert.equal(settings.size, 'large')
  assert.equal(settings.hour12, true)
  assert.equal(settings.opacity, 0.55)
  assert.equal(settings.fontScale, 1.2)
  assert.deepEqual(settings.position, { x: 12, y: 41 })
  assert.equal(settings.locked, true)
})

test('sanitizeSettings falls back for non-object input', () => {
  assert.deepEqual(sanitizeSettings(null), DEFAULT_SETTINGS)
  assert.deepEqual(sanitizeSettings('nope'), DEFAULT_SETTINGS)
})

test('clampPosition keeps the panel on screen', () => {
  assert.deepEqual(
    clampPosition({ x: -20, y: 900 }, { width: 1280, height: 800 }, { width: 300, height: 360 }),
    { x: 8, y: 432 },
  )
  assert.deepEqual(
    clampPosition({ x: 9999, y: 0 }, { width: 1280, height: 800 }, { width: 300, height: 360 }),
    { x: 972, y: 8 },
  )
})

test('clockParts supports 24 and 12 hour faces', () => {
  const date = new Date(2026, 9, 28, 0, 5, 9)
  assert.deepEqual(clockParts(date, false, true), {
    hour: '00',
    minute: '05',
    second: '09',
    period: '',
  })
  assert.deepEqual(clockParts(date, true, false), {
    hour: '12',
    minute: '05',
    second: null,
    period: 'AM',
  })
})

test('clockAngles follows the physical hand positions', () => {
  const angles = clockAngles(new Date(2026, 9, 28, 3, 30, 0, 0))
  assert.equal(angles.hour, 105)
  assert.equal(angles.minute, 180)
  assert.equal(angles.second, 0)
})

test('formatDuration handles minutes and hours', () => {
  assert.equal(formatDuration(1500), '25:00')
  assert.equal(formatDuration(65), '01:05')
  assert.equal(formatDuration(3661), '1:01:01')
  assert.equal(formatDuration(-4), '00:00')
})

test('sanitizeTimer restores a running timer after reload', () => {
  const now = 1_000_000
  const timer = sanitizeTimer({ duration: 1500, remaining: 1500, endsAt: now + 90_000 }, now)
  assert.equal(timer.remaining, 90)
  assert.equal(timer.endsAt, now + 90_000)
  assert.equal(timer.completed, false)
  assert.equal(timerRemaining(timer, now + 30_000), 60)
})

test('sanitizeTimer marks an expired timer complete', () => {
  const timer = sanitizeTimer({ duration: 300, remaining: 300, endsAt: 500 }, 1000)
  assert.deepEqual(timer, { duration: 300, remaining: 0, endsAt: null, completed: true })
})

test('sanitizeTimer treats a zero remainder as complete', () => {
  const timer = sanitizeTimer({ duration: 300, remaining: 0, endsAt: null }, 1000)
  assert.equal(timer.remaining, 0)
  assert.equal(timer.completed, true)
})

test('default timer is 25 minutes', () => {
  assert.equal(DEFAULT_TIMER.duration, 1500)
  assert.equal(DEFAULT_TIMER.remaining, 1500)
})

test('formatDateLine is locale-aware and never throws', () => {
  const date = new Date(2026, 9, 28, 12, 0, 0)
  assert.match(formatDateLine(date, 'en'), /October/)
  assert.match(formatDateLine(date, 'zh'), /10月/)
  assert.ok(formatDateLine(date, 'not-a-locale').length > 0)
})
