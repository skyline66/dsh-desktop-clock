/* Bundled from src/client.jsx by scripts/build-client.mjs. Do not edit by hand. */
window.__ModuleLoader__.load({
  id: "dsh-desktop-clock",
  factory(require) {
    var module = { exports: {} };
    var exports = module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.jsx
var client_exports = {};
__export(client_exports, {
  ClockWidget: () => ClockWidget,
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(client_exports);
var React = __toESM(require("react"), 1);

// src/styles.js
var CSS = String.raw`
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
  --dcw-surface:#fffaf0;
  --dcw-surface-deep:#f8ecd8;
  --dcw-surface-2:rgba(92,61,34,.055);
  --dcw-ink:#35261b;
  --dcw-muted:#8b725d;
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
`;

// src/clock-model.js
var SETTINGS_KEY = "dsh-desktop-clock:settings:v1";
var TIMER_KEY = "dsh-desktop-clock:timer:v1";
var NS = "dsh-desktop-clock";
var THEMES = ["aurora", "ember", "linen", "graphite"];
var SIZES = ["compact", "standard", "large"];
var VIEWS = ["digital", "analog", "both"];
var TABS = ["clock", "focus"];
var SIZE_WIDTH = Object.freeze({
  compact: 248,
  standard: 300,
  large: 356
});
var DEFAULT_SETTINGS = Object.freeze({
  view: "both",
  theme: "aurora",
  size: "standard",
  hour12: false,
  showSeconds: true,
  showDate: true,
  showZone: true,
  opacity: 0.95,
  fontScale: 1,
  locked: false,
  collapsed: false,
  visible: true,
  tab: "clock",
  position: null
});
var DEFAULT_TIMER = Object.freeze({
  duration: 25 * 60,
  remaining: 25 * 60,
  endsAt: null,
  completed: false
});
var THEME_SET = new Set(THEMES);
var SIZE_SET = new Set(SIZES);
var VIEW_SET = new Set(VIEWS);
var TAB_SET = new Set(TABS);
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function clamp(value, lower, upper) {
  return Math.min(upper, Math.max(lower, value));
}
function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}
function pad2(value) {
  return String(Math.max(0, Math.trunc(value))).padStart(2, "0");
}
function isPosition(value) {
  return isRecord(value) && isFiniteNumber(value.x) && isFiniteNumber(value.y);
}
function sanitizeSettings(input) {
  const source = isRecord(input) ? input : {};
  const settings = { ...DEFAULT_SETTINGS };
  if (VIEW_SET.has(source.view)) settings.view = source.view;
  if (THEME_SET.has(source.theme)) settings.theme = source.theme;
  if (SIZE_SET.has(source.size)) settings.size = source.size;
  if (typeof source.hour12 === "boolean") settings.hour12 = source.hour12;
  if (typeof source.showSeconds === "boolean") settings.showSeconds = source.showSeconds;
  if (typeof source.showDate === "boolean") settings.showDate = source.showDate;
  if (typeof source.showZone === "boolean") settings.showZone = source.showZone;
  if (typeof source.locked === "boolean") settings.locked = source.locked;
  if (typeof source.collapsed === "boolean") settings.collapsed = source.collapsed;
  if (typeof source.visible === "boolean") settings.visible = source.visible;
  if (TAB_SET.has(source.tab)) settings.tab = source.tab;
  if (isFiniteNumber(source.opacity)) settings.opacity = clamp(source.opacity, 0.55, 1);
  if (isFiniteNumber(source.fontScale)) settings.fontScale = clamp(source.fontScale, 0.9, 1.2);
  if (isPosition(source.position)) {
    settings.position = {
      x: Math.round(source.position.x),
      y: Math.round(source.position.y)
    };
  }
  return settings;
}
function sanitizeTimer(input, now = Date.now()) {
  const source = isRecord(input) ? input : {};
  const duration = isFiniteNumber(source.duration) ? clamp(Math.round(source.duration), 60, 4 * 60 * 60) : DEFAULT_TIMER.duration;
  const rawRemaining = isFiniteNumber(source.remaining) ? clamp(Math.round(source.remaining), 0, duration) : duration;
  const endsAt = isFiniteNumber(source.endsAt) ? Math.round(source.endsAt) : null;
  if (endsAt !== null) {
    if (endsAt <= now) return { duration, remaining: 0, endsAt: null, completed: true };
    return {
      duration,
      remaining: clamp(Math.ceil((endsAt - now) / 1e3), 0, duration),
      endsAt,
      completed: false
    };
  }
  return {
    duration,
    remaining: rawRemaining,
    endsAt: null,
    completed: rawRemaining === 0
  };
}
function timerRemaining(timer, now = Date.now()) {
  if (!isRecord(timer)) return 0;
  if (isFiniteNumber(timer.endsAt)) {
    return Math.max(0, Math.ceil((timer.endsAt - now) / 1e3));
  }
  return Math.max(0, Math.ceil(isFiniteNumber(timer.remaining) ? timer.remaining : 0));
}
function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Math.ceil(isFiniteNumber(totalSeconds) ? totalSeconds : 0));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const rest = seconds % 60;
  return hours > 0 ? `${hours}:${pad2(minutes)}:${pad2(rest)}` : `${pad2(minutes)}:${pad2(rest)}`;
}
function clockParts(date, hour12 = false, showSeconds = true) {
  const hours24 = date.getHours();
  const hours = hour12 ? hours24 % 12 || 12 : hours24;
  return {
    hour: pad2(hours),
    minute: pad2(date.getMinutes()),
    second: showSeconds ? pad2(date.getSeconds()) : null,
    period: hour12 ? hours24 < 12 ? "AM" : "PM" : ""
  };
}
function clockAngles(date) {
  const seconds = date.getSeconds() + date.getMilliseconds() / 1e3;
  const minutes = date.getMinutes() + seconds / 60;
  const hours = date.getHours() % 12 + minutes / 60;
  return {
    hour: hours * 30,
    minute: minutes * 6,
    second: seconds * 6
  };
}
function formatDateLine(date, locale = "en") {
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      month: "long",
      day: "numeric"
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en", {
      weekday: "long",
      month: "long",
      day: "numeric"
    }).format(date);
  }
}
function formatZone(date, locale = "en") {
  try {
    const part = new Intl.DateTimeFormat(locale, { timeZoneName: "short" }).formatToParts(date).find((item) => item.type === "timeZoneName");
    return part ? part.value : "";
  } catch {
    return "";
  }
}
function clampPosition(position, viewport, size) {
  const margin = 8;
  const width = isFiniteNumber(viewport?.width) ? viewport.width : 1280;
  const height = isFiniteNumber(viewport?.height) ? viewport.height : 800;
  const panelWidth = isFiniteNumber(size?.width) ? size.width : SIZE_WIDTH.standard;
  const panelHeight = isFiniteNumber(size?.height) ? size.height : 360;
  const maxX = Math.max(margin, width - panelWidth - margin);
  const maxY = Math.max(margin, height - panelHeight - margin);
  const sourceX = isFiniteNumber(position?.x) ? position.x : maxX;
  const sourceY = isFiniteNumber(position?.y) ? position.y : 80;
  return {
    x: Math.round(clamp(sourceX, margin, maxX)),
    y: Math.round(clamp(sourceY, margin, maxY))
  };
}
function defaultPosition(viewport = { width: 1280, height: 800 }, width = SIZE_WIDTH.standard) {
  return clampPosition(
    { x: viewport.width - width - 24, y: Math.max(72, Math.min(112, viewport.height * 0.12)) },
    viewport,
    { width, height: 360 }
  );
}

// src/client.jsx
var { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } = React;
var ZH = {
  title: "\u684C\u9762\u65F6\u949F",
  dragHint: "\u62D6\u52A8\u79FB\u52A8\uFF0C\u53CC\u51FB\u6298\u53E0",
  collapse: "\u6298\u53E0",
  expand: "\u5C55\u5F00\u65F6\u949F",
  hide: "\u9690\u85CF\u65F6\u949F",
  show: "\u663E\u793A\u65F6\u949F",
  settings: "\u65F6\u949F\u8BBE\u7F6E",
  back: "\u8FD4\u56DE\u65F6\u949F",
  clockTab: "\u65F6\u949F",
  focusTab: "\u4E13\u6CE8",
  clockFace: "\u8868\u76D8",
  digital: "\u6570\u5B57",
  analog: "\u6307\u9488",
  both: "\u7EC4\u5408",
  theme: "\u4E3B\u9898",
  themeAurora: "\u6781\u5149",
  themeEmber: "\u4F59\u70EC",
  themeLinen: "\u4E9A\u9EBB",
  themeGraphite: "\u77F3\u58A8",
  size: "\u5C3A\u5BF8",
  compact: "\u7D27\u51D1",
  standard: "\u6807\u51C6",
  large: "\u5BBD\u5927",
  hourFormat: "\u5C0F\u65F6\u5236",
  hour24: "24 \u5C0F\u65F6",
  hour12: "12 \u5C0F\u65F6",
  seconds: "\u663E\u793A\u79D2",
  date: "\u663E\u793A\u65E5\u671F",
  timeZone: "\u663E\u793A\u65F6\u533A",
  opacity: "\u4E0D\u900F\u660E\u5EA6",
  textSize: "\u5B57\u4F53\u5927\u5C0F",
  lockPosition: "\u9501\u5B9A\u4F4D\u7F6E",
  resetPosition: "\u91CD\u7F6E\u4F4D\u7F6E",
  resetAll: "\u6062\u590D\u9ED8\u8BA4\u8BBE\u7F6E",
  focusTimer: "\u4E13\u6CE8\u8BA1\u65F6",
  focusCaption: "\u8BBE\u5B9A\u4E00\u6BB5\u5B89\u9759\u7684\u65F6\u95F4\uFF0C\u8BA9\u65F6\u949F\u66FF\u4F60\u5B88\u5019\u3002",
  start: "\u5F00\u59CB",
  pause: "\u6682\u505C",
  resume: "\u7EE7\u7EED",
  restart: "\u91CD\u65B0\u5F00\u59CB",
  reset: "\u91CD\u7F6E",
  ready: "\u51C6\u5907\u5F00\u59CB",
  running: "\u4E13\u6CE8\u4E2D",
  paused: "\u5DF2\u6682\u505C",
  done: "\u65F6\u95F4\u5230",
  timeUp: "\u65F6\u95F4\u5230\uFF0C\u4F11\u606F\u4E00\u4E0B\u3002",
  minuteUnit: "\u5206\u949F",
  localTime: "\u672C\u5730\u65F6\u95F4",
  keyboardHint: "\u6309 Alt + Shift + D \u663E\u793A\u6216\u9690\u85CF\u65F6\u949F\u3002",
  storageHint: "\u6240\u6709\u8BBE\u7F6E\u4EC5\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u4E2D\u3002",
  analogAria: "\u6307\u9488\u65F6\u949F",
  clockAria: "\u65F6\u949F",
  timerAria: "\u4E13\u6CE8\u8BA1\u65F6",
  settingsHint: "\u62D6\u52A8\u6807\u9898\u680F\u79FB\u52A8\u4F4D\u7F6E\uFF1B\u53CC\u51FB\u6807\u9898\u680F\u6298\u53E0\u3002"
};
var EN = {
  title: "Desktop Clock",
  dragHint: "Drag to move \xB7 double-click to collapse",
  collapse: "Collapse",
  expand: "Expand clock",
  hide: "Hide clock",
  show: "Show clock",
  settings: "Clock settings",
  back: "Back to clock",
  clockTab: "Clock",
  focusTab: "Focus",
  clockFace: "Clock face",
  digital: "Digital",
  analog: "Analog",
  both: "Both",
  theme: "Theme",
  themeAurora: "Aurora",
  themeEmber: "Ember",
  themeLinen: "Linen",
  themeGraphite: "Graphite",
  size: "Size",
  compact: "Compact",
  standard: "Standard",
  large: "Large",
  hourFormat: "Hour format",
  hour24: "24-hour",
  hour12: "12-hour",
  seconds: "Show seconds",
  date: "Show date",
  timeZone: "Show time zone",
  opacity: "Opacity",
  textSize: "Text size",
  lockPosition: "Lock position",
  resetPosition: "Reset position",
  resetAll: "Reset all settings",
  focusTimer: "Focus timer",
  focusCaption: "Set a quiet block and let the clock keep watch.",
  start: "Start",
  pause: "Pause",
  resume: "Resume",
  restart: "Restart",
  reset: "Reset",
  ready: "Ready",
  running: "Focusing",
  paused: "Paused",
  done: "Time is up",
  timeUp: "Time is up \u2014 take a breath.",
  minuteUnit: "min",
  localTime: "Local time",
  keyboardHint: "Press Alt + Shift + D to show or hide the clock.",
  storageHint: "All settings stay in this browser.",
  analogAria: "Analog clock",
  clockAria: "Clock",
  timerAria: "Focus timer",
  settingsHint: "Drag the title bar to move it; double-click the title bar to collapse."
};
var TICKS = Array.from({ length: 60 }, (_, index) => index);
var NUMERALS = [
  { number: "12", x: 120, y: 50 },
  { number: "3", x: 190, y: 120 },
  { number: "6", x: 120, y: 190 },
  { number: "9", x: 50, y: 120 }
];
function Icon({ size = 17, children }) {
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      focusable: "false"
    },
    children
  );
}
function IconClock({ size }) {
  return /* @__PURE__ */ React.createElement(Icon, { size }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "8.25" }), /* @__PURE__ */ React.createElement("path", { d: "M12 7.6v4.8l3.1 1.8" }));
}
function IconTimer({ size }) {
  return /* @__PURE__ */ React.createElement(Icon, { size }, /* @__PURE__ */ React.createElement("path", { d: "M9.5 3h5" }), /* @__PURE__ */ React.createElement("path", { d: "M12 3v2.2" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "13.5", r: "7.2" }), /* @__PURE__ */ React.createElement("path", { d: "M12 9.6v4.1l2.6 1.5" }), /* @__PURE__ */ React.createElement("path", { d: "M18.4 6.3l1.4 1.4" }));
}
function IconGear({ size }) {
  return /* @__PURE__ */ React.createElement(Icon, { size }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3.1" }), /* @__PURE__ */ React.createElement("path", { d: "M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.37a1.7 1.7 0 0 0-1 .63 1.7 1.7 0 0 0-.36 1.06V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.23 15a1.7 1.7 0 0 0-.63-1A1.7 1.7 0 0 0 2.54 13.6H2.5v-4h.09A1.7 1.7 0 0 0 4.1 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 8.5 4.23a1.7 1.7 0 0 0 1-.63A1.7 1.7 0 0 0 9.87 2.5V2.5h4v.09A1.7 1.7 0 0 0 14.5 3.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 18.87 8c.16.36.39.7.63 1 .3.3.67.5 1.06.6h.09v4h-.09A1.7 1.7 0 0 0 19.4 15Z" }));
}
function IconMinimize({ size }) {
  return /* @__PURE__ */ React.createElement(Icon, { size }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14" }));
}
function IconEyeOff({ size }) {
  return /* @__PURE__ */ React.createElement(Icon, { size }, /* @__PURE__ */ React.createElement("path", { d: "M3 3l18 18" }), /* @__PURE__ */ React.createElement("path", { d: "M10.6 6.2A10.6 10.6 0 0 1 12 6c4.8 0 8 4.1 9 6a13.4 13.4 0 0 1-3.4 3.8" }), /* @__PURE__ */ React.createElement("path", { d: "M6.1 6.9C4.4 8.2 3.2 10 2.6 12c1 1.9 4.2 6 9.4 6a10 10 0 0 0 4.2-.9" }), /* @__PURE__ */ React.createElement("path", { d: "M9.8 9.9a3.1 3.1 0 0 0 4.3 4.3" }));
}
function IconBack({ size }) {
  return /* @__PURE__ */ React.createElement(Icon, { size }, /* @__PURE__ */ React.createElement("path", { d: "M14.8 5.5 8.3 12l6.5 6.5" }));
}
function IconRotate({ size }) {
  return /* @__PURE__ */ React.createElement(Icon, { size }, /* @__PURE__ */ React.createElement("path", { d: "M20 11a8 8 0 1 0-2.3 6" }), /* @__PURE__ */ React.createElement("path", { d: "M20 5.5V11h-5.5" }));
}
function readSettings() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    return raw ? sanitizeSettings(JSON.parse(raw)) : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}
function readTimer() {
  try {
    const raw = window.localStorage.getItem(TIMER_KEY);
    return raw ? sanitizeTimer(JSON.parse(raw)) : { ...DEFAULT_TIMER };
  } catch {
    return { ...DEFAULT_TIMER };
  }
}
function useNow(interval) {
  const [now, setNow] = useState(() => /* @__PURE__ */ new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), interval);
    return () => window.clearInterval(timer);
  }, [interval]);
  return now;
}
function playChime(audioContext) {
  if (!audioContext || audioContext.state === "closed") return;
  try {
    const start = audioContext.currentTime;
    const master = audioContext.createGain();
    master.gain.setValueAtTime(1e-4, start);
    master.gain.exponentialRampToValueAtTime(0.16, start + 0.03);
    master.gain.exponentialRampToValueAtTime(1e-4, start + 1.25);
    master.connect(audioContext.destination);
    const notes = [
      [880, 0],
      [1174.66, 0.16],
      [1567.98, 0.32]
    ];
    for (const [frequency, offset] of notes) {
      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, start + offset);
      oscillator.connect(master);
      oscillator.start(start + offset);
      oscillator.stop(start + offset + 0.85);
    }
  } catch {
  }
}
function AnalogClock({ date, showSeconds, ariaLabel }) {
  const id = useId().replace(/:/g, "");
  const angles = clockAngles(date);
  const faceId = `${id}-face`;
  const rimId = `${id}-rim`;
  return /* @__PURE__ */ React.createElement("div", { className: "dcw-analog-wrap" }, /* @__PURE__ */ React.createElement("svg", { className: "dcw-analog", viewBox: "0 0 240 240", role: "img", "aria-label": ariaLabel }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("radialGradient", { id: faceId, cx: "38%", cy: "30%", r: "78%" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", style: { stopColor: "var(--dcw-face-2)" } }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", style: { stopColor: "var(--dcw-face)" } })), /* @__PURE__ */ React.createElement("linearGradient", { id: rimId, x1: "0", y1: "0", x2: "1", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", style: { stopColor: "var(--dcw-accent)", stopOpacity: 0.72 } }), /* @__PURE__ */ React.createElement("stop", { offset: "48%", style: { stopColor: "var(--dcw-accent-2)", stopOpacity: 0.2 } }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", style: { stopColor: "var(--dcw-accent)", stopOpacity: 0.62 } }))), /* @__PURE__ */ React.createElement("circle", { cx: "120", cy: "120", r: "112", fill: "none", stroke: `url(#${rimId})`, strokeWidth: "1.2", opacity: "0.75" }), /* @__PURE__ */ React.createElement("circle", { cx: "120", cy: "120", r: "106", fill: `url(#${faceId})`, stroke: "var(--dcw-border)", strokeWidth: "1.4" }), /* @__PURE__ */ React.createElement("circle", { cx: "120", cy: "120", r: "96", fill: "none", stroke: "var(--dcw-accent-soft)", strokeWidth: "1" }), TICKS.map((tick) => /* @__PURE__ */ React.createElement(
    "line",
    {
      key: tick,
      x1: "120",
      y1: tick % 5 === 0 ? 22 : 26,
      x2: "120",
      y2: "31",
      transform: `rotate(${tick * 6} 120 120)`,
      stroke: "var(--dcw-tick)",
      strokeWidth: tick % 5 === 0 ? 2 : 0.9,
      strokeLinecap: "round",
      opacity: tick % 5 === 0 ? 0.9 : 0.42
    }
  )), NUMERALS.map((item) => /* @__PURE__ */ React.createElement(
    "text",
    {
      key: item.number,
      x: item.x,
      y: item.y,
      textAnchor: "middle",
      dominantBaseline: "central",
      fill: "var(--dcw-tick)",
      fontFamily: "Segoe UI Variable Display, Segoe UI, sans-serif",
      fontSize: "16",
      fontWeight: "600",
      opacity: "0.88"
    },
    item.number
  )), /* @__PURE__ */ React.createElement(
    "text",
    {
      x: "120",
      y: "154",
      textAnchor: "middle",
      fill: "var(--dcw-muted)",
      fontFamily: "Segoe UI Variable Display, Segoe UI, sans-serif",
      fontSize: "7.5",
      fontWeight: "700",
      letterSpacing: "2.2",
      opacity: "0.7"
    },
    "DESK CLOCK"
  ), /* @__PURE__ */ React.createElement("g", { transform: `rotate(${angles.hour} 120 120)` }, /* @__PURE__ */ React.createElement("line", { x1: "120", y1: "120", x2: "120", y2: "78", stroke: "var(--dcw-tick)", strokeWidth: "5.4", strokeLinecap: "round" })), /* @__PURE__ */ React.createElement("g", { transform: `rotate(${angles.minute} 120 120)` }, /* @__PURE__ */ React.createElement("line", { x1: "120", y1: "120", x2: "120", y2: "54", stroke: "var(--dcw-tick)", strokeWidth: "3.2", strokeLinecap: "round" })), showSeconds ? /* @__PURE__ */ React.createElement("g", { transform: `rotate(${angles.second} 120 120)` }, /* @__PURE__ */ React.createElement("line", { x1: "120", y1: "131", x2: "120", y2: "39", stroke: "var(--dcw-accent)", strokeWidth: "1.35", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("circle", { cx: "120", cy: "39", r: "2.2", fill: "var(--dcw-accent)" })) : null, /* @__PURE__ */ React.createElement("circle", { cx: "120", cy: "120", r: "5.1", fill: "var(--dcw-accent)" }), /* @__PURE__ */ React.createElement("circle", { cx: "120", cy: "120", r: "2", fill: "var(--dcw-face)" })));
}
function ClockFace({ now, settings, t, localeId }) {
  const parts = clockParts(now, settings.hour12, settings.showSeconds);
  const timeText = `${parts.hour}:${parts.minute}${parts.second ? `:${parts.second}` : ""}${parts.period ? ` ${parts.period}` : ""}`;
  const dateText = settings.showDate ? formatDateLine(now, localeId) : "";
  return /* @__PURE__ */ React.createElement("div", { className: "dcw-clock", "data-clock-face": settings.view }, settings.view !== "digital" ? /* @__PURE__ */ React.createElement(
    AnalogClock,
    {
      date: now,
      showSeconds: settings.showSeconds,
      ariaLabel: `${t("analogAria")} ${timeText}`
    }
  ) : null, settings.view === "analog" && dateText ? /* @__PURE__ */ React.createElement("div", { className: "dcw-date" }, dateText) : null, settings.view !== "analog" ? /* @__PURE__ */ React.createElement("div", { className: "dcw-digital", role: "timer", "aria-label": `${t("clockAria")} ${timeText}` }, /* @__PURE__ */ React.createElement("div", { className: "dcw-time-row", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", { className: "dcw-digits" }, parts.hour), /* @__PURE__ */ React.createElement("span", { className: "dcw-colon" }, ":"), /* @__PURE__ */ React.createElement("span", { className: "dcw-digits" }, parts.minute), parts.second ? /* @__PURE__ */ React.createElement("span", { className: "dcw-sec" }, parts.second) : null, parts.period ? /* @__PURE__ */ React.createElement("span", { className: "dcw-period" }, parts.period) : null), dateText ? /* @__PURE__ */ React.createElement("div", { className: "dcw-date" }, dateText) : null) : null);
}
function FocusView({
  timer,
  remaining,
  progress,
  t,
  onStart,
  onPause,
  onReset,
  onPreset
}) {
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const statusKey = timer.completed ? "done" : timer.endsAt != null ? "running" : remaining > 0 && remaining < timer.duration ? "paused" : "ready";
  const primaryLabel = timer.completed ? t("restart") : timer.endsAt != null ? t("pause") : remaining > 0 && remaining < timer.duration ? t("resume") : t("start");
  return /* @__PURE__ */ React.createElement("div", { className: "dcw-focus" }, /* @__PURE__ */ React.createElement("div", { className: "dcw-focus-top" }, /* @__PURE__ */ React.createElement("i", null), t("focusTimer")), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "dcw-timer-wrap",
      role: "timer",
      "aria-label": `${t("timerAria")} ${formatDuration(remaining)}`
    },
    /* @__PURE__ */ React.createElement("svg", { className: "dcw-timer-svg", viewBox: "0 0 220 220", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("circle", { className: "dcw-timer-track", cx: "110", cy: "110", r: radius, fill: "none", strokeWidth: "3.4" }), /* @__PURE__ */ React.createElement(
      "circle",
      {
        className: "dcw-timer-progress",
        cx: "110",
        cy: "110",
        r: radius,
        fill: "none",
        strokeWidth: "4.2",
        strokeDasharray: circumference,
        strokeDashoffset: circumference * (1 - progress)
      }
    )),
    /* @__PURE__ */ React.createElement("div", { className: "dcw-timer-center" }, /* @__PURE__ */ React.createElement("div", { className: "dcw-timer-digits" }, formatDuration(remaining)), /* @__PURE__ */ React.createElement("div", { className: "dcw-timer-caption", "data-done": timer.completed ? "true" : "false", "aria-live": "polite" }, t(statusKey)))
  ), /* @__PURE__ */ React.createElement("div", { className: "dcw-presets", role: "group", "aria-label": t("focusTimer") }, [5, 15, 25, 45].map((minutes) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: minutes,
      type: "button",
      className: "dcw-preset",
      "data-active": timer.duration === minutes * 60 ? "true" : "false",
      onClick: () => onPreset(minutes * 60)
    },
    minutes,
    " ",
    t("minuteUnit")
  ))), /* @__PURE__ */ React.createElement("div", { className: "dcw-timer-actions" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "dcw-primary",
      onClick: timer.endsAt != null ? onPause : onStart
    },
    primaryLabel
  ), /* @__PURE__ */ React.createElement("button", { type: "button", className: "dcw-secondary", onClick: onReset }, t("reset"))), /* @__PURE__ */ React.createElement("p", { className: "dcw-note", style: { textAlign: "center" } }, timer.completed ? t("timeUp") : t("focusCaption")));
}
function Segmented({ label, value, options, onChange }) {
  return /* @__PURE__ */ React.createElement("div", { className: "dcw-seg", role: "group", "aria-label": label }, options.map((option) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: option.value,
      type: "button",
      "data-active": value === option.value ? "true" : "false",
      "aria-pressed": value === option.value,
      onClick: () => onChange(option.value)
    },
    option.label
  )));
}
function Toggle({ label, checked, onChange }) {
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "dcw-toggle",
      role: "switch",
      "aria-checked": checked,
      onClick: () => onChange(!checked)
    },
    /* @__PURE__ */ React.createElement("span", null, label),
    /* @__PURE__ */ React.createElement("span", { className: "dcw-switch", "aria-hidden": "true" })
  );
}
function RangeControl({ label, value, min, max, step, display, onChange }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "dcw-range-head" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("output", null, display)), /* @__PURE__ */ React.createElement(
    "input",
    {
      className: "dcw-range",
      type: "range",
      min,
      max,
      step,
      value,
      "aria-label": label,
      onChange: (event) => onChange(Number(event.target.value))
    }
  ));
}
function SettingsPanel({ settings, t, update, onResetPosition, onResetAll }) {
  const viewOptions = [
    { value: "digital", label: t("digital") },
    { value: "analog", label: t("analog") },
    { value: "both", label: t("both") }
  ];
  const sizeOptions = [
    { value: "compact", label: t("compact") },
    { value: "standard", label: t("standard") },
    { value: "large", label: t("large") }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "dcw-settings", role: "dialog", "aria-label": t("settings") }, /* @__PURE__ */ React.createElement("div", { className: "dcw-settings-scroll" }, /* @__PURE__ */ React.createElement("div", { className: "dcw-section" }, /* @__PURE__ */ React.createElement("div", { className: "dcw-section-label" }, t("clockFace")), /* @__PURE__ */ React.createElement(Segmented, { label: t("clockFace"), value: settings.view, options: viewOptions, onChange: (view) => update({ view }) })), /* @__PURE__ */ React.createElement("div", { className: "dcw-section" }, /* @__PURE__ */ React.createElement("div", { className: "dcw-section-label" }, t("theme")), /* @__PURE__ */ React.createElement("div", { className: "dcw-swatch-grid", role: "group", "aria-label": t("theme") }, THEMES.map((theme) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: theme,
      type: "button",
      className: "dcw-swatch",
      "data-theme": theme,
      "data-active": settings.theme === theme ? "true" : "false",
      "aria-pressed": settings.theme === theme,
      onClick: () => update({ theme })
    },
    /* @__PURE__ */ React.createElement("span", { className: "dcw-swatch-dot", "aria-hidden": "true" }),
    t(`theme${theme[0].toUpperCase()}${theme.slice(1)}`)
  )))), /* @__PURE__ */ React.createElement("div", { className: "dcw-section" }, /* @__PURE__ */ React.createElement("div", { className: "dcw-section-label" }, t("size")), /* @__PURE__ */ React.createElement(Segmented, { label: t("size"), value: settings.size, options: sizeOptions, onChange: (size) => update({ size }) })), /* @__PURE__ */ React.createElement("div", { className: "dcw-section" }, /* @__PURE__ */ React.createElement("div", { className: "dcw-section-label" }, t("hourFormat")), /* @__PURE__ */ React.createElement(
    Segmented,
    {
      label: t("hourFormat"),
      value: settings.hour12 ? "12" : "24",
      options: [
        { value: "24", label: t("hour24") },
        { value: "12", label: t("hour12") }
      ],
      onChange: (value) => update({ hour12: value === "12" })
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6 } }, /* @__PURE__ */ React.createElement(Toggle, { label: t("seconds"), checked: settings.showSeconds, onChange: (showSeconds) => update({ showSeconds }) }), /* @__PURE__ */ React.createElement(Toggle, { label: t("date"), checked: settings.showDate, onChange: (showDate) => update({ showDate }) }), /* @__PURE__ */ React.createElement(Toggle, { label: t("timeZone"), checked: settings.showZone, onChange: (showZone) => update({ showZone }) }))), /* @__PURE__ */ React.createElement("div", { className: "dcw-section" }, /* @__PURE__ */ React.createElement("div", { className: "dcw-section-label" }, t("opacity"), " / ", t("textSize")), /* @__PURE__ */ React.createElement(
    RangeControl,
    {
      label: t("opacity"),
      value: settings.opacity,
      min: 0.55,
      max: 1,
      step: 0.01,
      display: `${Math.round(settings.opacity * 100)}%`,
      onChange: (opacity) => update({ opacity })
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { height: 8 } }), /* @__PURE__ */ React.createElement(
    RangeControl,
    {
      label: t("textSize"),
      value: settings.fontScale,
      min: 0.9,
      max: 1.2,
      step: 0.05,
      display: `${Math.round(settings.fontScale * 100)}%`,
      onChange: (fontScale) => update({ fontScale })
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "dcw-section" }, /* @__PURE__ */ React.createElement(Toggle, { label: t("lockPosition"), checked: settings.locked, onChange: (locked) => update({ locked }) }), /* @__PURE__ */ React.createElement("div", { className: "dcw-reset-row" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "dcw-action-btn", onClick: onResetPosition }, /* @__PURE__ */ React.createElement(IconRotate, { size: 13 }), " ", t("resetPosition")), /* @__PURE__ */ React.createElement("button", { type: "button", className: "dcw-action-btn", "data-danger": "true", onClick: onResetAll }, t("resetAll")))), /* @__PURE__ */ React.createElement("p", { className: "dcw-note" }, t("settingsHint"), /* @__PURE__ */ React.createElement("br", null), t("keyboardHint"), /* @__PURE__ */ React.createElement("br", null), t("storageHint"))));
}
function ClockWidget({ t, locale }) {
  const [settings, setSettings] = useState(readSettings);
  const [timer, setTimer] = useState(readTimer);
  const subscribeLocale = useCallback((listener) => locale.subscribe(listener), [locale]);
  const readLocale = useCallback(() => locale.getSnapshot(), [locale]);
  const localeSnapshot = useSyncExternalStore(subscribeLocale, readLocale, readLocale);
  const localeId = localeSnapshot?.active || "en";
  const [pos, setPos] = useState(() => {
    const width = SIZE_WIDTH[settings.size];
    return settings.position || defaultPosition({ width: window.innerWidth, height: window.innerHeight }, width);
  });
  const posRef = useRef(pos);
  const panelRef = useRef(null);
  const dragRef = useRef(null);
  const movedRef = useRef(false);
  const dragCleanupRef = useRef(null);
  const audioRef = useRef(null);
  const chimedRef = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isRunning = timer.endsAt != null;
  const fastTick = isRunning || settings.showSeconds && settings.view !== "digital";
  const now = useNow(fastTick ? 200 : 1e3);
  const remaining = Math.min(timer.duration, timerRemaining(timer, now.getTime()));
  const progress = timer.duration > 0 ? Math.max(0, Math.min(1, 1 - remaining / timer.duration)) : 0;
  const dateStamp = Math.floor(now.getTime() / 6e4);
  const zoneText = useMemo(
    () => settings.showZone ? formatZone(now, localeId) : "",
    [dateStamp, localeId, settings.showZone]
  );
  const parts = clockParts(now, settings.hour12, settings.showSeconds);
  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
    }
  }, [settings]);
  useEffect(() => {
    try {
      window.localStorage.setItem(TIMER_KEY, JSON.stringify(timer));
    } catch {
    }
  }, [timer]);
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.altKey && event.shiftKey && event.key.toLowerCase() === "d") {
        event.preventDefault();
        setSettings((current) => ({ ...current, visible: !current.visible, collapsed: false }));
        setSettingsOpen(false);
      }
      if (event.key === "Escape") setSettingsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  useEffect(() => {
    if (timer.endsAt == null) return;
    if (timerRemaining(timer, now.getTime()) > 0) return;
    setTimer((current) => current.endsAt === timer.endsAt ? { ...current, endsAt: null, remaining: 0, completed: true } : current);
    if (chimedRef.current !== timer.endsAt) {
      chimedRef.current = timer.endsAt;
      playChime(audioRef.current);
    }
  }, [now, timer]);
  useEffect(() => {
    const onResize = () => {
      const rect = panelRef.current?.getBoundingClientRect();
      const size = rect ? { width: rect.width, height: rect.height } : { width: SIZE_WIDTH[settings.size], height: 360 };
      setPos((current) => {
        const next = clampPosition(current, { width: window.innerWidth, height: window.innerHeight }, size);
        posRef.current = next;
        return next;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [settings.size]);
  useEffect(() => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos((current) => {
      const next = clampPosition(
        current,
        { width: window.innerWidth, height: window.innerHeight },
        { width: rect.width, height: rect.height }
      );
      if (next.x === current.x && next.y === current.y) return current;
      posRef.current = next;
      return next;
    });
  }, [settings.size, settings.view, settings.collapsed, settings.visible, settingsOpen]);
  useEffect(() => {
    return () => {
      if (dragCleanupRef.current) dragCleanupRef.current();
      if (audioRef.current && audioRef.current.state !== "closed") {
        void audioRef.current.close().catch(() => {
        });
      }
    };
  }, []);
  const update = (patch) => {
    setSettings((current) => sanitizeSettings({ ...current, ...patch }));
  };
  const ensureAudio = () => {
    try {
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) return;
      if (!audioRef.current) audioRef.current = new AudioContextCtor();
      if (audioRef.current.state === "suspended") void audioRef.current.resume();
    } catch {
    }
  };
  const startTimer = () => {
    ensureAudio();
    setTimer((current) => {
      const left = timerRemaining(current, Date.now());
      const seconds = left > 0 ? left : current.duration;
      return {
        ...current,
        remaining: seconds,
        endsAt: Date.now() + seconds * 1e3,
        completed: false
      };
    });
  };
  const pauseTimer = () => {
    setTimer((current) => {
      const left = timerRemaining(current, Date.now());
      return { ...current, remaining: left, endsAt: null };
    });
  };
  const resetTimer = () => {
    setTimer((current) => ({ ...current, remaining: current.duration, endsAt: null, completed: false }));
  };
  const choosePreset = (duration) => {
    setTimer({ duration, remaining: duration, endsAt: null, completed: false });
  };
  const beginDrag = (event) => {
    if (settings.locked || event.button !== 0) return;
    const panel = panelRef.current;
    if (!panel) return;
    event.stopPropagation();
    panel.style.setProperty("--dcw-rx", "0deg");
    panel.style.setProperty("--dcw-ry", "0deg");
    const rect = panel.getBoundingClientRect();
    const start = posRef.current;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: start.x,
      originY: start.y,
      width: rect.width,
      height: rect.height,
      moved: false
    };
    movedRef.current = false;
    const onMove = (moveEvent) => {
      const drag = dragRef.current;
      if (!drag || moveEvent.pointerId !== drag.pointerId) return;
      moveEvent.preventDefault();
      const dx = moveEvent.clientX - drag.startX;
      const dy = moveEvent.clientY - drag.startY;
      if (Math.abs(dx) + Math.abs(dy) > 3) {
        drag.moved = true;
        movedRef.current = true;
      }
      const next = clampPosition(
        { x: drag.originX + dx, y: drag.originY + dy },
        { width: window.innerWidth, height: window.innerHeight },
        { width: drag.width, height: drag.height }
      );
      posRef.current = next;
      setPos(next);
    };
    const onEnd = (endEvent) => {
      const drag = dragRef.current;
      if (!drag || endEvent.pointerId !== drag.pointerId) return;
      cleanup();
      dragRef.current = null;
      if (drag.moved) setSettings((current) => ({ ...current, position: posRef.current }));
      window.setTimeout(() => {
        movedRef.current = false;
      }, 0);
    };
    const cleanup = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
      dragCleanupRef.current = null;
    };
    dragCleanupRef.current = cleanup;
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);
  };
  const handlePanelPointerMove = (event) => {
    if (event.pointerType !== "mouse" || dragRef.current) return;
    const panel = panelRef.current;
    if (!panel) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    panel.style.setProperty("--dcw-rx", `${(-y * 2.2).toFixed(2)}deg`);
    panel.style.setProperty("--dcw-ry", `${(x * 2.6).toFixed(2)}deg`);
  };
  const resetTilt = () => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.style.setProperty("--dcw-rx", "0deg");
    panel.style.setProperty("--dcw-ry", "0deg");
  };
  const resetPosition = () => {
    const width = panelRef.current?.getBoundingClientRect().width || SIZE_WIDTH[settings.size];
    const next = defaultPosition({ width: window.innerWidth, height: window.innerHeight }, width);
    posRef.current = next;
    setPos(next);
    setSettings((current) => ({ ...current, position: next }));
  };
  const resetAll = () => {
    const next = { ...DEFAULT_SETTINGS };
    setSettings(next);
    setSettingsOpen(false);
    setTimer({ ...DEFAULT_TIMER });
    const defaultPos = defaultPosition({ width: window.innerWidth, height: window.innerHeight }, SIZE_WIDTH[next.size]);
    posRef.current = defaultPos;
    setPos(defaultPos);
    try {
      window.localStorage.removeItem(SETTINGS_KEY);
      window.localStorage.removeItem(TIMER_KEY);
    } catch {
    }
  };
  const hideWidget = () => {
    setSettingsOpen(false);
    update({ visible: false, collapsed: false });
  };
  const expandedStyle = {
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    opacity: settings.opacity,
    "--dcw-scale": settings.fontScale,
    "--dcw-width": `${SIZE_WIDTH[settings.size]}px`
  };
  const clockLabel = `${parts.hour}:${parts.minute}${parts.second ? `:${parts.second}` : ""}`;
  if (!settings.visible) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("style", null, CSS), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: `dcw-launcher dcw-theme-${settings.theme}`,
        title: t("show"),
        "aria-label": t("show"),
        onClick: () => update({ visible: true, collapsed: false }),
        style: { "--dcw-scale": settings.fontScale }
      },
      /* @__PURE__ */ React.createElement(IconClock, { size: 20 })
    ));
  }
  if (settings.collapsed) {
    return /* @__PURE__ */ React.createElement("div", { className: "dcw-root", style: expandedStyle }, /* @__PURE__ */ React.createElement("style", null, CSS), /* @__PURE__ */ React.createElement(
      "button",
      {
        ref: panelRef,
        type: "button",
        className: `dcw-collapsed dcw-theme-${settings.theme}`,
        style: { cursor: settings.locked ? "default" : "grab" },
        title: t("expand"),
        "aria-label": t("expand"),
        onPointerDown: beginDrag,
        onClick: () => {
          if (movedRef.current) {
            movedRef.current = false;
            return;
          }
          update({ collapsed: false });
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "dcw-collapsed-dot", "aria-hidden": "true" }),
      /* @__PURE__ */ React.createElement("span", { className: "dcw-collapsed-time" }, parts.hour, ":", parts.minute),
      parts.second ? /* @__PURE__ */ React.createElement("span", { className: "dcw-collapsed-sec" }, parts.second) : null
    ));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "dcw-root", style: expandedStyle }, /* @__PURE__ */ React.createElement("style", null, CSS), /* @__PURE__ */ React.createElement(
    "section",
    {
      ref: panelRef,
      className: `dcw-panel dcw-theme-${settings.theme}`,
      "data-theme": settings.theme,
      "data-size": settings.size,
      "data-view": settings.view,
      role: "region",
      "aria-label": t("title"),
      onPointerMove: handlePanelPointerMove,
      onPointerLeave: resetTilt
    },
    /* @__PURE__ */ React.createElement("header", { className: "dcw-head" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "dcw-drag",
        title: settings.locked ? t("lockPosition") : t("dragHint"),
        style: { cursor: settings.locked ? "default" : "grab" },
        onPointerDown: beginDrag,
        onDoubleClick: () => update({ collapsed: true })
      },
      /* @__PURE__ */ React.createElement("span", { className: "dcw-grip", "aria-hidden": "true" }),
      /* @__PURE__ */ React.createElement("span", { className: "dcw-title" }, settingsOpen ? t("settings") : t("title"))
    ), /* @__PURE__ */ React.createElement("div", { className: "dcw-actions" }, settingsOpen ? /* @__PURE__ */ React.createElement("button", { type: "button", className: "dcw-icon-btn", title: t("back"), "aria-label": t("back"), onClick: () => setSettingsOpen(false) }, /* @__PURE__ */ React.createElement(IconBack, null)) : /* @__PURE__ */ React.createElement("button", { type: "button", className: "dcw-icon-btn", title: t("settings"), "aria-label": t("settings"), onClick: () => setSettingsOpen(true) }, /* @__PURE__ */ React.createElement(IconGear, null)), !settingsOpen ? /* @__PURE__ */ React.createElement("button", { type: "button", className: "dcw-icon-btn", title: t("collapse"), "aria-label": t("collapse"), onClick: () => update({ collapsed: true }) }, /* @__PURE__ */ React.createElement(IconMinimize, null)) : null, /* @__PURE__ */ React.createElement("button", { type: "button", className: "dcw-icon-btn", title: t("hide"), "aria-label": t("hide"), onClick: hideWidget }, /* @__PURE__ */ React.createElement(IconEyeOff, null)))),
    /* @__PURE__ */ React.createElement("div", { className: "dcw-body" }, settingsOpen ? /* @__PURE__ */ React.createElement(
      SettingsPanel,
      {
        settings,
        t,
        update,
        onResetPosition: resetPosition,
        onResetAll: resetAll
      }
    ) : settings.tab === "focus" ? /* @__PURE__ */ React.createElement(
      FocusView,
      {
        timer,
        remaining,
        progress,
        t,
        onStart: startTimer,
        onPause: pauseTimer,
        onReset: resetTimer,
        onPreset: choosePreset
      }
    ) : /* @__PURE__ */ React.createElement(ClockFace, { now, settings, t, localeId })),
    !settingsOpen ? /* @__PURE__ */ React.createElement("footer", { className: "dcw-foot" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "dcw-tab",
        "data-active": settings.tab === "clock" ? "true" : "false",
        "aria-pressed": settings.tab === "clock",
        onClick: () => update({ tab: "clock" })
      },
      /* @__PURE__ */ React.createElement(IconClock, { size: 14 }),
      " ",
      t("clockTab")
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "dcw-tab",
        "data-active": settings.tab === "focus" ? "true" : "false",
        "aria-pressed": settings.tab === "focus",
        onClick: () => update({ tab: "focus" })
      },
      /* @__PURE__ */ React.createElement(IconTimer, { size: 14 }),
      " ",
      t("focusTab")
    ), /* @__PURE__ */ React.createElement("span", { className: "dcw-zone", title: t("localTime") }, /* @__PURE__ */ React.createElement("i", { "aria-hidden": "true" }), zoneText || t("localTime"))) : null
  ));
}
var name = NS;
var inject = ["slots", "locale"];
function apply(ctx) {
  ctx.effect(
    () => ctx.locale.register(NS, { zh: ZH, en: EN }),
    "dsh-desktop-clock: dictionaries"
  );
  const t = ctx.locale.bind(NS);
  ctx.slots.inject("shell.overlay", () => ctx.slots.register({
    name: "shell.overlay",
    id: "dsh-desktop-clock",
    order: 55,
    label: () => t("title"),
    locale: NS,
    inject: () => ({ t, locale: ctx.locale })
  }, ClockWidget));
}
    return module.exports;
  },
});
