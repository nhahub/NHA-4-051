/* global React */

// ═══════════════════════════════════════════════════════════════════════════════
// shared.js — Global components, constants, and utilities shared across all pages
//
// Contents:
//   1. Icon          — Lucide SVG icon component (uses lucide.icons[name].toSvg())
//   2. COMPLAINTS_DATA — Mock data. Replace with GET /api/complaints in each page.
//   3. CATEGORIES    — Complaint categories (Arabic + English)
//   4. getSentiment  — Text sentiment heuristic. Replace with ML API call.
//   5. getSentimentDisplay — Maps sentiment string to icon/label/color
//   6. useLang       — Language toggle hook with localStorage persistence
//   7. pageHref      — Maps page IDs to HTML file paths
//   8. Navbar        — Shared navigation bar
//
// BACKEND NOTE:
//   COMPLAINTS_DATA is currently hardcoded mock data for UI development.
//   When wiring to the real backend, remove it from here and fetch per-page:
//     DashboardPage  → GET /api/complaints?user_id=me
//     AdminPage      → GET /api/admin/complaints?sort=priority&status=all
// ═══════════════════════════════════════════════════════════════════════════════

// ─── SELF-CONTAINED SVG ICON COMPONENT ──────────────────────────────────────
// No CDN, no external library, no timing issues. Pure inline SVG paths.
// Every icon used in this app is stored here as an SVG path string.
// To add a new icon: copy the path from https://lucide.dev, add it below.
// ─────────────────────────────────────────────────────────────────────────────
const ICONS = {
  'alert-circle':     '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  'eye':              '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  'eye-off':          '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
  'lock':             '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'phone':            '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z"/>',
  'angry':            '<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><path d="M7.5 8 10 9"/><path d="m14 9 2.5-1"/><path d="M9 10h0"/><path d="M15 10h0"/>',
  'arrow-left':       '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  'arrow-right':      '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'bar-chart-2':      '<line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>',
  'bar-chart-3':      '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  'bot':              '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  'camera':           '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  'check':            '<path d="M20 6 9 17l-5-5"/>',
  'check-circle-2':   '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  'circle':           '<circle cx="12" cy="12" r="10"/>',
  'circle-dot':       '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/>',
  'clipboard-check':  '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  'clock':            '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'dot':              '<circle cx="12" cy="12" r="1"/>',
  'download':         '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  'file-text':        '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  'flame':            '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  'folder-up':        '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M12 10v6"/><path d="m9 13 3-3 3 3"/>',
  'hand':             '<path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
  'id-card':          '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M16 13h-3"/><path d="M16 9h-2"/><circle cx="8.5" cy="11" r="2.5"/><path d="M11 16.5a4 4 0 0 0-8 0"/>',
  'info':             '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  'landmark':         '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
  'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  'line-chart':       '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  'list':             '<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>',
  'loader-circle':    '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
  'locate-fixed':     '<line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/>',
  'map':              '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
  'map-pin':          '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  'meh':              '<circle cx="12" cy="12" r="10"/><line x1="8" x2="16" y1="15" y2="15"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
  'message-square':   '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  'mic':              '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
  'paperclip':        '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  'pencil-line':      '<path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>',
  'plus':             '<path d="M5 12h14"/><path d="M12 5v14"/>',
  'radar':            '<path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/><path d="M4 6h.01"/><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"/><path d="M16.24 7.76A6 6 0 1 0 8.23 16.67"/><path d="M12 18h.01"/><path d="M17.99 11.66A6 6 0 0 1 15.77 16.67"/><circle cx="12" cy="12" r="2"/><path d="m13.41 10.59 5.66-5.66"/>',
  'refresh-cw':       '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  'rocket':           '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  'search':           '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  'send':             '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
  'settings':         '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  'shield':           '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  'shield-check':     '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  'siren':            '<path d="M7 18h10"/><path d="M9 18V7a3 3 0 0 1 6 0v11"/><path d="M3 9.17a10 10 0 0 0-.5 3"/><path d="M21.5 12.17a10 10 0 0 0-.5-3"/><path d="M12 2v1"/><path d="m4.2 5.8.7.7"/><path d="m19.1 5.8-.7.7"/>',
  'sparkles':         '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  'square':           '<rect width="18" height="18" x="3" y="3" rx="2"/>',
  'star':             '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  'tag':              '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
  'timer':            '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
  'triangle-alert':   '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  'user':             '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  'user-check':       '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
  'video':            '<path d="m22 8-6 4 6 4V8z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>',
  'waves':            '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
  'x':                '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'zap':              '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
};

function Icon({ name, size, color, style, className }) {
  const s = size || 18;
  const c = color || 'currentColor';
  const paths = ICONS[name] || ICONS['circle'];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="${className||''}">${paths}</svg>`;
  return React.createElement('span', {
    dangerouslySetInnerHTML: { __html: svg },
    style: { display: 'inline-flex', alignItems: 'center', lineHeight: 1, verticalAlign: 'middle', flexShrink: 0, ...(style || {}) }
  });
}
// ─────────────────────────────────────────────────────────────────────────────

// ─── SELF-CONTAINED SVG ICON COMPONENT ──────────────────────────────────────
// No CDN, no external library, no timing issues. Pure inline SVG paths.
// Every icon used in this app is stored here as an SVG path string.
// To add a new icon: copy the path from https://lucide.dev, add it below.
// ────────────────────────────────────────────────────────────────────────────

// Shared constants/data
const COMPLAINTS_DATA = [
  { id: 'SHK-2024-0012', title: 'إنارة الشوارع معطلة', category: 'كهرباء', categoryEn: 'Electricity', location: 'المعادي، القاهرة', date: 'قبل يومين', priority: 9.2, sentiment: 'negative', status: 'review', evidence: 'photo', color: '#D4AF37' },
  { id: 'SHK-2024-0011', title: 'تراكم القمامة في الشارع', category: 'نظافة', categoryEn: 'Sanitation', location: 'حلوان، القاهرة', date: 'قبل 3 أيام', priority: 8.5, sentiment: 'negative', status: 'submitted', evidence: 'video', color: '#2E8B57' },
  { id: 'SHK-2024-0010', title: 'حفرة خطيرة في الطريق', category: 'طرق', categoryEn: 'Roads', location: 'الدقي، الجيزة', date: 'قبل 4 أيام', priority: 7.8, sentiment: 'negative', status: 'progress', evidence: 'photo', color: '#1B6B93' },
  { id: 'SHK-2024-0009', title: 'انقطاع المياه منذ أسبوع', category: 'مياه', categoryEn: 'Water', location: 'المنصورة، الدقهلية', date: 'قبل أسبوع', priority: 6.4, sentiment: 'neutral', status: 'progress', evidence: '—', color: '#E6A8D7' },
  { id: 'SHK-2024-0008', title: 'إصلاح حديقة المنطقة', category: 'خدمات عامة', categoryEn: 'Services', location: 'الإسكندرية', date: 'قبل أسبوعين', priority: 4.1, sentiment: 'neutral', status: 'resolved', evidence: 'photo', color: '#2E8B57' },
  { id: 'SHK-2024-0007', title: 'ضوضاء ورشة قريبة', category: 'بيئة', categoryEn: 'Environment', location: 'مدينة نصر', date: 'قبل 5 أيام', priority: 5.3, sentiment: 'negative', status: 'submitted', evidence: 'video', color: '#E6A8D7' },
];

const CATEGORIES = ['نظافة', 'طرق ومواصلات', 'مياه وصرف صحي', 'كهرباء', 'صحة', 'تعليم', 'خدمات حكومية', 'بيئة', 'أخرى'];
const CATEGORIES_EN = ['Sanitation', 'Roads & Transport', 'Water & Sewage', 'Electricity', 'Healthcare', 'Education', 'Gov. Services', 'Environment', 'Other'];

// Shared utils
function getSentiment(text) {
  // ─── ML INTEGRATION POINT ───────────────────────────────────────────────────
  // Replace this client-side keyword heuristic with a real-time API call to
  // your Python backend:
  //
  //   POST /api/analyze-sentiment
  //   Body: { text: string }
  //   Response: { sentiment: 'negative' | 'neutral', score: number, keywords: string[] }
  //
  // Example Python (FastAPI + your fine-tuned AraBERT / CAMeL-BERT model):
  //   @app.post("/api/analyze-sentiment")
  //   async def analyze_sentiment(body: SentimentRequest):
  //       result = sentiment_model.predict(body.text)  # HuggingFace pipeline
  //       return { "sentiment": result.label, "score": result.score }
  //
  // Note: This system is a complaint platform — we intentionally only track
  // 'negative' and 'neutral'. Positive sentiment is not a valid complaint state.
  // ─────────────────────────────────────────────────────────────────────────────
  const negative = ['معطل', 'خطير', 'سيء', 'مشكلة', 'ضعيف', 'broken', 'bad', 'terrible', 'horrible', 'dangerous', 'انقطع', 'تراكم', 'حفرة', 'تلف', 'مكسور', 'خراب', 'مظلم', 'انقطاع'];
  const txt = String(text || '').toLowerCase();
  if (negative.some(w => txt.includes(w))) return 'negative';
  if (txt.length > 20) return 'neutral';
  return 'none';
}

function getSentimentDisplay(s, lang) {
  // Complaint system: only Negative or Neutral states are valid sentiments.
  // 'Positive' has been intentionally removed.
  if (s === 'negative') return { icon: 'angry', label: lang === 'ar' ? 'سلبي — مشكلة واضحة' : 'Negative — Clear Issue', color: '#DC2626' };
  if (s === 'neutral') return { icon: 'meh', label: lang === 'ar' ? 'محايد' : 'Neutral', color: '#D4AF37' };
  return { icon: 'message-square', label: lang === 'ar' ? 'اكتب شكواك...' : 'Start typing...', color: '#94a3b8' };
}

// Lang persistence + html dir/lang sync
function useLang() {
  const { useEffect, useState } = React;

  const getInitial = () => {
    const stored = window.localStorage.getItem('shakwa_lang');
    return stored === 'en' ? 'en' : 'ar';
  };

  const [lang, setLang] = useState(getInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem('shakwa_lang', lang);
    } catch (_) {}

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  return [lang, setLang];
}

function pageHref(pageId) {
  switch (pageId) {
    case 'home': return 'index.html';
    case 'register': return 'register.html';
    case 'submit': return 'submit.html';
    case 'dashboard': return 'dashboard.html';
    case 'admin': return 'admin.html';
    default: return 'index.html';
  }
}

// Shared navbar (multi-page navigation)
function Navbar({ current, lang, setLang }) {
  const t = {
    ar: { brand: 'شكوى', home: 'الرئيسية', register: 'تسجيل', submit: 'أبلغ عن مشكلة', dashboard: 'لوحتي', admin: 'الإدارة' },
    en: { brand: 'Shakwa', home: 'Home', register: 'Register', submit: 'Report Issue', dashboard: 'My Dashboard', admin: 'Admin' }
  }[lang];

  const NavLink = ({ to, label, className }) => (
    <a href={to} className={className} style={{ textDecoration: 'none', display: 'inline-flex' }}>
      {label}
    </a>
  );

  return (
    <nav className="navbar">
      <a className="navbar-brand" href={pageHref('home')} style={{ textDecoration: 'none' }}>
        {t.brand} <span>| {lang === 'ar' ? 'صوتك مسموع' : 'Your Voice Heard'}</span>
      </a>
      <div className="nav-links">
        {current !== 'home' && <NavLink to={pageHref('home')} label={t.home} className="nav-btn ghost" />}
        {current !== 'dashboard' && <NavLink to={pageHref('dashboard')} label={t.dashboard} className="nav-btn ghost" />}
        {current !== 'admin' && <NavLink to={pageHref('admin')} label={t.admin} className="nav-btn outline" />}
        {current !== 'register' && <NavLink to={pageHref('register')} label={t.register} className="nav-btn ghost" />}
        {current !== 'submit' && <NavLink to={pageHref('submit')} label={t.submit} className="nav-btn primary" />}
        <button className="lang-toggle" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
          {lang === 'ar' ? 'EN' : 'ع'}
        </button>
      </div>
    </nav>
  );
}

