import * as React from 'react'
import { CSS } from './styles.js'
import {
  DEFAULT_SETTINGS,
  DEFAULT_TIMER,
  NS,
  SETTINGS_KEY,
  SIZE_WIDTH,
  THEMES,
  TIMER_KEY,
  clockAngles,
  clockParts,
  clampPosition,
  defaultPosition,
  formatDateLine,
  formatDuration,
  formatZone,
  sanitizeSettings,
  sanitizeTimer,
  timerRemaining,
} from './clock-model.js'

const { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } = React

const ZH = {
  title: '桌面时钟',
  dragHint: '拖动移动，双击折叠',
  collapse: '折叠',
  expand: '展开时钟',
  hide: '隐藏时钟',
  show: '显示时钟',
  settings: '时钟设置',
  back: '返回时钟',
  clockTab: '时钟',
  focusTab: '专注',
  clockFace: '表盘',
  digital: '数字',
  analog: '指针',
  both: '组合',
  theme: '主题',
  themeAurora: '极光',
  themeEmber: '余烬',
  themeLinen: '亚麻',
  themeGraphite: '石墨',
  size: '尺寸',
  compact: '紧凑',
  standard: '标准',
  large: '宽大',
  hourFormat: '小时制',
  hour24: '24 小时',
  hour12: '12 小时',
  seconds: '显示秒',
  date: '显示日期',
  timeZone: '显示时区',
  opacity: '不透明度',
  textSize: '字体大小',
  lockPosition: '锁定位置',
  resetPosition: '重置位置',
  resetAll: '恢复默认设置',
  focusTimer: '专注计时',
  focusCaption: '设定一段安静的时间，让时钟替你守候。',
  start: '开始',
  pause: '暂停',
  resume: '继续',
  restart: '重新开始',
  reset: '重置',
  ready: '准备开始',
  running: '专注中',
  paused: '已暂停',
  done: '时间到',
  timeUp: '时间到，休息一下。',
  minuteUnit: '分钟',
  localTime: '本地时间',
  keyboardHint: '按 Alt + Shift + D 显示或隐藏时钟。',
  storageHint: '所有设置仅保存在当前浏览器中。',
  analogAria: '指针时钟',
  clockAria: '时钟',
  timerAria: '专注计时',
  settingsHint: '拖动标题栏移动位置；双击标题栏折叠。',
}

const EN = {
  title: 'Desktop Clock',
  dragHint: 'Drag to move · double-click to collapse',
  collapse: 'Collapse',
  expand: 'Expand clock',
  hide: 'Hide clock',
  show: 'Show clock',
  settings: 'Clock settings',
  back: 'Back to clock',
  clockTab: 'Clock',
  focusTab: 'Focus',
  clockFace: 'Clock face',
  digital: 'Digital',
  analog: 'Analog',
  both: 'Both',
  theme: 'Theme',
  themeAurora: 'Aurora',
  themeEmber: 'Ember',
  themeLinen: 'Linen',
  themeGraphite: 'Graphite',
  size: 'Size',
  compact: 'Compact',
  standard: 'Standard',
  large: 'Large',
  hourFormat: 'Hour format',
  hour24: '24-hour',
  hour12: '12-hour',
  seconds: 'Show seconds',
  date: 'Show date',
  timeZone: 'Show time zone',
  opacity: 'Opacity',
  textSize: 'Text size',
  lockPosition: 'Lock position',
  resetPosition: 'Reset position',
  resetAll: 'Reset all settings',
  focusTimer: 'Focus timer',
  focusCaption: 'Set a quiet block and let the clock keep watch.',
  start: 'Start',
  pause: 'Pause',
  resume: 'Resume',
  restart: 'Restart',
  reset: 'Reset',
  ready: 'Ready',
  running: 'Focusing',
  paused: 'Paused',
  done: 'Time is up',
  timeUp: 'Time is up — take a breath.',
  minuteUnit: 'min',
  localTime: 'Local time',
  keyboardHint: 'Press Alt + Shift + D to show or hide the clock.',
  storageHint: 'All settings stay in this browser.',
  analogAria: 'Analog clock',
  clockAria: 'Clock',
  timerAria: 'Focus timer',
  settingsHint: 'Drag the title bar to move it; double-click the title bar to collapse.',
}

const TICKS = Array.from({ length: 60 }, (_, index) => index)
const NUMERALS = [
  { number: '12', x: 120, y: 50 },
  { number: '3', x: 190, y: 120 },
  { number: '6', x: 120, y: 190 },
  { number: '9', x: 50, y: 120 },
]

function Icon({ size = 17, children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

function IconClock({ size }) {
  return (
    <Icon size={size}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.6v4.8l3.1 1.8" />
    </Icon>
  )
}

function IconTimer({ size }) {
  return (
    <Icon size={size}>
      <path d="M9.5 3h5" />
      <path d="M12 3v2.2" />
      <circle cx="12" cy="13.5" r="7.2" />
      <path d="M12 9.6v4.1l2.6 1.5" />
      <path d="M18.4 6.3l1.4 1.4" />
    </Icon>
  )
}

function IconGear({ size }) {
  return (
    <Icon size={size}>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.37a1.7 1.7 0 0 0-1 .63 1.7 1.7 0 0 0-.36 1.06V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.23 15a1.7 1.7 0 0 0-.63-1A1.7 1.7 0 0 0 2.54 13.6H2.5v-4h.09A1.7 1.7 0 0 0 4.1 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 8.5 4.23a1.7 1.7 0 0 0 1-.63A1.7 1.7 0 0 0 9.87 2.5V2.5h4v.09A1.7 1.7 0 0 0 14.5 3.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 18.87 8c.16.36.39.7.63 1 .3.3.67.5 1.06.6h.09v4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
    </Icon>
  )
}

function IconMinimize({ size }) {
  return (
    <Icon size={size}>
      <path d="M5 12h14" />
    </Icon>
  )
}

function IconEyeOff({ size }) {
  return (
    <Icon size={size}>
      <path d="M3 3l18 18" />
      <path d="M10.6 6.2A10.6 10.6 0 0 1 12 6c4.8 0 8 4.1 9 6a13.4 13.4 0 0 1-3.4 3.8" />
      <path d="M6.1 6.9C4.4 8.2 3.2 10 2.6 12c1 1.9 4.2 6 9.4 6a10 10 0 0 0 4.2-.9" />
      <path d="M9.8 9.9a3.1 3.1 0 0 0 4.3 4.3" />
    </Icon>
  )
}

function IconBack({ size }) {
  return (
    <Icon size={size}>
      <path d="M14.8 5.5 8.3 12l6.5 6.5" />
    </Icon>
  )
}

function IconRotate({ size }) {
  return (
    <Icon size={size}>
      <path d="M20 11a8 8 0 1 0-2.3 6" />
      <path d="M20 5.5V11h-5.5" />
    </Icon>
  )
}

function readSettings() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    return raw ? sanitizeSettings(JSON.parse(raw)) : { ...DEFAULT_SETTINGS }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

function readTimer() {
  try {
    const raw = window.localStorage.getItem(TIMER_KEY)
    return raw ? sanitizeTimer(JSON.parse(raw)) : { ...DEFAULT_TIMER }
  } catch {
    return { ...DEFAULT_TIMER }
  }
}

function useNow(interval) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), interval)
    return () => window.clearInterval(timer)
  }, [interval])
  return now
}

function playChime(audioContext) {
  if (!audioContext || audioContext.state === 'closed') return
  try {
    const start = audioContext.currentTime
    const master = audioContext.createGain()
    master.gain.setValueAtTime(0.0001, start)
    master.gain.exponentialRampToValueAtTime(0.16, start + 0.03)
    master.gain.exponentialRampToValueAtTime(0.0001, start + 1.25)
    master.connect(audioContext.destination)
    const notes = [
      [880, 0],
      [1174.66, 0.16],
      [1567.98, 0.32],
    ]
    for (const [frequency, offset] of notes) {
      const oscillator = audioContext.createOscillator()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(frequency, start + offset)
      oscillator.connect(master)
      oscillator.start(start + offset)
      oscillator.stop(start + offset + 0.85)
    }
  } catch {
    // Audio is a nicety; never let it break the timer.
  }
}

function AnalogClock({ date, showSeconds, ariaLabel }) {
  const id = useId().replace(/:/g, '')
  const angles = clockAngles(date)
  const faceId = `${id}-face`
  const rimId = `${id}-rim`
  return (
    <div className="dcw-analog-wrap">
      <svg className="dcw-analog" viewBox="0 0 240 240" role="img" aria-label={ariaLabel}>
        <defs>
          <radialGradient id={faceId} cx="38%" cy="30%" r="78%">
            <stop offset="0%" style={{ stopColor: 'var(--dcw-face-2)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--dcw-face)' }} />
          </radialGradient>
          <linearGradient id={rimId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--dcw-accent)', stopOpacity: 0.72 }} />
            <stop offset="48%" style={{ stopColor: 'var(--dcw-accent-2)', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: 'var(--dcw-accent)', stopOpacity: 0.62 }} />
          </linearGradient>
        </defs>
        <circle cx="120" cy="120" r="112" fill="none" stroke={`url(#${rimId})`} strokeWidth="1.2" opacity="0.75" />
        <circle cx="120" cy="120" r="106" fill={`url(#${faceId})`} stroke="var(--dcw-border)" strokeWidth="1.4" />
        <circle cx="120" cy="120" r="96" fill="none" stroke="var(--dcw-accent-soft)" strokeWidth="1" />
        {TICKS.map((tick) => (
          <line
            key={tick}
            x1="120"
            y1={tick % 5 === 0 ? 22 : 26}
            x2="120"
            y2="31"
            transform={`rotate(${tick * 6} 120 120)`}
            stroke="var(--dcw-tick)"
            strokeWidth={tick % 5 === 0 ? 2 : 0.9}
            strokeLinecap="round"
            opacity={tick % 5 === 0 ? 0.9 : 0.42}
          />
        ))}
        {NUMERALS.map((item) => (
          <text
            key={item.number}
            x={item.x}
            y={item.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--dcw-tick)"
            fontFamily="Segoe UI Variable Display, Segoe UI, sans-serif"
            fontSize="16"
            fontWeight="600"
            opacity="0.88"
          >
            {item.number}
          </text>
        ))}
        <text
          x="120"
          y="154"
          textAnchor="middle"
          fill="var(--dcw-muted)"
          fontFamily="Segoe UI Variable Display, Segoe UI, sans-serif"
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="2.2"
          opacity="0.7"
        >
          DESK CLOCK
        </text>
        <g transform={`rotate(${angles.hour} 120 120)`}>
          <line x1="120" y1="120" x2="120" y2="78" stroke="var(--dcw-tick)" strokeWidth="5.4" strokeLinecap="round" />
        </g>
        <g transform={`rotate(${angles.minute} 120 120)`}>
          <line x1="120" y1="120" x2="120" y2="54" stroke="var(--dcw-tick)" strokeWidth="3.2" strokeLinecap="round" />
        </g>
        {showSeconds ? (
          <g transform={`rotate(${angles.second} 120 120)`}>
            <line x1="120" y1="131" x2="120" y2="39" stroke="var(--dcw-accent)" strokeWidth="1.35" strokeLinecap="round" />
            <circle cx="120" cy="39" r="2.2" fill="var(--dcw-accent)" />
          </g>
        ) : null}
        <circle cx="120" cy="120" r="5.1" fill="var(--dcw-accent)" />
        <circle cx="120" cy="120" r="2" fill="var(--dcw-face)" />
      </svg>
    </div>
  )
}

function ClockFace({ now, settings, t, localeId }) {
  const parts = clockParts(now, settings.hour12, settings.showSeconds)
  const timeText = `${parts.hour}:${parts.minute}${parts.second ? `:${parts.second}` : ''}${parts.period ? ` ${parts.period}` : ''}`
  const minuteStamp = Math.floor(now.getTime() / 60000)
  const dateText = useMemo(
    () => (settings.showDate ? formatDateLine(now, localeId) : ''),
    [minuteStamp, localeId, settings.showDate],
  )
  return (
    <div className="dcw-clock" data-clock-face={settings.view}>
      {settings.view !== 'digital' ? (
        <AnalogClock
          date={now}
          showSeconds={settings.showSeconds}
          ariaLabel={`${t('analogAria')} ${timeText}`}
        />
      ) : null}
      {settings.view === 'analog' && dateText ? <div className="dcw-date">{dateText}</div> : null}
      {settings.view !== 'analog' ? (
        <div className="dcw-digital" role="timer" aria-label={`${t('clockAria')} ${timeText}`}>
          <div className="dcw-time-row" aria-hidden="true">
            <span className="dcw-digits">{parts.hour}</span>
            <span className="dcw-colon">:</span>
            <span className="dcw-digits">{parts.minute}</span>
            {parts.second ? <span className="dcw-sec">{parts.second}</span> : null}
            {parts.period ? <span className="dcw-period">{parts.period}</span> : null}
          </div>
          {dateText ? <div className="dcw-date">{dateText}</div> : null}
        </div>
      ) : null}
    </div>
  )
}

function FocusView({
  timer,
  remaining,
  progress,
  t,
  onStart,
  onPause,
  onReset,
  onPreset,
}) {
  const radius = 96
  const circumference = 2 * Math.PI * radius
  const statusKey = timer.completed
    ? 'done'
    : timer.endsAt != null
      ? 'running'
      : remaining > 0 && remaining < timer.duration
        ? 'paused'
        : 'ready'
  const primaryLabel = timer.completed
    ? t('restart')
    : timer.endsAt != null
      ? t('pause')
      : remaining > 0 && remaining < timer.duration
        ? t('resume')
        : t('start')
  return (
    <div className="dcw-focus">
      <div className="dcw-focus-top"><i />{t('focusTimer')}</div>
      <div
        className="dcw-timer-wrap"
        role="timer"
        aria-label={`${t('timerAria')} ${formatDuration(remaining)}`}
      >
        <svg className="dcw-timer-svg" viewBox="0 0 220 220" aria-hidden="true">
          <circle className="dcw-timer-track" cx="110" cy="110" r={radius} fill="none" strokeWidth="3.4" />
          <circle
            className="dcw-timer-progress"
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            strokeWidth="4.2"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
          />
        </svg>
        <div className="dcw-timer-center">
          <div className="dcw-timer-digits">{formatDuration(remaining)}</div>
          <div className="dcw-timer-caption" data-done={timer.completed ? 'true' : 'false'} aria-live="polite">
            {t(statusKey)}
          </div>
        </div>
      </div>
      <div className="dcw-presets" role="group" aria-label={t('focusTimer')}>
        {[5, 15, 25, 45].map((minutes) => (
          <button
            key={minutes}
            type="button"
            className="dcw-preset"
            data-active={timer.duration === minutes * 60 ? 'true' : 'false'}
            onClick={() => onPreset(minutes * 60)}
          >
            {minutes} {t('minuteUnit')}
          </button>
        ))}
      </div>
      <div className="dcw-timer-actions">
        <button
          type="button"
          className="dcw-primary"
          onClick={timer.endsAt != null ? onPause : onStart}
        >
          {primaryLabel}
        </button>
        <button type="button" className="dcw-secondary" onClick={onReset}>
          {t('reset')}
        </button>
      </div>
      <p className="dcw-note" style={{ textAlign: 'center' }}>
        {timer.completed ? t('timeUp') : t('focusCaption')}
      </p>
    </div>
  )
}

function Segmented({ label, value, options, onChange }) {
  return (
    <div className="dcw-seg" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          data-active={value === option.value ? 'true' : 'false'}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      className="dcw-toggle"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span>{label}</span>
      <span className="dcw-switch" aria-hidden="true" />
    </button>
  )
}

function RangeControl({ label, value, min, max, step, display, onChange }) {
  return (
    <div>
      <div className="dcw-range-head">
        <span>{label}</span>
        <output>{display}</output>
      </div>
      <input
        className="dcw-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  )
}

function SettingsPanel({ settings, t, update, onResetPosition, onResetAll }) {
  const viewOptions = [
    { value: 'digital', label: t('digital') },
    { value: 'analog', label: t('analog') },
    { value: 'both', label: t('both') },
  ]
  const sizeOptions = [
    { value: 'compact', label: t('compact') },
    { value: 'standard', label: t('standard') },
    { value: 'large', label: t('large') },
  ]
  return (
    <div className="dcw-settings" role="dialog" aria-label={t('settings')}>
      <div className="dcw-settings-scroll">
        <div className="dcw-section">
          <div className="dcw-section-label">{t('clockFace')}</div>
          <Segmented label={t('clockFace')} value={settings.view} options={viewOptions} onChange={(view) => update({ view })} />
        </div>
        <div className="dcw-section">
          <div className="dcw-section-label">{t('theme')}</div>
          <div className="dcw-swatch-grid" role="group" aria-label={t('theme')}>
            {THEMES.map((theme) => (
              <button
                key={theme}
                type="button"
                className="dcw-swatch"
                data-theme={theme}
                data-active={settings.theme === theme ? 'true' : 'false'}
                aria-pressed={settings.theme === theme}
                onClick={() => update({ theme })}
              >
                <span className="dcw-swatch-dot" aria-hidden="true" />
                {t(`theme${theme[0].toUpperCase()}${theme.slice(1)}`)}
              </button>
            ))}
          </div>
        </div>
        <div className="dcw-section">
          <div className="dcw-section-label">{t('size')}</div>
          <Segmented label={t('size')} value={settings.size} options={sizeOptions} onChange={(size) => update({ size })} />
        </div>
        <div className="dcw-section">
          <div className="dcw-section-label">{t('hourFormat')}</div>
          <Segmented
            label={t('hourFormat')}
            value={settings.hour12 ? '12' : '24'}
            options={[
              { value: '24', label: t('hour24') },
              { value: '12', label: t('hour12') },
            ]}
            onChange={(value) => update({ hour12: value === '12' })}
          />
          <div style={{ marginTop: 6 }}>
            <Toggle label={t('seconds')} checked={settings.showSeconds} onChange={(showSeconds) => update({ showSeconds })} />
            <Toggle label={t('date')} checked={settings.showDate} onChange={(showDate) => update({ showDate })} />
            <Toggle label={t('timeZone')} checked={settings.showZone} onChange={(showZone) => update({ showZone })} />
          </div>
        </div>
        <div className="dcw-section">
          <div className="dcw-section-label">{t('opacity')} / {t('textSize')}</div>
          <RangeControl
            label={t('opacity')}
            value={settings.opacity}
            min={0.55}
            max={1}
            step={0.01}
            display={`${Math.round(settings.opacity * 100)}%`}
            onChange={(opacity) => update({ opacity })}
          />
          <div style={{ height: 8 }} />
          <RangeControl
            label={t('textSize')}
            value={settings.fontScale}
            min={0.9}
            max={1.2}
            step={0.05}
            display={`${Math.round(settings.fontScale * 100)}%`}
            onChange={(fontScale) => update({ fontScale })}
          />
        </div>
        <div className="dcw-section">
          <Toggle label={t('lockPosition')} checked={settings.locked} onChange={(locked) => update({ locked })} />
          <div className="dcw-reset-row">
            <button type="button" className="dcw-action-btn" onClick={onResetPosition}>
              <IconRotate size={13} /> {t('resetPosition')}
            </button>
            <button type="button" className="dcw-action-btn" data-danger="true" onClick={onResetAll}>
              {t('resetAll')}
            </button>
          </div>
        </div>
        <p className="dcw-note">
          {t('settingsHint')}<br />
          {t('keyboardHint')}<br />
          {t('storageHint')}
        </p>
      </div>
    </div>
  )
}

export function ClockWidget({ t, locale }) {
  const [settings, setSettings] = useState(readSettings)
  const [timer, setTimer] = useState(readTimer)
  const subscribeLocale = useCallback((listener) => locale.subscribe(listener), [locale])
  const readLocale = useCallback(() => locale.getSnapshot(), [locale])
  const localeSnapshot = useSyncExternalStore(subscribeLocale, readLocale, readLocale)
  const localeId = localeSnapshot?.active || 'en'
  const [pos, setPos] = useState(() => {
    const width = SIZE_WIDTH[settings.size]
    return settings.position || defaultPosition({ width: window.innerWidth, height: window.innerHeight }, width)
  })
  const posRef = useRef(pos)
  const panelRef = useRef(null)
  const dragRef = useRef(null)
  const movedRef = useRef(false)
  const dragCleanupRef = useRef(null)
  const audioRef = useRef(null)
  const chimedRef = useRef(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const isRunning = timer.endsAt != null
  const fastTick = !settingsOpen && (isRunning || (settings.showSeconds && settings.view !== 'digital'))
  const now = useNow(fastTick ? 200 : 1000)

  const remaining = Math.min(timer.duration, timerRemaining(timer, now.getTime()))
  const progress = timer.duration > 0
    ? Math.max(0, Math.min(1, 1 - remaining / timer.duration))
    : 0
  const dateStamp = Math.floor(now.getTime() / 60000)
  const zoneText = useMemo(
    () => (settings.showZone ? formatZone(now, localeId) : ''),
    [dateStamp, localeId, settings.showZone],
  )
  const parts = clockParts(now, settings.hour12, settings.showSeconds)

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    } catch {
      // A browser with storage disabled still gets a working session.
    }
  }, [settings])

  useEffect(() => {
    try {
      window.localStorage.setItem(TIMER_KEY, JSON.stringify(timer))
    } catch {
      // Same as above: persistence is best effort.
    }
  }, [timer])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.altKey && event.shiftKey && event.key.toLowerCase() === 'd') {
        event.preventDefault()
        setSettings((current) => ({ ...current, visible: !current.visible, collapsed: false }))
        setSettingsOpen(false)
      }
      if (event.key === 'Escape') setSettingsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (timer.endsAt == null) return
    if (timerRemaining(timer, now.getTime()) > 0) return
    setTimer((current) => (
      current.endsAt === timer.endsAt
        ? { ...current, endsAt: null, remaining: 0, completed: true }
        : current
    ))
    if (chimedRef.current !== timer.endsAt) {
      chimedRef.current = timer.endsAt
      playChime(audioRef.current)
    }
  }, [now, timer])

  useEffect(() => {
    const onResize = () => {
      const rect = panelRef.current?.getBoundingClientRect()
      const size = rect ? { width: rect.width, height: rect.height } : { width: SIZE_WIDTH[settings.size], height: 360 }
      setPos((current) => {
        const next = clampPosition(current, { width: window.innerWidth, height: window.innerHeight }, size)
        posRef.current = next
        return next
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [settings.size])

  useEffect(() => {
    const rect = panelRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos((current) => {
      const next = clampPosition(
        current,
        { width: window.innerWidth, height: window.innerHeight },
        { width: rect.width, height: rect.height },
      )
      if (next.x === current.x && next.y === current.y) return current
      posRef.current = next
      return next
    })
  }, [
    settings.size,
    settings.view,
    settings.collapsed,
    settings.visible,
    settingsOpen,
    settings.fontScale,
    settings.tab,
    localeId,
  ])

  useEffect(() => {
    return () => {
      if (dragCleanupRef.current) dragCleanupRef.current()
      if (audioRef.current && audioRef.current.state !== 'closed') {
        void audioRef.current.close().catch(() => {})
      }
    }
  }, [])

  const update = (patch) => {
    setSettings((current) => sanitizeSettings({ ...current, ...patch }))
  }

  const ensureAudio = () => {
    try {
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext
      if (!AudioContextCtor) return
      if (!audioRef.current) audioRef.current = new AudioContextCtor()
      if (audioRef.current.state === 'suspended') void audioRef.current.resume()
    } catch {
      // A missing audio backend only means the chime is silent.
    }
  }

  const startTimer = () => {
    ensureAudio()
    setTimer((current) => {
      const left = timerRemaining(current, Date.now())
      const seconds = left > 0 ? left : current.duration
      return {
        ...current,
        remaining: seconds,
        endsAt: Date.now() + seconds * 1000,
        completed: false,
      }
    })
  }

  const pauseTimer = () => {
    setTimer((current) => {
      const left = timerRemaining(current, Date.now())
      return { ...current, remaining: left, endsAt: null }
    })
  }

  const resetTimer = () => {
    setTimer((current) => ({ ...current, remaining: current.duration, endsAt: null, completed: false }))
  }

  const choosePreset = (duration) => {
    setTimer({ duration, remaining: duration, endsAt: null, completed: false })
  }

  const beginDrag = (event) => {
    if (settings.locked || event.button !== 0) return
    const panel = panelRef.current
    if (!panel) return
    event.stopPropagation()
    panel.style.setProperty('--dcw-rx', '0deg')
    panel.style.setProperty('--dcw-ry', '0deg')
    const rect = panel.getBoundingClientRect()
    const start = posRef.current
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: start.x,
      originY: start.y,
      width: rect.width,
      height: rect.height,
      moved: false,
    }
    movedRef.current = false
    const onMove = (moveEvent) => {
      const drag = dragRef.current
      if (!drag || moveEvent.pointerId !== drag.pointerId) return
      moveEvent.preventDefault()
      const dx = moveEvent.clientX - drag.startX
      const dy = moveEvent.clientY - drag.startY
      if (Math.abs(dx) + Math.abs(dy) > 3) {
        drag.moved = true
        movedRef.current = true
      }
      const next = clampPosition(
        { x: drag.originX + dx, y: drag.originY + dy },
        { width: window.innerWidth, height: window.innerHeight },
        { width: drag.width, height: drag.height },
      )
      posRef.current = next
      setPos(next)
    }
    const onEnd = (endEvent) => {
      const drag = dragRef.current
      if (!drag || endEvent.pointerId !== drag.pointerId) return
      cleanup()
      dragRef.current = null
      if (drag.moved) setSettings((current) => ({ ...current, position: posRef.current }))
      window.setTimeout(() => {
        movedRef.current = false
      }, 0)
    }
    const cleanup = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onEnd)
      window.removeEventListener('pointercancel', onEnd)
      dragCleanupRef.current = null
    }
    dragCleanupRef.current = cleanup
    window.addEventListener('pointermove', onMove, { passive: false })
    window.addEventListener('pointerup', onEnd)
    window.addEventListener('pointercancel', onEnd)
  }

  const handlePanelPointerMove = (event) => {
    if (settingsOpen || event.pointerType !== 'mouse' || dragRef.current) return
    const panel = panelRef.current
    if (!panel) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    panel.style.setProperty('--dcw-rx', `${(-y * 2.2).toFixed(2)}deg`)
    panel.style.setProperty('--dcw-ry', `${(x * 2.6).toFixed(2)}deg`)
  }

  const resetTilt = () => {
    const panel = panelRef.current
    if (!panel) return
    panel.style.setProperty('--dcw-rx', '0deg')
    panel.style.setProperty('--dcw-ry', '0deg')
  }

  const resetPosition = () => {
    const width = panelRef.current?.getBoundingClientRect().width || SIZE_WIDTH[settings.size]
    const next = defaultPosition({ width: window.innerWidth, height: window.innerHeight }, width)
    posRef.current = next
    setPos(next)
    setSettings((current) => ({ ...current, position: next }))
  }

  const resetAll = () => {
    const next = { ...DEFAULT_SETTINGS }
    setSettings(next)
    setSettingsOpen(false)
    setTimer({ ...DEFAULT_TIMER })
    const defaultPos = defaultPosition({ width: window.innerWidth, height: window.innerHeight }, SIZE_WIDTH[next.size])
    posRef.current = defaultPos
    setPos(defaultPos)
    try {
      window.localStorage.removeItem(SETTINGS_KEY)
      window.localStorage.removeItem(TIMER_KEY)
    } catch {
      // The next save recreates both keys anyway.
    }
  }

  const hideWidget = () => {
    setSettingsOpen(false)
    update({ visible: false, collapsed: false })
  }

  const expandedStyle = {
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    opacity: settings.opacity,
    '--dcw-scale': settings.fontScale,
    '--dcw-width': `${SIZE_WIDTH[settings.size]}px`,
  }

  if (!settings.visible) {
    return (
      <>
        <style>{CSS}</style>
        <button
          type="button"
          className={`dcw-launcher dcw-theme-${settings.theme}`}
          title={t('show')}
          aria-label={t('show')}
          onClick={() => update({ visible: true, collapsed: false })}
          style={{ '--dcw-scale': settings.fontScale }}
        >
          <IconClock size={20} />
        </button>
      </>
    )
  }

  if (settings.collapsed) {
    return (
      <div className="dcw-root" style={expandedStyle}>
        <style>{CSS}</style>
        <button
          ref={panelRef}
          type="button"
          className={`dcw-collapsed dcw-theme-${settings.theme}`}
          style={{ cursor: settings.locked ? 'default' : 'grab' }}
          title={t('expand')}
          aria-label={t('expand')}
          onPointerDown={beginDrag}
          onClick={() => {
            if (movedRef.current) {
              movedRef.current = false
              return
            }
            update({ collapsed: false })
          }}
        >
          <span className="dcw-collapsed-dot" aria-hidden="true" />
          <span className="dcw-collapsed-time">{parts.hour}:{parts.minute}</span>
          {parts.second ? <span className="dcw-collapsed-sec">{parts.second}</span> : null}
        </button>
      </div>
    )
  }

  return (
    <div className="dcw-root" style={expandedStyle}>
      <style>{CSS}</style>
      <section
        ref={panelRef}
        className={`dcw-panel dcw-theme-${settings.theme}`}
        data-theme={settings.theme}
        data-size={settings.size}
        data-view={settings.view}
        role="region"
        aria-label={t('title')}
        onPointerMove={handlePanelPointerMove}
        onPointerLeave={resetTilt}
      >
        <header className="dcw-head">
          <div
            className="dcw-drag"
            title={settings.locked ? t('lockPosition') : t('dragHint')}
            style={{ cursor: settings.locked ? 'default' : 'grab' }}
            onPointerDown={beginDrag}
            onDoubleClick={() => update({ collapsed: true })}
          >
            <span className="dcw-grip" aria-hidden="true" />
            <span className="dcw-title">{settingsOpen ? t('settings') : t('title')}</span>
          </div>
          <div className="dcw-actions">
            {settingsOpen ? (
              <button type="button" className="dcw-icon-btn" title={t('back')} aria-label={t('back')} onClick={() => setSettingsOpen(false)}>
                <IconBack />
              </button>
            ) : (
              <button
                type="button"
                className="dcw-icon-btn"
                title={t('settings')}
                aria-label={t('settings')}
                onClick={() => {
                  resetTilt()
                  setSettingsOpen(true)
                }}
              >
                <IconGear />
              </button>
            )}
            {!settingsOpen ? (
              <button type="button" className="dcw-icon-btn" title={t('collapse')} aria-label={t('collapse')} onClick={() => update({ collapsed: true })}>
                <IconMinimize />
              </button>
            ) : null}
            <button type="button" className="dcw-icon-btn" title={t('hide')} aria-label={t('hide')} onClick={hideWidget}>
              <IconEyeOff />
            </button>
          </div>
        </header>
        <div className="dcw-body">
          {settingsOpen ? (
            <SettingsPanel
              settings={settings}
              t={t}
              update={update}
              onResetPosition={resetPosition}
              onResetAll={resetAll}
            />
          ) : settings.tab === 'focus' ? (
            <FocusView
              timer={timer}
              remaining={remaining}
              progress={progress}
              t={t}
              onStart={startTimer}
              onPause={pauseTimer}
              onReset={resetTimer}
              onPreset={choosePreset}
            />
          ) : (
            <ClockFace now={now} settings={settings} t={t} localeId={localeId} />
          )}
        </div>
        {!settingsOpen ? (
          <footer className="dcw-foot">
            <button
              type="button"
              className="dcw-tab"
              data-active={settings.tab === 'clock' ? 'true' : 'false'}
              aria-pressed={settings.tab === 'clock'}
              onClick={() => update({ tab: 'clock' })}
            >
              <IconClock size={14} /> {t('clockTab')}
            </button>
            <button
              type="button"
              className="dcw-tab"
              data-active={settings.tab === 'focus' ? 'true' : 'false'}
              aria-pressed={settings.tab === 'focus'}
              onClick={() => update({ tab: 'focus' })}
            >
              <IconTimer size={14} /> {t('focusTab')}
            </button>
            {settings.showZone ? (
              <span className="dcw-zone" title={t('localTime')}>
                <i aria-hidden="true" />
                {zoneText || t('localTime')}
              </span>
            ) : null}
          </footer>
        ) : null}
      </section>
    </div>
  )
}

export const name = NS
export const inject = ['slots', 'locale']

export function apply(ctx) {
  ctx.effect(
    () => ctx.locale.register(NS, { zh: ZH, en: EN }),
    'dsh-desktop-clock: dictionaries',
  )
  const t = ctx.locale.bind(NS)
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name: 'shell.overlay',
    id: 'dsh-desktop-clock',
    order: 55,
    label: () => t('title'),
    locale: NS,
    inject: () => ({ t, locale: ctx.locale }),
  }, ClockWidget))
}
