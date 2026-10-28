/**
 * Pure model helpers shared by the clock UI and its Node test suite.
 * This file deliberately has no DOM or React dependency.
 */

export const SETTINGS_KEY = 'dsh-desktop-clock:settings:v1'
export const TIMER_KEY = 'dsh-desktop-clock:timer:v1'
export const NS = 'dsh-desktop-clock'

export const THEMES = ['aurora', 'ember', 'linen', 'graphite']
export const SIZES = ['compact', 'standard', 'large']
export const VIEWS = ['digital', 'analog', 'both']
export const TABS = ['clock', 'focus']

export const SIZE_WIDTH = Object.freeze({
  compact: 248,
  standard: 300,
  large: 356,
})

export const DEFAULT_SETTINGS = Object.freeze({
  view: 'both',
  theme: 'aurora',
  size: 'standard',
  hour12: false,
  showSeconds: true,
  showDate: true,
  showZone: true,
  opacity: 0.95,
  fontScale: 1,
  locked: false,
  collapsed: false,
  visible: true,
  tab: 'clock',
  position: null,
})

export const DEFAULT_TIMER = Object.freeze({
  duration: 25 * 60,
  remaining: 25 * 60,
  endsAt: null,
  completed: false,
})

const THEME_SET = new Set(THEMES)
const SIZE_SET = new Set(SIZES)
const VIEW_SET = new Set(VIEWS)
const TAB_SET = new Set(TABS)

export function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function clamp(value, lower, upper) {
  return Math.min(upper, Math.max(lower, value))
}

export function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value)
}

export function pad2(value) {
  return String(Math.max(0, Math.trunc(value))).padStart(2, '0')
}

export function isPosition(value) {
  return isRecord(value) && isFiniteNumber(value.x) && isFiniteNumber(value.y)
}

/** Sanitize a persisted settings object without ever throwing. */
export function sanitizeSettings(input) {
  const source = isRecord(input) ? input : {}
  const settings = { ...DEFAULT_SETTINGS }
  if (VIEW_SET.has(source.view)) settings.view = source.view
  if (THEME_SET.has(source.theme)) settings.theme = source.theme
  if (SIZE_SET.has(source.size)) settings.size = source.size
  if (typeof source.hour12 === 'boolean') settings.hour12 = source.hour12
  if (typeof source.showSeconds === 'boolean') settings.showSeconds = source.showSeconds
  if (typeof source.showDate === 'boolean') settings.showDate = source.showDate
  if (typeof source.showZone === 'boolean') settings.showZone = source.showZone
  if (typeof source.locked === 'boolean') settings.locked = source.locked
  if (typeof source.collapsed === 'boolean') settings.collapsed = source.collapsed
  if (typeof source.visible === 'boolean') settings.visible = source.visible
  if (TAB_SET.has(source.tab)) settings.tab = source.tab
  if (isFiniteNumber(source.opacity)) settings.opacity = clamp(source.opacity, 0.55, 1)
  if (isFiniteNumber(source.fontScale)) settings.fontScale = clamp(source.fontScale, 0.9, 1.2)
  if (isPosition(source.position)) {
    settings.position = {
      x: Math.round(source.position.x),
      y: Math.round(source.position.y),
    }
  }
  return settings
}

/** Sanitize a persisted timer, including one whose deadline passed while closed. */
export function sanitizeTimer(input, now = Date.now()) {
  const source = isRecord(input) ? input : {}
  const duration = isFiniteNumber(source.duration)
    ? clamp(Math.round(source.duration), 60, 4 * 60 * 60)
    : DEFAULT_TIMER.duration
  const rawRemaining = isFiniteNumber(source.remaining)
    ? clamp(Math.round(source.remaining), 0, duration)
    : duration
  const endsAt = isFiniteNumber(source.endsAt) ? Math.round(source.endsAt) : null
  if (endsAt !== null) {
    if (endsAt <= now) return { duration, remaining: 0, endsAt: null, completed: true }
    return {
      duration,
      remaining: clamp(Math.ceil((endsAt - now) / 1000), 0, duration),
      endsAt,
      completed: false,
    }
  }
  return {
    duration,
    remaining: rawRemaining,
    endsAt: null,
    completed: rawRemaining === 0,
  }
}

/** Whole seconds left on a running or paused timer. */
export function timerRemaining(timer, now = Date.now()) {
  if (!isRecord(timer)) return 0
  if (isFiniteNumber(timer.endsAt)) {
    return Math.max(0, Math.ceil((timer.endsAt - now) / 1000))
  }
  return Math.max(0, Math.ceil(isFiniteNumber(timer.remaining) ? timer.remaining : 0))
}

export function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Math.ceil(isFiniteNumber(totalSeconds) ? totalSeconds : 0))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const rest = seconds % 60
  return hours > 0 ? `${hours}:${pad2(minutes)}:${pad2(rest)}` : `${pad2(minutes)}:${pad2(rest)}`
}

/** Parts for the digital face, independent of Intl padding quirks. */
export function clockParts(date, hour12 = false, showSeconds = true) {
  const hours24 = date.getHours()
  const hours = hour12 ? hours24 % 12 || 12 : hours24
  return {
    hour: pad2(hours),
    minute: pad2(date.getMinutes()),
    second: showSeconds ? pad2(date.getSeconds()) : null,
    period: hour12 ? (hours24 < 12 ? 'AM' : 'PM') : '',
  }
}

export function clockAngles(date) {
  const seconds = date.getSeconds() + date.getMilliseconds() / 1000
  const minutes = date.getMinutes() + seconds / 60
  const hours = (date.getHours() % 12) + minutes / 60
  return {
    hour: hours * 30,
    minute: minutes * 6,
    second: seconds * 6,
  }
}

export function formatDateLine(date, locale = 'en') {
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(date)
  } catch {
    return new Intl.DateTimeFormat('en', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }
}

export function formatZone(date, locale = 'en') {
  try {
    const part = new Intl.DateTimeFormat(locale, { timeZoneName: 'short' })
      .formatToParts(date)
      .find((item) => item.type === 'timeZoneName')
    return part ? part.value : ''
  } catch {
    return ''
  }
}

/** Keep a floating panel fully inside the viewport with an 8px breathing edge. */
export function clampPosition(position, viewport, size) {
  const margin = 8
  const width = isFiniteNumber(viewport?.width) ? viewport.width : 1280
  const height = isFiniteNumber(viewport?.height) ? viewport.height : 800
  const panelWidth = isFiniteNumber(size?.width) ? size.width : SIZE_WIDTH.standard
  const panelHeight = isFiniteNumber(size?.height) ? size.height : 360
  const maxX = Math.max(margin, width - panelWidth - margin)
  const maxY = Math.max(margin, height - panelHeight - margin)
  const sourceX = isFiniteNumber(position?.x) ? position.x : maxX
  const sourceY = isFiniteNumber(position?.y) ? position.y : 80
  return {
    x: Math.round(clamp(sourceX, margin, maxX)),
    y: Math.round(clamp(sourceY, margin, maxY)),
  }
}

export function defaultPosition(viewport = { width: 1280, height: 800 }, width = SIZE_WIDTH.standard) {
  return clampPosition(
    { x: viewport.width - width - 24, y: Math.max(72, Math.min(112, viewport.height * 0.12)) },
    viewport,
    { width, height: 360 },
  )
}
