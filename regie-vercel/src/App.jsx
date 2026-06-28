import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  LayoutDashboard, LayoutGrid, List as ListIcon, CalendarDays, Megaphone,
  StickyNote, Plus, Search, X, Pin, Trash2, Pencil, ChevronLeft, ChevronRight,
  Flag, Tag as TagIcon, Check, AlertTriangle, ArrowRight, ArrowLeft, Sparkles, MapPin,
  Mic, MicOff, Loader2, User, FileUp, Mail,
  Sun, Moon, Bell, Download, Users, Wallet, LayoutTemplate, CalendarRange, Menu, Upload,
  Phone, Building2, TrendingUp, TrendingDown,
} from "lucide-react";

/* ============================== STYLE ============================== */

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');

.rg-app {
  --bg: #1e0034;
  --surface: #28073f;
  --surface-2: #32104d;
  --surface-3: #3c1a59;
  --border: rgba(148,110,255,.24);
  --text: #ffffff;
  --text-muted: rgba(255,255,255,.66);
  --text-faint: rgba(255,255,255,.4);
  --accent: #ffd60c;
  --accent-soft: rgba(255,214,12,.15);
  --accent-2: #cea613;
  --accent-2-soft: rgba(206,166,19,.18);
  --accent-3: #946eff;
  --accent-3-soft: rgba(148,110,255,.18);
  --danger: #ff7a45;
  --danger-soft: rgba(255,122,69,.18);
  font-family: 'Montserrat', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 0 var(--border) inset;
}
.rg-app[data-theme="light"] {
  --bg: #f4f1f7;
  --surface: #ffffff;
  --surface-2: #f7f4fa;
  --surface-3: #ece6f3;
  --border: rgba(94,52,158,.18);
  --text: #1e0034;
  --text-muted: rgba(30,0,52,.62);
  --text-faint: rgba(30,0,52,.4);
  --accent: #b8930a;
  --accent-soft: rgba(184,147,10,.13);
  --accent-2: #8a6f0d;
  --accent-2-soft: rgba(138,111,13,.14);
  --accent-3: #6b3fd4;
  --accent-3-soft: rgba(107,63,212,.12);
  --danger: #d84a1f;
  --danger-soft: rgba(216,74,31,.12);
}
.rg-app * { box-sizing: border-box; }
.rg-mono { font-variant-numeric: tabular-nums; letter-spacing: .03em; font-weight: 600; }
.rg-display { font-weight: 800; letter-spacing: -.01em; }

.rg-app button, .rg-app input, .rg-app select, .rg-app textarea { font-family: inherit; color: inherit; }
.rg-app button:focus-visible, .rg-app input:focus-visible, .rg-app select:focus-visible,
.rg-app textarea:focus-visible, .rg-app [tabindex]:focus-visible {
  outline: 2px solid var(--accent); outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .rg-app * { transition: none !important; animation: none !important; }
}

/* ---------- sidebar ---------- */
.rg-sidebar {
  width: 226px; flex-shrink: 0; background: var(--surface);
  border-right: 1px solid var(--border); padding: 22px 16px;
  display: flex; flex-direction: column; gap: 24px;
  position: relative; overflow: hidden;
}
.rg-sidebar::before {
  content: ''; position: absolute; top: -36px; left: -36px; width: 220px; height: 220px;
  background-image: radial-gradient(circle, var(--accent-3) 1.6px, transparent 1.7px);
  background-size: 15px 15px;
  -webkit-mask-image: radial-gradient(circle at top left, #000 0%, transparent 68%);
  mask-image: radial-gradient(circle at top left, #000 0%, transparent 68%);
  opacity: .4; pointer-events: none;
}
.rg-sidebar::after {
  content: ''; position: absolute; bottom: -70px; left: -50px; width: 260px; height: 260px;
  background: radial-gradient(circle, var(--danger) 0%, transparent 70%);
  opacity: .16; filter: blur(4px); pointer-events: none;
}
.rg-sidebar > * { position: relative; z-index: 1; }
.rg-brand { display: flex; flex-direction: column; gap: 4px; padding: 0 4px; }
.rg-logo-img { width: 100%; max-width: 172px; height: auto; display: block; }
.rg-nav { display: flex; flex-direction: column; gap: 3px; margin-top: 4px; }
.rg-nav-item {
  display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 8px;
  background: transparent; border: 1px solid transparent; cursor: pointer; text-align: left;
  font-size: 13.5px; color: var(--text-muted); width: 100%;
}
.rg-nav-item:hover { background: var(--surface-2); color: var(--text); }
.rg-nav-item.active { background: var(--surface-2); color: var(--text); border-color: var(--border); }
.rg-nav-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.rg-nav-item.active .rg-nav-dot { box-shadow: 0 0 0 3px var(--dot-soft); }
.rg-nav-label { flex: 1; }
.rg-nav-count { font-size: 11px; color: var(--text-faint); }
.rg-nav-divider { height: 1px; background: var(--border); margin: 6px 4px; }
.rg-theme-toggle { display: flex; align-items: center; justify-content: center; gap: 7px; margin-top: 12px;
  padding: 9px; border-radius: 9px; border: 1px solid var(--border); background: var(--surface-2);
  color: var(--text-muted); font-size: 12.5px; font-weight: 500; cursor: pointer; width: 100%; }
.rg-theme-toggle:hover { background: var(--surface-3); color: var(--text); }

/* ---------- contacts ---------- */
.rg-contact-card { background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--accent-3);
  border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 8px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,.1); }
.rg-contact-card:hover { background: var(--surface-2); }
.rg-contact-head { display: flex; align-items: center; gap: 10px; }
.rg-contact-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--accent-3-soft); border: 1px solid var(--accent-3);
  color: var(--accent-3); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; flex-shrink: 0; }
.rg-contact-name { font-size: 13.5px; font-weight: 700; }
.rg-contact-role { font-size: 11.5px; color: var(--text-muted); }
.rg-contact-line { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--text-muted); }

/* ---------- templates ---------- */
.rg-template-card { background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--accent-2);
  border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 9px; box-shadow: 0 2px 8px rgba(0,0,0,.1); }
.rg-template-name { font-size: 14px; font-weight: 700; }
.rg-template-desc { font-size: 12px; color: var(--text-muted); line-height: 1.4; }
.rg-template-meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 11px; color: var(--text-faint); }
.rg-template-meta span { display: inline-flex; align-items: center; gap: 4px; }
.rg-template-actions { display: flex; align-items: center; gap: 6px; margin-top: 4px; }
.rg-template-actions .rg-btn-primary { flex: 1; justify-content: center; }
.rg-template-picker { background: var(--surface-2); border: 1px solid var(--border); border-radius: 9px; padding: 12px; margin-bottom: 16px; }
.rg-template-applied { font-size: 11.5px; color: var(--accent-3); margin-top: 6px; font-weight: 600; }
.rg-template-listrow { display: flex; align-items: center; gap: 8px; padding: 10px 0; border-bottom: 1px solid var(--border); }
.rg-template-listrow:last-child { border-bottom: none; }

/* ---------- budget ---------- */
.rg-budget-row { display: flex; align-items: center; gap: 8px; padding: 5px 0; }
.rg-budget-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.rg-budget-dot.recette { background: var(--accent-3); }
.rg-budget-dot.depense { background: var(--danger); }
.rg-budget-label { flex: 1; font-size: 12.5px; }
.rg-budget-amount { font-size: 12.5px; font-weight: 700; font-variant-numeric: tabular-nums; }
.rg-budget-totals { display: flex; gap: 16px; margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border); font-size: 11.5px; color: var(--text-muted); }
.rg-budget-totals b { font-variant-numeric: tabular-nums; }

/* ---------- weekly digest ---------- */
.rg-digest-text { font-size: 13.5px; line-height: 1.65; white-space: pre-wrap; color: var(--text); }

/* ---------- auth & user ---------- */
.rg-user-badge { display: flex; align-items: center; gap: 7px; padding: 5px 10px; border-radius: 8px;
  background: var(--surface-2); border: 1px solid var(--border); font-size: 12px; cursor: pointer; }
.rg-user-avatar { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; flex-shrink: 0; }
.rg-user-name { font-weight: 600; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rg-role-banner { font-size: 11px; padding: 5px 14px; text-align: center; font-weight: 600; letter-spacing: .04em; border-bottom: 1px solid var(--border); }

/* ---------- comments ---------- */
.rg-comments-panel { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border); }
.rg-comment-row { display: flex; align-items: flex-start; gap: 9px; padding: 8px 0; border-bottom: 1px solid var(--border); }
.rg-comment-row:last-of-type { border-bottom: none; }
.rg-comment-avatar { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; flex-shrink: 0; margin-top: 2px; }
.rg-comment-meta { display: flex; align-items: baseline; gap: 5px; margin-bottom: 3px; flex-wrap: wrap; }
.rg-comment-role { font-size: 10.5px; color: var(--text-faint); }
.rg-comment-date { font-size: 10.5px; color: var(--text-faint); margin-left: auto; }
.rg-comment-content { font-size: 13px; line-height: 1.45; }

/* ---------- drive & cover ---------- */
.rg-drive-link { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--accent-3);
  text-decoration: none; margin-top: 5px; font-weight: 600; }
.rg-drive-link:hover { text-decoration: underline; }

/* cover upload in form */
.rg-cover-dropzone { border: 2px dashed var(--border); border-radius: 10px; padding: 22px 14px; text-align: center;
  cursor: pointer; font-size: 13px; color: var(--text-faint); transition: border-color .15s, background .15s; }
.rg-cover-dropzone:hover { border-color: var(--accent-2); background: var(--accent-2-soft); color: var(--text); }
.rg-cover-upload-preview { position: relative; border-radius: 10px; overflow: hidden; }
.rg-cover-preview-lg { width: 100%; max-height: 200px; object-fit: cover; display: block; border-radius: 10px; border: 1px solid var(--border); }
.rg-cover-upload-actions { display: flex; gap: 8px; margin-top: 8px; }

/* vignette on kanban card */
.rg-kcard-cover-wrap { margin: -11px -12px 10px; border-radius: 6px 6px 0 0; overflow: hidden; }
.rg-kcard-cover { width: 100%; height: 110px; object-fit: cover; display: block; }

/* event checklist */
.rg-checklist-box { background: var(--surface-2); border: 1px solid var(--border); border-radius: 9px; padding: 8px 10px; }
.rg-checklist-row { display: flex; align-items: center; gap: 8px; padding: 6px 2px; cursor: pointer; border-radius: 6px; }
.rg-checklist-row:hover { background: var(--surface-3); }
.rg-checklist-check { width: 17px; height: 17px; border-radius: 5px; border: 1.5px solid var(--accent); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; }
.rg-checklist-check.on { background: var(--accent); }
.rg-checklist-label { font-size: 13px; flex: 1; }
.rg-checklist-label.done { color: var(--text-faint); text-decoration: line-through; }
.rg-kcard-checklist { margin-top: 6px; display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-faint); }

/* ---------- brand settings ---------- */
.rg-brand-section { margin-bottom: 22px; }
.rg-brand-upload-zone { border: 2px dashed var(--border); border-radius: 10px; padding: 16px; text-align: center;
  cursor: pointer; font-size: 13px; color: var(--text-faint); position: relative; }
.rg-brand-upload-zone:hover { border-color: var(--accent-2); color: var(--text); }
.rg-brand-upload-zone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.rg-brand-logo-preview { max-height: 80px; max-width: 220px; border-radius: 8px; display: block; margin: 8px auto 0; }
.rg-brand-color-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0; }
.rg-brand-color-swatch { display: flex; align-items: center; gap: 6px; padding: 4px 9px 4px 6px;
  background: var(--surface-2); border: 1px solid var(--border); border-radius: 999px; font-size: 11.5px; }
.rg-brand-color-dot { width: 18px; height: 18px; border-radius: 50%; border: 1px solid rgba(0,0,0,.15); flex-shrink: 0; }
.rg-brand-color-add { display: flex; gap: 6px; align-items: center; margin-top: 8px; }
.rg-brand-typo-list { display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0; }
.rg-brand-typo-chip { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px;
  background: var(--surface-2); border: 1px solid var(--border); border-radius: 7px; font-size: 12.5px; }
.rg-brand-pdf-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: var(--surface-2);
  border: 1px solid var(--border); border-radius: 9px; margin-top: 6px; }
.rg-brand-pdf-icon { font-size: 22px; flex-shrink: 0; }
.rg-brand-pdf-info { flex: 1; font-size: 12.5px; }
.rg-brand-pdf-name { font-weight: 600; }
.rg-brand-pdf-sub { font-size: 11px; color: var(--text-faint); }

.rg-side-stats { margin-top: auto; display: flex; flex-direction: column; gap: 10px; padding: 12px 10px;
  background: var(--surface-2); border: 1px solid var(--border); border-radius: 10px; }
.rg-side-stat { display: flex; justify-content: space-between; align-items: baseline; font-size: 11.5px; color: var(--text-muted); }
.rg-side-stat b { font-weight: 700; font-variant-numeric: tabular-nums; color: var(--text); font-size: 13px; }

/* ---------- main ---------- */
.rg-main { flex: 1; min-width: 0; display: flex; flex-direction: column; max-height: 100vh; }
.rg-topbar { display: flex; align-items: center; justify-content: space-between; padding: 18px 26px;
  border-bottom: 1px solid var(--border); flex-shrink: 0; gap: 16px; flex-wrap: wrap; }
.rg-topbar-title { font-weight: 700; font-size: 20px; display: flex; align-items: center; gap: 10px; }
.rg-topbar-date { font-size: 11px; color: var(--text-faint); }
.rg-content { flex: 1; overflow-y: auto; padding: 24px 26px 40px; }

/* ---------- buttons / inputs ---------- */
.rg-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 13px; border-radius: 8px;
  border: 1px solid var(--border); background: var(--surface-2); color: var(--text); font-size: 13px;
  cursor: pointer; font-weight: 500; white-space: nowrap; transition: transform .12s ease, filter .12s ease, background .12s ease; }
.rg-btn:hover { background: var(--surface-3); }
.rg-btn:active { transform: scale(.97); }
.rg-btn-primary { background: var(--accent-2); border-color: var(--accent-2); color: #1e0034; font-weight: 700; box-shadow: 0 2px 10px rgba(206,166,19,.18); }
.rg-btn-primary:hover { filter: brightness(1.06); }
.rg-btn-ghost { background: transparent; border-color: transparent; }
.rg-btn-ghost:hover { background: var(--surface-2); }
.rg-btn-danger { color: var(--danger); }
.rg-icon-btn { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px;
  border-radius: 7px; border: 1px solid transparent; background: transparent; color: var(--text-muted); cursor: pointer; transition: background .12s ease, color .12s ease; }
.rg-icon-btn:hover { background: var(--surface-3); color: var(--text); }

.rg-input, .rg-select, .rg-textarea {
  background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; color: var(--text);
  padding: 8px 11px; font-size: 13px; width: 100%;
}
.rg-textarea { resize: vertical; min-height: 64px; line-height: 1.5; }
.rg-input::placeholder, .rg-textarea::placeholder { color: var(--text-faint); }
.rg-search { position: relative; }
.rg-search svg { position: absolute; left: 9px; top: 50%; transform: translateY(-50%); color: var(--text-faint); }
.rg-search input { padding-left: 30px; }

.rg-toolbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 18px; }
.rg-toolbar .rg-search { width: 220px; }
.rg-spacer { flex: 1; }

.rg-viewswitch { display: flex; background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; padding: 2px; }
.rg-viewswitch button { display: flex; align-items: center; gap: 6px; padding: 6px 11px; border-radius: 6px; border: none;
  background: transparent; color: var(--text-faint); font-size: 12.5px; cursor: pointer; }
.rg-viewswitch button.active { background: var(--surface-3); color: var(--text); }

/* ---------- field / form ---------- */
.rg-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
.rg-field-row { display: flex; gap: 12px; }
.rg-field-row .rg-field { flex: 1; }
.rg-field-label { font-size: 11.5px; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: .04em; }
.rg-tag-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
.rg-tag-chip { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 999px;
  background: var(--surface-3); border: 1px solid var(--border); font-size: 11px; color: var(--text-muted); }
.rg-tag-chip button { background: none; border: none; color: var(--text-faint); cursor: pointer; display: flex; padding: 0; }

/* ---------- stat cards ---------- */
.rg-stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 26px; }
.rg-stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; box-shadow: 0 2px 8px rgba(0,0,0,.22); }
.rg-stat-num { font-size: 27px; font-weight: 800; }
.rg-stat-label { font-size: 11.5px; color: var(--text-muted); margin-top: 2px; }

.rg-section-title { font-size: 14.5px; font-weight: 700; margin-bottom: 16px; padding-bottom: 10px; display: flex;
  align-items: center; gap: 8px; position: relative; }
.rg-section-title::after { content: ''; position: absolute; left: 0; bottom: 0; width: 26px; height: 2px; background: var(--accent-3); border-radius: 2px; }
.rg-dash-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; align-items: start; }
.rg-panel { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 18px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,.22); }

/* ---------- deadline row ---------- */
.rg-deadline-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid var(--border); }
.rg-deadline-row:last-child { border-bottom: none; }
.rg-deadline-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.rg-deadline-title { flex: 1; font-size: 13px; }
.rg-deadline-meta { font-size: 11px; color: var(--text-faint); }
.rg-deadline-badge { font-size: 10.5px; font-weight: 700; font-variant-numeric: tabular-nums; padding: 2px 8px; border-radius: 999px; white-space: nowrap; }

/* ---------- quick capture ---------- */
.rg-capture-types { display: flex; gap: 6px; margin-bottom: 10px; }
.rg-capture-types button { flex: 1; padding: 7px 6px; border-radius: 7px; border: 1px solid var(--border);
  background: var(--surface-2); color: var(--text-faint); font-size: 11.5px; cursor: pointer; display: flex; flex-direction: column;
  align-items: center; gap: 3px; }
.rg-capture-types button.active { border-color: var(--type-color); color: var(--text); background: var(--type-soft); }

/* ---------- kanban ---------- */
.rg-kanban { display: grid; grid-template-columns: repeat(4, minmax(220px, 1fr)); gap: 14px; overflow-x: auto; padding-bottom: 6px; }
.rg-kcol { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 12px; min-height: 120px; }
.rg-kcol-head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid var(--border); }
.rg-kcol-num { font-size: 15px; font-weight: 800; color: var(--accent); }
.rg-kcol-title { font-size: 12px; font-weight: 600; flex: 1; text-transform: uppercase; letter-spacing: .03em; color: var(--text-muted); }
.rg-kcol-count { font-size: 11px; font-weight: 700; color: var(--text-faint); font-variant-numeric: tabular-nums; }
.rg-kcard { background: var(--surface-2); border: 1px solid var(--border); border-left: 3px solid var(--mod-color);
  border-radius: 9px; padding: 11px 12px; margin-bottom: 10px; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,.22);
  transition: transform .12s ease, background .12s ease; }
.rg-kcard:hover { background: var(--surface-3); transform: translateY(-1px); }
.rg-kcard-title { font-size: 13px; font-weight: 500; margin-bottom: 6px; line-height: 1.35; }
.rg-kcard-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 8px; }
.rg-kcard-move { display: flex; gap: 4px; }
.rg-kcard-move button { width: 22px; height: 22px; border-radius: 5px; border: 1px solid var(--border); background: var(--surface-3);
  color: var(--text-faint); display: flex; align-items: center; justify-content: center; cursor: pointer; }
.rg-kcard-move button:hover { color: var(--text); }
.rg-kcard-move button:disabled { opacity: .25; cursor: default; }

/* ---------- table ---------- */
.rg-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.rg-table th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; color: var(--text-faint);
  font-weight: 500; padding: 9px 12px; border-bottom: 1px solid var(--border); cursor: pointer; user-select: none; }
.rg-table td { padding: 11px 12px; border-bottom: 1px solid var(--border); vertical-align: middle; }
.rg-table tr:hover td { background: var(--surface-2); }
.rg-table tr { cursor: pointer; }

/* ---------- pills / badges ---------- */
.rg-pill { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; padding: 3px 9px; border-radius: 999px; font-weight: 600; white-space: nowrap; }
.rg-pill-solid { border-color: transparent !important; color: #1e0034 !important; }

/* ---------- calendar ---------- */
.rg-cal-nav { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.rg-cal-month { font-weight: 700; font-size: 15px; min-width: 160px; text-align: center; text-transform: capitalize; }
.rg-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
.rg-cal-dow { font-size: 10.5px; text-transform: uppercase; color: var(--text-faint); text-align: center; padding-bottom: 4px; }
.rg-cal-cell { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; min-height: 92px; padding: 6px; display: flex; flex-direction: column; gap: 4px; }
.rg-cal-cell.outside { opacity: .35; }
.rg-cal-cell.today { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
.rg-cal-daynum { font-size: 11px; font-weight: 600; color: var(--text-faint); font-variant-numeric: tabular-nums; }
.rg-cal-pill { font-size: 10px; padding: 2px 6px; border-radius: 5px; text-align: left; cursor: pointer; line-height: 1.3;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rg-cal-more { font-size: 10px; color: var(--text-faint); padding-left: 2px; }

/* ---------- notes ---------- */
.rg-notes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px; }
.rg-note-card { background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--accent-3);
  border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 2px 8px rgba(0,0,0,.22); }
.rg-note-content { font-size: 13px; line-height: 1.5; white-space: pre-wrap; flex: 1; }
.rg-note-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.rg-note-date { font-size: 10.5px; color: var(--text-faint); font-weight: 600; font-variant-numeric: tabular-nums; }
.rg-note-actions { display: flex; gap: 4px; }

/* ---------- voice updates ---------- */
.rg-voice-row { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
.rg-rec-btn { width: 64px; height: 64px; border-radius: 50%; border: none; cursor: pointer; flex-shrink: 0;
  background: var(--danger); color: #1e0034; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 0 0 rgba(255,122,69,.5); }
.rg-rec-btn.recording { animation: rg-pulse 1.6s ease-out infinite; }
@keyframes rg-pulse {
  0% { box-shadow: 0 0 0 0 rgba(255,122,69,.5); }
  70% { box-shadow: 0 0 0 16px rgba(255,122,69,0); }
  100% { box-shadow: 0 0 0 0 rgba(255,122,69,0); }
}
.rg-voice-status { font-size: 13px; font-weight: 600; }
.rg-spin { animation: rg-spin 0.9s linear infinite; }
@keyframes rg-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.rg-voice-hint { font-size: 11.5px; color: var(--text-faint); margin-top: 2px; }
.rg-voice-error { font-size: 12px; color: var(--danger); background: var(--danger-soft); border-radius: 8px; padding: 8px 12px; margin-bottom: 12px; }
.rg-suggestion { display: flex; align-items: flex-start; gap: 10px; padding: 11px 12px; border: 1px solid var(--border);
  border-radius: 9px; margin-bottom: 8px; background: var(--surface-2); cursor: pointer; }
.rg-suggestion.off { opacity: .42; }
.rg-suggestion-check { width: 18px; height: 18px; border-radius: 5px; border: 1.5px solid var(--accent-3); flex-shrink: 0; margin-top: 1px;
  display: flex; align-items: center; justify-content: center; }
.rg-suggestion-check.on { background: var(--accent-3); }
.rg-suggestion-body { flex: 1; }
.rg-suggestion-summary { font-size: 13px; }
.rg-suggestion-type { font-size: 10.5px; color: var(--text-faint); text-transform: uppercase; letter-spacing: .04em; margin-top: 2px; }
.rg-log-row { padding: 10px 0; border-bottom: 1px solid var(--border); }
.rg-log-row:last-child { border-bottom: none; }
.rg-log-date { font-size: 10.5px; color: var(--text-faint); font-weight: 600; }
.rg-log-summary { font-size: 12.5px; margin-top: 2px; }
.rg-log-source { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 600;
  text-transform: uppercase; letter-spacing: .05em; padding: 1px 7px; border-radius: 999px; margin-left: 6px; }

/* ---------- gmail panel ---------- */
.rg-gmail-block { display: flex; gap: 14px; align-items: flex-start; }
.rg-gmail-logo { flex-shrink: 0; margin-top: 2px; }
.rg-gmail-info { flex: 1; }
.rg-gmail-title { font-size: 13.5px; font-weight: 700; margin-bottom: 5px; }
.rg-gmail-desc { font-size: 12.5px; color: var(--text-muted); line-height: 1.5; margin-bottom: 10px; }
.rg-gmail-desc em { color: var(--accent-3); font-style: normal; font-weight: 600; }
.rg-gmail-steps { display: flex; flex-direction: column; gap: 6px; }
.rg-gmail-step { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: var(--text-muted); }
.rg-gmail-step-num { flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%; background: var(--accent-3-soft);
  border: 1px solid var(--accent-3); color: var(--accent-3); display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; }
.rg-pdf-zone { border: 2px dashed var(--border); border-radius: 10px; padding: 20px 14px; text-align: center;
  color: var(--text-faint); font-size: 13px; cursor: pointer; transition: border-color .15s ease, background .15s ease; }
.rg-pdf-zone:hover { border-color: var(--accent-2); background: var(--accent-2-soft); color: var(--text); }
.rg-pdf-zone input[type="file"] { display: none; }

/* ---------- pending badge ---------- */
.rg-pending-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 999px;
  background: var(--accent-soft); border: 1px solid var(--accent); color: var(--accent); font-size: 11.5px; font-weight: 700; }

/* ---------- modal ---------- */
.rg-overlay { position: fixed; inset: 0; background: rgba(8,1,18,.7); backdrop-filter: blur(3px); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 20px; }
.rg-modal { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; width: 100%; max-width: 520px;
  max-height: 88vh; overflow-y: auto; padding: 22px; box-shadow: 0 20px 60px rgba(0,0,0,.45); }
.rg-modal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.rg-modal-title { font-size: 16px; font-weight: 700; }
.rg-modal-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--border); }

/* ---------- empty ---------- */
.rg-empty { color: var(--text-faint); font-size: 13px; padding: 26px 4px; font-style: italic; }
.rg-loading { display: flex; align-items: center; justify-content: center; height: 100vh; width: 100%; color: var(--text-muted); font-size: 13px; }

/* ---------- gamification ---------- */
.rg-confetti { position: fixed; inset: 0; pointer-events: none; z-index: 60; overflow: hidden; }
.rg-confetti-piece { position: absolute; top: -14px; width: 7px; height: 13px; opacity: .95; border-radius: 1px;
  animation-name: rg-confetti-fall; animation-timing-function: ease-in; animation-fill-mode: forwards; }
@keyframes rg-confetti-fall { to { transform: translateY(70vh) rotate(260deg); opacity: 0; } }

.rg-subtask-row { display: flex; align-items: center; gap: 8px; padding: 5px 0; }
.rg-subtask-check { width: 16px; height: 16px; border-radius: 5px; border: 1.5px solid var(--accent-3); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; cursor: pointer; }
.rg-subtask-check.on { background: var(--accent-3); }
.rg-subtask-text { flex: 1; font-size: 13px; }
.rg-subtask-text.done { color: var(--text-faint); text-decoration: line-through; }
.rg-subtask-frac { font-size: 10.5px; color: var(--text-faint); margin-left: 6px; font-weight: 600; }

.rg-challenge-row { display: flex; align-items: flex-start; gap: 9px; padding: 8px 0; border-bottom: 1px solid var(--border); cursor: pointer; }
.rg-challenge-row:last-child { border-bottom: none; }
.rg-challenge-check { width: 17px; height: 17px; border-radius: 5px; border: 1.5px solid var(--accent); flex-shrink: 0; margin-top: 1px;
  display: flex; align-items: center; justify-content: center; }
.rg-challenge-check.on { background: var(--accent); }
.rg-challenge-text { font-size: 13px; flex: 1; }
.rg-challenge-text.done { color: var(--text-faint); text-decoration: line-through; }
.rg-challenge-divider { display: flex; align-items: center; gap: 8px; margin: 10px 0 4px; font-size: 10.5px; text-transform: uppercase;
  letter-spacing: .06em; color: var(--text-faint); font-weight: 600; }

.rg-goal-row { display: flex; align-items: center; gap: 16px; }
.rg-goal-stepper { display: flex; align-items: center; gap: 6px; margin-top: 8px; }
.rg-goal-stepper button { width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface-2);
  color: var(--text-muted); cursor: pointer; }
.rg-goal-stepper button:hover { color: var(--text); }
.rg-goal-label { font-size: 11.5px; color: var(--text-muted); }
.rg-bestweek { font-size: 11.5px; color: var(--text-faint); margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border); }
.rg-bestweek b { color: var(--text); font-weight: 700; }

/* ---------- xp bar (Minecraft-style) ---------- */
.rg-xp-wrap { text-align: center; padding: 6px 0 4px; max-width: 360px; margin: 0 auto; }
.rg-xp-level { font-size: 26px; font-weight: 800; color: #80ff20; letter-spacing: .02em;
  text-shadow: -2px 0 #14530a, 2px 0 #14530a, 0 -2px #14530a, 0 2px #14530a, -2px -2px #14530a, 2px 2px #14530a, -2px 2px #14530a, 2px -2px #14530a;
  margin-bottom: 8px; }
.rg-xp-bar-outer { height: 20px; border-radius: 5px; background: #161616; border: 2px solid #050505; padding: 2px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.06); }
.rg-xp-bar-inner { height: 100%; border-radius: 3px; background: linear-gradient(180deg, #c8ff6e 0%, #80ff20 45%, #5cb013 100%);
  box-shadow: inset 0 -3px 0 rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.45); transition: width .5s ease; }
.rg-xp-meta { display: flex; justify-content: space-between; margin-top: 7px; font-size: 11px; color: var(--text-faint); }
.rg-xp-meta b { color: var(--text); font-weight: 700; }

/* ---------- responsive / burger menu ---------- */
.rg-burger { display: none; }

@media (max-width: 860px) {
  .rg-app { flex-direction: column; min-height: 100dvh; }

  /* topbar burger button */
  .rg-burger {
    display: flex; align-items: center; justify-content: center;
    width: 38px; height: 38px; border-radius: 9px; border: 1px solid var(--border);
    background: var(--surface-2); color: var(--text); cursor: pointer; flex-shrink: 0;
  }

  /* sidebar becomes an overlay drawer */
  .rg-sidebar {
    position: fixed; top: 0; left: 0; height: 100dvh; width: 260px; z-index: 100;
    flex-direction: column; gap: 18px; padding: 22px 16px;
    transform: translateX(-100%); transition: transform .25s ease;
    box-shadow: 4px 0 32px rgba(0,0,0,.35);
  }
  .rg-sidebar.open { transform: translateX(0); }

  /* overlay backdrop */
  .rg-drawer-overlay {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,.5);
    z-index: 99; backdrop-filter: blur(2px);
  }
  .rg-drawer-overlay.open { display: block; }

  /* main fills the screen */
  .rg-main { flex: 1; min-height: 0; }
  .rg-topbar { padding: 12px 16px; gap: 10px; }

  .rg-side-stats { display: flex; }
  .rg-dash-grid { grid-template-columns: 1fr; }
  .rg-stats-row { grid-template-columns: repeat(2, 1fr); }
  .rg-kanban { grid-template-columns: repeat(4, 240px); }
  .rg-notes-grid { grid-template-columns: 1fr; }
}
`;

/* ============================== CONSTANTS ============================== */

const MODULE_COLOR = { projets: "var(--accent)", editorial: "var(--accent-2)", notes: "var(--accent-3)" };
const MODULE_SOFT = { projets: "var(--accent-soft)", editorial: "var(--accent-2-soft)", notes: "var(--accent-3-soft)" };

const PROJECT_STATUSES = [
  { key: "a_faire", label: "À faire", color: "var(--accent-3)" },
  { key: "en_cours", label: "En cours", color: "var(--accent)" },
  { key: "en_attente", label: "En attente", color: "var(--danger)" },
  { key: "termine", label: "Terminé", color: "var(--accent-2)", solid: true },
];

const DEFAULT_EVENT_CHECKLIST = [
  "Visuels",
  "Fiche inscription",
  "Site / Agenda",
  "Mailing invitations",
  "Réseaux sociaux",
  "Partenaires confirmés",
  "Lieu confirmé",
  "Intervenant(s)",
  "Traiteur",
];

const PRIORITIES = [
  { key: "basse", label: "Basse", color: "var(--text-faint)" },
  { key: "normale", label: "Normale", color: "var(--accent-3)" },
  { key: "haute", label: "Haute", color: "var(--accent)" },
  { key: "urgente", label: "Urgente", color: "var(--danger)" },
];

const EDITORIAL_TYPES = ["LinkedIn", "WhatsApp", "Mailing", "Newsletter", "Site / Agenda", "Comité édito", "ISCOM", "Événement", "Autre"];

const EDITORIAL_STATUSES = [
  { key: "pas_commence", label: "Pas commencé", color: "var(--text-faint)" },
  { key: "en_cours", label: "En cours", color: "var(--accent)" },
  { key: "termine", label: "Terminé", color: "var(--accent-2)", solid: true },
  { key: "annule", label: "Annulé", color: "var(--danger)" },
];

function statusInfo(list, key) { return list.find((s) => s.key === key) || list[0]; }
function priorityInfo(key) { return PRIORITIES.find((p) => p.key === key) || PRIORITIES[1]; }

/* ============================== HELPERS ============================== */

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const SUPA_URL_GLOBAL = "https://jyvjslbiavdqashlrskh.supabase.co";
const SUPA_KEY_GLOBAL = "sb_publishable_VyF5TWf53uQHUdhKgjDw7Q_Esd_D-HW";

const ROLES = { admin: "admin", equipe: "equipe", ca: "ca" };
const ROLE_LABELS = { admin: "Administrateur", equipe: "Équipe", ca: "Conseil d'administration" };
const ROLE_COLORS = { admin: "var(--accent)", equipe: "var(--accent-3)", ca: "var(--accent-2)" };

async function sbAuth(path, body) {
  const res = await fetch(`${SUPA_URL_GLOBAL}/auth/v1${path}`, {
    method: "POST",
    headers: { apikey: SUPA_KEY_GLOBAL, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function sbGetSession() {
  try {
    const stored = localStorage.getItem("regie_session");
    if (!stored) return null;
    const session = JSON.parse(stored);
    if (!session?.access_token) return null;
    // verify token is not expired
    const payload = JSON.parse(atob(session.access_token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      // try refresh
      const res = await fetch(`${SUPA_URL_GLOBAL}/auth/v1/token?grant_type=refresh_token`, {
        method: "POST",
        headers: { apikey: SUPA_KEY_GLOBAL, "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: session.refresh_token }),
      });
      if (!res.ok) { localStorage.removeItem("regie_session"); return null; }
      const newSession = await res.json();
      localStorage.setItem("regie_session", JSON.stringify(newSession));
      return newSession;
    }
    return session;
  } catch (e) { return null; }
}

async function sbGetProfile(accessToken) {
  try {
    const res = await fetch(`${SUPA_URL_GLOBAL}/rest/v1/profiles?select=*&limit=1`, {
      headers: { apikey: SUPA_KEY_GLOBAL, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data[0] || null;
  } catch (e) { return null; }
}

async function sbGetWithAuth(table, token, opts = {}) {
  try {
    let url = `${SUPA_URL_GLOBAL}/rest/v1/${table}`;
    const params = new URLSearchParams();
    if (opts.eq) Object.entries(opts.eq).forEach(([k, v]) => params.append(k, `eq.${v}`));
    if (opts.order) params.append("order", opts.order);
    if ([...params].length) url += "?" + params.toString();
    const res = await fetch(url, {
      headers: { apikey: SUPA_KEY_GLOBAL, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) { return []; }
}

async function sbUpsertWithAuth(table, data, token) {
  try {
    await fetch(`${SUPA_URL_GLOBAL}/rest/v1/${table}`, {
      method: "POST",
      headers: { apikey: SUPA_KEY_GLOBAL, Authorization: `Bearer ${token}`, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates" },
      body: JSON.stringify(data),
    });
  } catch (e) { console.error("Supabase upsert error", e); }
}

async function sbDeleteWithAuth(table, id, token) {
  try {
    await fetch(`${SUPA_URL_GLOBAL}/rest/v1/${table}?id=eq.${id}`, {
      method: "DELETE",
      headers: { apikey: SUPA_KEY_GLOBAL, Authorization: `Bearer ${token}` },
    });
  } catch (e) { console.error("Supabase delete error", e); }
}

async function uploadToStorage(file, path, bucket = "brand-assets") {
  const res = await fetch(`${SUPA_URL_GLOBAL}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: { apikey: SUPA_KEY_GLOBAL, Authorization: `Bearer ${SUPA_KEY_GLOBAL}`, "Content-Type": file.type, "x-upsert": "true" },
    body: file,
  });
  if (!res.ok) { const err = await res.text(); throw new Error(err); }
  return `${SUPA_URL_GLOBAL}/storage/v1/object/public/${bucket}/${path}`;
}

function isoOf(d) {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function todayISO() { return isoOf(new Date()); }

function formatFR(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  return Math.round((target - today) / 86400000);
}

function urgencyColor(days) {
  if (days === null) return "var(--text-faint)";
  if (days <= 2) return "var(--danger)";
  if (days <= 7) return "var(--accent)";
  return "var(--text-muted)";
}
function urgencyLabel(days) {
  if (days === null) return "Pas d'échéance";
  if (days < 0) return `Retard ${Math.abs(days)} j`;
  if (days === 0) return "Aujourd'hui";
  if (days === 1) return "Demain";
  return `J-${days}`;
}

function getMonthMatrix(cursor) {
  const year = cursor.getFullYear(), month = cursor.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
  const start = new Date(year, month, 1 - startOffset);
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

function mondayOf(d) {
  const date = new Date(d);
  const offset = (date.getDay() + 6) % 7; // Monday = 0
  date.setDate(date.getDate() - offset);
  date.setHours(0, 0, 0, 0);
  return date;
}

const FALLBACK_CHALLENGES = [
  "Revois le tableau de bord et mets à jour une échéance qui a changé",
  "Ajoute une sous-tâche à un projet en cours",
  "Relis tes notes et transforme une idée en projet",
  "Essaie la mise à jour vocale pour faire le point sur un projet",
  "Vérifie s'il y a un contenu éditorial à planifier pour la semaine prochaine",
  "Capture une idée ou une note, même courte",
];

function buildDailyChallenges(projects, editorial, notes, today) {
  const candidates = [];
  const enAttente = projects.find((p) => p.status === "en_attente");
  if (enAttente) candidates.push(`Fais avancer « ${enAttente.title} », en attente`);

  const urgent = projects.find((p) => p.status !== "termine" && p.deadline && daysUntil(p.deadline) !== null && daysUntil(p.deadline) <= 2);
  if (urgent) candidates.push(`Échéance proche : avance ou boucle « ${urgent.title} »`);

  const dueThisWeek = editorial.find((e) => e.status !== "termine" && e.status !== "annule" && e.date && daysUntil(e.date) !== null && daysUntil(e.date) >= 0 && daysUntil(e.date) <= 7);
  if (dueThisWeek) candidates.push(`Prépare « ${dueThisWeek.title} », prévu cette semaine`);

  if (!notes.some((n) => n.createdAt === today)) candidates.push("Capture au moins une idée ou note aujourd'hui");

  if (projects.filter((p) => p.status === "a_faire").length >= 5) candidates.push("Fais passer un projet de « À faire » à « En cours »");

  const dayIndex = new Date(today).getDate();
  while (candidates.length < 3) {
    const fallback = FALLBACK_CHALLENGES[(dayIndex + candidates.length) % FALLBACK_CHALLENGES.length];
    if (!candidates.includes(fallback)) candidates.push(fallback);
  }

  return candidates.slice(0, 3).map((text, i) => ({ id: `d${i}_${today}`, text, done: false }));
}

function buildWeeklyChallenges(projects, editorial) {
  return [{ id: "w_target", text: "Termine au moins 2 projets ou contenus cette semaine", done: false }];
}

function buildMonthlyChallenge(monthlyTarget) {
  return [{ id: "m_target", text: `Atteins ton objectif du mois : ${monthlyTarget} éléments terminés`, done: false }];
}

const CHALLENGE_XP = { daily: 5, weekly: 20, monthly: 50 };

function levelFromXP(totalXP) {
  let level = 1;
  let remaining = totalXP;
  let needed = 20; // XP requis pour passer le niveau 1
  while (remaining >= needed) {
    remaining -= needed;
    level += 1;
    needed = 20 + (level - 1) * 10;
  }
  return { level, xpInLevel: remaining, xpForNext: needed };
}

/* ============================== ATOMS ============================== */

function Pill({ label, color, solid }) {
  if (solid) {
    return (
      <span className="rg-pill rg-pill-solid" style={{ background: color }}>
        {label}
      </span>
    );
  }
  return (
    <span className="rg-pill" style={{ background: "transparent", border: `1px solid ${color}`, color }}>
      {label}
    </span>
  );
}

function TagInput({ value, onChange, placeholder }) {
  const [draft, setDraft] = useState("");
  function commit() {
    const v = draft.trim().replace(/,$/, "");
    if (v && !value.includes(v)) onChange([...value, v]);
    setDraft("");
  }
  return (
    <div>
      <input
        className="rg-input"
        placeholder={placeholder || "Ajouter un tag, puis Entrée"}
        value={draft}
        onChange={(e) => {
          if (e.target.value.endsWith(",")) { setDraft(e.target.value); commit(); }
          else setDraft(e.target.value);
        }}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commit(); } }}
        onBlur={commit}
      />
      {value.length > 0 && (
        <div className="rg-tag-row">
          {value.map((t) => (
            <span className="rg-tag-chip" key={t}>
              {t}
              <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} aria-label={`Retirer ${t}`}>
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ConfirmDelete({ onConfirm }) {
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <span style={{ display: "inline-flex", gap: 4 }}>
        <button className="rg-icon-btn" style={{ color: "var(--danger)" }} onClick={(e) => { e.stopPropagation(); onConfirm(); }} title="Confirmer la suppression">
          <Check size={14} />
        </button>
        <button className="rg-icon-btn" onClick={(e) => { e.stopPropagation(); setConfirming(false); }} title="Annuler">
          <X size={14} />
        </button>
      </span>
    );
  }
  return (
    <button className="rg-icon-btn" onClick={(e) => { e.stopPropagation(); setConfirming(true); }} title="Supprimer">
      <Trash2 size={14} />
    </button>
  );
}

function Modal({ title, onClose, children, footer }) {
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="rg-overlay" onClick={onClose}>
      <div className="rg-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rg-modal-head">
          <div className="rg-modal-title">{title}</div>
          <button className="rg-icon-btn" onClick={onClose} aria-label="Fermer"><X size={16} /></button>
        </div>
        {children}
        {footer && <div className="rg-modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

function ProgressBar({ done, total, color }) {
  if (!total) return null;
  const pct = Math.round((done / total) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 6, marginBottom: 6 }}>
      <div style={{ flex: 1, height: 5, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color || "var(--accent-3)", borderRadius: 999 }} />
      </div>
      <span className="rg-mono" style={{ fontSize: 10.5, color: "var(--text-faint)" }}>{done}/{total}</span>
    </div>
  );
}

function RingProgress({ value, max, size = 88, stroke = 9, color = "var(--accent-2)" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill="var(--text)" fontSize="19" fontWeight="800" fontFamily="Montserrat">{value}</text>
    </svg>
  );
}

const CONFETTI_COLORS = ["var(--accent)", "var(--accent-2)", "var(--accent-3)", "var(--danger)", "#ffffff"];
function Confetti() {
  const pieces = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 0.25, dur: 0.9 + Math.random() * 0.5,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length], rot: Math.random() * 360,
  })), []);
  return (
    <div className="rg-confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span key={p.id} className="rg-confetti-piece"
          style={{ left: `${p.left}%`, background: p.color, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, transform: `rotate(${p.rot}deg)` }} />
      ))}
    </div>
  );
}

/* ============================== FORMS ============================== */

function ProjectForm({ draft, setDraft, templates = [], onApplyTemplate, onSaveAsTemplate, onManageTemplates }) {
  const [subtaskDraft, setSubtaskDraft] = useState("");
  const [checklistItemDraft, setChecklistItemDraft] = useState("");
  const subtasks = draft.subtasks || [];
  const checklist = draft.checklist || [];
  function addSubtask() {
    const text = subtaskDraft.trim();
    if (!text) return;
    setDraft({ ...draft, subtasks: [...subtasks, { id: uid(), text, done: false }] });
    setSubtaskDraft("");
  }
  function toggleLocalSubtask(id) {
    setDraft({ ...draft, subtasks: subtasks.map((s) => (s.id === id ? { ...s, done: !s.done } : s)) });
  }
  function removeSubtask(id) {
    setDraft({ ...draft, subtasks: subtasks.filter((s) => s.id !== id) });
  }
  const budget = draft.budget || [];
  const [budgetLabel, setBudgetLabel] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetType, setBudgetType] = useState("depense");
  function addBudgetLine() {
    const label = budgetLabel.trim();
    const amount = parseFloat(budgetAmount);
    if (!label || isNaN(amount)) return;
    setDraft({ ...draft, budget: [...budget, { id: uid(), label, amount, type: budgetType }] });
    setBudgetLabel(""); setBudgetAmount("");
  }
  function removeBudgetLine(id) { setDraft({ ...draft, budget: budget.filter((b) => b.id !== id) }); }
  const totalRecettes = budget.filter((b) => b.type === "recette").reduce((s, b) => s + b.amount, 0);
  const totalDepenses = budget.filter((b) => b.type === "depense").reduce((s, b) => s + b.amount, 0);
  const solde = totalRecettes - totalDepenses;
  return (
    <div>
      {!draft.id && (
        <div className="rg-template-picker">
          <div className="rg-field" style={{ marginBottom: 8 }}>
            <label className="rg-field-label"><LayoutTemplate size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} />Partir d'un modèle</label>
            <div style={{ display: "flex", gap: 6 }}>
              <select className="rg-select" value="" onChange={(e) => { if (e.target.value) onApplyTemplate(e.target.value); }}>
                <option value="">— Choisir un modèle —</option>
                {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              {onManageTemplates && <button type="button" className="rg-btn rg-btn-ghost" onClick={onManageTemplates} title="Gérer les modèles"><Pencil size={13} /></button>}
            </div>
            {draft._appliedTemplate && <div className="rg-template-applied">✓ Modèle « {draft._appliedTemplate} » appliqué — ajuste les champs ci-dessous</div>}
          </div>
        </div>
      )}
      <div className="rg-field">
        <label className="rg-field-label">Titre</label>
        <input className="rg-input" autoFocus value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Ex. Soirée Fête de l'été" />
      </div>
      <div className="rg-field">
        <label className="rg-field-label">Description</label>
        <textarea className="rg-textarea" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Détails, contexte, prochaines actions…" />
      </div>

      {/* Checklist événementielle */}
      <div className="rg-field">
        <label className="rg-field-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>✅ Checklist événement
            {(checklist.length > 0) && <span className="rg-subtask-frac" style={{ marginLeft: 8 }}>
              {checklist.filter((c) => c.done).length}/{checklist.length}
            </span>}
          </span>
        </label>
        <div className="rg-checklist-box">
          {checklist.map((item) => (
            <div className="rg-checklist-row" key={item.id}
              onClick={() => setDraft({ ...draft, checklist: checklist.map((c) => c.id === item.id ? { ...c, done: !c.done } : c) })}>
              <span className={`rg-checklist-check${item.done ? " on" : ""}`}>
                {item.done && <Check size={11} color="#1e0034" />}
              </span>
              <span className={`rg-checklist-label${item.done ? " done" : ""}`}>{item.label}</span>
              <button type="button" className="rg-icon-btn" style={{ width: 20, height: 20, marginLeft: "auto" }}
                onClick={(e) => { e.stopPropagation(); setDraft({ ...draft, checklist: checklist.filter((c) => c.id !== item.id) }); }}
                aria-label="Supprimer"><X size={11} /></button>
            </div>
          ))}
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            <input className="rg-input" style={{ fontSize: 12.5 }} value={checklistItemDraft} placeholder="Ajouter un item…"
              onChange={(e) => setChecklistItemDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && checklistItemDraft.trim()) {
                  e.preventDefault();
                  setDraft({ ...draft, checklist: [...checklist, { id: uid(), label: checklistItemDraft.trim(), done: false }] });
                  setChecklistItemDraft("");
                }
              }} />
            <button type="button" className="rg-btn rg-btn-ghost"
              onClick={() => { if (checklistItemDraft.trim()) { setDraft({ ...draft, checklist: [...checklist, { id: uid(), label: checklistItemDraft.trim(), done: false }] }); setChecklistItemDraft(""); } }}>
              <Plus size={13} />
            </button>
          </div>
        </div>
      </div>

      <div className="rg-field-row">
        <div className="rg-field">
          <label className="rg-field-label">Statut</label>
          <select className="rg-select" value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
            {PROJECT_STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </div>
        <div className="rg-field">
          <label className="rg-field-label">Priorité</label>
          <select className="rg-select" value={draft.priority} onChange={(e) => setDraft({ ...draft, priority: e.target.value })}>
            {PRIORITIES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
        </div>
      </div>
      <div className="rg-field">
        <label className="rg-field-label">Échéance</label>
        <input type="date" className="rg-input" value={draft.deadline} onChange={(e) => setDraft({ ...draft, deadline: e.target.value })} />
      </div>
      <div className="rg-field-row">
        <div className="rg-field">
          <label className="rg-field-label">Lieu</label>
          <input className="rg-input" value={draft.lieu || ""} onChange={(e) => setDraft({ ...draft, lieu: e.target.value })} placeholder="Ex. Meeting Lab" />
        </div>
        <div className="rg-field">
          <label className="rg-field-label">Horaires</label>
          <input className="rg-input" value={draft.horaires || ""} onChange={(e) => setDraft({ ...draft, horaires: e.target.value })} placeholder="Ex. 8h30 – 12h30" />
        </div>
      </div>
      <div className="rg-field-row">
        <div className="rg-field">
          <label className="rg-field-label">Partenaires</label>
          <input className="rg-input" value={draft.partenaires || ""} onChange={(e) => setDraft({ ...draft, partenaires: e.target.value })} placeholder="Ex. ISEG, Toulouse Métropole" />
        </div>
        <div className="rg-field">
          <label className="rg-field-label">Participants prévus</label>
          <input className="rg-input" value={draft.participants || ""} onChange={(e) => setDraft({ ...draft, participants: e.target.value })} placeholder="Ex. 55" />
        </div>
      </div>
      <div className="rg-field">
        <label className="rg-field-label">Tags</label>
        <TagInput value={draft.tags} onChange={(tags) => setDraft({ ...draft, tags })} />
      </div>
      <div className="rg-field">
        <label className="rg-field-label"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{verticalAlign:"-2px",marginRight:4}}><path d="M12.004 2L2 19.5h6.5l3.504-6.07L15.504 19.5H22L12.004 2Z" fill="#4285F4"/><path d="M2 19.5h6.5l3.504-6.07H5.504L2 19.5Z" fill="#0F9D58" opacity=".8"/><path d="M15.504 19.5H22l-3.504-6.07H12L15.504 19.5Z" fill="#F4B400" opacity=".8"/></svg>Lien Google Drive (docs & visuels)</label>
        <input className="rg-input" type="url" value={draft.drive_url || ""} onChange={(e) => setDraft({ ...draft, drive_url: e.target.value })} placeholder="https://drive.google.com/drive/folders/…" />
        {draft.drive_url && <a href={draft.drive_url} target="_blank" rel="noopener noreferrer" className="rg-drive-link">Ouvrir le dossier Drive →</a>}
      </div>
      <div className="rg-field">
        <label className="rg-field-label">Image à la une</label>
        <CoverUpload coverUrl={draft.cover_url || ""} onUpload={(url) => setDraft({ ...draft, cover_url: url })} onRemove={() => setDraft({ ...draft, cover_url: "" })} />
      </div>
      <div className="rg-field">
        <label className="rg-field-label">Sous-tâches {subtasks.length > 0 && `(${subtasks.filter((s) => s.done).length}/${subtasks.length})`}</label>
        {subtasks.map((s) => (
          <div className="rg-subtask-row" key={s.id}>
            <span className={`rg-subtask-check${s.done ? " on" : ""}`} onClick={() => toggleLocalSubtask(s.id)}>
              {s.done && <Check size={11} color="#1e0034" />}
            </span>
            <span className={`rg-subtask-text${s.done ? " done" : ""}`}>{s.text}</span>
            <button type="button" className="rg-icon-btn" onClick={() => removeSubtask(s.id)} aria-label="Supprimer la sous-tâche"><X size={13} /></button>
          </div>
        ))}
        <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
          <input className="rg-input" value={subtaskDraft} placeholder="Ajouter une sous-tâche…"
            onChange={(e) => setSubtaskDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSubtask(); } }} />
          <button type="button" className="rg-btn rg-btn-ghost" onClick={addSubtask}><Plus size={13} /></button>
        </div>
      </div>
      <div className="rg-field">
        <label className="rg-field-label">Budget {budget.length > 0 && `· Solde ${solde >= 0 ? "+" : ""}${solde.toLocaleString("fr-FR")} €`}</label>
        {budget.map((b) => (
          <div className="rg-budget-row" key={b.id}>
            <span className={`rg-budget-dot ${b.type}`} />
            <span className="rg-budget-label">{b.label}</span>
            <span className="rg-budget-amount" style={{ color: b.type === "recette" ? "var(--accent-3)" : "var(--danger)" }}>
              {b.type === "recette" ? "+" : "−"}{b.amount.toLocaleString("fr-FR")} €
            </span>
            <button type="button" className="rg-icon-btn" onClick={() => removeBudgetLine(b.id)} aria-label="Supprimer"><X size={13} /></button>
          </div>
        ))}
        {budget.length > 0 && (
          <div className="rg-budget-totals">
            <span>Recettes : <b style={{ color: "var(--accent-3)" }}>{totalRecettes.toLocaleString("fr-FR")} €</b></span>
            <span>Dépenses : <b style={{ color: "var(--danger)" }}>{totalDepenses.toLocaleString("fr-FR")} €</b></span>
          </div>
        )}
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <select className="rg-select" style={{ width: 110 }} value={budgetType} onChange={(e) => setBudgetType(e.target.value)}>
            <option value="depense">Dépense</option>
            <option value="recette">Recette</option>
          </select>
          <input className="rg-input" value={budgetLabel} placeholder="Poste…" onChange={(e) => setBudgetLabel(e.target.value)} />
          <input className="rg-input" style={{ width: 90 }} type="number" value={budgetAmount} placeholder="€" onChange={(e) => setBudgetAmount(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addBudgetLine(); } }} />
          <button type="button" className="rg-btn rg-btn-ghost" onClick={addBudgetLine}><Plus size={13} /></button>
        </div>
      </div>
      {!draft.id && onSaveAsTemplate && (
        <div style={{ marginTop: 6, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
          {draft._savedAsTemplate ? (
            <div className="rg-template-applied">✓ Enregistré comme modèle réutilisable</div>
          ) : (
            <button type="button" className="rg-btn rg-btn-ghost" onClick={onSaveAsTemplate} disabled={!draft.title.trim()}>
              <LayoutTemplate size={13} />Enregistrer comme modèle
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function EditorialForm({ draft, setDraft }) {
  return (
    <div>
      <div className="rg-field">
        <label className="rg-field-label">Titre</label>
        <input className="rg-input" autoFocus value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Ex. Post LinkedIn — recap Matinale" />
      </div>
      <div className="rg-field-row">
        <div className="rg-field">
          <label className="rg-field-label">Type</label>
          <select className="rg-select" value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })}>
            {EDITORIAL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="rg-field">
          <label className="rg-field-label">Statut</label>
          <select className="rg-select" value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
            {EDITORIAL_STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </div>
      </div>
      <div className="rg-field">
        <label className="rg-field-label">Date prévue</label>
        <input type="date" className="rg-input" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
      </div>
      <div className="rg-field">
        <label className="rg-field-label">Notes</label>
        <textarea className="rg-textarea" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} placeholder="Angle, contacts, validations à obtenir…" />
      </div>
      <div className="rg-field">
        <label className="rg-field-label"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{verticalAlign:"-2px",marginRight:4}}><path d="M12.004 2L2 19.5h6.5l3.504-6.07L15.504 19.5H22L12.004 2Z" fill="#4285F4"/><path d="M2 19.5h6.5l3.504-6.07H5.504L2 19.5Z" fill="#0F9D58" opacity=".8"/><path d="M15.504 19.5H22l-3.504-6.07H12L15.504 19.5Z" fill="#F4B400" opacity=".8"/></svg>Lien Google Drive (visuels)</label>
        <input className="rg-input" type="url" value={draft.drive_url || ""} onChange={(e) => setDraft({ ...draft, drive_url: e.target.value })} placeholder="https://drive.google.com/drive/folders/…" />
      </div>
    </div>
  );
}

function ContactForm({ draft, setDraft }) {
  return (
    <div>
      <div className="rg-field">
        <label className="rg-field-label">Nom</label>
        <input className="rg-input" autoFocus value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Ex. Laure Tortet" />
      </div>
      <div className="rg-field-row">
        <div className="rg-field">
          <label className="rg-field-label">Rôle</label>
          <input className="rg-input" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} placeholder="Ex. Graphiste, Journaliste…" />
        </div>
        <div className="rg-field">
          <label className="rg-field-label">Structure</label>
          <input className="rg-input" value={draft.structure} onChange={(e) => setDraft({ ...draft, structure: e.target.value })} placeholder="Ex. Club de la Com" />
        </div>
      </div>
      <div className="rg-field-row">
        <div className="rg-field">
          <label className="rg-field-label">Email</label>
          <input className="rg-input" type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="email@exemple.fr" />
        </div>
        <div className="rg-field">
          <label className="rg-field-label">Téléphone</label>
          <input className="rg-input" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="06 12 34 56 78" />
        </div>
      </div>
      <div className="rg-field">
        <label className="rg-field-label">Tags</label>
        <TagInput value={draft.tags || []} onChange={(tags) => setDraft({ ...draft, tags })} placeholder="presse, partenaire, intervenant…" />
      </div>
      <div className="rg-field">
        <label className="rg-field-label">Notes</label>
        <textarea className="rg-textarea" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} placeholder="Contexte, historique, projets associés…" />
      </div>
    </div>
  );
}

function TemplateForm({ draft, setDraft }) {
  const [subtaskDraft, setSubtaskDraft] = useState("");
  const subtasks = draft.subtasks || [];
  function addSubtask() {
    const text = subtaskDraft.trim();
    if (!text) return;
    setDraft({ ...draft, subtasks: [...subtasks, { id: uid(), text }] });
    setSubtaskDraft("");
  }
  function removeSubtask(id) { setDraft({ ...draft, subtasks: subtasks.filter((s) => (s.id || s) !== id) }); }
  return (
    <div>
      <div className="rg-field">
        <label className="rg-field-label">Nom du modèle</label>
        <input className="rg-input" autoFocus value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Ex. Matinale" />
      </div>
      <div className="rg-field">
        <label className="rg-field-label">Description par défaut</label>
        <textarea className="rg-textarea" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Ce qui sera pré-rempli dans la description du projet" />
      </div>
      <div className="rg-field-row">
        <div className="rg-field">
          <label className="rg-field-label">Priorité par défaut</label>
          <select className="rg-select" value={draft.default_priority} onChange={(e) => setDraft({ ...draft, default_priority: e.target.value })}>
            {PRIORITIES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
        </div>
        <div className="rg-field">
          <label className="rg-field-label">Lieu par défaut</label>
          <input className="rg-input" value={draft.default_lieu} onChange={(e) => setDraft({ ...draft, default_lieu: e.target.value })} placeholder="Ex. Meeting Lab" />
        </div>
      </div>
      <div className="rg-field-row">
        <div className="rg-field">
          <label className="rg-field-label">Horaires par défaut</label>
          <input className="rg-input" value={draft.default_horaires} onChange={(e) => setDraft({ ...draft, default_horaires: e.target.value })} placeholder="Ex. 8h30 – 12h30" />
        </div>
        <div className="rg-field">
          <label className="rg-field-label">Partenaires par défaut</label>
          <input className="rg-input" value={draft.default_partenaires} onChange={(e) => setDraft({ ...draft, default_partenaires: e.target.value })} placeholder="Ex. Toulouse Métropole" />
        </div>
      </div>
      <div className="rg-field">
        <label className="rg-field-label">Sous-tâches pré-remplies {subtasks.length > 0 && `(${subtasks.length})`}</label>
        {subtasks.map((s) => (
          <div className="rg-subtask-row" key={s.id || s}>
            <span className="rg-subtask-text">{s.text || s}</span>
            <button type="button" className="rg-icon-btn" onClick={() => removeSubtask(s.id || s)} aria-label="Supprimer"><X size={13} /></button>
          </div>
        ))}
        <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
          <input className="rg-input" value={subtaskDraft} placeholder="Ajouter une sous-tâche type…"
            onChange={(e) => setSubtaskDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSubtask(); } }} />
          <button type="button" className="rg-btn rg-btn-ghost" onClick={addSubtask}><Plus size={13} /></button>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ loginEmail, setLoginEmail, sendMagicLink, loginLoading, loginError, authState }) {
  return (
    <div className="rg-login-wrap" data-theme="dark">
      <style>{`
        .rg-login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center;
          background: #1e0034; font-family: 'Montserrat', sans-serif; }
        .rg-login-card { background: #28073f; border: 1px solid rgba(148,110,255,.24); border-radius: 16px;
          padding: 40px 36px; width: 100%; max-width: 400px; text-align: center; }
        .rg-login-logo { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: .02em; margin-bottom: 4px; }
        .rg-login-sub { font-size: 12px; color: rgba(255,255,255,.4); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 32px; }
        .rg-login-title { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .rg-login-hint { font-size: 13px; color: rgba(255,255,255,.5); margin-bottom: 24px; line-height: 1.5; }
        .rg-login-input { width: 100%; padding: 12px 14px; border-radius: 9px; border: 1px solid rgba(148,110,255,.3);
          background: #32104d; color: #fff; font-family: 'Montserrat', sans-serif; font-size: 14px; margin-bottom: 12px; }
        .rg-login-input::placeholder { color: rgba(255,255,255,.3); }
        .rg-login-btn { width: 100%; padding: 13px; border-radius: 9px; border: none; background: #cea613;
          color: #1e0034; font-weight: 700; font-size: 14px; cursor: pointer; font-family: 'Montserrat', sans-serif; }
        .rg-login-btn:disabled { opacity: .5; cursor: default; }
        .rg-login-error { color: #ff7a45; font-size: 12.5px; margin-top: 10px; }
        .rg-login-success { background: rgba(95,174,122,.15); border: 1px solid rgba(95,174,122,.4); border-radius: 9px;
          padding: 16px; color: #5fae7a; font-size: 13.5px; line-height: 1.5; }
      `}</style>
      <div className="rg-login-card">
        <div className="rg-login-logo">GAMMA</div>
        <div className="rg-login-sub">Application de gestion de projet</div>
        {authState === "magic_sent" ? (
          <div className="rg-login-success">
            ✉️ Lien envoyé !<br /><br />
            Vérifie ta boîte mail et clique sur le lien de connexion. Tu n'as pas besoin de mot de passe.
          </div>
        ) : (
          <>
            <div className="rg-login-title">Connexion</div>
            <div className="rg-login-hint">Entre ton adresse email — tu recevras un lien de connexion instantané.</div>
            <input className="rg-login-input" type="email" placeholder="ton@email.fr" value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMagicLink(); }} />
            <button className="rg-login-btn" onClick={sendMagicLink} disabled={loginLoading || !loginEmail.trim()}>
              {loginLoading ? "Envoi en cours…" : "Recevoir mon lien de connexion"}
            </button>
            {loginError && <div className="rg-login-error">{loginError}</div>}
          </>
        )}
      </div>
    </div>
  );
}

function ProjectFormReadOnly({ project: p }) {
  const st = statusInfo(PROJECT_STATUSES, p.status);
  const prio = priorityInfo(p.priority);
  const checklist = p.checklist || [];
  const done = checklist.filter((c) => c.done).length;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {p.cover_url && <img src={p.cover_url} alt="" style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 9, border: "1px solid var(--border)" }} />}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Pill label={st.label} color={st.color} solid={st.solid} />
        <Pill label={prio.label} color={prio.color} />
        {p.deadline && <span className="rg-deadline-badge rg-mono" style={{ background: urgencyColor(daysUntil(p.deadline)) + "22", color: urgencyColor(daysUntil(p.deadline)) }}>{urgencyLabel(daysUntil(p.deadline))}</span>}
      </div>
      {p.description && <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{p.description}</div>}
      {(p.lieu || p.horaires) && <div style={{ fontSize: 12.5, color: "var(--text-faint)" }}><MapPin size={12} style={{ verticalAlign: "-2px" }} /> {[p.lieu, p.horaires].filter(Boolean).join(" · ")}</div>}
      {p.partenaires && <div style={{ fontSize: 12.5, color: "var(--text-faint)" }}>Partenaires : {p.partenaires}</div>}
      {p.participants && <div style={{ fontSize: 12.5, color: "var(--text-faint)" }}>Participants prévus : {p.participants}</div>}
      {checklist.length > 0 && (
        <div>
          <div className="rg-field-label" style={{ marginBottom: 6 }}>Checklist : {done}/{checklist.length}</div>
          <ProgressBar done={done} total={checklist.length} color="var(--accent)" />
          {checklist.map((c) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 0", fontSize: 12.5 }}>
              <span className={`rg-checklist-check${c.done ? " on" : ""}`} style={{ pointerEvents: "none" }}>{c.done && <Check size={11} color="#1e0034" />}</span>
              <span style={{ color: c.done ? "var(--text-faint)" : "var(--text)", textDecoration: c.done ? "line-through" : "none" }}>{c.label}</span>
            </div>
          ))}
        </div>
      )}
      {p.drive_url && <a href={p.drive_url} target="_blank" rel="noopener noreferrer" className="rg-drive-link">Ouvrir le dossier Drive →</a>}
    </div>
  );
}

function CommentsPanel({ entityType, entityId, comments, onAdd, onDelete, profile, canDelete }) {
  const [draft, setDraft] = useState("");
  const entityComments = comments.filter((c) => c.entity_type === entityType && c.entity_id === entityId);

  return (
    <div className="rg-comments-panel">
      <div className="rg-field-label" style={{ marginBottom: 8 }}>💬 Commentaires &amp; suggestions ({entityComments.length})</div>
      {entityComments.map((c) => (
        <div className="rg-comment-row" key={c.id}>
          <div className="rg-comment-avatar" style={{ background: ROLE_COLORS[c.author_role] + "33", color: ROLE_COLORS[c.author_role] }}>
            {(c.author_name || "?").slice(0, 1).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div className="rg-comment-meta">
              <span style={{ color: ROLE_COLORS[c.author_role], fontWeight: 700 }}>{c.author_name || "Anonyme"}</span>
              <span className="rg-comment-role">· {ROLE_LABELS[c.author_role] || c.author_role}</span>
              <span className="rg-comment-date">{new Date(c.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</span>
            </div>
            <div className="rg-comment-content">{c.content}</div>
          </div>
          {(canDelete || profile?.id === c.author_id) && (
            <button className="rg-icon-btn" onClick={() => onDelete(c.id)} title="Supprimer"><X size={13} /></button>
          )}
        </div>
      ))}
      {entityComments.length === 0 && <div className="rg-empty" style={{ padding: "8px 0" }}>Aucun commentaire pour l'instant.</div>}
      {profile && (
        <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
          <input className="rg-input" value={draft} placeholder="Ajouter un commentaire ou une suggestion…"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (draft.trim()) { onAdd(entityType, entityId, draft); setDraft(""); } } }} />
          <button className="rg-btn rg-btn-primary" onClick={() => { if (draft.trim()) { onAdd(entityType, entityId, draft); setDraft(""); } }}>
            <Check size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

function CoverUpload({ coverUrl, onUpload, onRemove }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Format non supporté — utilise JPG, PNG ou WebP."); return; }
    if (file.size > 5 * 1024 * 1024) { setError("Image trop lourde — max 5 Mo."); return; }
    setUploading(true); setError("");
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `cover_${Date.now()}.${ext}`;
      const url = await uploadToStorage(file, path, "event-covers");
      onUpload(url);
    } catch (e) {
      setError("Upload échoué — vérifie que le bucket 'event-covers' est créé dans Supabase Storage (Public).");
    }
    setUploading(false);
  }

  return (
    <div>
      {coverUrl ? (
        <div className="rg-cover-upload-preview">
          <img src={coverUrl} alt="Visuel événement" className="rg-cover-preview-lg" />
          <div className="rg-cover-upload-actions">
            <button type="button" className="rg-btn rg-btn-ghost" onClick={() => inputRef.current && inputRef.current.click()}>
              <Upload size={13} />Remplacer
            </button>
            <button type="button" className="rg-btn rg-btn-ghost rg-btn-danger" onClick={onRemove}><X size={13} />Supprimer</button>
          </div>
        </div>
      ) : (
        <div className="rg-cover-dropzone" onClick={() => inputRef.current && inputRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}>
          {uploading
            ? <><Loader2 size={22} className="rg-spin" style={{ margin: "0 auto 6px" }} /><div>Upload en cours…</div></>
            : <><Upload size={22} style={{ margin: "0 auto 8px" }} /><div style={{ fontWeight: 600 }}>Cliquer ou glisser l'image ici</div><div style={{ fontSize: 11, marginTop: 4, color: "var(--text-faint)" }}>JPG, PNG, WebP — max 5 Mo</div></>
          }
        </div>
      )}
      <input type="file" ref={inputRef} accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
      {error && <div className="rg-voice-error" style={{ marginTop: 8 }}>{error}</div>}
    </div>
  );
}

function BrandCharter({ brandSettings: bs, uploadBrandFile, brandUploading, addBrandColor, removeBrandColor, addBrandTypo, removeBrandTypo, commitBrand }) {
  const [colorHex, setColorHex] = useState("#946eff");
  const [colorName, setColorName] = useState("");
  const [typoName, setTypoName] = useState("");

  return (
    <div className="rg-panel">
      <div className="rg-section-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>🎨 Charte graphique GAMMA</span>
      </div>

      {/* Logo */}
      <div className="rg-brand-section">
        <div className="rg-field-label" style={{ marginBottom: 8 }}>Logo</div>
        <div className="rg-brand-upload-zone">
          <input type="file" accept="image/*" onChange={(e) => { if (e.target.files[0]) uploadBrandFile(e.target.files[0], "logo_url", "logo_filename"); }} />
          {brandUploading === "logo_url" ? <Loader2 size={20} className="rg-spin" style={{ margin: "0 auto" }} /> :
            bs.logo_url ? <img src={bs.logo_url} alt="Logo GAMMA" className="rg-brand-logo-preview" /> :
            <><Upload size={20} style={{ margin: "0 auto 6px" }} /><div>Cliquer ou glisser le logo ici</div><div style={{ fontSize: 11, marginTop: 4 }}>{bs.logo_filename || "PNG, SVG, JPG"}</div></>
          }
        </div>
      </div>

      {/* Couleurs */}
      <div className="rg-brand-section">
        <div className="rg-field-label" style={{ marginBottom: 8 }}>Palette de couleurs</div>
        <div className="rg-brand-color-row">
          {(bs.colors || []).map((c) => (
            <div className="rg-brand-color-swatch" key={c.id}>
              <span className="rg-brand-color-dot" style={{ background: c.hex }} />
              <span className="rg-mono" style={{ fontSize: 11 }}>{c.name}</span>
              <button type="button" className="rg-icon-btn" style={{ width: 18, height: 18 }} onClick={() => removeBrandColor(c.id)}><X size={10} /></button>
            </div>
          ))}
          {(bs.colors || []).length === 0 && <div style={{ fontSize: 12, color: "var(--text-faint)", fontStyle: "italic" }}>Aucune couleur ajoutée</div>}
        </div>
        <div className="rg-brand-color-add">
          <input type="color" value={colorHex} onChange={(e) => setColorHex(e.target.value)} style={{ width: 36, height: 36, border: "none", background: "none", cursor: "pointer", padding: 0 }} />
          <input className="rg-input" style={{ flex: 1 }} value={colorName} onChange={(e) => setColorName(e.target.value)} placeholder="Nom (ex. Violet nuit)" onKeyDown={(e) => { if (e.key === "Enter") { addBrandColor(colorHex, colorName); setColorName(""); } }} />
          <button className="rg-btn rg-btn-ghost" onClick={() => { addBrandColor(colorHex, colorName); setColorName(""); }}><Plus size={13} /></button>
        </div>
      </div>

      {/* Typographies */}
      <div className="rg-brand-section">
        <div className="rg-field-label" style={{ marginBottom: 8 }}>Typographies</div>
        <div className="rg-brand-typo-list">
          {(bs.typography || []).map((t) => (
            <div className="rg-brand-typo-chip" key={t.id}>
              {t.name}
              <button type="button" className="rg-icon-btn" style={{ width: 16, height: 16 }} onClick={() => removeBrandTypo(t.id)}><X size={10} /></button>
            </div>
          ))}
          {(bs.typography || []).length === 0 && <div style={{ fontSize: 12, color: "var(--text-faint)", fontStyle: "italic" }}>Aucune typo ajoutée</div>}
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <input className="rg-input" value={typoName} onChange={(e) => setTypoName(e.target.value)} placeholder="Nom de la police (ex. Montserrat)" onKeyDown={(e) => { if (e.key === "Enter") { addBrandTypo(typoName); setTypoName(""); } }} />
          <button className="rg-btn rg-btn-ghost" onClick={() => { addBrandTypo(typoName); setTypoName(""); }}><Plus size={13} /></button>
        </div>
      </div>

      {/* PDF charte graphique */}
      <div className="rg-brand-section">
        <div className="rg-field-label" style={{ marginBottom: 8 }}>PDF — Charte graphique complète</div>
        {bs.brand_pdf_url ? (
          <div className="rg-brand-pdf-row">
            <span className="rg-brand-pdf-icon">📄</span>
            <div className="rg-brand-pdf-info">
              <div className="rg-brand-pdf-name">{bs.brand_pdf_filename || "Charte graphique.pdf"}</div>
              <div className="rg-brand-pdf-sub">Utilisée comme référence pour la création de contenu IA</div>
            </div>
            <a href={bs.brand_pdf_url} target="_blank" rel="noopener noreferrer" className="rg-btn rg-btn-ghost" style={{ fontSize: 12 }}>Ouvrir</a>
            <button className="rg-icon-btn" onClick={() => commitBrand({ ...bs, brand_pdf_url: null, brand_pdf_filename: null })} title="Supprimer"><X size={13} /></button>
          </div>
        ) : (
          <div className="rg-brand-upload-zone">
            <input type="file" accept="application/pdf" onChange={(e) => { if (e.target.files[0]) uploadBrandFile(e.target.files[0], "brand_pdf_url", "brand_pdf_filename"); }} />
            {brandUploading === "brand_pdf_url" ? <Loader2 size={20} className="rg-spin" style={{ margin: "0 auto" }} /> : <><FileUp size={20} style={{ margin: "0 auto 6px" }} /><div>Glisser ou cliquer pour uploader le PDF</div></>}
          </div>
        )}
      </div>
    </div>
  );
}

function EditorialCharter({ brandSettings: bs, uploadBrandFile, brandUploading, commitBrand }) {
  return (
    <div className="rg-panel">
      <div className="rg-section-title">📝 Charte éditoriale</div>
      <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginBottom: 14 }}>
        Uploade ta charte éditoriale. Elle sera utilisée comme contexte de référence lors de la création de contenu avec l'IA.
      </div>

      {bs.editorial_pdf_url ? (
        <div className="rg-brand-pdf-row">
          <span className="rg-brand-pdf-icon">📋</span>
          <div className="rg-brand-pdf-info">
            <div className="rg-brand-pdf-name">{bs.editorial_pdf_filename || "Charte éditoriale.pdf"}</div>
            <div className="rg-brand-pdf-sub">Référence active pour la génération de contenu</div>
          </div>
          <a href={bs.editorial_pdf_url} target="_blank" rel="noopener noreferrer" className="rg-btn rg-btn-ghost" style={{ fontSize: 12 }}>Ouvrir</a>
          <button className="rg-icon-btn" onClick={() => commitBrand({ ...bs, editorial_pdf_url: null, editorial_pdf_filename: null })} title="Supprimer"><X size={13} /></button>
        </div>
      ) : (
        <div className="rg-brand-upload-zone">
          <input type="file" accept="application/pdf" onChange={(e) => { if (e.target.files[0]) uploadBrandFile(e.target.files[0], "editorial_pdf_url", "editorial_pdf_filename"); }} />
          {brandUploading === "editorial_pdf_url" ? <Loader2 size={20} className="rg-spin" style={{ margin: "0 auto" }} /> : <><FileUp size={20} style={{ margin: "0 auto 6px" }} /><div>Glisser ou cliquer pour uploader le PDF</div></>}
        </div>
      )}

      <div className="rg-field" style={{ marginTop: 14 }}>
        <label className="rg-field-label">Notes libres sur la ligne éditoriale</label>
        <textarea className="rg-textarea" value={bs.editorial_notes || ""} onChange={(e) => commitBrand({ ...bs, editorial_notes: e.target.value })} placeholder="Ton, voix, sujets prioritaires, ce qu'on évite…" />
      </div>
    </div>
  );
}

/* ============================== CALENDAR ============================== */

function MonthCalendar({ cursor, setCursor, items, dateField, colorFor, onItemClick }) {
  const days = useMemo(() => getMonthMatrix(cursor), [cursor]);
  const byDay = useMemo(() => {
    const map = {};
    items.forEach((it) => {
      const d = it[dateField];
      if (!d) return;
      if (!map[d]) map[d] = [];
      map[d].push(it);
    });
    return map;
  }, [items, dateField]);
  const monthLabel = cursor.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const today = todayISO();
  const curMonth = cursor.getMonth();

  return (
    <div>
      <div className="rg-cal-nav">
        <button className="rg-icon-btn" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} aria-label="Mois précédent"><ChevronLeft size={16} /></button>
        <div className="rg-cal-month">{monthLabel}</div>
        <button className="rg-icon-btn" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} aria-label="Mois suivant"><ChevronRight size={16} /></button>
        <button className="rg-btn rg-btn-ghost" style={{ marginLeft: 6 }} onClick={() => setCursor(new Date())}>Aujourd'hui</button>
      </div>
      <div className="rg-cal-grid">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => <div className="rg-cal-dow" key={d}>{d}</div>)}
        {days.map((d) => {
          const iso = isoOf(d);
          const dayItems = byDay[iso] || [];
          const outside = d.getMonth() !== curMonth;
          const isToday = iso === today;
          return (
            <div key={iso} className={`rg-cal-cell${outside ? " outside" : ""}${isToday ? " today" : ""}`}>
              <div className="rg-cal-daynum">{d.getDate()}</div>
              {dayItems.slice(0, 3).map((it) => (
                <div key={it.id} className="rg-cal-pill" style={{ background: colorFor(it) + "33", color: colorFor(it) }}
                  onClick={() => onItemClick(it)} title={it.title}>
                  {it.title}
                </div>
              ))}
              {dayItems.length > 3 && <div className="rg-cal-more">+{dayItems.length - 3}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================== APP ============================== */

export default function RegieApp() {
  const [ready, setReady] = useState(false);
  const [view, setView] = useState("dashboard");
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("regie_theme") || "dark"; } catch (e) { return "dark"; }
  });
  const [burgerOpen, setBurgerOpen] = useState(false);

  // Auth
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null); // { id, email, name, role }
  const [authState, setAuthState] = useState("checking"); // checking | login | magic_sent | authed
  const [loginEmail, setLoginEmail] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Init auth on mount
  useEffect(() => {
    async function initAuth() {
      // Check for magic link token in URL
      const hash = window.location.hash;
      if (hash.includes("access_token")) {
        const params = new URLSearchParams(hash.slice(1));
        const fakeSession = {
          access_token: params.get("access_token"),
          refresh_token: params.get("refresh_token"),
          token_type: params.get("token_type"),
        };
        localStorage.setItem("regie_session", JSON.stringify(fakeSession));
        window.location.hash = "";
      }
      const s = await sbGetSession();
      if (s) {
        setSession(s);
        const p = await sbGetProfile(s.access_token);
        setProfile(p);
        setAuthState("authed");
      } else {
        setAuthState("login");
      }
    }
    initAuth();
  }, []);

  async function sendMagicLink() {
    if (!loginEmail.trim()) return;
    setLoginLoading(true); setLoginError("");
    const data = await sbAuth("/magiclink", { email: loginEmail.trim() });
    if (data.error) { setLoginError(data.error.message || "Erreur lors de l'envoi."); }
    else { setAuthState("magic_sent"); }
    setLoginLoading(false);
  }

  async function logout() {
    localStorage.removeItem("regie_session");
    setSession(null); setProfile(null); setAuthState("login");
  }

  const role = profile?.role || "ca";
  const can = {
    editProjects: role === "admin",
    editEditorial: role === "admin" || role === "equipe",
    editNotes: true, // everyone can create notes
    deleteAnyNote: role === "admin",
    viewAdmin: role === "admin",
    comment: true, // everyone can comment
  };

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("regie_theme", next); } catch (e) {}
  }

  const [projects, setProjects] = useState([]);
  const [editorial, setEditorial] = useState([]);
  const [notes, setNotes] = useState([]);

  const [projSubview, setProjSubview] = useState("kanban");
  const [editoSubview, setEditoSubview] = useState("calendrier");

  const [projModal, setProjModal] = useState(null); // null | {} (new) | project (edit)
  const [editoModal, setEditoModal] = useState(null);

  const [projSearch, setProjSearch] = useState("");
  const [projPriorityFilter, setProjPriorityFilter] = useState("all");
  const [projSort, setProjSort] = useState({ field: "deadline", dir: "asc" });

  const [editoSearch, setEditoSearch] = useState("");
  const [editoTypeFilter, setEditoTypeFilter] = useState("all");
  const [editoSort, setEditoSort] = useState({ field: "date", dir: "asc" });

  const [noteSearch, setNoteSearch] = useState("");
  const [noteDraft, setNoteDraft] = useState("");
  const [noteTagDraft, setNoteTagDraft] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteContent, setEditingNoteContent] = useState("");

  const [projCalCursor, setProjCalCursor] = useState(new Date());
  const [editoCalCursor, setEditoCalCursor] = useState(new Date());

  const [contacts, setContacts] = useState([]);
  const [contactModal, setContactModal] = useState(null);
  const [contactSearch, setContactSearch] = useState("");

  const [templates, setTemplates] = useState([]);
  const [templateModal, setTemplateModal] = useState(null);

  const [comments, setComments] = useState([]);

  const [digest, setDigest] = useState("");
  const [digestLoading, setDigestLoading] = useState(false);

  const BRAND_DEFAULT = { logo_url: null, logo_filename: null, typography: [], colors: [], brand_pdf_url: null, brand_pdf_filename: null, editorial_pdf_url: null, editorial_pdf_filename: null, editorial_notes: "" };
  const [brandSettings, setBrandSettings] = useState(BRAND_DEFAULT);
  const [brandUploading, setBrandUploading] = useState("");

  const [captureType, setCaptureType] = useState("projet");
  const [captureText, setCaptureText] = useState("");

  const [voiceLog, setVoiceLog] = useState([]);
  const [recState, setRecState] = useState("idle"); // idle | recording | analyzing | pdf_analyzing
  const [transcript, setTranscript] = useState("");
  const [suggestions, setSuggestions] = useState(null); // null | array
  const [suggSource, setSuggSource] = useState("vocal"); // "vocal" | "pdf"
  const [voiceError, setVoiceError] = useState(null);
  const recognitionRef = useRef(null);
  const pdfInputRef = useRef(null);

  const [gamification, setGamification] = useState({ monthlyTarget: 8, xpTotal: 0, challenges: { date: "", daily: [], weekStart: "", weekly: [], monthStart: "", monthly: [] } });
  const [celebrate, setCelebrate] = useState(false);

  /* ---------- load / persist ---------- */

  useEffect(() => { if (authState === "authed") loadAll(); }, [authState]);

  const SUPA_URL = "https://jyvjslbiavdqashlrskh.supabase.co";
  const SUPA_KEY = "sb_publishable_VyF5TWf53uQHUdhKgjDw7Q_Esd_D-HW";

  function getToken() { return session?.access_token || SUPA_KEY; }

  async function sbGet(table, opts = {}) {
    try {
      let url = `${SUPA_URL}/rest/v1/${table}`;
      const params = new URLSearchParams();
      if (opts.eq) Object.entries(opts.eq).forEach(([k, v]) => params.append(k, `eq.${v}`));
      if (opts.single) params.append("limit", "1");
      if (opts.order) params.append("order", opts.order);
      if ([...params].length) url += "?" + params.toString();
      const res = await fetch(url, { headers: { apikey: SUPA_KEY, Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" } });
      if (!res.ok) return opts.single ? null : [];
      const data = await res.json();
      return opts.single ? (data[0] || null) : data;
    } catch (e) { return opts.single ? null : []; }
  }

  async function sbUpsert(table, data) {
    try {
      await fetch(`${SUPA_URL}/rest/v1/${table}`, {
        method: "POST",
        headers: { apikey: SUPA_KEY, Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify(data),
      });
    } catch (e) { console.error("Supabase upsert error", e); }
  }

  async function sbDelete(table, id) {
    try {
      await fetch(`${SUPA_URL}/rest/v1/${table}?id=eq.${id}`, {
        method: "DELETE",
        headers: { apikey: SUPA_KEY, Authorization: `Bearer ${getToken()}` },
      });
    } catch (e) { console.error("Supabase delete error", e); }
  }

  async function loadAll() {
    const [projects_raw, editorial_raw, notes_raw, voice_raw, gam_raw, pending_raw, contacts_raw, templates_raw, brand_raw, comments_raw] = await Promise.all([
      sbGet("projects"),
      sbGet("editorial"),
      sbGet("notes"),
      sbGet("voice_log"),
      sbGet("gamification", { eq: { id: "main" }, single: true }),
      sbGet("pending_suggestions", { eq: { id: "main" }, single: true }),
      sbGet("contacts"),
      sbGet("templates"),
      sbGet("brand_settings", { eq: { id: "main" }, single: true }),
      sbGet("comments", { order: "created_at.desc" }),
    ]);

    const p = projects_raw.map(r => ({ ...r, tags: r.tags || [], subtasks: r.subtasks || [], budget: r.budget || [], checklist: r.checklist || [] }));
    const e = editorial_raw.map(r => ({ ...r }));
    const n = notes_raw.map(r => ({ ...r, tags: r.tags || [] }));
    const v = voice_raw;
    setProjects(p); setEditorial(e); setNotes(n); setVoiceLog(v);
    setContacts(contacts_raw.map(r => ({ ...r, tags: r.tags || [] })));
    setTemplates(templates_raw.map(r => ({ ...r, subtasks: r.subtasks || [] })));
    setComments(comments_raw || []);
    if (brand_raw) setBrandSettings({ ...BRAND_DEFAULT, ...brand_raw });

    const pending = pending_raw;
    if (pending && pending.suggestions && pending.suggestions.length > 0) {
      setSuggestions(pending.suggestions);
      setTranscript(pending.transcript || "");
      setSuggSource(pending.source || "vocal");
    }

    const g = gam_raw || { monthly_target: 8, xp_total: 0, challenges: {} };
    const today = todayISO();
    const weekStart = isoOf(mondayOf(new Date()));
    const monthStart = today.slice(0, 7) + "-01";
    const monthlyTarget = g.monthly_target || 8;
    let nextChallenges = g.challenges || { date: "", daily: [], weekStart: "", weekly: [], monthStart: "", monthly: [] };
    let changed = false;
    if (nextChallenges.date !== today) {
      nextChallenges = { ...nextChallenges, date: today, daily: buildDailyChallenges(p, e, n, today) };
      changed = true;
    }
    if (nextChallenges.weekStart !== weekStart) {
      nextChallenges = { ...nextChallenges, weekStart, weekly: buildWeeklyChallenges(p, e) };
      changed = true;
    }
    if (nextChallenges.monthStart !== monthStart) {
      nextChallenges = { ...nextChallenges, monthStart, monthly: buildMonthlyChallenge(monthlyTarget) };
      changed = true;
    }
    const finalGam = { monthlyTarget, xpTotal: g.xp_total || 0, challenges: nextChallenges };
    setGamification(finalGam);
    if (changed) persist("gamification", finalGam);

    setReady(true);
  }

  async function persist(key, value) {
    try {
      if (key === "projects") {
        // sync full array: upsert all + delete removed
        const existing = await sbGet("projects");
        const existingIds = existing.map(r => r.id);
        const newIds = (value || []).map(p => p.id);
        for (const id of existingIds) { if (!newIds.includes(id)) await sbDelete("projects", id); }
        if (value && value.length) await sbUpsert("projects", value.map(p => ({ ...p, tags: p.tags || [], subtasks: p.subtasks || [], budget: p.budget || [], checklist: p.checklist || [] })));
      } else if (key === "editorial") {
        const existing = await sbGet("editorial");
        const existingIds = existing.map(r => r.id);
        const newIds = (value || []).map(e => e.id);
        for (const id of existingIds) { if (!newIds.includes(id)) await sbDelete("editorial", id); }
        if (value && value.length) await sbUpsert("editorial", value);
      } else if (key === "notes") {
        const existing = await sbGet("notes");
        const existingIds = existing.map(r => r.id);
        const newIds = (value || []).map(n => n.id);
        for (const id of existingIds) { if (!newIds.includes(id)) await sbDelete("notes", id); }
        if (value && value.length) await sbUpsert("notes", value.map(n => ({ ...n, tags: n.tags || [] })));
      } else if (key === "voiceLog") {
        if (value && value.length) await sbUpsert("voice_log", value);
      } else if (key === "gamification") {
        await sbUpsert("gamification", { id: "main", monthly_target: value.monthlyTarget, xp_total: value.xpTotal, challenges: value.challenges });
      } else if (key === "pendingSuggestions") {
        await sbUpsert("pending_suggestions", { id: "main", suggestions: value ? value.suggestions : null, transcript: value ? value.transcript : "", source: value ? value.source : "vocal" });
      } else if (key === "contacts") {
        const existing = await sbGet("contacts");
        const existingIds = existing.map(r => r.id);
        const newIds = (value || []).map(c => c.id);
        for (const id of existingIds) { if (!newIds.includes(id)) await sbDelete("contacts", id); }
        if (value && value.length) await sbUpsert("contacts", value.map(c => ({ ...c, tags: c.tags || [] })));
      } else if (key === "templates") {
        const existing = await sbGet("templates");
        const existingIds = existing.map(r => r.id);
        const newIds = (value || []).map(t => t.id);
        for (const id of existingIds) { if (!newIds.includes(id)) await sbDelete("templates", id); }
        if (value && value.length) await sbUpsert("templates", value.map(t => ({ ...t, subtasks: t.subtasks || [] })));
      } else if (key === "brandSettings") {
        const { typography, colors, ...rest } = value;
        await sbUpsert("brand_settings", { id: "main", ...rest, typography: typography || [], colors: colors || [], updated_at: new Date().toISOString() });
      }
    } catch (e) { console.error("Persist error", e); }
  }

  function commitProjects(next) { setProjects(next); persist("projects", next); }
  function commitEditorial(next) { setEditorial(next); persist("editorial", next); }
  function commitNotes(next) { setNotes(next); persist("notes", next); }
  function commitVoiceLog(next) { setVoiceLog(next); persist("voiceLog", next); }
  function commitGamification(next) { setGamification(next); persist("gamification", next); }
  function commitContacts(next) { setContacts(next); persist("contacts", next); }
  function commitBrand(next) { setBrandSettings(next); persist("brandSettings", next); }
  function commitTemplates(next) { setTemplates(next); persist("templates", next); }
  function savePending(sugg, tx, src) { persist("pendingSuggestions", sugg && sugg.length > 0 ? { suggestions: sugg, transcript: tx, source: src } : null); }
  function clearPending() { persist("pendingSuggestions", null); }

  async function addComment(entityType, entityId, content) {
    if (!content.trim() || !profile) return;
    const newComment = {
      id: uid(), entity_type: entityType, entity_id: entityId,
      author_id: profile.id, author_name: profile.name || profile.email,
      author_role: profile.role, content: content.trim(),
      created_at: new Date().toISOString(),
    };
    await sbUpsert("comments", newComment);
    setComments((prev) => [newComment, ...prev]);
  }

  async function deleteComment(id) {
    await sbDelete("comments", id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  }

  function commentsFor(entityType, entityId) {
    return comments.filter((c) => c.entity_type === entityType && c.entity_id === entityId);
  }

  function celebrateCompletion() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 1300);
  }

  function stampCompletion(oldStatus, newStatus, patch) {
    if (newStatus === "termine" && oldStatus !== "termine") { patch.completedAt = todayISO(); celebrateCompletion(); }
    else if (newStatus !== "termine" && oldStatus === "termine") { patch.completedAt = null; }
    return patch;
  }

  /* ---------- project CRUD ---------- */

  function openNewProject() { setProjModal({ id: null, title: "", description: "", status: "a_faire", priority: "normale", deadline: "", tags: [], lieu: "", horaires: "", partenaires: "", participants: "", subtasks: [], budget: [], checklist: DEFAULT_EVENT_CHECKLIST.map((label) => ({ id: uid(), label, done: false })) }); }

  function applyTemplateToDraft(templateId) {
    const t = templates.find((x) => x.id === templateId);
    if (!t) return;
    setProjModal((prev) => ({
      ...prev,
      title: prev.title || t.name,
      description: prev.description || t.description || "",
      priority: t.default_priority || prev.priority,
      lieu: t.default_lieu || prev.lieu,
      horaires: t.default_horaires || prev.horaires,
      partenaires: t.default_partenaires || prev.partenaires,
      subtasks: [...(prev.subtasks || []), ...(t.subtasks || []).map((s) => ({ id: uid(), text: typeof s === "string" ? s : s.text, done: false }))],
      checklist: (t.checklist && t.checklist.length > 0)
        ? t.checklist.map((item) => ({ id: uid(), label: typeof item === "string" ? item : item.label, done: false }))
        : prev.checklist,
      _appliedTemplate: t.name,
    }));
  }

  function saveCurrentAsTemplate() {
    const d = projModal;
    if (!d || !d.title.trim()) return;
    const newTemplate = {
      id: uid(), name: d.title, description: d.description || "",
      default_priority: d.priority || "normale", default_lieu: d.lieu || "",
      default_horaires: d.horaires || "", default_partenaires: d.partenaires || "",
      subtasks: (d.subtasks || []).map((s) => ({ id: uid(), text: s.text })),
      created_at: todayISO(),
    };
    commitTemplates([...templates, newTemplate]);
    setProjModal((prev) => ({ ...prev, _savedAsTemplate: true }));
  }
  function openEditProject(p) {
    const checklist = (p.checklist && p.checklist.length > 0)
      ? p.checklist
      : DEFAULT_EVENT_CHECKLIST.map((label) => ({ id: uid(), label, done: false }));
    setProjModal({ subtasks: [], ...p, checklist });
  }
  function saveProject() {
    if (!projModal.title.trim()) return;
    const { _appliedTemplate, _savedAsTemplate, _list, ...clean } = projModal;
    if (clean.id) {
      const old = projects.find((p) => p.id === clean.id);
      const patch = stampCompletion(old.status, clean.status, {});
      commitProjects(projects.map((p) => (p.id === clean.id ? { ...clean, ...patch } : p)));
    } else {
      const patch = stampCompletion(null, clean.status, {});
      commitProjects([...projects, { ...clean, ...patch, id: uid(), createdAt: todayISO() }]);
    }
    setProjModal(null);
  }
  function deleteProject(id) { commitProjects(projects.filter((p) => p.id !== id)); }
  function moveProject(id, dir) {
    const current = projects.find((p) => p.id === id);
    const idx = PROJECT_STATUSES.findIndex((s) => s.key === current.status);
    const newIdx = Math.min(PROJECT_STATUSES.length - 1, Math.max(0, idx + dir));
    const newStatus = PROJECT_STATUSES[newIdx].key;
    const patch = stampCompletion(current.status, newStatus, { status: newStatus });
    commitProjects(projects.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }
  function toggleSubtask(projectId, subtaskId) {
    commitProjects(projects.map((p) => {
      if (p.id !== projectId) return p;
      return { ...p, subtasks: (p.subtasks || []).map((s) => (s.id === subtaskId ? { ...s, done: !s.done } : s)) };
    }));
  }

  /* ---------- editorial CRUD ---------- */

  function openNewEditorial() { setEditoModal({ id: null, title: "", type: "LinkedIn", status: "pas_commence", date: "", notes: "" }); }
  function openEditEditorial(it) { setEditoModal({ ...it }); }
  function saveEditorial() {
    if (!editoModal.title.trim()) return;
    if (editoModal.id) {
      const old = editorial.find((it) => it.id === editoModal.id);
      const patch = stampCompletion(old.status, editoModal.status, {});
      commitEditorial(editorial.map((it) => (it.id === editoModal.id ? { ...editoModal, ...patch } : it)));
    } else {
      const patch = stampCompletion(null, editoModal.status, {});
      commitEditorial([...editorial, { ...editoModal, ...patch, id: uid(), createdAt: todayISO() }]);
    }
    setEditoModal(null);
  }
  function deleteEditorial(id) { commitEditorial(editorial.filter((it) => it.id !== id)); }

  /* ---------- contacts CRUD ---------- */

  function openNewContact() { setContactModal({ id: null, name: "", role: "", structure: "", email: "", phone: "", tags: [], notes: "" }); }
  function openEditContact(c) { setContactModal({ ...c }); }
  function saveContact() {
    if (!contactModal.name.trim()) return;
    if (contactModal.id) {
      commitContacts(contacts.map((c) => (c.id === contactModal.id ? { ...contactModal } : c)));
    } else {
      commitContacts([...contacts, { ...contactModal, id: uid(), created_at: todayISO() }]);
    }
    setContactModal(null);
  }
  function deleteContact(id) { commitContacts(contacts.filter((c) => c.id !== id)); }

  /* ---------- templates CRUD ---------- */

  function openNewTemplate() { setTemplateModal({ id: null, name: "", description: "", default_priority: "normale", default_lieu: "", default_horaires: "", default_partenaires: "", subtasks: [] }); }
  function openEditTemplate(t) { setTemplateModal({ ...t }); }
  function saveTemplate() {
    if (!templateModal.name.trim()) return;
    if (templateModal.id) {
      commitTemplates(templates.map((t) => (t.id === templateModal.id ? { ...templateModal } : t)));
    } else {
      commitTemplates([...templates, { ...templateModal, id: uid(), created_at: todayISO() }]);
    }
    setTemplateModal(null);
  }
  function deleteTemplate(id) { commitTemplates(templates.filter((t) => t.id !== id)); }
  function createProjectFromTemplate(t) {
    const checklistSource = (t.checklist && t.checklist.length > 0) ? t.checklist : DEFAULT_EVENT_CHECKLIST;
    const newProj = {
      id: uid(),
      title: t.name,
      description: t.description || "",
      status: "a_faire",
      priority: t.default_priority || "normale",
      deadline: "",
      tags: [],
      lieu: t.default_lieu || "",
      horaires: t.default_horaires || "",
      partenaires: t.default_partenaires || "",
      participants: "",
      subtasks: (t.subtasks || []).map((s) => ({ id: uid(), text: typeof s === "string" ? s : s.text, done: false })),
      checklist: checklistSource.map((item) => ({ id: uid(), label: typeof item === "string" ? item : item.label, done: false })),
      budget: [],
      createdAt: todayISO(),
    };
    commitProjects([...projects, newProj]);
    setView("projets");
  }

  /* ---------- notes CRUD ---------- */

  function addNote() {
    const content = noteDraft.trim();
    if (!content) return;
    commitNotes([{ id: uid(), content, tags: noteTagDraft, pinned: false, createdAt: todayISO() }, ...notes]);
    setNoteDraft(""); setNoteTagDraft([]);
  }
  function deleteNote(id) { commitNotes(notes.filter((n) => n.id !== id)); }
  function togglePin(id) { commitNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))); }
  function startEditNote(n) { setEditingNoteId(n.id); setEditingNoteContent(n.content); }
  function saveEditNote() {
    commitNotes(notes.map((n) => (n.id === editingNoteId ? { ...n, content: editingNoteContent } : n)));
    setEditingNoteId(null);
  }

  /* ---------- quick capture ---------- */

  function runCapture() {
    const text = captureText.trim();
    if (!text) return;
    if (captureType === "projet") {
      commitProjects([...projects, { id: uid(), title: text, description: "", status: "a_faire", priority: "normale", deadline: "", tags: [], createdAt: todayISO() }]);
    } else if (captureType === "editorial") {
      commitEditorial([...editorial, { id: uid(), title: text, type: "Autre", status: "pas_commence", date: "", notes: "", createdAt: todayISO() }]);
    } else {
      commitNotes([{ id: uid(), content: text, tags: [], pinned: false, createdAt: todayISO() }, ...notes]);
    }
    setCaptureText("");
  }

  /* ---------- voice updates ---------- */

  function startRecording() {
    setVoiceError(null);
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setVoiceError("La reconnaissance vocale n'est pas disponible dans ce navigateur. Dicte avec le micro du clavier de ton téléphone, puis colle le texte ci-dessous.");
      return;
    }
    try {
      const rec = new SR();
      rec.lang = "fr-FR";
      rec.continuous = true;
      rec.interimResults = true;
      let finalText = transcript ? transcript + " " : "";
      rec.onresult = (event) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const res = event.results[i];
          if (res.isFinal) finalText += res[0].transcript + " ";
          else interim += res[0].transcript;
        }
        setTranscript((finalText + interim).trim());
      };
      rec.onerror = (event) => {
        setVoiceError(event.error === "not-allowed"
          ? "Accès au micro refusé. Autorise le micro pour ce site, ou colle ta dictée ci-dessous."
          : `Erreur d'enregistrement (${event.error}).`);
        setRecState("idle");
      };
      rec.onend = () => { setRecState((s) => (s === "recording" ? "idle" : s)); };
      rec.start();
      recognitionRef.current = rec;
      setRecState("recording");
    } catch (e) {
      setVoiceError("Impossible de démarrer l'enregistrement.");
    }
  }

  function stopRecording() {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      recognitionRef.current = null;
    }
    setRecState("idle");
  }

  async function analyzePDF(file) {
    if (!file) return;
    setRecState("pdf_analyzing");
    setVoiceError(null);
    setSuggestions(null);
    setSuggSource("pdf");
    try {
      const b64 = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result.split(",")[1]);
        reader.onerror = () => rej(new Error("Lecture du PDF impossible"));
        reader.readAsDataURL(file);
      });
      const projList = projects.map((p) => `${p.id}: ${p.title}`).join("\n") || "(aucun)";
      const editoList = editorial.map((e) => `${e.id}: ${e.title}`).join("\n") || "(aucun)";
      const sys = `Tu extrais des informations d'un document PDF (compte-rendu, brief, email imprimé, etc.) et les transformes en mises à jour structurées pour une application de gestion de projets événementiels et de calendrier éditorial.
Réponds UNIQUEMENT avec un tableau JSON valide, sans texte avant ni après, sans balises markdown.
Chaque élément du tableau : { "type": "update_project"|"create_project"|"update_editorial"|"create_editorial"|"create_note", "match_id": "<id existant ou null>", "summary": "<phrase courte en français résumant le changement>", "fields": { ... } }.
N'utilise match_id que si tu identifies clairement l'élément concerné dans les listes fournies ci-dessous ; sinon utilise un type create_*.
Champs possibles pour project : title, status (a_faire|en_cours|en_attente|termine), deadline (YYYY-MM-DD ou ""), lieu, horaires, partenaires, participants, append_description.
Champs possibles pour editorial : title, type (LinkedIn|WhatsApp|Mailing|Newsletter|Site / Agenda|Comité édito|ISCOM|Événement|Autre), status (pas_commence|en_cours|termine|annule), date (YYYY-MM-DD ou ""), append_notes.
Champs possibles pour create_note : content, tags (liste de courts mots-clés).
Si le document ne contient pas d'informations actionnables pour l'appli, retourne [].
Date du jour : ${todayISO()}.
Projets existants (id: titre) :
${projList}
Contenus éditoriaux existants (id: titre) :
${editoList}`;
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: sys,
          messages: [{ role: "user", content: [
            { type: "document", source: { type: "base64", media_type: "application/pdf", data: b64 } },
            { type: "text", text: `Analyse ce document et extrais toutes les informations actionnables pour l'appli.` },
          ]}],
        }),
      });
      const data = await response.json();
      const raw = (data.content || []).map((b) => b.text || "").join("").trim();
      const clean = raw.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
      const parsed = JSON.parse(clean);
      const withAccept = (Array.isArray(parsed) ? parsed : []).map((s) => ({ ...s, accepted: true, _id: uid() }));
      setSuggestions(withAccept);
      savePending(withAccept, `[PDF : ${file.name}]`, "pdf");
      setTranscript(`[PDF : ${file.name}]`);
      setRecState("idle");
    } catch (e) {
      console.error(e);
      setVoiceError("L'analyse du PDF a échoué — vérifie que le fichier est lisible et réessaie.");
      setRecState("idle");
    }
  }

  async function analyzeTranscript() {
    const text = transcript.trim();
    if (!text) return;
    setRecState("analyzing");
    setVoiceError(null);
    setSuggestions(null);
    try {
      const projList = projects.map((p) => `${p.id}: ${p.title}`).join("\n") || "(aucun)";
      const editoList = editorial.map((e) => `${e.id}: ${e.title}`).join("\n") || "(aucun)";
      const sys = `Tu transformes une dictée vocale en mises à jour structurées pour une application de gestion de projets événementiels et de calendrier éditorial.
Réponds UNIQUEMENT avec un tableau JSON valide, sans texte avant ni après, sans balises markdown.
Chaque élément du tableau : { "type": "update_project"|"create_project"|"update_editorial"|"create_editorial"|"create_note", "match_id": "<id existant ou null>", "summary": "<phrase courte en français résumant le changement>", "fields": { ... } }.
N'utilise match_id que si tu identifies clairement l'élément concerné dans les listes fournies ci-dessous ; sinon utilise un type create_*.
Champs possibles pour project : title, status (a_faire|en_cours|en_attente|termine), deadline (YYYY-MM-DD ou ""), lieu, horaires, partenaires, participants, append_description.
Champs possibles pour editorial : title, type (LinkedIn|WhatsApp|Mailing|Newsletter|Site / Agenda|Comité édito|ISCOM|Événement|Autre), status (pas_commence|en_cours|termine|annule), date (YYYY-MM-DD ou ""), append_notes.
Champs possibles pour create_note : content, tags (liste de courts mots-clés).
Date du jour : ${todayISO()}.
Projets existants (id: titre) :
${projList}
Contenus éditoriaux existants (id: titre) :
${editoList}`;

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: sys,
          messages: [{ role: "user", content: `Dictée à analyser :\n${text}` }],
        }),
      });
      const data = await response.json();
      const raw = (data.content || []).map((b) => b.text || "").join("").trim();
      const clean = raw.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
      const parsed = JSON.parse(clean);
      const withAccept = (Array.isArray(parsed) ? parsed : []).map((s) => ({ ...s, accepted: true, _id: uid() }));
      setSuggestions(withAccept);
      savePending(withAccept, transcript, suggSource);
      setRecState("idle");
    } catch (e) {
      console.error(e);
      setVoiceError("L'analyse a échoué — réessaie, ou ajuste le texte de la dictée.");
      setRecState("idle");
    }
  }

  function toggleSuggestion(id) {
    setSuggestions((list) => {
      const next = list.map((s) => (s._id === id ? { ...s, accepted: !s.accepted } : s));
      savePending(next, transcript, suggSource);
      return next;
    });
  }

  function applySuggestions() {
    if (!suggestions) return;
    let nextProjects = projects, nextEditorial = editorial, nextNotes = notes;
    const accepted = suggestions.filter((s) => s.accepted);
    accepted.forEach((s) => {
      const f = s.fields || {};
      if (s.type === "update_project" && s.match_id) {
        nextProjects = nextProjects.map((p) => {
          if (p.id !== s.match_id) return p;
          const patch = {};
          ["title", "status", "deadline", "lieu", "horaires", "partenaires", "participants"].forEach((k) => { if (f[k] !== undefined && f[k] !== "") patch[k] = f[k]; });
          if (f.append_description) patch.description = (p.description ? p.description + "\n\n" : "") + f.append_description;
          if (patch.status) stampCompletion(p.status, patch.status, patch);
          return { ...p, ...patch };
        });
      } else if (s.type === "create_project") {
        const status = f.status || "a_faire";
        const patch = stampCompletion(null, status, {});
        nextProjects = [...nextProjects, {
          id: uid(), title: f.title || s.summary || "Nouveau projet", description: f.append_description || "",
          status, priority: "normale", deadline: f.deadline || "", tags: [], subtasks: [],
          lieu: f.lieu || "", horaires: f.horaires || "", partenaires: f.partenaires || "", participants: f.participants || "",
          createdAt: todayISO(), ...patch,
        }];
      } else if (s.type === "update_editorial" && s.match_id) {
        nextEditorial = nextEditorial.map((it) => {
          if (it.id !== s.match_id) return it;
          const patch = {};
          ["title", "type", "status", "date"].forEach((k) => { if (f[k] !== undefined && f[k] !== "") patch[k] = f[k]; });
          if (f.append_notes) patch.notes = (it.notes ? it.notes + "\n\n" : "") + f.append_notes;
          if (patch.status) stampCompletion(it.status, patch.status, patch);
          return { ...it, ...patch };
        });
      } else if (s.type === "create_editorial") {
        const status = f.status || "pas_commence";
        const patch = stampCompletion(null, status, {});
        nextEditorial = [...nextEditorial, {
          id: uid(), title: f.title || s.summary || "Nouveau contenu", type: f.type || "Autre",
          status, date: f.date || "", notes: f.append_notes || "", createdAt: todayISO(), ...patch,
        }];
      } else if (s.type === "create_note") {
        nextNotes = [{ id: uid(), content: f.content || s.summary || "", tags: f.tags || [], pinned: false, createdAt: todayISO() }, ...nextNotes];
      }
    });
    commitProjects(nextProjects);
    commitEditorial(nextEditorial);
    commitNotes(nextNotes);
    commitVoiceLog([{ id: uid(), date: todayISO(), transcript, summary: accepted.map((s) => s.summary).join(" · ") || "Aucun changement appliqué", count: accepted.length, source: suggSource }, ...voiceLog].slice(0, 30));
    clearPending();
    setSuggestions(null);
    setTranscript("");
  }

  function discardSuggestions() { setSuggestions(null); clearPending(); }

  /* ---------- derived data ---------- */

  const filteredProjects = useMemo(() => {
    let list = projects.filter((p) => {
      const q = projSearch.toLowerCase();
      const matchesQ = !q || p.title.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesPrio = projPriorityFilter === "all" || p.priority === projPriorityFilter;
      return matchesQ && matchesPrio;
    });
    list = [...list].sort((a, b) => {
      let av = a[projSort.field] || "", bv = b[projSort.field] || "";
      if (projSort.field === "deadline") { av = av || "9999-99-99"; bv = bv || "9999-99-99"; }
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return projSort.dir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [projects, projSearch, projPriorityFilter, projSort]);

  const filteredEditorial = useMemo(() => {
    let list = editorial.filter((it) => {
      const q = editoSearch.toLowerCase();
      const matchesQ = !q || it.title.toLowerCase().includes(q) || (it.notes || "").toLowerCase().includes(q);
      const matchesType = editoTypeFilter === "all" || it.type === editoTypeFilter;
      return matchesQ && matchesType;
    });
    list = [...list].sort((a, b) => {
      let av = a[editoSort.field] || "", bv = b[editoSort.field] || "";
      if (editoSort.field === "date") { av = av || "9999-99-99"; bv = bv || "9999-99-99"; }
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return editoSort.dir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [editorial, editoSearch, editoTypeFilter, editoSort]);

  const filteredNotes = useMemo(() => {
    let list = notes.filter((n) => {
      const q = noteSearch.toLowerCase();
      return !q || n.content.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q));
    });
    return [...list].sort((a, b) => (b.pinned - a.pinned) || (b.createdAt > a.createdAt ? 1 : -1));
  }, [notes, noteSearch]);

  const upcoming = useMemo(() => {
    const fromProjects = projects.filter((p) => p.deadline && p.status !== "termine").map((p) => ({ id: "p_" + p.id, title: p.title, date: p.deadline, kind: "Projet", color: MODULE_COLOR.projets, ref: p }));
    const fromEditorial = editorial.filter((e) => e.date && e.status !== "termine" && e.status !== "annule").map((e) => ({ id: "e_" + e.id, title: e.title, date: e.date, kind: e.type, color: MODULE_COLOR.editorial, ref: e }));
    return [...fromProjects, ...fromEditorial].sort((a, b) => (a.date < b.date ? -1 : 1)).slice(0, 7);
  }, [projects, editorial]);

  const [notifPerm, setNotifPerm] = useState(typeof Notification !== "undefined" ? Notification.permission : "unsupported");

  function enableNotifications() {
    if (typeof Notification === "undefined") return;
    Notification.requestPermission().then((perm) => setNotifPerm(perm));
  }

  // Vérifie les échéances proches et notifie (une fois par jour par élément)
  useEffect(() => {
    if (!ready || notifPerm !== "granted") return;
    const today = todayISO();
    let notified = {};
    try { notified = JSON.parse(localStorage.getItem("regie_notified") || "{}"); } catch (e) {}
    const dueSoon = [
      ...projects.filter((p) => p.deadline && p.status !== "termine"),
      ...editorial.filter((e) => e.date && e.status !== "termine" && e.status !== "annule").map((e) => ({ ...e, deadline: e.date })),
    ].filter((it) => { const d = daysUntil(it.deadline); return d !== null && d >= 0 && d <= 2; });
    dueSoon.forEach((it) => {
      const key = it.id + "_" + today;
      if (notified[key]) return;
      const d = daysUntil(it.deadline);
      const when = d === 0 ? "aujourd'hui" : d === 1 ? "demain" : `dans ${d} jours`;
      try {
        new Notification("GAMMA — Échéance", { body: `« ${it.title} » ${when}`, tag: key });
        notified[key] = true;
      } catch (e) {}
    });
    try { localStorage.setItem("regie_notified", JSON.stringify(notified)); } catch (e) {}
  }, [ready, notifPerm, projects, editorial]);

  function exportRegiePDF() {
    const dateStr = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
    const statusLabel = (k) => statusInfo(PROJECT_STATUSES, k).label;
    const edStatusLabel = (k) => statusInfo(EDITORIAL_STATUSES, k).label;
    const activeProjects = projects.filter((p) => p.status !== "termine");
    const win = window.open("", "_blank");
    if (!win) return;
    const projRows = activeProjects.length ? activeProjects.map((p) => `
      <tr>
        <td><strong>${escapeHtml(p.title)}</strong>${p.lieu ? `<br><span class="meta">${escapeHtml(p.lieu)}${p.horaires ? " · " + escapeHtml(p.horaires) : ""}</span>` : ""}</td>
        <td>${statusLabel(p.status)}</td>
        <td>${priorityInfo(p.priority).label}</td>
        <td>${p.deadline ? formatFR(p.deadline) : "—"}</td>
        <td>${(p.subtasks || []).length ? p.subtasks.filter((s) => s.done).length + "/" + p.subtasks.length : "—"}</td>
      </tr>`).join("") : `<tr><td colspan="5" class="empty">Aucun projet en cours</td></tr>`;
    const edUpcoming = editorial.filter((e) => e.status !== "termine" && e.status !== "annule").sort((a, b) => ((a.date || "9999") < (b.date || "9999") ? -1 : 1));
    const edRows = edUpcoming.length ? edUpcoming.map((e) => `
      <tr>
        <td><strong>${escapeHtml(e.title)}</strong></td>
        <td>${escapeHtml(e.type)}</td>
        <td>${edStatusLabel(e.status)}</td>
        <td>${e.date ? formatFR(e.date) : "—"}</td>
      </tr>`).join("") : `<tr><td colspan="4" class="empty">Aucun contenu planifié</td></tr>`;
    win.document.write(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>GAMMA — ${dateStr}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap');
        body { font-family: 'Montserrat', sans-serif; color: #1e0034; padding: 32px 38px; max-width: 900px; margin: 0 auto; }
        .head { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 3px solid #1e0034; padding-bottom: 12px; margin-bottom: 24px; }
        h1 { font-size: 24px; font-weight: 800; margin: 0; }
        .date { color: #666; font-size: 13px; }
        h2 { font-size: 16px; font-weight: 700; margin: 26px 0 10px; color: #6b3fd4; }
        table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
        th { text-align: left; padding: 8px 10px; border-bottom: 2px solid #ddd; font-size: 10.5px; text-transform: uppercase; letter-spacing: .04em; color: #888; }
        td { padding: 9px 10px; border-bottom: 1px solid #eee; vertical-align: top; }
        .meta { color: #999; font-size: 11px; }
        .empty { color: #aaa; font-style: italic; text-align: center; }
        @media print { body { padding: 0; } }
      </style></head><body>
      <div class="head"><h1>RÉGIE — GAMMA</h1><span class="date">${dateStr}</span></div>
      <h2>Projets en cours (${activeProjects.length})</h2>
      <table><thead><tr><th>Projet</th><th>Statut</th><th>Priorité</th><th>Échéance</th><th>Avancement</th></tr></thead><tbody>${projRows}</tbody></table>
      <h2>Calendrier éditorial (${edUpcoming.length})</h2>
      <table><thead><tr><th>Contenu</th><th>Canal</th><th>Statut</th><th>Date</th></tr></thead><tbody>${edRows}</tbody></table>
      <script>window.onload = () => window.print();<\/script>
      </body></html>`);
    win.document.close();
  }

  async function uploadBrandFile(file, field, filenameField) {
    if (!file) return;
    setBrandUploading(field);
    try {
      const path = `${field}_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const url = await uploadToStorage(file, path);
      const next = { ...brandSettings, [field]: url, [filenameField]: file.name };
      commitBrand(next);
    } catch (e) {
      console.error("Upload échoué", e);
      alert("Upload échoué — vérifie que le bucket 'brand-assets' est bien créé dans Supabase Storage (Public).");
    }
    setBrandUploading("");
  }

  function addBrandColor(hex, name) {
    if (!hex) return;
    const next = { ...brandSettings, colors: [...(brandSettings.colors || []), { id: uid(), hex, name: name || hex }] };
    commitBrand(next);
  }

  function removeBrandColor(id) {
    commitBrand({ ...brandSettings, colors: (brandSettings.colors || []).filter((c) => c.id !== id) });
  }

  function addBrandTypo(name) {
    if (!name.trim()) return;
    const next = { ...brandSettings, typography: [...(brandSettings.typography || []), { id: uid(), name: name.trim() }] };
    commitBrand(next);
  }

  function removeBrandTypo(id) {
    commitBrand({ ...brandSettings, typography: (brandSettings.typography || []).filter((t) => t.id !== id) });
  }

  async function generateWeeklyDigest() {
    setDigestLoading(true);
    setDigest("");
    try {
      const today = todayISO();
      const weekStart = isoOf(mondayOf(new Date()));
      const doneThisWeek = [
        ...projects.filter((p) => p.completedAt && p.completedAt >= weekStart).map((p) => `Projet terminé : ${p.title}`),
        ...editorial.filter((e) => e.completedAt && e.completedAt >= weekStart).map((e) => `Contenu terminé : ${e.title}`),
      ];
      const inProgress = projects.filter((p) => p.status === "en_cours").map((p) => `${p.title}${p.deadline ? " (échéance " + formatFR(p.deadline) + ")" : ""}`);
      const upcomingD = [
        ...projects.filter((p) => p.deadline && p.status !== "termine" && daysUntil(p.deadline) !== null && daysUntil(p.deadline) >= 0 && daysUntil(p.deadline) <= 10).map((p) => `${p.title} — ${formatFR(p.deadline)}`),
        ...editorial.filter((e) => e.date && e.status !== "termine" && e.status !== "annule" && daysUntil(e.date) !== null && daysUntil(e.date) >= 0 && daysUntil(e.date) <= 10).map((e) => `${e.title} (${e.type}) — ${formatFR(e.date)}`),
      ];
      const sys = `Tu es l'assistant de pilotage de Guillaume, chef de projet événementiel et communication. Rédige un point hebdomadaire court, concret et motivant en français, à la deuxième personne ("tu"). Structure : un bilan de la semaine écoulée, puis les priorités de la semaine à venir. Pas de listes à puces interminables, reste synthétique et humain (8-12 lignes max). Ne réinvente rien, base-toi uniquement sur les données fournies.`;
      const userMsg = `Date du jour : ${today}.
Terminé cette semaine :
${doneThisWeek.join("\n") || "(rien de marqué terminé)"}

En cours actuellement :
${inProgress.join("\n") || "(aucun projet en cours)"}

Échéances dans les 10 prochains jours :
${upcomingD.join("\n") || "(aucune échéance proche)"}`;
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: sys, messages: [{ role: "user", content: userMsg }] }),
      });
      const data = await response.json();
      const text = (data.content || []).map((b) => b.text || "").join("").trim();
      setDigest(text || "Je n'ai pas pu générer le résumé. Réessaie dans un instant.");
    } catch (e) {
      console.error(e);
      setDigest("Le résumé a échoué — réessaie dans un instant.");
    }
    setDigestLoading(false);
  }

  const stats = useMemo(() => ({
    enCours: projects.filter((p) => p.status === "en_cours").length,
    semaine: [...projects.filter((p) => p.deadline), ...editorial.filter((e) => e.date)].filter((it) => {
      const d = daysUntil(it.deadline || it.date);
      return d !== null && d >= 0 && d <= 7;
    }).length,
    aPublier: editorial.filter((e) => e.status === "pas_commence" || e.status === "en_cours").length,
    notesEpinglees: notes.filter((n) => n.pinned).length,
  }), [projects, editorial, notes]);

  const goalStats = useMemo(() => {
    const completed = [
      ...projects.filter((p) => p.completedAt).map((p) => p.completedAt),
      ...editorial.filter((e) => e.completedAt).map((e) => e.completedAt),
    ];
    const todayD = new Date();
    const monthlyCount = completed.filter((d) => {
      const dt = new Date(d + "T00:00:00");
      return dt.getMonth() === todayD.getMonth() && dt.getFullYear() === todayD.getFullYear();
    }).length;
    const weekGroups = {};
    completed.forEach((d) => {
      const wk = isoOf(mondayOf(new Date(d + "T00:00:00")));
      weekGroups[wk] = (weekGroups[wk] || 0) + 1;
    });
    const weeklyCount = weekGroups[isoOf(mondayOf(todayD))] || 0;
    const bestWeekCount = Math.max(0, ...Object.values(weekGroups));
    return { monthlyCount, weeklyCount, bestWeekCount };
  }, [projects, editorial]);

  const accountStats = useMemo(() => ({
    projectsDone: projects.filter((p) => p.status === "termine").length,
    editorialDone: editorial.filter((e) => e.status === "termine").length,
    notesCount: notes.length,
    voiceUpdates: voiceLog.length,
  }), [projects, editorial, notes, voiceLog]);

  const levelInfo = useMemo(() => levelFromXP(gamification.xpTotal || 0), [gamification.xpTotal]);

  function toggleChallenge(scope, id) {
    const item = gamification.challenges[scope].find((c) => c.id === id);
    const nowDone = !item.done;
    const xpDelta = (CHALLENGE_XP[scope] || 0) * (nowDone ? 1 : -1);
    if (nowDone) celebrateCompletion();
    commitGamification({
      ...gamification,
      xpTotal: Math.max(0, gamification.xpTotal + xpDelta),
      challenges: { ...gamification.challenges, [scope]: gamification.challenges[scope].map((c) => (c.id === id ? { ...c, done: nowDone } : c)) },
    });
  }

  function adjustGoal(delta) {
    commitGamification({ ...gamification, monthlyTarget: Math.max(1, Math.min(50, gamification.monthlyTarget + delta)) });
  }

  const todayLabel = useMemo(() => {
    const s = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
    return s.charAt(0).toUpperCase() + s.slice(1);
  }, []);

  function sortHeader(currentSort, setSort, field, label) {
    const active = currentSort.field === field;
    return (
      <th onClick={() => setSort({ field, dir: active && currentSort.dir === "asc" ? "desc" : "asc" })}>
        {label}{active ? (currentSort.dir === "asc" ? " ↑" : " ↓") : ""}
      </th>
    );
  }

  /* ============================== RENDER ============================== */

  // Auth gates
  if (authState === "checking") {
    return <div style={{ minHeight: "100vh", background: "#1e0034", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.5)", fontFamily: "Montserrat, sans-serif" }}>Connexion en cours…</div>;
  }
  if (authState === "login" || authState === "magic_sent") {
    return <LoginPage loginEmail={loginEmail} setLoginEmail={setLoginEmail} sendMagicLink={sendMagicLink} loginLoading={loginLoading} loginError={loginError} authState={authState} />;
  }

  if (!ready) {
    return (
      <div className="rg-app" data-theme={theme}>
        <style>{STYLE}</style>
        <div className="rg-loading">Chargement…</div>
      </div>
    );
  }

  return (
    <div className="rg-app" data-theme={theme}>
      <style>{STYLE}</style>
      {celebrate && <Confetti />}

      {/* SIDEBAR */}
      <div className={`rg-drawer-overlay${burgerOpen ? " open" : ""}`} onClick={() => setBurgerOpen(false)} aria-hidden="true" />
      <div className={`rg-sidebar${burgerOpen ? " open" : ""}`}>
        <div className="rg-brand">
          <img className="rg-logo-img" src="data:image/png;base64,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" alt="GAMMA — Agence digitale" />
        </div>
        <nav className="rg-nav">
          <button className={`rg-nav-item${view === "dashboard" ? " active" : ""}`} onClick={() => { setView("dashboard"); setBurgerOpen(false); }}>
            <LayoutDashboard size={15} />
            <span className="rg-nav-label">Tableau de bord</span>
          </button>
          <button className={`rg-nav-item${view === "projets" ? " active" : ""}`} style={{ "--dot-soft": MODULE_SOFT.projets }} onClick={() => { setView("projets"); setBurgerOpen(false); }}>
            <span className="rg-nav-dot" style={{ background: MODULE_COLOR.projets }} />
            <span className="rg-nav-label">Projets événementiels</span>
            <span className="rg-nav-count rg-mono">{projects.length}</span>
          </button>
          <button className={`rg-nav-item${view === "editorial" ? " active" : ""}`} style={{ "--dot-soft": MODULE_SOFT.editorial }} onClick={() => { setView("editorial"); setBurgerOpen(false); }}>
            <span className="rg-nav-dot" style={{ background: MODULE_COLOR.editorial }} />
            <span className="rg-nav-label">Calendrier éditorial</span>
            <span className="rg-nav-count rg-mono">{editorial.length}</span>
          </button>
          <button className={`rg-nav-item${view === "notes" ? " active" : ""}`} style={{ "--dot-soft": MODULE_SOFT.notes }} onClick={() => { setView("notes"); setBurgerOpen(false); }}>
            <span className="rg-nav-dot" style={{ background: MODULE_COLOR.notes }} />
            <span className="rg-nav-label">Notes &amp; idées</span>
            <span className="rg-nav-count rg-mono">{notes.length}</span>
          </button>
          <div className="rg-nav-divider" />
          {can.viewAdmin && (
            <button className={`rg-nav-item${view === "vocal" ? " active" : ""}`} style={{ "--dot-soft": "rgba(255,122,69,.18)" }} onClick={() => { setView("vocal"); setBurgerOpen(false); }}>
              <Mic size={14} color="var(--danger)" />
              <span className="rg-nav-label">MAJ Projets</span>
            </button>
          )}
          {can.viewAdmin && (
            <button className={`rg-nav-item${view === "contacts" ? " active" : ""}`} style={{ "--dot-soft": "rgba(148,110,255,.18)" }} onClick={() => { setView("contacts"); setBurgerOpen(false); }}>
              <Users size={14} color="var(--accent-3)" />
              <span className="rg-nav-label">Contacts</span>
              <span className="rg-nav-count rg-mono">{contacts.length}</span>
            </button>
          )}
          <button className={`rg-nav-item${view === "compte" ? " active" : ""}`} style={{ "--dot-soft": "rgba(206,166,19,.18)" }} onClick={() => { setView("compte"); setBurgerOpen(false); }}>
            <User size={14} color="var(--accent-2)" />
            <span className="rg-nav-label">Mon compte</span>
          </button>
        </nav>
        <div className="rg-side-stats">
          <div className="rg-side-stat"><span>En cours</span><b>{stats.enCours}</b></div>
          <div className="rg-side-stat"><span>Échéances 7j</span><b>{stats.semaine}</b></div>
          <div className="rg-side-stat"><span>À publier</span><b>{stats.aPublier}</b></div>
          <div className="rg-side-stat"><span>Notes épinglées</span><b>{stats.notesEpinglees}</b></div>
        </div>
        <button className="rg-theme-toggle" onClick={toggleTheme} aria-label="Changer de thème">
          {theme === "dark" ? <><Sun size={14} />Mode clair</> : <><Moon size={14} />Mode sombre</>}
        </button>
        {profile && (
          <div style={{ marginTop: 8 }}>
            <div className="rg-user-badge" onClick={logout} title="Se déconnecter">
              <div className="rg-user-avatar" style={{ background: ROLE_COLORS[role] + "33", color: ROLE_COLORS[role] }}>
                {(profile.name || profile.email || "?").slice(0, 1).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="rg-user-name">{profile.name || profile.email}</div>
                <div style={{ fontSize: 10, color: "var(--text-faint)" }}>Se déconnecter</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* role banner for non-admin */}
      {role !== "admin" && (
        <div className="rg-role-banner" style={{ background: ROLE_COLORS[role] + "22", color: ROLE_COLORS[role] }}>
          {ROLE_LABELS[role]}
        </div>
      )}

      {/* MAIN */}
      <div className="rg-main">
        {/* ---------- DASHBOARD ---------- */}
        {view === "dashboard" && (
          <>
            <div className="rg-topbar"><button className="rg-burger" onClick={() => setBurgerOpen(true)} aria-label="Menu"><Menu size={18} /></button>
              <div className="rg-topbar-title"><Sparkles size={17} color="var(--accent)" />Tableau de bord</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {notifPerm !== "granted" && notifPerm !== "unsupported" && (
                  <button className="rg-btn rg-btn-ghost" onClick={enableNotifications} title="Activer les rappels d'échéances"><Bell size={14} />Rappels</button>
                )}
                <button className="rg-btn" onClick={exportRegiePDF}><Download size={14} />Exporter PDF</button>
                <div className="rg-topbar-date rg-mono">{todayLabel}</div>
              </div>
            </div>
            <div className="rg-content">
              <div className="rg-stats-row">
                <div className="rg-stat-card"><div className="rg-stat-num rg-display" style={{ color: MODULE_COLOR.projets }}>{stats.enCours}</div><div className="rg-stat-label">Projets en cours</div></div>
                <div className="rg-stat-card"><div className="rg-stat-num rg-display">{stats.semaine}</div><div className="rg-stat-label">Échéances cette semaine</div></div>
                <div className="rg-stat-card"><div className="rg-stat-num rg-display" style={{ color: MODULE_COLOR.editorial }}>{stats.aPublier}</div><div className="rg-stat-label">Contenus à publier</div></div>
                <div className="rg-stat-card"><div className="rg-stat-num rg-display" style={{ color: MODULE_COLOR.notes }}>{stats.notesEpinglees}</div><div className="rg-stat-label">Notes épinglées</div></div>
              </div>

              <div className="rg-dash-grid">
                <div>
                  <div className="rg-panel">
                    <div className="rg-section-title">Prochaines échéances</div>
                    {upcoming.length === 0 && <div className="rg-empty">Aucune échéance à venir — tout est calme pour l'instant.</div>}
                    {upcoming.map((it) => {
                      const d = daysUntil(it.date);
                      return (
                        <div className="rg-deadline-row" key={it.id} onClick={() => (it.id.startsWith("p_") ? openEditProject(it.ref) : openEditEditorial(it.ref))} style={{ cursor: "pointer" }}>
                          <span className="rg-deadline-dot" style={{ background: it.color }} />
                          <div style={{ flex: 1 }}>
                            <div className="rg-deadline-title">{it.title}</div>
                            <div className="rg-deadline-meta">{it.kind} · {formatFR(it.date)}</div>
                          </div>
                          <span className="rg-deadline-badge rg-mono" style={{ background: urgencyColor(d) + "22", color: urgencyColor(d) }}>{urgencyLabel(d)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="rg-panel">
                    <div className="rg-section-title">Capture rapide</div>
                    <div className="rg-capture-types">
                      <button className={captureType === "projet" ? "active" : ""} style={{ "--type-color": MODULE_COLOR.projets, "--type-soft": MODULE_SOFT.projets }} onClick={() => setCaptureType("projet")}><Flag size={13} />Projet</button>
                      <button className={captureType === "editorial" ? "active" : ""} style={{ "--type-color": MODULE_COLOR.editorial, "--type-soft": MODULE_SOFT.editorial }} onClick={() => setCaptureType("editorial")}><Megaphone size={13} />Contenu</button>
                      <button className={captureType === "note" ? "active" : ""} style={{ "--type-color": MODULE_COLOR.notes, "--type-soft": MODULE_SOFT.notes }} onClick={() => setCaptureType("note")}><StickyNote size={13} />Note</button>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input className="rg-input" placeholder="Saisis une idée, une tâche…" value={captureText}
                        onChange={(e) => setCaptureText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") runCapture(); }} />
                      <button className="rg-btn rg-btn-primary" onClick={runCapture}><Plus size={14} /></button>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 8 }}>Tu pourras compléter les détails ensuite dans le module correspondant.</div>
                  </div>

                  <div className="rg-panel">
                    <div className="rg-section-title">Notes épinglées</div>
                    {notes.filter((n) => n.pinned).length === 0 && <div className="rg-empty">Épingle une note pour la retrouver ici.</div>}
                    {notes.filter((n) => n.pinned).slice(0, 4).map((n) => (
                      <div key={n.id} style={{ fontSize: 12.5, padding: "8px 0", borderBottom: "1px solid var(--border)" }}>{n.content}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ---------- PROJETS ---------- */}
        {view === "projets" && (
          <>
            <div className="rg-topbar"><button className="rg-burger" onClick={() => setBurgerOpen(true)} aria-label="Menu"><Menu size={18} /></button>
              <div className="rg-topbar-title"><span className="rg-nav-dot" style={{ background: MODULE_COLOR.projets, width: 10, height: 10 }} />Projets événementiels</div>
              <div className="rg-viewswitch">
                <button className={projSubview === "kanban" ? "active" : ""} onClick={() => setProjSubview("kanban")}><LayoutGrid size={13} />Kanban</button>
                <button className={projSubview === "liste" ? "active" : ""} onClick={() => setProjSubview("liste")}><ListIcon size={13} />Liste</button>
                <button className={projSubview === "calendrier" ? "active" : ""} onClick={() => setProjSubview("calendrier")}><CalendarDays size={13} />Calendrier</button>
              </div>
            </div>
            <div className="rg-content">
              <div className="rg-toolbar">
                <div className="rg-search"><Search size={14} /><input className="rg-input" placeholder="Rechercher un projet…" value={projSearch} onChange={(e) => setProjSearch(e.target.value)} /></div>
                <select className="rg-select" style={{ width: 160 }} value={projPriorityFilter} onChange={(e) => setProjPriorityFilter(e.target.value)}>
                  <option value="all">Toutes priorités</option>
                  {PRIORITIES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
                <div className="rg-spacer" />
                <button className="rg-btn rg-btn-primary" onClick={openNewProject}><Plus size={14} />Nouveau projet</button>
              </div>

              {projSubview === "kanban" && (
                <div className="rg-kanban">
                  {PROJECT_STATUSES.map((col, colIdx) => {
                    const colItems = filteredProjects.filter((p) => p.status === col.key);
                    return (
                      <div className="rg-kcol" key={col.key}>
                        <div className="rg-kcol-head">
                          <span className="rg-kcol-num rg-mono">{String(colIdx + 1).padStart(2, "0")}</span>
                          <span className="rg-kcol-title">{col.label}</span>
                          <span className="rg-kcol-count rg-mono">{colItems.length}</span>
                        </div>
                        {colItems.length === 0 && <div className="rg-empty" style={{ padding: "8px 2px" }}>Vide</div>}
                        {colItems.map((p) => {
                          const d = daysUntil(p.deadline);
                          const prio = priorityInfo(p.priority);
                          return (
                            <div className="rg-kcard" key={p.id} style={{ "--mod-color": prio.color }} onClick={() => openEditProject(p)}>
                              {p.cover_url && (
                                <div className="rg-kcard-cover-wrap">
                                  <img src={p.cover_url} alt="" className="rg-kcard-cover" onError={(e) => { e.target.parentElement.style.display = "none"; }} />
                                </div>
                              )}
                              <div className="rg-kcard-title">{p.title}</div>
                              {(p.checklist || []).length > 0 && (() => {
                                const done = p.checklist.filter((c) => c.done).length;
                                const total = p.checklist.length;
                                const allDone = done === total;
                                return (
                                  <div className="rg-kcard-checklist">
                                    <span style={{ color: allDone ? "var(--accent)" : "var(--text-faint)" }}>✅</span>
                                    <span style={{ color: allDone ? "var(--accent)" : "var(--text-faint)", fontWeight: allDone ? 700 : 400 }}>
                                      {done}/{total} {allDone ? "— Prêt !" : ""}
                                    </span>
                                    <div style={{ flex: 1, height: 3, borderRadius: 999, background: "var(--surface-3)", overflow: "hidden" }}>
                                      <div style={{ width: `${Math.round((done / total) * 100)}%`, height: "100%", background: allDone ? "var(--accent)" : "var(--accent-3)", borderRadius: 999 }} />
                                    </div>
                                  </div>
                                );
                              })()}
                              {(p.subtasks || []).length > 0 && (
                                <ProgressBar done={p.subtasks.filter((s) => s.done).length} total={p.subtasks.length} color={MODULE_COLOR.projets} />
                              )}
                              {(p.lieu || p.horaires) && (
                                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-faint)", marginBottom: 6 }}>
                                  {p.lieu && <><MapPin size={11} />{p.lieu}</>}
                                  {p.lieu && p.horaires && <span>·</span>}
                                  {p.horaires && <span>{p.horaires}</span>}
                                </div>
                              )}
                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                <Pill label={prio.label} color={prio.color} />
                                {p.deadline && <span className="rg-deadline-badge rg-mono" style={{ background: urgencyColor(d) + "22", color: urgencyColor(d) }}>{urgencyLabel(d)}</span>}
                              </div>
                              <div className="rg-kcard-meta">
                                <div className="rg-kcard-move">
                                  <button disabled={colIdx === 0} onClick={(e) => { e.stopPropagation(); moveProject(p.id, -1); }} aria-label="Étape précédente"><ArrowLeft size={12} /></button>
                                  <button disabled={colIdx === PROJECT_STATUSES.length - 1} onClick={(e) => { e.stopPropagation(); moveProject(p.id, 1); }} aria-label="Étape suivante"><ArrowRight size={12} /></button>
                                </div>
                                <ConfirmDelete onConfirm={() => deleteProject(p.id)} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}

              {projSubview === "liste" && (
                <table className="rg-table">
                  <thead>
                    <tr>
                      {sortHeader(projSort, setProjSort, "title", "Titre")}
                      <th>Statut</th>
                      {sortHeader(projSort, setProjSort, "priority", "Priorité")}
                      {sortHeader(projSort, setProjSort, "deadline", "Échéance")}
                      <th>Lieu</th>
                      <th>Tags</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.length === 0 && <tr><td colSpan={7} className="rg-empty">Aucun projet ne correspond à ces filtres.</td></tr>}
                    {filteredProjects.map((p) => {
                      const st = statusInfo(PROJECT_STATUSES, p.status), prio = priorityInfo(p.priority);
                      return (
                        <tr key={p.id} onClick={() => openEditProject(p)}>
                          <td>{p.title}{(p.subtasks || []).length > 0 && <span className="rg-subtask-frac">{p.subtasks.filter((s) => s.done).length}/{p.subtasks.length}</span>}</td>
                          <td><Pill label={st.label} color={st.color} solid={st.solid} /></td>
                          <td><Pill label={prio.label} color={prio.color} /></td>
                          <td className="rg-mono">{formatFR(p.deadline)}</td>
                          <td style={{ color: "var(--text-faint)", fontSize: 12 }}>{p.lieu || "—"}</td>
                          <td style={{ color: "var(--text-faint)", fontSize: 12 }}>{p.tags.join(", ")}</td>
                          <td><ConfirmDelete onConfirm={() => deleteProject(p.id)} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {projSubview === "calendrier" && (
                <MonthCalendar cursor={projCalCursor} setCursor={setProjCalCursor} items={filteredProjects} dateField="deadline"
                  colorFor={() => MODULE_COLOR.projets} onItemClick={openEditProject} />
              )}
            </div>
          </>
        )}

        {/* ---------- EDITORIAL ---------- */}
        {view === "editorial" && (
          <>
            <div className="rg-topbar"><button className="rg-burger" onClick={() => setBurgerOpen(true)} aria-label="Menu"><Menu size={18} /></button>
              <div className="rg-topbar-title"><Megaphone size={17} color={MODULE_COLOR.editorial} />Calendrier éditorial</div>
              <div className="rg-viewswitch">
                <button className={editoSubview === "calendrier" ? "active" : ""} onClick={() => setEditoSubview("calendrier")}><CalendarDays size={13} />Calendrier</button>
                <button className={editoSubview === "liste" ? "active" : ""} onClick={() => setEditoSubview("liste")}><ListIcon size={13} />Liste</button>
              </div>
            </div>
            <div className="rg-content">
              <div className="rg-toolbar">
                <div className="rg-search"><Search size={14} /><input className="rg-input" placeholder="Rechercher un contenu…" value={editoSearch} onChange={(e) => setEditoSearch(e.target.value)} /></div>
                <select className="rg-select" style={{ width: 180 }} value={editoTypeFilter} onChange={(e) => setEditoTypeFilter(e.target.value)}>
                  <option value="all">Tous types</option>
                  {EDITORIAL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <div className="rg-spacer" />
                <button className="rg-btn rg-btn-primary" onClick={openNewEditorial}><Plus size={14} />Nouveau contenu</button>
              </div>

              {editoSubview === "calendrier" && (
                <MonthCalendar cursor={editoCalCursor} setCursor={setEditoCalCursor} items={filteredEditorial} dateField="date"
                  colorFor={() => MODULE_COLOR.editorial} onItemClick={openEditEditorial} />
              )}

              {editoSubview === "liste" && (
                <table className="rg-table">
                  <thead>
                    <tr>
                      {sortHeader(editoSort, setEditoSort, "title", "Titre")}
                      <th>Type</th>
                      <th>Statut</th>
                      {sortHeader(editoSort, setEditoSort, "date", "Date")}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEditorial.length === 0 && <tr><td colSpan={5} className="rg-empty">Aucun contenu ne correspond à ces filtres.</td></tr>}
                    {filteredEditorial.map((it) => {
                      const st = statusInfo(EDITORIAL_STATUSES, it.status);
                      return (
                        <tr key={it.id} onClick={() => openEditEditorial(it)}>
                          <td>{it.title}</td>
                          <td style={{ color: "var(--text-muted)", fontSize: 12.5 }}>{it.type}</td>
                          <td><Pill label={st.label} color={st.color} solid={st.solid} /></td>
                          <td className="rg-mono">{formatFR(it.date)}</td>
                          <td><ConfirmDelete onConfirm={() => deleteEditorial(it.id)} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* ---------- NOTES ---------- */}
        {view === "notes" && (
          <>
            <div className="rg-topbar"><button className="rg-burger" onClick={() => setBurgerOpen(true)} aria-label="Menu"><Menu size={18} /></button>
              <div className="rg-topbar-title"><StickyNote size={17} color={MODULE_COLOR.notes} />Notes &amp; idées</div>
              <div className="rg-search" style={{ width: 220 }}><Search size={14} /><input className="rg-input" placeholder="Rechercher…" value={noteSearch} onChange={(e) => setNoteSearch(e.target.value)} /></div>
            </div>
            <div className="rg-content">
              <div className="rg-panel">
                <textarea className="rg-textarea" placeholder="Note ou idée en vrac… (Entrée pour valider, Maj+Entrée pour une ligne)" value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addNote(); } }} />
                <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}><TagInput value={noteTagDraft} onChange={setNoteTagDraft} placeholder="Tags (optionnel)…" /></div>
                  <button className="rg-btn rg-btn-primary" onClick={addNote}><Plus size={14} />Ajouter</button>
                </div>
              </div>

              <div className="rg-notes-grid">
                {filteredNotes.length === 0 && <div className="rg-empty">Aucune note pour l'instant — capture ta première idée ci-dessus.</div>}
                {filteredNotes.map((n) => (
                  <div className="rg-note-card" key={n.id}>
                    {editingNoteId === n.id ? (
                      <>
                        <textarea className="rg-textarea" value={editingNoteContent} onChange={(e) => setEditingNoteContent(e.target.value)} autoFocus />
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="rg-btn rg-btn-primary" onClick={saveEditNote}><Check size={13} />Enregistrer</button>
                          <button className="rg-btn rg-btn-ghost" onClick={() => setEditingNoteId(null)}>Annuler</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="rg-note-content">{n.content}</div>
                        {n.tags.length > 0 && (
                          <div className="rg-tag-row">
                            {n.tags.map((t) => <span className="rg-tag-chip" key={t}><TagIcon size={10} />{t}</span>)}
                          </div>
                        )}
                        <div className="rg-note-foot">
                          <span className="rg-note-date">{formatFR(n.createdAt)}</span>
                          <div className="rg-note-actions">
                            <button className="rg-icon-btn" style={n.pinned ? { color: MODULE_COLOR.notes } : {}} onClick={() => togglePin(n.id)} title="Épingler"><Pin size={14} /></button>
                            <button className="rg-icon-btn" onClick={() => startEditNote(n)} title="Modifier"><Pencil size={14} /></button>
                            <ConfirmDelete onConfirm={() => deleteNote(n.id)} />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ---------- VOCAL ---------- */}
        {view === "vocal" && (
          <>
            <div className="rg-topbar"><button className="rg-burger" onClick={() => setBurgerOpen(true)} aria-label="Menu"><Menu size={18} /></button>
              <div className="rg-topbar-title"><Mic size={17} color="var(--danger)" />MAJ Projets</div>
              {suggestions && suggestions.length > 0 && (
                <span className="rg-pending-badge"><AlertTriangle size={12} />{suggestions.filter(s => s.accepted).length} modification{suggestions.filter(s => s.accepted).length > 1 ? "s" : ""} en attente de validation</span>
              )}
            </div>
            <div className="rg-content">
              <div className="rg-panel">
                <div className="rg-section-title">Enregistrement vocal</div>
                {voiceError && <div className="rg-voice-error">{voiceError}</div>}
                <div className="rg-voice-row">
                  <button
                    className={`rg-rec-btn${recState === "recording" ? " recording" : ""}`}
                    onClick={recState === "recording" ? stopRecording : startRecording}
                    disabled={recState === "analyzing" || recState === "pdf_analyzing"}
                    aria-label={recState === "recording" ? "Arrêter l'enregistrement" : "Démarrer l'enregistrement"}
                  >
                    {recState === "recording" ? <MicOff size={24} /> : <Mic size={24} />}
                  </button>
                  <div>
                    <div className="rg-voice-status">
                      {recState === "recording" ? "En écoute…" : recState === "analyzing" ? "Analyse vocale en cours…" : recState === "pdf_analyzing" ? "Analyse du PDF en cours…" : "Prêt à enregistrer"}
                    </div>
                    <div className="rg-voice-hint">
                      Clique pour parler. Ou dicte avec le micro de ton clavier mobile et colle ci-dessous.
                    </div>
                  </div>
                </div>
                <div className="rg-field">
                  <label className="rg-field-label">Transcription (modifiable)</label>
                  <textarea className="rg-textarea" style={{ minHeight: 90 }} value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Le texte de ta dictée apparaît ici — tu peux aussi le taper ou le coller directement." />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="rg-btn rg-btn-primary" onClick={() => { setSuggSource("vocal"); analyzeTranscript(); }} disabled={!transcript.trim() || recState === "analyzing" || recState === "pdf_analyzing"}>
                    {recState === "analyzing" ? <Loader2 size={14} className="rg-spin" /> : <Sparkles size={14} />}
                    Analyser la dictée
                  </button>
                  {transcript && recState !== "recording" && <button className="rg-btn rg-btn-ghost" onClick={() => { setTranscript(""); setSuggestions(null); clearPending(); }}>Effacer</button>}
                </div>
              </div>

              <div className="rg-panel">
                <div className="rg-section-title"><FileUp size={15} />Import PDF</div>
                <div className="rg-voice-hint" style={{ marginBottom: 10 }}>
                  Glisse un compte-rendu, brief ou tout autre document PDF — j'en extrais les informations actionnables comme une dictée vocale.
                </div>
                <div className="rg-pdf-zone" onClick={() => pdfInputRef.current && pdfInputRef.current.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f && f.type === "application/pdf") analyzePDF(f); }}>
                  <input type="file" accept="application/pdf" ref={pdfInputRef} onChange={(e) => { const f = e.target.files[0]; if (f) analyzePDF(f); e.target.value = ""; }} />
                  {recState === "pdf_analyzing" ? <><Loader2 size={18} className="rg-spin" style={{ margin: "0 auto 6px" }} /><div>Analyse en cours…</div></> : <><FileUp size={20} style={{ margin: "0 auto 6px" }} /><div>Clique ou glisse un fichier PDF ici</div></>}
                </div>
              </div>

              <div className="rg-panel">
                <div className="rg-section-title"><Mail size={15} />Connexion Gmail</div>
                <div className="rg-gmail-block">
                  <div className="rg-gmail-logo" aria-hidden="true">
                    <svg viewBox="0 0 48 48" width="36" height="36"><path fill="#EA4335" d="M24 5.457L4.5 19.5V43h9V28.5L24 38l10.5-9.5V43h9V19.5z"/><path fill="#FBBC05" d="M4.5 19.5L24 5.457l19.5 14.043V43h-9V28.5L24 38l-10.5-9.5V43h-9z" opacity=".3"/><path fill="#34A853" d="M43.5 43h-9V28.5L43.5 19.5z"/><path fill="#4285F4" d="M4.5 43h9V28.5L4.5 19.5z"/><path fill="#C5221F" d="M24 38L13.5 28.5V43h21V28.5z" opacity=".2"/></svg>
                  </div>
                  <div className="rg-gmail-info">
                    <div className="rg-gmail-title">Analyse tes mails depuis Claude</div>
                    <div className="rg-gmail-desc">Une fois Gmail connecté via le bouton ci-dessous, tu pourras dire à Claude <em>« Analyse mes mails non lus »</em> ou <em>« Regarde les mails liés à Club de la Com »</em> — les mises à jour seront proposées avec la même étape de validation que les dictées et PDFs.</div>
                    <div className="rg-gmail-steps">
                      <div className="rg-gmail-step"><span className="rg-gmail-step-num">1</span>Connecte Gmail depuis Claude (menu Connecteurs ou bouton proposé en bas)</div>
                      <div className="rg-gmail-step"><span className="rg-gmail-step-num">2</span>Reviens ici et demande-moi d'analyser tes mails</div>
                      <div className="rg-gmail-step"><span className="rg-gmail-step-num">3</span>Je génère des suggestions — tu valides avant application</div>
                    </div>
                  </div>
                </div>
              </div>

              {suggestions && (
                <div className="rg-panel">
                  <div className="rg-section-title">
                    {suggestions.length === 0 ? "Aucun changement détecté" : `Validation — ${suggestions.filter((s) => s.accepted).length}/${suggestions.length} sélectionnée${suggestions.filter((s) => s.accepted).length > 1 ? "s" : ""}`}
                    {suggestions.length > 0 && (() => { const isPdf = suggSource === "pdf"; return <span className="rg-log-source" style={{ background: isPdf ? "var(--accent-2-soft)" : "var(--accent-3-soft)", color: isPdf ? "var(--accent-2)" : "var(--accent-3)", border: `1px solid ${isPdf ? "var(--accent-2)" : "var(--accent-3)"}` }}>{isPdf ? <FileUp size={10} /> : <Mic size={10} />}{isPdf ? "PDF" : "Vocal"}</span>; })()}
                  </div>
                  {suggestions.length === 0 && <div className="rg-empty">Je n'ai rien trouvé d'actionnable — reformule ou vérifie le contenu du document.</div>}
                  {suggestions.map((s) => (
                    <div key={s._id} className={`rg-suggestion${s.accepted ? "" : " off"}`} onClick={() => toggleSuggestion(s._id)}>
                      <span className={`rg-suggestion-check${s.accepted ? " on" : ""}`}>{s.accepted && <Check size={12} color="#1e0034" />}</span>
                      <div className="rg-suggestion-body">
                        <div className="rg-suggestion-summary">{s.summary}</div>
                        <div className="rg-suggestion-type">{s.type.replace("_", " ")}</div>
                      </div>
                    </div>
                  ))}
                  {suggestions.length > 0 && (
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <button className="rg-btn rg-btn-primary" onClick={applySuggestions} disabled={!suggestions.some((s) => s.accepted)}>
                        <Check size={14} />Appliquer {suggestions.filter((s) => s.accepted).length} modification{suggestions.filter((s) => s.accepted).length > 1 ? "s" : ""}
                      </button>
                      <button className="rg-btn rg-btn-ghost" onClick={discardSuggestions}>Tout ignorer</button>
                    </div>
                  )}
                </div>
              )}

              <div className="rg-panel">
                <div className="rg-section-title">Historique des mises à jour vocales</div>
                {voiceLog.length === 0 && <div className="rg-empty">Aucune mise à jour appliquée pour l'instant.</div>}
                {voiceLog.map((v) => (
                  <div className="rg-log-row" key={v.id}>
                    <div className="rg-log-date rg-mono">{formatFR(v.date)} · {v.count} changement{v.count > 1 ? "s" : ""}
                      {v.source === "pdf" && <span className="rg-log-source" style={{ background: "var(--accent-2-soft)", color: "var(--accent-2)", border: "1px solid var(--accent-2)" }}><FileUp size={9} />PDF</span>}
                    </div>
                    <div className="rg-log-summary">{v.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ---------- MON COMPTE ---------- */}
        {view === "compte" && (
          <>
            <div className="rg-topbar"><button className="rg-burger" onClick={() => setBurgerOpen(true)} aria-label="Menu"><Menu size={18} /></button>
              <div className="rg-topbar-title"><User size={17} color="var(--accent-2)" />Mon compte</div>
            </div>
            <div className="rg-content">
              <div className="rg-panel">
                <div className="rg-section-title">Niveau</div>
                <div className="rg-xp-wrap">
                  <div className="rg-xp-level">Niveau {levelInfo.level}</div>
                  <div className="rg-xp-bar-outer">
                    <div className="rg-xp-bar-inner" style={{ width: `${Math.round((levelInfo.xpInLevel / levelInfo.xpForNext) * 100)}%` }} />
                  </div>
                  <div className="rg-xp-meta">
                    <span><b>{levelInfo.xpInLevel}</b> / {levelInfo.xpForNext} XP</span>
                    <span><b>{gamification.xpTotal}</b> XP au total</span>
                  </div>
                </div>
              </div>

              <div className="rg-stats-row">
                <div className="rg-stat-card"><div className="rg-stat-num rg-display" style={{ color: MODULE_COLOR.projets }}>{accountStats.projectsDone}</div><div className="rg-stat-label">Projets terminés</div></div>
                <div className="rg-stat-card"><div className="rg-stat-num rg-display" style={{ color: MODULE_COLOR.editorial }}>{accountStats.editorialDone}</div><div className="rg-stat-label">Contenus terminés</div></div>
                <div className="rg-stat-card"><div className="rg-stat-num rg-display" style={{ color: MODULE_COLOR.notes }}>{accountStats.notesCount}</div><div className="rg-stat-label">Notes capturées</div></div>
                <div className="rg-stat-card"><div className="rg-stat-num rg-display" style={{ color: "var(--danger)" }}>{accountStats.voiceUpdates}</div><div className="rg-stat-label">Mises à jour vocales</div></div>
              </div>

              <div className="rg-dash-grid">
                <div>
                  <div className="rg-panel">
                    <div className="rg-section-title">Défis du jour <span style={{ color: "var(--text-faint)", fontWeight: 500, fontSize: 11 }}>(+{CHALLENGE_XP.daily} XP)</span></div>
                    {gamification.challenges.daily.map((c) => (
                      <div className="rg-challenge-row" key={c.id} onClick={() => toggleChallenge("daily", c.id)}>
                        <span className={`rg-challenge-check${c.done ? " on" : ""}`}>{c.done && <Check size={12} color="#1e0034" />}</span>
                        <span className={`rg-challenge-text${c.done ? " done" : ""}`}>{c.text}</span>
                      </div>
                    ))}
                    <div className="rg-challenge-divider">Cette semaine (+{CHALLENGE_XP.weekly} XP)</div>
                    {gamification.challenges.weekly.map((c) => (
                      <div className="rg-challenge-row" key={c.id} onClick={() => toggleChallenge("weekly", c.id)}>
                        <span className={`rg-challenge-check${c.done ? " on" : ""}`}>{c.done && <Check size={12} color="#1e0034" />}</span>
                        <span className={`rg-challenge-text${c.done ? " done" : ""}`}>{c.text}</span>
                      </div>
                    ))}
                    <div className="rg-challenge-divider">Ce mois-ci (+{CHALLENGE_XP.monthly} XP)</div>
                    {gamification.challenges.monthly.map((c) => (
                      <div className="rg-challenge-row" key={c.id} onClick={() => toggleChallenge("monthly", c.id)}>
                        <span className={`rg-challenge-check${c.done ? " on" : ""}`}>{c.done && <Check size={12} color="#1e0034" />}</span>
                        <span className={`rg-challenge-text${c.done ? " done" : ""}`}>{c.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="rg-panel">
                    <div className="rg-section-title">Objectif du mois</div>
                    <div className="rg-goal-row">
                      <RingProgress value={goalStats.monthlyCount} max={gamification.monthlyTarget} color={MODULE_COLOR.editorial} />
                      <div>
                        <div className="rg-goal-label">éléments terminés ce mois-ci</div>
                        <div className="rg-goal-stepper">
                          <span className="rg-goal-label">Objectif :</span>
                          <button onClick={() => adjustGoal(-1)} aria-label="Diminuer l'objectif">−</button>
                          <span className="rg-mono" style={{ fontSize: 13, fontWeight: 700 }}>{gamification.monthlyTarget}</span>
                          <button onClick={() => adjustGoal(1)} aria-label="Augmenter l'objectif">+</button>
                        </div>
                      </div>
                    </div>
                    <div className="rg-bestweek">
                      Cette semaine : <b>{goalStats.weeklyCount}</b> terminé{goalStats.weeklyCount > 1 ? "s" : ""} · Record sur une semaine : <b>{goalStats.bestWeekCount}</b>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rg-panel">
                <div className="rg-section-title" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><CalendarRange size={15} color="var(--accent-3)" />Point hebdomadaire</span>
                  <button className="rg-btn rg-btn-primary" onClick={generateWeeklyDigest} disabled={digestLoading} style={{ position: "relative", bottom: 4 }}>
                    {digestLoading ? <Loader2 size={14} className="rg-spin" /> : <Sparkles size={14} />}
                    {digest ? "Régénérer" : "Générer mon point"}
                  </button>
                </div>
                {!digest && !digestLoading && <div className="rg-empty">Génère un bilan de ta semaine et tes priorités à venir, rédigé automatiquement à partir de tes projets et échéances.</div>}
                {digestLoading && <div className="rg-empty">Analyse de ta semaine en cours…</div>}
                {digest && <div className="rg-digest-text">{digest}</div>}
              </div>

              {/* Charte graphique */}
              <BrandCharter brandSettings={brandSettings} uploadBrandFile={uploadBrandFile} brandUploading={brandUploading}
                addBrandColor={addBrandColor} removeBrandColor={removeBrandColor} addBrandTypo={addBrandTypo} removeBrandTypo={removeBrandTypo}
                commitBrand={commitBrand} />

              {/* Charte éditoriale */}
              <EditorialCharter brandSettings={brandSettings} uploadBrandFile={uploadBrandFile} brandUploading={brandUploading} commitBrand={commitBrand} />

            </div>
          </>
        )}

        {/* ---------- CONTACTS ---------- */}
        {view === "contacts" && (
          <>
            <div className="rg-topbar"><button className="rg-burger" onClick={() => setBurgerOpen(true)} aria-label="Menu"><Menu size={18} /></button>
              <div className="rg-topbar-title"><Users size={17} color="var(--accent-3)" />Contacts &amp; intervenants</div>
              <div className="rg-search" style={{ width: 220 }}><Search size={14} /><input className="rg-input" placeholder="Rechercher…" value={contactSearch} onChange={(e) => setContactSearch(e.target.value)} /></div>
            </div>
            <div className="rg-content">
              <div className="rg-toolbar">
                <div className="rg-spacer" />
                <button className="rg-btn rg-btn-primary" onClick={openNewContact}><Plus size={14} />Nouveau contact</button>
              </div>
              <div className="rg-notes-grid">
                {contacts.filter((c) => {
                  const q = contactSearch.toLowerCase();
                  return !q || c.name.toLowerCase().includes(q) || (c.structure || "").toLowerCase().includes(q) || (c.role || "").toLowerCase().includes(q) || (c.tags || []).some((t) => t.toLowerCase().includes(q));
                }).length === 0 && <div className="rg-empty">Aucun contact pour l'instant — ajoute ton premier intervenant.</div>}
                {contacts.filter((c) => {
                  const q = contactSearch.toLowerCase();
                  return !q || c.name.toLowerCase().includes(q) || (c.structure || "").toLowerCase().includes(q) || (c.role || "").toLowerCase().includes(q) || (c.tags || []).some((t) => t.toLowerCase().includes(q));
                }).map((c) => (
                  <div className="rg-contact-card" key={c.id} onClick={() => openEditContact(c)}>
                    <div className="rg-contact-head">
                      <div className="rg-contact-avatar">{c.name.slice(0, 1).toUpperCase()}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="rg-contact-name">{c.name}</div>
                        {(c.role || c.structure) && <div className="rg-contact-role">{[c.role, c.structure].filter(Boolean).join(" · ")}</div>}
                      </div>
                    </div>
                    {c.email && <div className="rg-contact-line"><Mail size={12} />{c.email}</div>}
                    {c.phone && <div className="rg-contact-line"><span style={{ fontSize: 12 }}>📞</span>{c.phone}</div>}
                    {(c.tags || []).length > 0 && (
                      <div className="rg-tag-row">{c.tags.map((t) => <span className="rg-tag-chip" key={t}><TagIcon size={10} />{t}</span>)}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ---------- MODALS ---------- */}
      {projModal && (
        <Modal title={projModal.id ? "Modifier le projet" : "Nouveau projet"} onClose={() => setProjModal(null)}
          footer={
            <>
              {projModal.id && can.editProjects ? <button className="rg-btn rg-btn-ghost rg-btn-danger" onClick={() => { deleteProject(projModal.id); setProjModal(null); }}><Trash2 size={13} />Supprimer</button> : <span />}
              {can.editProjects ? <button className="rg-btn rg-btn-primary" onClick={saveProject}><Check size={13} />Enregistrer</button> : <button className="rg-btn rg-btn-ghost" onClick={() => setProjModal(null)}>Fermer</button>}
            </>
          }>
          {can.editProjects
            ? <ProjectForm draft={projModal} setDraft={setProjModal} templates={templates}
                onApplyTemplate={applyTemplateToDraft} onSaveAsTemplate={saveCurrentAsTemplate}
                onManageTemplates={() => setTemplateModal({ _list: true })} />
            : <ProjectFormReadOnly project={projModal} />
          }
          {projModal.id && (
            <CommentsPanel entityType="project" entityId={projModal.id} comments={comments}
              onAdd={addComment} onDelete={deleteComment} profile={profile} canDelete={can.viewAdmin} />
          )}
        </Modal>
      )}

      {editoModal && (
        <Modal title={editoModal.id ? "Modifier le contenu" : "Nouveau contenu"} onClose={() => setEditoModal(null)}
          footer={
            <>
              {editoModal.id && can.editEditorial ? <button className="rg-btn rg-btn-ghost rg-btn-danger" onClick={() => { deleteEditorial(editoModal.id); setEditoModal(null); }}><Trash2 size={13} />Supprimer</button> : <span />}
              {can.editEditorial ? <button className="rg-btn rg-btn-primary" onClick={saveEditorial}><Check size={13} />Enregistrer</button> : <button className="rg-btn rg-btn-ghost" onClick={() => setEditoModal(null)}>Fermer</button>}
            </>
          }>
          {can.editEditorial
            ? <EditorialForm draft={editoModal} setDraft={setEditoModal} />
            : <div className="rg-empty">Lecture seule — tu peux laisser un commentaire ci-dessous.</div>
          }
          {editoModal.id && (
            <CommentsPanel entityType="editorial" entityId={editoModal.id} comments={comments}
              onAdd={addComment} onDelete={deleteComment} profile={profile} canDelete={can.viewAdmin} />
          )}
        </Modal>
      )}

      {contactModal && (
        <Modal title={contactModal.id ? "Modifier le contact" : "Nouveau contact"} onClose={() => setContactModal(null)}
          footer={
            <>
              {contactModal.id ? <button className="rg-btn rg-btn-ghost rg-btn-danger" onClick={() => { deleteContact(contactModal.id); setContactModal(null); }}><Trash2 size={13} />Supprimer</button> : <span />}
              <button className="rg-btn rg-btn-primary" onClick={saveContact}><Check size={13} />Enregistrer</button>
            </>
          }>
          <ContactForm draft={contactModal} setDraft={setContactModal} />
        </Modal>
      )}

      {templateModal && templateModal._list && (
        <Modal title="Gérer les modèles" onClose={() => setTemplateModal(null)}
          footer={<><span /><button className="rg-btn rg-btn-primary" onClick={() => setTemplateModal({ id: null, name: "", description: "", default_priority: "normale", default_lieu: "", default_horaires: "", default_partenaires: "", subtasks: [] })}><Plus size={13} />Nouveau modèle</button></>}>
          {templates.length === 0 && <div className="rg-empty">Aucun modèle pour l'instant. Crée ton premier gabarit d'événement, ou enregistre un projet comme modèle.</div>}
          {templates.map((t) => (
            <div className="rg-template-listrow" key={t.id}>
              <div style={{ flex: 1 }}>
                <div className="rg-template-name" style={{ fontSize: 13 }}>{t.name}</div>
                {(t.default_lieu || (t.subtasks || []).length > 0) && (
                  <div className="rg-template-meta">
                    {t.default_lieu && <span><MapPin size={11} />{t.default_lieu}</span>}
                    {(t.subtasks || []).length > 0 && <span>{t.subtasks.length} sous-tâche{t.subtasks.length > 1 ? "s" : ""}</span>}
                  </div>
                )}
              </div>
              <button className="rg-icon-btn" onClick={() => setTemplateModal({ ...t })} title="Modifier"><Pencil size={14} /></button>
              <ConfirmDelete onConfirm={() => deleteTemplate(t.id)} />
            </div>
          ))}
        </Modal>
      )}

      {templateModal && !templateModal._list && (
        <Modal title={templateModal.id ? "Modifier le modèle" : "Nouveau modèle"} onClose={() => setTemplateModal(null)}
          footer={
            <>
              {templateModal.id ? <button className="rg-btn rg-btn-ghost rg-btn-danger" onClick={() => { deleteTemplate(templateModal.id); setTemplateModal(null); }}><Trash2 size={13} />Supprimer</button> : <span />}
              <button className="rg-btn rg-btn-primary" onClick={saveTemplate}><Check size={13} />Enregistrer</button>
            </>
          }>
          <TemplateForm draft={templateModal} setDraft={setTemplateModal} />
        </Modal>
      )}
    </div>
  );
}
