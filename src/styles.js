export const CSS = String.raw`
.dcw-root{
  position:fixed;
  z-index:60;
  pointer-events:none;
  transition:opacity .18s ease;
}
.dcw-panel,
.dcw-collapsed{
  --dcw-ui:calc(1px * var(--dcw-scale, 1));
  pointer-events:auto;
  box-sizing:border-box;
  color:var(--dcw-ink);
  background:
    radial-gradient(125% 95% at 16% -18%, var(--dcw-accent-soft), transparent 48%),
    linear-gradient(155deg, var(--dcw-surface), var(--dcw-surface-deep));
  border:1px solid var(--dcw-border);
  box-shadow:var(--dcw-shadow), var(--dcw-glow);
  -webkit-backdrop-filter:blur(24px) saturate(140%);
  backdrop-filter:blur(24px) saturate(140%);
  font-family:"Segoe UI Variable Display","Segoe UI",-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
  font-size:14px;
  -webkit-font-smoothing:antialiased;
  user-select:none;
}
.dcw-panel{
  position:relative;
  width:var(--dcw-width, 300px);
  max-height:calc(100vh - 16px);
  display:flex;
  flex-direction:column;
  overflow:hidden;
  border-radius:24px;
  transform:perspective(1100px) rotateX(var(--dcw-rx, 0deg)) rotateY(var(--dcw-ry, 0deg));
  transform-style:preserve-3d;
  transition:transform .18s ease, box-shadow .24s ease, width .22s ease, opacity .18s ease;
}
.dcw-panel::before{
  content:"";
  position:absolute;
  inset:0;
  border-radius:inherit;
  pointer-events:none;
  background:linear-gradient(118deg, rgba(255,255,255,.13), transparent 24%, transparent 70%, rgba(255,255,255,.035));
  mask:linear-gradient(#000, transparent 42%);
}
.dcw-panel:hover{ box-shadow:var(--dcw-shadow-hover), var(--dcw-glow); }
.dcw-head{
  display:flex;
  align-items:center;
  gap:8px;
  padding:12px 12px 8px 15px;
  min-height:40px;
}
.dcw-drag{
  flex:1 1 auto;
  min-width:0;
  display:flex;
  align-items:center;
  gap:8px;
  cursor:grab;
  touch-action:none;
  padding:4px 0;
}
.dcw-drag:active{ cursor:grabbing; }
.dcw-grip{
  width:15px;
  height:17px;
  flex:0 0 auto;
  color:var(--dcw-muted);
  opacity:.62;
  background-image:radial-gradient(currentColor 1px, transparent 1.2px);
  background-size:5px 5px;
  background-position:0 0;
}
.dcw-title{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  font-size:calc(10.5px * var(--dcw-scale, 1));
  font-weight:600;
  line-height:1;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--dcw-muted);
}
.dcw-actions{ display:flex; align-items:center; gap:3px; flex:0 0 auto; }
.dcw-icon-btn{
  appearance:none;
  border:0;
  padding:0;
  width:30px;
  height:30px;
  border-radius:10px;
  display:grid;
  place-items:center;
  color:var(--dcw-muted);
  background:transparent;
  cursor:pointer;
  transition:background .15s ease, color .15s ease, transform .15s ease;
}
.dcw-icon-btn:hover{ color:var(--dcw-ink); background:var(--dcw-hover); }
.dcw-icon-btn:active{ transform:scale(.94); }
.dcw-icon-btn:focus-visible,
.dcw-tab:focus-visible,
.dcw-seg button:focus-visible,
.dcw-swatch:focus-visible,
.dcw-toggle:focus-visible,
.dcw-action-btn:focus-visible,
.dcw-preset:focus-visible,
.dcw-launcher:focus-visible,
.dcw-collapsed:focus-visible{
  outline:2px solid var(--dcw-accent);
  outline-offset:2px;
}
.dcw-body{
  padding:0 18px 14px;
  min-height:0;
  overflow:auto;
  scrollbar-width:thin;
  scrollbar-color:var(--dcw-border) transparent;
}
.dcw-body::-webkit-scrollbar{ width:6px; }
.dcw-body::-webkit-scrollbar-thumb{ background:var(--dcw-border); border-radius:8px; }
.dcw-clock{ text-align:center; }

.dcw-digital{ padding:8px 0 3px; }
.dcw-time-row{
  display:flex;
  align-items:baseline;
  justify-content:center;
  gap:1px;
  font-variant-numeric:tabular-nums lining-nums;
  font-feature-settings:"tnum" 1,"lnum" 1;
}
.dcw-digits{
  font-family:"Bahnschrift","DIN Alternate","Segoe UI Variable Display","Segoe UI",sans-serif;
  font-size:calc(57px * var(--dcw-scale, 1));
  line-height:.98;
  font-weight:300;
  letter-spacing:-.055em;
  color:var(--dcw-ink);
  text-shadow:0 1px 0 rgba(255,255,255,.05);
}
.dcw-colon{
  display:inline-block;
  transform:translateY(-.055em);
  font-size:calc(48px * var(--dcw-scale, 1));
  line-height:1;
  font-weight:200;
  color:var(--dcw-accent);
  opacity:.9;
  animation:dcw-colon 2s ease-in-out infinite;
}
.dcw-sec{
  margin-left:6px;
  font-size:calc(16px * var(--dcw-scale, 1));
  font-weight:500;
  letter-spacing:.02em;
  color:var(--dcw-accent);
  font-variant-numeric:tabular-nums;
}
.dcw-period{
  margin-left:6px;
  font-size:calc(10px * var(--dcw-scale, 1));
  font-weight:700;
  letter-spacing:.12em;
  color:var(--dcw-muted);
}
.dcw-date{
  margin-top:9px;
  color:var(--dcw-muted);
  font-size:calc(12px * var(--dcw-scale, 1));
  letter-spacing:.025em;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.dcw-analog-wrap{
  display:flex;
  justify-content:center;
  padding:2px 0 6px;
}
.dcw-analog{
  width:212px;
  height:auto;
  display:block;
  filter:drop-shadow(0 13px 22px rgba(0,0,0,.22));
}
.dcw-panel[data-view="both"] .dcw-analog{ width:158px; }
.dcw-panel[data-view="both"] .dcw-digital{ padding-top:0; }
.dcw-panel[data-view="both"] .dcw-digits{ font-size:calc(38px * var(--dcw-scale, 1)); }
.dcw-panel[data-view="both"] .dcw-colon{ font-size:calc(33px * var(--dcw-scale, 1)); }
.dcw-panel[data-view="both"] .dcw-sec{ font-size:calc(13px * var(--dcw-scale, 1)); }
.dcw-panel[data-view="both"] .dcw-date{ margin-top:5px; }
.dcw-panel[data-size="compact"]:not([data-view="both"]) .dcw-digits{ font-size:calc(45px * var(--dcw-scale, 1)); }
.dcw-panel[data-size="compact"]:not([data-view="both"]) .dcw-colon{ font-size:calc(38px * var(--dcw-scale, 1)); }
.dcw-panel[data-size="large"]:not([data-view="both"]) .dcw-digits{ font-size:calc(65px * var(--dcw-scale, 1)); }
.dcw-panel[data-size="large"]:not([data-view="both"]) .dcw-colon{ font-size:calc(55px * var(--dcw-scale, 1)); }
.dcw-panel[data-size="compact"][data-view="both"] .dcw-digits{ font-size:calc(34px * var(--dcw-scale, 1)); }
.dcw-panel[data-size="large"][data-view="both"] .dcw-digits{ font-size:calc(42px * var(--dcw-scale, 1)); }
.dcw-panel[data-size="large"][data-view="both"] .dcw-colon{ font-size:calc(36px * var(--dcw-scale, 1)); }

.dcw-foot{
  flex:0 0 auto;
  display:flex;
  align-items:center;
  gap:4px;
  min-height:42px;
  padding:6px 12px;
  border-top:1px solid var(--dcw-border);
}
.dcw-tab{
  appearance:none;
  border:0;
  background:transparent;
  color:var(--dcw-muted);
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:7px 9px;
  border-radius:9px;
  cursor:pointer;
  font:inherit;
  font-size:calc(11px * var(--dcw-scale, 1));
  font-weight:600;
  letter-spacing:.015em;
  transition:background .15s ease,color .15s ease;
}
.dcw-tab:hover{ color:var(--dcw-ink); background:var(--dcw-hover); }
.dcw-tab[data-active="true"]{ color:var(--dcw-accent); background:var(--dcw-accent-soft); }
.dcw-zone{
  margin-left:auto;
  display:inline-flex;
  align-items:center;
  gap:5px;
  max-width:45%;
  color:var(--dcw-muted);
  font-size:calc(9.5px * var(--dcw-scale, 1));
  letter-spacing:.07em;
  text-transform:uppercase;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.dcw-zone i{
  width:5px;
  height:5px;
  flex:0 0 auto;
  border-radius:50%;
  background:var(--dcw-accent);
  box-shadow:0 0 8px var(--dcw-accent);
}

.dcw-settings{ display:flex; flex-direction:column; min-height:0; }
.dcw-settings-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:8px;
  padding:2px 0 8px;
}
.dcw-settings-title{
  font-size:calc(13px * var(--dcw-scale, 1));
  font-weight:650;
  letter-spacing:.01em;
}
.dcw-settings-scroll{
  overflow:auto;
  min-height:0;
  max-height:min(56vh, 470px);
  padding:0 2px 8px 1px;
  scrollbar-width:thin;
  scrollbar-color:var(--dcw-border) transparent;
}
.dcw-section{ margin-top:13px; }
.dcw-section:first-child{ margin-top:2px; }
.dcw-section-label{
  margin:0 0 7px;
  font-size:calc(9.5px * var(--dcw-scale, 1));
  font-weight:700;
  letter-spacing:.13em;
  color:var(--dcw-muted);
  text-transform:uppercase;
}
.dcw-seg{
  display:flex;
  padding:3px;
  gap:2px;
  border:1px solid var(--dcw-border);
  border-radius:11px;
  background:var(--dcw-surface-2);
}
.dcw-seg button{
  appearance:none;
  flex:1 1 0;
  min-width:0;
  border:0;
  border-radius:8px;
  padding:6px 4px;
  background:transparent;
  color:var(--dcw-muted);
  font:inherit;
  font-size:calc(10.5px * var(--dcw-scale, 1));
  font-weight:600;
  white-space:nowrap;
  cursor:pointer;
  transition:background .15s ease,color .15s ease;
}
.dcw-seg button:hover{ color:var(--dcw-ink); }
.dcw-seg button[data-active="true"]{ color:var(--dcw-accent-ink); background:var(--dcw-accent); box-shadow:0 2px 8px var(--dcw-accent-soft); }
.dcw-swatch-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:6px;
}
.dcw-swatch{
  appearance:none;
  border:1px solid var(--dcw-border);
  border-radius:10px;
  background:var(--dcw-surface-2);
  color:var(--dcw-ink);
  min-width:0;
  padding:7px 8px;
  display:flex;
  align-items:center;
  gap:7px;
  cursor:pointer;
  font:inherit;
  font-size:calc(10.5px * var(--dcw-scale, 1));
  text-align:left;
  transition:border-color .15s ease,background .15s ease;
}
.dcw-swatch:hover{ background:var(--dcw-hover); }
.dcw-swatch[data-active="true"]{ border-color:var(--dcw-accent); box-shadow:0 0 0 1px var(--dcw-accent) inset; }
.dcw-swatch-dot{
  width:17px;
  height:17px;
  flex:0 0 auto;
  border-radius:50%;
  background:linear-gradient(135deg,var(--sw-a),var(--sw-b));
  box-shadow:0 2px 5px rgba(0,0,0,.25);
}
.dcw-toggle{
  appearance:none;
  border:0;
  background:transparent;
  color:var(--dcw-ink);
  width:100%;
  padding:7px 1px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  font:inherit;
  font-size:calc(11.5px * var(--dcw-scale, 1));
  cursor:pointer;
  text-align:left;
}
.dcw-toggle + .dcw-toggle{ border-top:1px solid var(--dcw-border); }
.dcw-switch{
  width:31px;
  height:17px;
  flex:0 0 auto;
  border-radius:999px;
  background:var(--dcw-track);
  position:relative;
  transition:background .18s ease;
}
.dcw-switch::after{
  content:"";
  position:absolute;
  width:13px;
  height:13px;
  left:2px;
  top:2px;
  border-radius:50%;
  background:var(--dcw-ink);
  opacity:.88;
  transition:transform .18s ease,background .18s ease;
}
.dcw-toggle[aria-checked="true"] .dcw-switch{ background:var(--dcw-accent); }
.dcw-toggle[aria-checked="true"] .dcw-switch::after{ transform:translateX(14px); background:var(--dcw-accent-ink); }
.dcw-range-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  margin-bottom:4px;
  font-size:calc(11.5px * var(--dcw-scale, 1));
}
.dcw-range-head output{
  color:var(--dcw-muted);
  font-variant-numeric:tabular-nums;
  font-size:calc(10.5px * var(--dcw-scale, 1));
}
.dcw-range{
  width:100%;
  height:18px;
  margin:0;
  accent-color:var(--dcw-accent);
  cursor:pointer;
}
.dcw-reset-row{
  display:flex;
  gap:6px;
  margin-top:14px;
}
.dcw-action-btn{
  appearance:none;
  border:1px solid var(--dcw-border);
  background:var(--dcw-surface-2);
  color:var(--dcw-ink);
  border-radius:9px;
  padding:8px 9px;
  font:inherit;
  font-size:calc(10.5px * var(--dcw-scale, 1));
  font-weight:600;
  cursor:pointer;
  transition:background .15s ease,border-color .15s ease;
}
.dcw-action-btn:hover{ background:var(--dcw-hover); border-color:var(--dcw-muted); }
.dcw-action-btn[data-danger="true"]{ color:var(--dcw-danger); }
.dcw-action-btn[data-danger="true"]:hover{ border-color:var(--dcw-danger); background:var(--dcw-danger-soft); }
.dcw-reset-row .dcw-action-btn{ flex:1 1 0; }
.dcw-note{
  margin:11px 0 0;
  color:var(--dcw-muted);
  font-size:calc(9.5px * var(--dcw-scale, 1));
  line-height:1.5;
}
.dcw-kbd{
  display:inline-block;
  border:1px solid var(--dcw-border);
  border-bottom-color:var(--dcw-muted);
  border-radius:4px;
  padding:1px 4px;
  font-size:9px;
  color:var(--dcw-ink);
  background:var(--dcw-surface-2);
}

.dcw-focus{ padding:9px 0 5px; }
.dcw-focus-top{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:5px;
  margin-bottom:2px;
  color:var(--dcw-accent);
  font-size:calc(9.5px * var(--dcw-scale, 1));
  font-weight:700;
  letter-spacing:.14em;
  text-transform:uppercase;
}
.dcw-focus-top i{
  width:5px;height:5px;border-radius:50%;background:var(--dcw-accent);box-shadow:0 0 8px var(--dcw-accent);
}
.dcw-timer-wrap{
  position:relative;
  width:214px;
  height:214px;
  margin:2px auto 0;
  display:grid;
  place-items:center;
}
.dcw-timer-svg{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  transform:rotate(-90deg);
  filter:drop-shadow(0 0 10px var(--dcw-accent-soft));
}
.dcw-timer-track{ stroke:var(--dcw-border); }
.dcw-timer-progress{
  stroke:var(--dcw-accent);
  stroke-linecap:round;
  transition:stroke-dashoffset .25s linear;
}
.dcw-timer-center{
  position:relative;
  z-index:1;
  text-align:center;
  font-variant-numeric:tabular-nums;
}
.dcw-timer-digits{
  font-family:"Bahnschrift","DIN Alternate","Segoe UI Variable Display","Segoe UI",sans-serif;
  font-size:calc(42px * var(--dcw-scale, 1));
  line-height:1;
  font-weight:300;
  letter-spacing:-.04em;
}
.dcw-timer-caption{
  margin-top:8px;
  color:var(--dcw-muted);
  font-size:calc(9.5px * var(--dcw-scale, 1));
  letter-spacing:.08em;
  text-transform:uppercase;
}
.dcw-timer-caption[data-done="true"]{ color:var(--dcw-accent); }
.dcw-presets{
  display:flex;
  justify-content:center;
  gap:5px;
  margin:2px 0 10px;
}
.dcw-preset{
  appearance:none;
  border:1px solid var(--dcw-border);
  background:var(--dcw-surface-2);
  color:var(--dcw-muted);
  border-radius:999px;
  padding:5px 8px;
  font:inherit;
  font-size:calc(9.5px * var(--dcw-scale, 1));
  font-weight:600;
  cursor:pointer;
  transition:background .15s ease,color .15s ease,border-color .15s ease;
}
.dcw-preset:hover{ color:var(--dcw-ink); background:var(--dcw-hover); }
.dcw-preset[data-active="true"]{ border-color:var(--dcw-accent); color:var(--dcw-accent); background:var(--dcw-accent-soft); }
.dcw-timer-actions{
  display:flex;
  justify-content:center;
  gap:6px;
}
.dcw-primary{
  appearance:none;
  border:0;
  background:var(--dcw-accent);
  color:var(--dcw-accent-ink);
  border-radius:10px;
  min-width:104px;
  padding:9px 14px;
  font:inherit;
  font-size:calc(11.5px * var(--dcw-scale, 1));
  font-weight:700;
  cursor:pointer;
  box-shadow:0 6px 18px var(--dcw-accent-soft);
  transition:filter .15s ease,transform .15s ease;
}
.dcw-primary:hover{ filter:brightness(1.08); }
.dcw-primary:active{ transform:scale(.98); }
.dcw-secondary{
  appearance:none;
  border:1px solid var(--dcw-border);
  background:var(--dcw-surface-2);
  color:var(--dcw-ink);
  border-radius:10px;
  padding:9px 11px;
  font:inherit;
  font-size:calc(11px * var(--dcw-scale, 1));
  font-weight:600;
  cursor:pointer;
  transition:background .15s ease,border-color .15s ease;
}
.dcw-secondary:hover{ background:var(--dcw-hover); border-color:var(--dcw-muted); }

.dcw-collapsed{
  --dcw-width:auto;
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:9px 13px 9px 11px;
  border-radius:999px;
  cursor:grab;
  touch-action:none;
  box-shadow:var(--dcw-shadow), var(--dcw-glow);
  transition:transform .15s ease,box-shadow .2s ease,opacity .15s ease;
}
.dcw-collapsed:hover{ transform:translateY(-1px); box-shadow:var(--dcw-shadow-hover), var(--dcw-glow); }
.dcw-collapsed:active{ cursor:grabbing; }
.dcw-collapsed-dot{
  width:7px;height:7px;border-radius:50%;
  background:var(--dcw-accent);
  box-shadow:0 0 10px var(--dcw-accent);
}
.dcw-collapsed-time{
  font-family:"Bahnschrift","DIN Alternate","Segoe UI Variable Display","Segoe UI",sans-serif;
  font-size:calc(19px * var(--dcw-scale, 1));
  font-weight:400;
  line-height:1;
  letter-spacing:.01em;
  font-variant-numeric:tabular-nums;
}
.dcw-collapsed-sec{
  font-size:calc(10px * var(--dcw-scale, 1));
  color:var(--dcw-accent);
  font-variant-numeric:tabular-nums;
}
.dcw-launcher{
  position:fixed;
  z-index:60;
  right:18px;
  top:42%;
  width:44px;
  height:44px;
  border-radius:50%;
  border:1px solid var(--dcw-border);
  background:linear-gradient(145deg,var(--dcw-surface),var(--dcw-surface-deep));
  color:var(--dcw-accent);
  display:grid;
  place-items:center;
  pointer-events:auto;
  cursor:pointer;
  box-shadow:var(--dcw-shadow), var(--dcw-glow);
  -webkit-backdrop-filter:blur(18px);
  backdrop-filter:blur(18px);
  opacity:.82;
  transition:opacity .15s ease,transform .15s ease;
}
.dcw-launcher:hover{ opacity:1; transform:translateY(-1px) scale(1.03); }

.dcw-theme-aurora{
  color-scheme:dark;
  --dcw-surface:#071c21;
  --dcw-surface-deep:#041316;
  --dcw-surface-2:rgba(255,255,255,.055);
  --dcw-ink:#f0fdfa;
  --dcw-muted:#93b9b6;
  --dcw-accent:#5eead4;
  --dcw-accent-2:#38bdf8;
  --dcw-accent-soft:rgba(94,234,212,.15);
  --dcw-accent-ink:#04211d;
  --dcw-border:rgba(164,240,228,.19);
  --dcw-hover:rgba(255,255,255,.075);
  --dcw-track:rgba(255,255,255,.17);
  --dcw-face:#07191b;
  --dcw-face-2:#0d2e31;
  --dcw-tick:rgba(214,252,246,.82);
  --dcw-danger:#fda4af;
  --dcw-danger-soft:rgba(244,63,94,.12);
  --dcw-shadow:0 28px 70px rgba(0,0,0,.47),0 1px 0 rgba(255,255,255,.055) inset;
  --dcw-shadow-hover:0 34px 88px rgba(0,0,0,.54),0 1px 0 rgba(255,255,255,.075) inset;
  --dcw-glow:0 0 52px rgba(94,234,212,.11);
}
.dcw-theme-ember{
  color-scheme:dark;
  --dcw-surface:#24120e;
  --dcw-surface-deep:#170a08;
  --dcw-surface-2:rgba(255,241,230,.055);
  --dcw-ink:#fff7ed;
  --dcw-muted:#c7a28e;
  --dcw-accent:#fb923c;
  --dcw-accent-2:#fb7185;
  --dcw-accent-soft:rgba(251,146,60,.16);
  --dcw-accent-ink:#2b1104;
  --dcw-border:rgba(255,196,154,.19);
  --dcw-hover:rgba(255,255,255,.07);
  --dcw-track:rgba(255,255,255,.16);
  --dcw-face:#1c0e0b;
  --dcw-face-2:#361b13;
  --dcw-tick:rgba(255,239,224,.84);
  --dcw-danger:#fecdd3;
  --dcw-danger-soft:rgba(244,63,94,.14);
  --dcw-shadow:0 28px 70px rgba(0,0,0,.47),0 1px 0 rgba(255,255,255,.05) inset;
  --dcw-shadow-hover:0 34px 88px rgba(0,0,0,.54),0 1px 0 rgba(255,255,255,.07) inset;
  --dcw-glow:0 0 52px rgba(251,146,60,.12);
}
.dcw-theme-linen{
  color-scheme:light;
  --dcw-surface:#fffaf0;
  --dcw-surface-deep:#f8ecd8;
  --dcw-surface-2:rgba(92,61,34,.055);
  --dcw-ink:#35261b;
  --dcw-muted:#7b624e;
  --dcw-accent:#c2410c;
  --dcw-accent-2:#be123c;
  --dcw-accent-soft:rgba(194,65,12,.11);
  --dcw-accent-ink:#fff8ed;
  --dcw-border:rgba(105,72,42,.18);
  --dcw-hover:rgba(87,55,24,.07);
  --dcw-track:rgba(87,55,24,.18);
  --dcw-face:#fffaf0;
  --dcw-face-2:#fff1d6;
  --dcw-tick:rgba(62,43,29,.74);
  --dcw-danger:#b91c1c;
  --dcw-danger-soft:rgba(185,28,28,.08);
  --dcw-shadow:0 26px 66px rgba(88,58,28,.22),0 1px 0 rgba(255,255,255,.86) inset;
  --dcw-shadow-hover:0 32px 82px rgba(88,58,28,.28),0 1px 0 rgba(255,255,255,.9) inset;
  --dcw-glow:0 0 50px rgba(234,88,12,.10);
}
.dcw-theme-graphite{
  color-scheme:dark;
  --dcw-surface:#14161b;
  --dcw-surface-deep:#0a0c10;
  --dcw-surface-2:rgba(255,255,255,.055);
  --dcw-ink:#f1f5f9;
  --dcw-muted:#94a3b8;
  --dcw-accent:#cbd5e1;
  --dcw-accent-2:#94a3b8;
  --dcw-accent-soft:rgba(203,213,225,.12);
  --dcw-accent-ink:#111827;
  --dcw-border:rgba(203,213,225,.18);
  --dcw-hover:rgba(255,255,255,.07);
  --dcw-track:rgba(255,255,255,.17);
  --dcw-face:#0c0e12;
  --dcw-face-2:#20242c;
  --dcw-tick:rgba(238,242,255,.84);
  --dcw-danger:#fca5a5;
  --dcw-danger-soft:rgba(248,113,113,.12);
  --dcw-shadow:0 28px 72px rgba(0,0,0,.54),0 1px 0 rgba(255,255,255,.06) inset;
  --dcw-shadow-hover:0 34px 90px rgba(0,0,0,.61),0 1px 0 rgba(255,255,255,.08) inset;
  --dcw-glow:0 0 50px rgba(148,163,184,.10);
}
.dcw-swatch[data-theme="aurora"]{ --sw-a:#5eead4; --sw-b:#0f766e; }
.dcw-swatch[data-theme="ember"]{ --sw-a:#fb923c; --sw-b:#9f1239; }
.dcw-swatch[data-theme="linen"]{ --sw-a:#fde68a; --sw-b:#c2410c; }
.dcw-swatch[data-theme="graphite"]{ --sw-a:#e2e8f0; --sw-b:#475569; }

@keyframes dcw-colon{
  0%,42%{ opacity:.92; }
  50%,88%{ opacity:.28; }
  100%{ opacity:.92; }
}
@media (prefers-reduced-motion: reduce){
  .dcw-panel,.dcw-collapsed,.dcw-launcher,.dcw-icon-btn,.dcw-primary,.dcw-tab{ transition:none; }
  .dcw-colon{ animation:none; opacity:.8; }
}
@media (max-width: 560px){
  .dcw-panel{ width:min(var(--dcw-width, 300px), calc(100vw - 16px)); }
  .dcw-settings-scroll{ max-height:52vh; }
}
`
