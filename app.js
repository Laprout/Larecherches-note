/* ============================================================
   Larecherches Note — Application React (PWA)
   Version 1.0.237 · Build 1.09 · Octobre 2026
   By KENFACK.L.N
   ============================================================ */

const { useState, useEffect, useMemo, useRef, useCallback } = React;

/* ============================================================
   1. CONSTANTES
   ============================================================ */
const APP_META = {
  name: "Larecherches Note",
  version: "1.0.237",
  build: "1.09",
  date: { fr: "Octobre 2026", en: "October 2026" },
  author: "KENFACK.L.N"
};

const LS_KEY = "ln-data-v1";
const HEALTHY_KEY = "ln-was-healthy";
const DIAG_KEY = "ln-diagnostics";
const LOCK_KEY = "ln-lock";
const RECOVERY_VAULT_KEY = "ln-recovery-vault";
const RECOVERY_HASH_KEY = "ln-recovery-hash";
const IDB_NAME = "ln-backup";
const IDB_STORE = "snapshots";
const UNSPLASH_KEY = "onEswdSlZUZqMSZHBAtrWlWHgCPRYbWzsn0Fzi9vfs4";
const UNSPLASH_URL = "https://api.unsplash.com/search/photos";

const FONTS = {
  cinzel:       { name: "Cinzel — Gothique (défaut)", family: "'Cinzel', serif",              weight: 700, google: "Cinzel:wght@400;700" },
  unifraktur:   { name: "UnifrakturCook — Blackletter", family: "'UnifrakturCook', cursive",  weight: 700, google: "UnifrakturCook:wght@700" },
  playfair:     { name: "Playfair Display", family: "'Playfair Display', serif",               weight: 700, google: "Playfair+Display:wght@400;700" },
  roboto:       { name: "Roboto", family: "'Roboto', sans-serif",                              weight: 400, google: "Roboto:wght@400;500;700" },
  inter:        { name: "Inter", family: "'Inter', sans-serif",                                weight: 400, google: "Inter:wght@400;600;700" },
  lora:         { name: "Lora", family: "'Lora', serif",                                       weight: 400, google: "Lora:wght@400;700" },
  merriweather: { name: "Merriweather", family: "'Merriweather', serif",                       weight: 400, google: "Merriweather:wght@400;700" },
  jetbrains:    { name: "JetBrains Mono", family: "'JetBrains Mono', monospace",               weight: 400, google: "JetBrains+Mono:wght@400;700" }
};

const TEXT_COLORS = [
  { id: "ivory",   label: "Ivoire",     value: "#ede4d3" },
  { id: "cream",   label: "Crème",      value: "#f0e9d4" },
  { id: "paper",   label: "Papier",     value: "#e6eefc" },
  { id: "white",   label: "Blanc",      value: "#ffffff" },
  { id: "charcoal",label: "Anthracite", value: "#2b2b2b" },
  { id: "ink",     label: "Encre",      value: "#1f2328" },
  { id: "slate",   label: "Ardoise",    value: "#546e7a" },
  { id: "gold",    label: "Or",         value: "#c9a227" },
  { id: "blue",    label: "Bleu",       value: "#4a9eff" },
  { id: "red",     label: "Rouge",      value: "#e74c3c" },
  { id: "green",   label: "Vert",       value: "#11a862" },
  { id: "purple",  label: "Violet",     value: "#8e44ad" },
  { id: "orange",  label: "Orange",     value: "#ff6b00" },
  { id: "pink",    label: "Rose",       value: "#e91e63" },
  { id: "cyan",    label: "Cyan",       value: "#00bcd4" },
  { id: "brown",   label: "Brun",       value: "#795548" }
];

const THEMES = [
  { id: "deepin-dark",  label: "🌑 Deepin Sombre" },
  { id: "deepin-light", label: "☀️ Deepin Clair" },
  { id: "gold-dark",    label: "🟡 Sombre & Or discret" },
  { id: "blue-dark",    label: "🔵 Bleu sombre" },
  { id: "dark",         label: "⚫ Sombre classique" },
  { id: "light",        label: "⚪ Clair classique" }
];

const ACCENTS = [
  { id: "#0082ff", label: "Bleu Deepin" },
  { id: "#f0c419", label: "Jaune LN" },
  { id: "#2d9d5f", label: "Vert LN" },
  { id: "#11a862", label: "Vert" },
  { id: "#8e44ad", label: "Violet" },
  { id: "#ff6b00", label: "Orange" },
  { id: "#e74c3c", label: "Rouge" },
  { id: "#16a085", label: "Turquoise" },
  { id: "#e91e63", label: "Rose" },
  { id: "#3f51b5", label: "Indigo" },
  { id: "#ffb300", label: "Ambre" },
  { id: "#00bcd4", label: "Cyan" },
  { id: "#795548", label: "Brun" },
  { id: "#546e7a", label: "Ardoise" }
];

const FILE_TYPES = {
  txt:  { mime: "text/plain",       ext: ".txt",  label: "Texte" },
  md:   { mime: "text/markdown",    ext: ".md",   label: "Markdown" },
  html: { mime: "text/html",        ext: ".html", label: "HTML" },
  htm:  { mime: "text/html",        ext: ".htm",  label: "HTML" },
  css:  { mime: "text/css",         ext: ".css",  label: "CSS" },
  js:   { mime: "text/javascript",  ext: ".js",   label: "JavaScript" },
  json: { mime: "application/json", ext: ".json", label: "JSON" },
  csv:  { mime: "text/csv",         ext: ".csv",  label: "CSV" },
  xml:  { mime: "application/xml",  ext: ".xml",  label: "XML" },
  svg:  { mime: "image/svg+xml",    ext: ".svg",  label: "SVG" },
  log:  { mime: "text/plain",       ext: ".log",  label: "Log" },
  yml:  { mime: "text/yaml",        ext: ".yml",  label: "YAML" },
  yaml: { mime: "text/yaml",        ext: ".yaml", label: "YAML" }
};

const BUILTIN_COVERS = [
  "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400",
  "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400",
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400"
];

const WEEKDAYS = {
  fr: ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"],
  en: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
};
const MONTHS = {
  fr: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"]
};

/* ============================================================
   2. UTILITAIRES
   ============================================================ */
const uid = () => Math.random().toString(36).slice(2, 10);
const pad2 = (n) => String(n).padStart(2, "0");
const isoDate = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const todayISO = () => isoDate(new Date());

const buildMonthGrid = (year, month) => {
  const first = new Date(year, month, 1);
  const startDay = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
};

const stripHtml = (html) => {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const fmtBytes = (n) => {
  if (!n) return "0 o";
  const units = ["o", "Ko", "Mo", "Go"];
  let i = 0;
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(i ? 1 : 0)} ${units[i]}`;
};

const extOf = (filename) => {
  const m = /\.([a-z0-9]+)$/i.exec(filename || "");
  return m ? m[1].toLowerCase() : "txt";
};

const isCodeType = (ext) =>
  ["html","htm","css","js","json","xml","svg","yml","yaml"].includes(ext);

const textToHtml = (text) => {
  const esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc.split(/\n{2,}/).map(b => `<p>${b.replace(/\n/g, "<br/>")}</p>`).join("");
};

const htmlToText = (html) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html || "";
  return (tmp.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
};

const serializeNote = (note, ext) => {
  const title = note.title || "sans-titre";
  switch (ext) {
    case "html": case "htm":
      return `<!DOCTYPE html>\n<html lang="fr"><head><meta charset="UTF-8"/><title>${title}</title>\n<style>body{font-family:Georgia,serif;max-width:720px;margin:2rem auto;padding:1rem;line-height:1.6;}</style>\n</head><body>\n<h1>${title}</h1>\n${note.content || ""}\n</body></html>`;
    case "md":
      return `# ${title}\n\n${htmlToText(note.content)}`;
    case "json":
      return JSON.stringify({ title, content: note.content, updated: note.updated }, null, 2);
    default:
      return `${title}\n${"=".repeat(title.length)}\n\n${htmlToText(note.content)}`;
  }
};

/* ============================================================
   3. POLICES
   ============================================================ */
const loadedFonts = new Set();
const loadFont = (key) => {
  if (loadedFonts.has(key)) return;
  const f = FONTS[key];
  if (!f?.google) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${f.google}&display=swap`;
  document.head.appendChild(link);
  loadedFonts.add(key);
};

/* ============================================================
   4. STOCKAGE
   ============================================================ */
const DEFAULT_DATA = () => ({
  notes: [], folders: [], trash: [], events: [],
  categories: ["perso", "travail", "idées", "agenda"],
  lang: "fr",
  theme: "deepin-dark",
  font: "cinzel",
  accent: "#0082ff",
  noteColor: "#ede4d3",
  reminderSound: "bell",
  reminderVolume: 0.18,
  notificationsEnabled: false,
  lastBackupAt: null
});

const save = (d) => localStorage.setItem(LS_KEY, JSON.stringify(d));

const load = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULT_DATA();
    const d = JSON.parse(raw);
    if (!d || typeof d !== "object") throw new Error("corrupt");
    return { ...DEFAULT_DATA(), ...d };
  } catch (e) {
    console.warn("localStorage corrompu, réinitialisation :", e);
    try {
      const broken = localStorage.getItem(LS_KEY);
      if (broken) localStorage.setItem(LS_KEY + ":corrupt:" + Date.now(), broken);
    } catch {}
    return DEFAULT_DATA();
  }
};

let _idbPromise = null;
const idb = () => {
  if (_idbPromise) return _idbPromise;
  _idbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return _idbPromise;
};
const idbSet = async (key, value) => {
  try {
    const db = await idb();
    return new Promise((res, rej) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).put(value, key);
      tx.oncomplete = () => res(true);
      tx.onerror = () => rej(tx.error);
    });
  } catch { return false; }
};
const idbGet = async (key) => {
  try {
    const db = await idb();
    return new Promise((res, rej) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const r = tx.objectStore(IDB_STORE).get(key);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  } catch { return undefined; }
};

const requestPersistentStorage = async () => {
  if (!navigator.storage?.persist) return { supported: false };
  try {
    const already = await navigator.storage.persisted();
    if (already) return { supported: true, persisted: true };
    const granted = await navigator.storage.persist();
    return { supported: true, persisted: granted };
  } catch { return { supported: false }; }
};
const getStorageEstimate = async () => {
  if (!navigator.storage?.estimate) return null;
  try {
    const { usage = 0, quota = 0 } = await navigator.storage.estimate();
    return { usage, quota, pct: quota ? usage / quota : 0 };
  } catch { return null; }
};

/* ============================================================
   5. CRYPTO (.notesafe)
   ============================================================ */
const cryptoUtil = {
  async deriveKey(password, salt) {
    const enc = new TextEncoder();
    const baseKey = await crypto.subtle.importKey(
      "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: 150_000, hash: "SHA-256" },
      baseKey, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
    );
  },
  async encrypt(password, plainObj) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await this.deriveKey(password, salt);
    const ct = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv }, key,
      new TextEncoder().encode(JSON.stringify(plainObj))
    );
    const buf = new Uint8Array(16 + 12 + ct.byteLength);
    buf.set(salt, 0); buf.set(iv, 16); buf.set(new Uint8Array(ct), 28);
    return buf;
  },
  async decrypt(password, buf) {
    const salt = buf.slice(0, 16), iv = buf.slice(16, 28), ct = buf.slice(28);
    const key = await this.deriveKey(password, salt);
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
    return JSON.parse(new TextDecoder().decode(pt));
  }
};

/* ============================================================
   6. VERROUILLAGE (PIN)
   ============================================================ */
const lockUtil = {
  async hash(pin) {
    const buf = new TextEncoder().encode("ln-lock-v1:" + pin);
    const h = await crypto.subtle.digest("SHA-256", buf);
    return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, "0")).join("");
  },
  get: () => localStorage.getItem(LOCK_KEY),
  set: (h) => localStorage.setItem(LOCK_KEY, h),
  clear: () => localStorage.removeItem(LOCK_KEY)
};

/* ============================================================
   7. RÉCUPÉRATION 12 MOTS
   ============================================================ */
const deriveRecoveryKey = async (words) => {
  const enc = new TextEncoder();
  const salt = enc.encode("larecherches-recovery-v1");
  const baseKey = await crypto.subtle.importKey(
    "raw", enc.encode(words.map(w => w.toLowerCase().trim()).join(" ")),
    { name: "PBKDF2" }, false, ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 150_000, hash: "SHA-256" },
    baseKey, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
  );
};
const recoveryHash = async (words) => {
  const buf = new TextEncoder().encode(
    "ln-recovery-verify:" + words.map(w => w.toLowerCase().trim()).join("|")
  );
  const h = await crypto.subtle.digest("SHA-256", buf);
  return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, "0")).join("");
};
const recoveryEncrypt = async (words, obj) => {
  const key = await deriveRecoveryKey(words);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv }, key,
    new TextEncoder().encode(JSON.stringify(obj))
  );
  const buf = new Uint8Array(12 + ct.byteLength);
  buf.set(iv, 0); buf.set(new Uint8Array(ct), 12);
  return [...buf];
};
const recoveryDecrypt = async (words, arr) => {
  const key = await deriveRecoveryKey(words);
  const buf = new Uint8Array(arr);
  const iv = buf.slice(0, 12), ct = buf.slice(12);
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return JSON.parse(new TextDecoder().decode(pt));
};
const hasRecovery = () => !!localStorage.getItem(RECOVERY_VAULT_KEY);
const saveRecoveryVault = async (words, vault) => {
  const enc = await recoveryEncrypt(words, vault);
  localStorage.setItem(RECOVERY_VAULT_KEY, JSON.stringify(enc));
  localStorage.setItem(RECOVERY_HASH_KEY, await recoveryHash(words));
};
const getRecoveryVault = async (words) => {
  const stored = JSON.parse(localStorage.getItem(RECOVERY_VAULT_KEY) || "null");
  if (!stored) throw new Error("no-vault");
  return recoveryDecrypt(words, stored);
};
const updateRecoveryVault = async (words, patch) => {
  const current = await getRecoveryVault(words);
  const merged = { ...current, ...patch, updatedAt: Date.now() };
  await saveRecoveryVault(words, merged);
  return merged;
};
const validate12Words = (words) => {
  if (words.length !== 12) return { ok: false, reason: "count" };
  const cleaned = words.map(w => w.trim().toLowerCase());
  if (cleaned.some(w => w.length < 3)) return { ok: false, reason: "short" };
  if (new Set(cleaned).size !== 12) return { ok: false, reason: "dupes" };
  return { ok: true, cleaned };
};

/* ============================================================
   8. COMMUNICATION SERVICE WORKER
   ============================================================ */
const supportsTriggers = typeof Notification !== "undefined" && "showTrigger" in Notification.prototype;
const supportsPeriodicSync = "serviceWorker" in navigator && "periodicSync" in (ServiceWorkerRegistration.prototype || {});

const getSW = async () => {
  if (!("serviceWorker" in navigator)) return null;
  try { return await navigator.serviceWorker.ready; }
  catch { return null; }
};

const syncRemindersToSW = async (events, t) => {
  const reg = await getSW();
  if (!reg || !reg.active) return false;
  const now = Date.now();
  const reminders = [];
  for (const ev of (events || [])) {
    if (!ev.reminder || ev.notified) continue;
    const dt = new Date(`${ev.date}T${ev.allDay ? "00:00" : (ev.time || "00:00")}:00`);
    const triggerAt = dt.getTime() - ev.reminder * 60_000;
    if (triggerAt + 24 * 3600 * 1000 < now) continue;
    reminders.push({
      id: ev.id, triggerAt,
      title: `⏰ ${ev.title}`,
      body: ev.description || (
        ev.allDay ? (t === I18N.fr ? "Aujourd'hui" : "Today")
        : new Date(dt).toLocaleTimeString(t === I18N.fr ? "fr-FR" : "en-US", { hour: "2-digit", minute: "2-digit" })
      )
    });
  }
  reg.active.postMessage({ type: "LN_SYNC_REMINDERS", reminders });
  if (supportsTriggers) {
    for (const r of reminders) {
      try {
        const delay = Math.max(1000, r.triggerAt - Date.now());
        await reg.showNotification(r.title, {
          body: r.body, icon: "ln-icon-192.png",
          tag: "ln-trigger-" + r.id,
          showTrigger: new TimestampTrigger(Date.now() + delay)
        });
      } catch {}
    }
  }
  if (supportsPeriodicSync) {
    try { await reg.periodicSync.register("ln-reminders", { minInterval: 15 * 60 * 1000 }); } catch {}
  }
  return reminders.length;
};

const checkRemindersNow = async () => {
  const reg = await getSW();
  reg?.active?.postMessage({ type: "LN_CHECK_NOW" });
};

const pushBackupToSW = async (data) => {
  try {
    const reg = await getSW();
    reg?.active?.postMessage({
      type: "LN_STORE_BACKUP",
      snapshot: { ...data, _snapshotAt: Date.now() }
    });
  } catch {}
};

const pullBackupFromSW = async () => {
  try {
    const reg = await getSW();
    return new Promise((resolve) => {
      const channel = new MessageChannel();
      const to = setTimeout(() => resolve(null), 2000);
      channel.port1.onmessage = (e) => {
        clearTimeout(to);
        if (e.data?.type === "LN_BACKUP_SNAPSHOT") resolve(e.data.snapshot || null);
        else resolve(null);
      };
      reg.active.postMessage({ type: "LN_REQUEST_BACKUP" }, [channel.port2]);
    });
  } catch { return null; }
};

const querySWHealth = async () => {
  try {
    if (!("serviceWorker" in navigator)) return { ok: null, reason: "no-sw" };
    const reg = await navigator.serviceWorker.ready;
    if (!reg.active) return { ok: null, reason: "no-active" };
    return new Promise((resolve) => {
      const channel = new MessageChannel();
      const to = setTimeout(() => resolve({ ok: null, reason: "timeout" }), 1500);
      channel.port1.onmessage = (e) => { clearTimeout(to); resolve(e.data || { ok: null }); };
      reg.active.postMessage({ type: "LN_PING_HEALTH" }, [channel.port2]);
    });
  } catch { return { ok: null, reason: "error" }; }
};

const forceSWRepair = async () => {
  try {
    const reg = await navigator.serviceWorker.ready;
    return new Promise((resolve) => {
      const channel = new MessageChannel();
      const to = setTimeout(() => resolve(false), 4000);
      channel.port1.onmessage = (e) => { clearTimeout(to); resolve(!!e.data?.ok); };
      reg.active.postMessage({ type: "LN_FORCE_REPAIR" }, [channel.port2]);
    });
  } catch { return false; }
};

const wasHealthy = () => localStorage.getItem(HEALTHY_KEY) === "1";
const markHealthy = () => localStorage.setItem(HEALTHY_KEY, "1");

const pushDiagnostic = (entry) => {
  try {
    const arr = JSON.parse(localStorage.getItem(DIAG_KEY) || "[]");
    arr.push({ at: Date.now(), ...entry });
    localStorage.setItem(DIAG_KEY, JSON.stringify(arr.slice(-20)));
  } catch {}
};

/* ============================================================
   9. SON + NOTIFICATIONS
   ============================================================ */
let _audioCtx = null;
const playReminderSound = (pattern = "bell") => {
  try {
    _audioCtx = _audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const ctx = _audioCtx;
    const now = ctx.currentTime;
    const playTone = (freq, start, dur, vol = 0.18) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(vol, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + dur);
    };
    if (pattern === "bell") { playTone(880, 0, 0.9); playTone(1320, 0.05, 0.9, 0.10); }
    else if (pattern === "chime") { playTone(659, 0, 0.6); playTone(880, 0.15, 0.6); playTone(1175, 0.3, 0.8); }
    else { playTone(440, 0, 0.4); }
  } catch (e) { console.warn("Son indisponible:", e); }
};

const requestNotifPermission = async () => {
  if (!("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  try { return await Notification.requestPermission(); }
  catch { return "denied"; }
};

const sendSystemNotification = (title, body) => {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  try { new Notification(title, { body, icon: "ln-icon-192.png" }); } catch {}
};

/* ============================================================
   10. I18N
   ============================================================ */
const I18N = {
  fr: {
    appName: "Larecherches Note",
    notes: "Notes", agenda: "Agenda",
    newNote: "Nouvelle note", newFolder: "Nouveau dossier", newSub: "Sous-dossier",
    title: "Titre", content: "Contenu", delete: "Supprimer",
    rename: "Renommer", cover: "Couverture", pack: "Pack intégré",
    unsplash: "Recherche Unsplash", search: "Rechercher…",
    empty: "Aucune note. Créez-en une !", back: "Retour",
    confirmDel: "Supprimer définitivement ?",
    created: "Créée le", updated: "Modifiée le",
    filterCategory: "Filtrer par catégorie", all: "Toutes",
    searchAll: "Rechercher (notes + corbeille)",
    trash: "Corbeille", emptyTrash: "Vider la corbeille",
    restore: "Restaurer", deletedOn: "Supprimée le",
    settings: "Paramètres", language: "Langue", theme: "Thème",
    light: "Clair", dark: "Sombre",
    export: "Exporter (.notesafe)", import: "Importer (.notesafe)",
    password: "Mot de passe", confirmPassword: "Confirmer",
    exportOk: "Sauvegarde chiffrée créée", exportErr: "Échec export",
    importOk: "Sauvegarde restaurée", importErr: "Mot de passe ou fichier invalide",
    categories: "Catégories", newCategory: "Nouvelle catégorie",
    noResult: "Aucun résultat",
    enterPin: "Entrez votre code PIN", unlock: "Déverrouiller",
    lock: "Verrouillage", setPin: "Définir un code PIN",
    changePin: "Changer le code PIN", removePin: "Retirer le code PIN",
    pinSet: "Verrouillage activé", pinRemoved: "Verrouillage désactivé",
    pinMin: "Minimum 4 chiffres", pinMismatch: "Les codes ne correspondent pas",
    bold: "Gras", italic: "Italique", underline: "Souligné",
    strike: "Barré", insertImage: "Insérer une image",
    link: "Lien", h1: "Titre 1", h2: "Titre 2", quote: "Citation",
    code: "Code", ul: "Liste à puces", ol: "Liste numérotée",
    merge: "Fusionner avec mes notes", replace: "Remplacer toutes mes notes",
    importStrategy: "Que faire des notes existantes ?",
    font: "Police des notes", colorSet: "Jeu de couleurs", accent: "Couleur d'accent",
    noteColor: "Couleur de la police", textColor: "Couleur du texte",
    pickColor: "Choisir une couleur", resetColor: "Réinitialiser",
    importFile: "Importer un fichier", exportNote: "Exporter la note",
    exportAs: "Exporter en", codeView: "Vue code", richView: "Vue riche",
    fileType: "Type de fichier", fileImported: "Fichier importé",
    fileImportErr: "Impossible d'importer ce fichier",
    offlineReady: "Prêt hors-ligne ✓", backupReminder: "Pensez à exporter une sauvegarde .notesafe",
    storageWarning: "Stockage presque plein",
    storage: "Stockage", storagePersistent: "Stockage persistant activé",
    storageNotPersistent: "Stockage non persistant (le navigateur peut purger)",
    storageUnknown: "Statut de stockage inconnu",
    storageUsage: "Utilisation", lastBackup: "Dernière sauvegarde chiffrée", never: "Jamais",
    passwordDisclaimer: "Ce mot de passe ne sera PAS conservé. Sans lui, le fichier .notesafe est définitivement illisible.",
    confirmBackup: "Je comprends et je sauvegarde",
    recovery: "Récupération",
    recoveryTitle: "Créer votre clé de récupération",
    recoveryIntro: "Ces 12 mots sont votre SEUL moyen de réinitialiser votre PIN et vos sauvegardes. Notez-les sur papier. Ne les stockez pas numériquement.",
    recoveryWords: "Vos 12 mots (séparés par espaces ou retours à la ligne)",
    recoveryConfirm: "Confirmez les 12 mots",
    recoverySave: "Enregistrer la clé",
    recoveryCreated: "Clé de récupération créée ✓",
    recoveryRequired: "Vous devez d'abord créer votre clé de récupération.",
    recoveryReset: "Utiliser la récupération",
    recoveryResetTitle: "Récupération par 12 mots",
    recoveryEnter: "Saisissez vos 12 mots",
    recoveryVerify: "Vérifier",
    recoveryBadWords: "Ces mots ne correspondent pas.",
    recoveryRecovered: "Récupération réussie",
    recoveryPin: "PIN actuel", recoveryBackupPwd: "Mot de passe de sauvegarde actuel",
    recoveryApplyPin: "Utiliser ce PIN pour déverrouiller",
    recoveryNoData: "Aucune donnée à récupérer.",
    recoveryStatus: "Clé de récupération",
    recoveryStatusSet: "Configurée ✓", recoveryStatusMissing: "Non configurée ⚠",
    recoveryWarning: "Sans vos 12 mots, un PIN oublié est irrécupérable.",
    errCount: "Il faut exactement 12 mots.",
    errShort: "Chaque mot doit faire au moins 3 caractères.",
    errDupes: "Les mots doivent être tous différents.",
    event: "Événement", newEvent: "Nouvel événement", editEvent: "Modifier l'événement",
    eventTitle: "Titre de l'événement", eventDate: "Date", eventTime: "Heure",
    eventDesc: "Description", reminder: "Rappel", noReminder: "Aucun",
    reminder5: "5 minutes avant", reminder15: "15 minutes avant",
    reminder30: "30 minutes avant", reminder60: "1 heure avant", reminder1440: "1 jour avant",
    today: "Aujourd'hui", noEvents: "Aucun événement", noEventsToday: "Aucun événement ce jour",
    eventsCount: "événement(s)", sound: "Son de notification",
    soundBell: "Cloche", soundChime: "Carillon", soundBeep: "Bip",
    testSound: "Tester le son", enableNotifications: "Activer les notifications système",
    notificationsOn: "Notifications système activées ✓",
    notificationsOff: "Notifications système désactivées",
    deleteEvent: "Supprimer l'événement", allDay: "Toute la journée",
    offlineReminders: "Rappels hors-ligne",
    offlineStatus: "État",
    offlineStatusFull: "Rappels actifs app fermée ✓",
    offlineStatusPartial: "Rappels actifs app ouverte uniquement",
    offlineStatusNone: "Rappels non supportés par ce navigateur",
    offlineTriggers: "Notification Triggers", offlinePeriodic: "Periodic Background Sync",
    missedReminders: "Rappels manqués",
    missedIntro: "Ces rappels étaient dus pendant que l'application était fermée :",
    markNotified: "Marquer comme lu", dismissAll: "Tout effacer",
    resetTitle: "Application réinitialisée",
    resetDetected: "Larecherches Note a détecté que des données locales ont été effacées.",
    resetDetail: "Cela peut arriver après un nettoyage du navigateur, une mise à jour, ou un passage en navigation privée.",
    resetRestored: "Vos notes ont été restaurées automatiquement depuis la sauvegarde interne.",
    resetPartial: "Certaines données récentes ont pu être perdues (dernières minutes).",
    resetNothing: "Aucune donnée de secours n'a été trouvée. Le carnet est vide.",
    resetReconnect: "Reconnecter une sauvegarde",
    resetReimport: "Importer un fichier .notesafe",
    resetIgnore: "Continuer sans restaurer",
    resetRepair: "Réparer le cache hors-ligne",
    resetRepairOk: "Cache hors-ligne réparé ✓",
    resetRepairFail: "Échec de la réparation, vérifiez votre connexion.",
    resetNeverExport: "Pensez à exporter régulièrement une sauvegarde .notesafe.",
    swHealthy: "Cache hors-ligne opérationnel", swRepairing: "Réparation du cache en cours…",
    swBroken: "Cache hors-ligne endommagé",
    about: "À-propos", aboutApp: "Larecherches Note",
    aboutVersion: "Version", aboutBuild: "Build", aboutDate: "Octobre 2026",
    aboutBy: "Par", aboutAuthor: "KENFACK.L.N",
    aboutTagline: "Carnet de notes hors-ligne, chiffré, sans expiration.",
    aboutCopy: "Copier les informations", aboutCopied: "Informations copiées ✓",
    menu: "Menu", next: "Suivant", ok: "OK"
  },
  en: {
    appName: "Larecherches Note",
    notes: "Notes", agenda: "Calendar",
    newNote: "New note", newFolder: "New folder", newSub: "Subfolder",
    title: "Title", content: "Content", delete: "Delete",
    rename: "Rename", cover: "Cover", pack: "Built-in pack",
    unsplash: "Unsplash search", search: "Search…",
    empty: "No notes yet. Create one!", back: "Back",
    confirmDel: "Delete permanently?",
    created: "Created", updated: "Updated",
    filterCategory: "Filter by category", all: "All",
    searchAll: "Search (notes + trash)",
    trash: "Trash", emptyTrash: "Empty trash",
    restore: "Restore", deletedOn: "Deleted",
    settings: "Settings", language: "Language", theme: "Theme",
    light: "Light", dark: "Dark",
    export: "Export (.notesafe)", import: "Import (.notesafe)",
    password: "Password", confirmPassword: "Confirm",
    exportOk: "Encrypted backup created", exportErr: "Export failed",
    importOk: "Backup restored", importErr: "Invalid password or file",
    categories: "Categories", newCategory: "New category",
    noResult: "No result",
    enterPin: "Enter your PIN", unlock: "Unlock",
    lock: "Lock", setPin: "Set a PIN", changePin: "Change PIN", removePin: "Remove PIN",
    pinSet: "Lock enabled", pinRemoved: "Lock disabled",
    pinMin: "Minimum 4 digits", pinMismatch: "PINs do not match",
    bold: "Bold", italic: "Italic", underline: "Underline",
    strike: "Strikethrough", insertImage: "Insert image",
    link: "Link", h1: "Heading 1", h2: "Heading 2", quote: "Quote",
    code: "Code", ul: "Bullet list", ol: "Numbered list",
    merge: "Merge with my notes", replace: "Replace all my notes",
    importStrategy: "What about existing notes?",
    font: "Note font", colorSet: "Color set", accent: "Accent color",
    noteColor: "Font color", textColor: "Text color",
    pickColor: "Pick a color", resetColor: "Reset",
    importFile: "Import a file", exportNote: "Export note",
    exportAs: "Export as", codeView: "Code view", richView: "Rich view",
    fileType: "File type", fileImported: "File imported",
    fileImportErr: "Could not import this file",
    offlineReady: "Offline ready ✓", backupReminder: "Consider exporting a .notesafe backup",
    storageWarning: "Storage almost full",
    storage: "Storage", storagePersistent: "Persistent storage enabled",
    storageNotPersistent: "Non-persistent storage (browser may purge)",
    storageUnknown: "Storage status unknown",
    storageUsage: "Usage", lastBackup: "Last encrypted backup", never: "Never",
    passwordDisclaimer: "This password is NOT stored. Without it, the .notesafe file is permanently unreadable.",
    confirmBackup: "I understand, save it",
    recovery: "Recovery",
    recoveryTitle: "Create your recovery key",
    recoveryIntro: "These 12 words are your ONLY way to reset your PIN and backups. Write them on paper. Do not store them digitally.",
    recoveryWords: "Your 12 words (space or newline separated)",
    recoveryConfirm: "Confirm the 12 words",
    recoverySave: "Save recovery key",
    recoveryCreated: "Recovery key created ✓",
    recoveryRequired: "You must first create your recovery key.",
    recoveryReset: "Use recovery",
    recoveryResetTitle: "12-word recovery",
    recoveryEnter: "Enter your 12 words",
    recoveryVerify: "Verify",
    recoveryBadWords: "These words do not match.",
    recoveryRecovered: "Recovery successful",
    recoveryPin: "Current PIN", recoveryBackupPwd: "Current backup password",
    recoveryApplyPin: "Use this PIN to unlock",
    recoveryNoData: "No data to recover.",
    recoveryStatus: "Recovery key",
    recoveryStatusSet: "Configured ✓", recoveryStatusMissing: "Not configured ⚠",
    recoveryWarning: "Without your 12 words, a forgotten PIN is unrecoverable.",
    errCount: "Exactly 12 words required.",
    errShort: "Each word must be at least 3 characters.",
    errDupes: "All words must be different.",
    event: "Event", newEvent: "New event", editEvent: "Edit event",
    eventTitle: "Event title", eventDate: "Date", eventTime: "Time",
    eventDesc: "Description", reminder: "Reminder", noReminder: "None",
    reminder5: "5 minutes before", reminder15: "15 minutes before",
    reminder30: "30 minutes before", reminder60: "1 hour before", reminder1440: "1 day before",
    today: "Today", noEvents: "No events", noEventsToday: "No events this day",
    eventsCount: "event(s)", sound: "Notification sound",
    soundBell: "Bell", soundChime: "Chime", soundBeep: "Beep",
    testSound: "Test sound", enableNotifications: "Enable system notifications",
    notificationsOn: "System notifications enabled ✓",
    notificationsOff: "System notifications disabled",
    deleteEvent: "Delete event", allDay: "All day",
    offlineReminders: "Offline reminders",
    offlineStatus: "Status",
    offlineStatusFull: "Reminders active with app closed ✓",
    offlineStatusPartial: "Reminders only while app is open",
    offlineStatusNone: "Reminders not supported by this browser",
    offlineTriggers: "Notification Triggers", offlinePeriodic: "Periodic Background Sync",
    missedReminders: "Missed reminders",
    missedIntro: "These reminders were due while the app was closed:",
    markNotified: "Mark as read", dismissAll: "Dismiss all",
    resetTitle: "Application reset",
    resetDetected: "Larecherches Note detected that local data was cleared.",
    resetDetail: "This can happen after a browser cleanup, an update, or switching to private mode.",
    resetRestored: "Your notes were restored automatically from the internal backup.",
    resetPartial: "Some recent data may have been lost (last few minutes).",
    resetNothing: "No backup data found. Your notebook is empty.",
    resetReconnect: "Reconnect a backup",
    resetReimport: "Import a .notesafe file",
    resetIgnore: "Continue without restoring",
    resetRepair: "Repair offline cache",
    resetRepairOk: "Offline cache repaired ✓",
    resetRepairFail: "Repair failed, check your connection.",
    resetNeverExport: "Remember to export a .notesafe backup regularly.",
    swHealthy: "Offline cache operational", swRepairing: "Repairing cache…",
    swBroken: "Offline cache damaged",
    about: "About", aboutApp: "Larecherches Note",
    aboutVersion: "Version", aboutBuild: "Build", aboutDate: "October 2026",
    aboutBy: "By", aboutAuthor: "KENFACK.L.N",
    aboutTagline: "Offline notebook, encrypted, no expiration.",
    aboutCopy: "Copy info", aboutCopied: "Info copied ✓",
    menu: "Menu", next: "Next", ok: "OK"
  }
};

/* ============================================================
   11. HOOKS
   ============================================================ */
function useMedia(query) {
  const [match, setMatch] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const m = window.matchMedia(query);
    const handler = (e) => setMatch(e.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, [query]);
  return match;
}

/* ============================================================
   12. COMPOSANTS
   ============================================================ */

/* ---------- Écran de verrouillage ---------- */
function LockScreen({ onUnlock, t }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const tryUnlock = async () => {
    if (!pin) return;
    setBusy(true);
    const h = await lockUtil.hash(pin);
    if (h === lockUtil.get()) onUnlock();
    else { setError(true); setPin(""); setTimeout(() => setError(false), 1500); }
    setBusy(false);
  };

  return (
    <div className="lock-screen">
      <div className="lock-box">
        <img src="ln-icon.png" alt="" className="lock-logo" />
        <h2>{t.appName}</h2>
        <p className="lock-hint">{t.enterPin}</p>
        <input
          type="password" inputMode="numeric" autoFocus value={pin}
          onChange={e => setPin(e.target.value)}
          onKeyDown={e => e.key === "Enter" && tryUnlock()}
          className={"lock-input" + (error ? " shake" : "")}
          placeholder="••••"
        />
        <button className="lock-btn" onClick={tryUnlock} disabled={!pin || busy}>
          {busy ? "⏳…" : t.unlock}
        </button>
      </div>
    </div>
  );
}

/* ---------- Modale mot de passe ---------- */
function PasswordModal({ mode, onCancel, onSubmit, t }) {
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [strategy, setStrategy] = useState("merge");

  const score = useMemo(() => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (pwd.length >= 12) s++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return Math.min(s, 4);
  }, [pwd]);

  const lang = t === I18N.fr ? "fr" : "en";
  const labels = { fr: ["Très faible","Faible","Moyen","Fort","Excellent"], en: ["Very weak","Weak","Fair","Strong","Excellent"] }[lang];
  const colors = ["#c0392b","#e67e22","#f1c40f","#2ecc71","#27ae60"];

  const canSubmit = pwd.length >= 8 && (mode === "import" || pwd === confirm) && !busy;

  const submit = async () => {
    if (!canSubmit) return;
    setBusy(true);
    try { await onSubmit(pwd, strategy); } finally { setBusy(false); }
  };

  return (
    <div className="pw-overlay" onClick={onCancel}>
      <div className="pw-modal" onClick={e => e.stopPropagation()}>
        <h3>{mode === "export" ? t.export : t.import}</h3>

        <label className="pw-field">
          <span>{t.password}</span>
          <div className="pw-input-wrap">
            <input type={show ? "text" : "password"} value={pwd} autoFocus
              onChange={e => setPwd(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submit()} />
            <button type="button" className="pw-eye" onClick={() => setShow(s => !s)}>
              {show ? "🙈" : "👁"}
            </button>
          </div>
        </label>

        {mode === "export" && (
          <>
            <div className="pw-strength">
              <div className="pw-bar">
                {[0,1,2,3].map(i => (
                  <span key={i} className="pw-seg"
                    style={{ background: i < score ? colors[score] : "#ddd" }} />
                ))}
              </div>
              <small style={{ color: colors[score] }}>{labels[score]}</small>
            </div>

            <label className="pw-field">
              <span>{t.confirmPassword}</span>
              <input type={show ? "text" : "password"} value={confirm}
                onChange={e => setConfirm(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submit()} />
            </label>

            {confirm && pwd !== confirm && (
              <p className="pw-hint error">
                {lang === "fr" ? "Les mots de passe ne correspondent pas." : "Passwords do not match."}
              </p>
            )}
            {pwd.length > 0 && pwd.length < 8 && (
              <p className="pw-hint error">
                {lang === "fr" ? "Minimum 8 caractères." : "At least 8 characters."}
              </p>
            )}

            <div className="pw-disclaimer">
              <span>🔐</span>
              <p>{t.passwordDisclaimer}</p>
            </div>
          </>
        )}

        {mode === "import" && (
          <div className="pw-strategy">
            <p className="pw-hint"><strong>{t.importStrategy}</strong></p>
            <label className="pw-radio">
              <input type="radio" name="strat" value="merge" checked={strategy === "merge"}
                onChange={() => setStrategy("merge")} />
              <span>🔀 {t.merge}</span>
            </label>
            <label className="pw-radio">
              <input type="radio" name="strat" value="replace" checked={strategy === "replace"}
                onChange={() => setStrategy("replace")} />
              <span>♻️ {t.replace}</span>
            </label>
          </div>
        )}

        <div className="pw-actions">
          <button onClick={onCancel}>{t.back}</button>
          <button className="primary" disabled={!canSubmit} onClick={submit}>
            {busy ? "⏳…" : (mode === "export" ? t.export : t.import)}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Configuration clé de récupération ---------- */
function RecoverySetup({ onDone, onCancel, t, mandatory }) {
  const [step, setStep] = useState(1);
  const [raw, setRaw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);

  const parse = (str) => str.split(/[\s,;]+/).map(w => w.trim()).filter(Boolean);
  const validate = (str) => {
    const words = parse(str);
    const v = validate12Words(words);
    if (!v.ok) return { count: t.errCount, short: t.errShort, dupes: t.errDupes }[v.reason];
    return null;
  };

  const next = () => {
    const err = validate(raw);
    if (err) { setError(err); return; }
    setError(null); setStep(2);
  };

  const finish = async () => {
    const err = validate(confirm);
    if (err) { setError(err); return; }
    if (parse(raw).map(w => w.toLowerCase()).join(" ") !==
        parse(confirm).map(w => w.toLowerCase()).join(" ")) {
      setError(t.recoveryBadWords); return;
    }
    const words = parse(raw);
    await saveRecoveryVault(words, { createdAt: Date.now(), updatedAt: Date.now() });
    onDone(words);
  };

  return (
    <div className="pw-overlay" onClick={mandatory ? undefined : onCancel}>
      <div className="pw-modal recovery-modal" onClick={e => e.stopPropagation()}>
        <h3>🔑 {t.recoveryTitle}</h3>

        {step === 1 && (
          <>
            <div className="pw-disclaimer">
              <span>⚠️</span>
              <p>{t.recoveryIntro}</p>
            </div>
            <label className="pw-field">
              <span>{t.recoveryWords}</span>
              <textarea className="recovery-textarea" value={raw} autoFocus rows={4}
                onChange={e => { setRaw(e.target.value); setError(null); }}
                placeholder="alpha bravo charlie delta echo foxtrot golf hotel india juliet kilo lima" />
              <small className="muted">{parse(raw).length} / 12</small>
            </label>
            {error && <p className="pw-hint error">{error}</p>}
            <div className="pw-actions">
              {!mandatory && <button onClick={onCancel}>{t.back}</button>}
              <button className="primary" onClick={next}>{t.next}</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="pw-disclaimer">
              <span>📝</span>
              <p>{t.recoveryConfirm}</p>
            </div>
            <label className="pw-field">
              <span>{t.recoveryWords}</span>
              <textarea className="recovery-textarea" value={confirm} autoFocus rows={4}
                onChange={e => { setConfirm(e.target.value); setError(null); }} />
              <small className="muted">{parse(confirm).length} / 12</small>
            </label>
            {error && <p className="pw-hint error">{error}</p>}
            <div className="pw-actions">
              <button onClick={() => setStep(1)}>{t.back}</button>
              <button className="primary" onClick={finish}>{t.recoverySave}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Récupération 12 mots ---------- */
function RecoveryReset({ onClose, onApplyPin, t }) {
  const [raw, setRaw] = useState("");
  const [vault, setVault] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const verify = async () => {
    const words = raw.split(/[\s,;]+/).map(w => w.trim()).filter(Boolean);
    const v = validate12Words(words);
    if (!v.ok) { setError(t.recoveryBadWords); return; }
    setBusy(true); setError(null);
    try { setVault(await getRecoveryVault(words)); }
    catch { setError(t.recoveryBadWords); }
    setBusy(false);
  };

  return (
    <div className="pw-overlay" onClick={onClose}>
      <div className="pw-modal recovery-modal" onClick={e => e.stopPropagation()}>
        <h3>🔓 {t.recoveryResetTitle}</h3>
        {!vault && (
          <>
            <label className="pw-field">
              <span>{t.recoveryEnter}</span>
              <textarea className="recovery-textarea" rows={4} autoFocus value={raw}
                onChange={e => { setRaw(e.target.value); setError(null); }} />
              <small className="muted">{raw.split(/[\s,;]+/).filter(Boolean).length} / 12</small>
            </label>
            {error && <p className="pw-hint error">{error}</p>}
            <div className="pw-actions">
              <button onClick={onClose}>{t.back}</button>
              <button className="primary" onClick={verify} disabled={busy}>
                {busy ? "⏳…" : t.recoveryVerify}
              </button>
            </div>
          </>
        )}
        {vault && (
          <>
            <p className="pw-hint ok">✓ {t.recoveryRecovered}</p>
            <div className="recovery-result">
              <label>
                <strong>{t.recoveryPin}</strong>
                <code>{vault.pin || "—"}</code>
              </label>
              <button className="ghost" onClick={() => vault.pin && onApplyPin(vault.pin)}>
                {t.recoveryApplyPin}
              </button>
              <label>
                <strong>{t.recoveryBackupPwd}</strong>
                <div className="pwd-row">
                  <code>{showPwd ? (vault.backupPwd || "—") : "••••••••"}</code>
                  <button className="ghost" onClick={() => setShowPwd(s => !s)}>
                    {showPwd ? "🙈" : "👁"}
                  </button>
                </div>
              </label>
            </div>
            <div className="pw-actions">
              <button className="primary" onClick={onClose}>{t.ok}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Avertissement de réinitialisation ---------- */
function ResetNotice({ info, onRestore, onImport, onIgnore, onRepair, t }) {
  const [repairState, setRepairState] = useState("idle");
  const repair = async () => {
    setRepairState("loading");
    const ok = await onRepair();
    setRepairState(ok ? "ok" : "fail");
    setTimeout(() => setRepairState("idle"), 2500);
  };

  return (
    <div className="reset-overlay">
      <div className="reset-card">
        <div className="reset-icon">⚠️</div>
        <h2>{t.resetTitle}</h2>
        <p>{t.resetDetected}</p>
        <p className="muted">{t.resetDetail}</p>
        {info.recovered
          ? <div className="reset-badge ok">✓ {t.resetRestored}</div>
          : <div className="reset-badge warn">✕ {t.resetNothing}</div>}
        {info.partialLoss && <p className="muted small">⚠ {t.resetPartial}</p>}
        <div className="reset-actions">
          {info.recovered && <button className="primary" onClick={onIgnore}>{t.ok}</button>}
          {!info.recovered && (
            <>
              <button className="primary" onClick={onImport}>{t.resetReimport}</button>
              <button onClick={onIgnore}>{t.resetIgnore}</button>
            </>
          )}
          <button onClick={repair} disabled={repairState === "loading"}>
            {repairState === "loading" && `⏳ ${t.swRepairing}`}
            {repairState === "ok" && `✓ ${t.resetRepairOk}`}
            {repairState === "fail" && `✕ ${t.resetRepairFail}`}
            {repairState === "idle" && `🔧 ${t.resetRepair}`}
          </button>
        </div>
        <p className="reset-footer muted small">{t.resetNeverExport}</p>
      </div>
    </div>
  );
}

/* ---------- Carte de dossier ---------- */
function FolderCard({ folder, onOpen, onRename, onDelete, onCover, t, small }) {
  const [picker, setPicker] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef();

  const searchUnsplash = (q) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const term = q.trim();
      if (!term) return setResults([]);
      setError(null);
      setLoading(true);
      try {
        const url = `${UNSPLASH_URL}?query=${encodeURIComponent(term)}&per_page=9&orientation=landscape&client_id=${UNSPLASH_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setResults((json.results || []).map(p => ({
          id: p.id, thumb: p.urls.small, full: p.urls.regular,
          author: p.user.name, authorLink: p.user.links.html,
          downloadLocation: p.links.download_location
        })));
      } catch (e) {
        setError(e.message === "HTTP 403" ? "Clé Unsplash invalide ou quota atteint" : e.message);
      } finally { setLoading(false); }
    }, 500);
  };

  const pickImage = async (img) => {
    try { await fetch(`${img.downloadLocation}&client_id=${UNSPLASH_KEY}`); } catch {}
    onCover(img.full);
    setPicker(false);
  };

  return (
    <div className={"folder " + (small ? "small" : "")}
      style={{ backgroundImage: folder.cover ? `url(${folder.cover})` : "none" }}>
      <div className="folder-inner" onClick={onOpen}>
        <span className="folder-name">{folder.name}</span>
        <span className="folder-badge">{small ? "↳" : "📁"}</span>
      </div>
      <div className="folder-actions" onClick={e => e.stopPropagation()}>
        <button onClick={onRename} title={t.rename}>✎</button>
        <button onClick={() => setPicker(p => !p)} title={t.cover}>🖼</button>
        <button onClick={onDelete} title={t.delete}>🗑</button>
      </div>
      {picker && (
        <div className="cover-picker" onClick={e => e.stopPropagation()}>
          <strong>{t.pack}</strong>
          <div className="thumbs">
            {BUILTIN_COVERS.map((u, i) => (
              <img key={i} src={u} alt="" onClick={() => { onCover(u); setPicker(false); }} />
            ))}
          </div>
          <strong>{t.unsplash}</strong>
          <div className="row">
            <input value={query} placeholder={t.search}
              onChange={e => { setQuery(e.target.value); searchUnsplash(e.target.value); }} />
            <button onClick={() => searchUnsplash(query)}>🔍</button>
          </div>
          {loading && <p className="hint">⏳…</p>}
          {error && <p className="hint error">{error}</p>}
          <div className="thumbs unsplash">
            {results.map(img => (
              <figure key={img.id} className="thumb-fig">
                <img src={img.thumb} alt="" onClick={() => pickImage(img)} />
                <figcaption>
                  <a href={img.authorLink} target="_blank" rel="noreferrer">📷 {img.author}</a>
                </figcaption>
              </figure>
            ))}
          </div>
          {results.length > 0 && (
            <p className="hint unsplash-credit">
              Photos via <a href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash</a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Éditeur de note ---------- */
function NoteEditor({ note, onChange, onClose, onDelete, t }) {
  const editorRef = useRef();
  const [mode, setMode] = useState("rich");
  const [codeValue, setCodeValue] = useState("");
  const [currentColor, setCurrentColor] = useState("#ede4d3");

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = note.content || "";
    setCodeValue(note.content || "");
    setMode("rich");
  }, [note.id]);

  const toggleMode = () => {
    if (mode === "rich") {
      setCodeValue(editorRef.current?.innerHTML || "");
      setMode("code");
    } else {
      onChange({ content: codeValue });
      setMode("rich");
      requestAnimationFrame(() => {
        if (editorRef.current) editorRef.current.innerHTML = codeValue;
      });
    }
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    onChange({ content: editorRef.current.innerHTML });
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      let node = sel.getRangeAt(0).startContainer;
      while (node && node !== editorRef.current) {
        if (node.nodeType === 1 && node.style?.color) {
          setCurrentColor(node.style.color); break;
        }
        node = node.parentNode;
      }
    }
  };

  const exec = (cmd, val = null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    handleInput();
  };

  const insertImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      editorRef.current?.focus();
      document.execCommand("insertImage", false, e.target.result);
      handleInput();
    };
    reader.readAsDataURL(file);
  };

  const addLink = () => {
    const url = prompt("URL :");
    if (url) exec("createLink", url);
  };

  const applyColor = (color) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      document.execCommand("insertHTML", false, `<span style="color:${color}">\u200b</span>`);
    } else {
      const range = sel.getRangeAt(0);
      const span = document.createElement("span");
      span.style.color = color;
      try { range.surroundContents(span); }
      catch { document.execCommand("foreColor", false, color); }
    }
    handleInput();
  };

  const exportNote = (ext) => {
    const ft = FILE_TYPES[ext] || FILE_TYPES.txt;
    const content = serializeNote(
      { ...note, content: mode === "code" ? codeValue : note.content }, ext
    );
    const safeTitle = (note.title || "note").replace(/[^\w\-]+/g, "_").slice(0, 40);
    const blob = new Blob([content], { type: ft.mime + ";charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${safeTitle}${ft.ext}`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const canRich = !isCodeType(note.fileType) || ["html","htm","svg","xml"].includes(note.fileType);

  return (
    <div className="editor">
      <header className="editor-header">
        <button className="editor-back" onClick={onClose}>← {t.back}</button>
        <div className="editor-actions">
          {canRich && (
            <button onClick={toggleMode} title={mode === "rich" ? t.codeView : t.richView}>
              {mode === "rich" ? "{}" : "Aa"}
            </button>
          )}
          <div className="export-menu">
            <button title={t.exportNote}>⬇</button>
            <div className="export-dropdown">
              {["txt","md","html","json"].map(ext => (
                <button key={ext} onClick={() => exportNote(ext)}>{t.exportAs} .{ext}</button>
              ))}
            </div>
          </div>
          <button onClick={onDelete} title={t.delete}>🗑</button>
        </div>
      </header>

      <input className="title-input" value={note.title} placeholder={t.title}
        onChange={e => onChange({ title: e.target.value })} />

      {mode === "rich" && (
        <>
          <div className="rt-toolbar" onMouseDown={e => e.preventDefault()}>
            <button onClick={() => exec("bold")} title={t.bold}><b>B</b></button>
            <button onClick={() => exec("italic")} title={t.italic}><i>I</i></button>
            <button onClick={() => exec("underline")} title={t.underline}><u>U</u></button>
            <button onClick={() => exec("strikeThrough")} title={t.strike}><s>S</s></button>
            <span className="rt-sep" />
            <button onClick={() => exec("formatBlock", "<h1>")} title={t.h1}>H1</button>
            <button onClick={() => exec("formatBlock", "<h2>")} title={t.h2}>H2</button>
            <button onClick={() => exec("formatBlock", "<blockquote>")} title={t.quote}>“”</button>
            <button onClick={() => exec("formatBlock", "<pre>")} title={t.code}>{"</>"}</button>
            <span className="rt-sep" />
            <button onClick={() => exec("insertUnorderedList")} title={t.ul}>• —</button>
            <button onClick={() => exec("insertOrderedList")} title={t.ol}>1.</button>
            <span className="rt-sep" />
            <button onClick={() => exec("justifyLeft")}>⬅</button>
            <button onClick={() => exec("justifyCenter")}>↔</button>
            <button onClick={() => exec("justifyRight")}>➡</button>
            <span className="rt-sep" />
            <div className="rt-color-wrap">
              <button className="rt-color-btn" title={t.textColor}>
                <span className="rt-color-dot" style={{ background: currentColor }} />A
              </button>
              <div className="rt-color-palette">
                {TEXT_COLORS.map(c => (
                  <button key={c.id} className="rt-color-cell" style={{ background: c.value }}
                    title={c.label} onMouseDown={e => { e.preventDefault(); applyColor(c.value); }} />
                ))}
                <label className="rt-color-cell custom" title={t.pickColor}>
                  🎨<input type="color" hidden onChange={e => applyColor(e.target.value)} />
                </label>
              </div>
            </div>
            <button onClick={addLink} title={t.link}>🔗</button>
            <label className="rt-img" title={t.insertImage}>
              🖼<input type="file" accept="image/*" hidden
                onChange={e => e.target.files[0] && insertImage(e.target.files[0])} />
            </label>
            <span className="rt-sep" />
            <button onClick={() => exec("undo")}>↺</button>
            <button onClick={() => exec("redo")}>↻</button>
            <button onClick={() => exec("removeFormat")}>⌫</button>
          </div>
          <div ref={editorRef} className="content-input rich" contentEditable
            suppressContentEditableWarning onInput={handleInput} data-placeholder={t.content} />
        </>
      )}

      {mode === "code" && (
        <textarea className="content-input code" value={codeValue} spellCheck={false}
          onChange={e => { setCodeValue(e.target.value); onChange({ content: e.target.value }); }} />
      )}
    </div>
  );
}

/* ---------- Modale événement ---------- */
function EventModal({ initial, onSave, onDelete, onClose, t }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [date, setDate] = useState(initial?.date || todayISO());
  const [time, setTime] = useState(initial?.time || "09:00");
  const [allDay, setAllDay] = useState(initial?.allDay || false);
  const [desc, setDesc] = useState(initial?.description || "");
  const [reminder, setReminder] = useState(initial?.reminder ?? 15);

  const save = () => {
    if (!title.trim()) return;
    onSave({
      id: initial?.id || uid(),
      title: title.trim(),
      date, time: allDay ? null : time, allDay,
      description: desc,
      reminder: reminder === 0 ? null : Number(reminder),
      notified: false,
      updatedAt: Date.now()
    });
  };

  return (
    <div className="pw-overlay" onClick={onClose}>
      <div className="pw-modal event-modal" onClick={e => e.stopPropagation()}>
        <h3>📅 {initial?.id ? t.editEvent : t.newEvent}</h3>
        <label className="pw-field">
          <span>{t.eventTitle}</span>
          <input autoFocus value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <div className="ev-row">
          <label className="pw-field">
            <span>{t.eventDate}</span>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </label>
          <label className="pw-field">
            <span>{t.eventTime}</span>
            <input type="time" value={time} disabled={allDay} onChange={e => setTime(e.target.value)} />
          </label>
        </div>
        <label className="ev-check">
          <input type="checkbox" checked={allDay} onChange={e => setAllDay(e.target.checked)} />
          <span>{t.allDay}</span>
        </label>
        <label className="pw-field">
          <span>{t.reminder}</span>
          <select value={reminder} onChange={e => setReminder(e.target.value)}>
            <option value={0}>{t.noReminder}</option>
            <option value={5}>{t.reminder5}</option>
            <option value={15}>{t.reminder15}</option>
            <option value={30}>{t.reminder30}</option>
            <option value={60}>{t.reminder60}</option>
            <option value={1440}>{t.reminder1440}</option>
          </select>
        </label>
        <label className="pw-field">
          <span>{t.eventDesc}</span>
          <textarea className="recovery-textarea" rows={3} value={desc}
            onChange={e => setDesc(e.target.value)} />
        </label>
        <div className="pw-actions">
          {initial?.id && (
            <button className="danger" onClick={() => onDelete(initial.id)}>{t.delete}</button>
          )}
          <button onClick={onClose}>{t.back}</button>
          <button className="primary" onClick={save} disabled={!title.trim()}>{t.ok}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Agenda ---------- */
function Agenda({ data, setData, t }) {
  const [cursor, setCursor] = useState(new Date());
  const [selectedISO, setSelectedISO] = useState(todayISO());
  const [editing, setEditing] = useState(null);
  const lang = data.lang === "en" ? "en" : "fr";
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const cells = buildMonthGrid(year, month);

  const eventsByDate = useMemo(() => {
    const map = {};
    (data.events || []).forEach(ev => { (map[ev.date] = map[ev.date] || []).push(ev); });
    Object.values(map).forEach(list => list.sort((a, b) =>
      (a.allDay ? "" : a.time || "").localeCompare(b.allDay ? "" : b.time || "")
    ));
    return map;
  }, [data.events]);

  const dayEvents = eventsByDate[selectedISO] || [];

  const saveEvent = (ev) => {
    setData(d => {
      const exists = (d.events || []).some(x => x.id === ev.id);
      return { ...d, events: exists ? d.events.map(x => x.id === ev.id ? ev : x) : [...(d.events || []), ev] };
    });
    setEditing(null);
  };

  const deleteEvent = (id) => {
    if (!confirm(t.confirmDel)) return;
    setData(d => ({ ...d, events: (d.events || []).filter(x => x.id !== id) }));
    setEditing(null);
  };

  return (
    <main className="board agenda-board">
      <div className="cal-header">
        <button onClick={() => setCursor(new Date(year, month - 1, 1))}>◀</button>
        <h2>{MONTHS[lang][month]} {year}</h2>
        <button onClick={() => setCursor(new Date(year, month + 1, 1))}>▶</button>
        <button className="today-btn"
          onClick={() => { const n = new Date(); setCursor(n); setSelectedISO(todayISO()); }}>
          {t.today}
        </button>
      </div>
      <div className="cal-weekdays">
        {WEEKDAYS[lang].map(d => <span key={d}>{d}</span>)}
      </div>
      <div className="cal-grid">
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="cal-cell empty-cell" />;
          const iso = isoDate(d);
          const isToday = iso === todayISO();
          const isSelected = iso === selectedISO;
          const count = (eventsByDate[iso] || []).length;
          return (
            <button key={i}
              className={"cal-cell" + (isToday ? " today" : "") + (isSelected ? " selected" : "") + (count ? " has-events" : "")}
              onClick={() => setSelectedISO(iso)}>
              <span className="day-num">{d.getDate()}</span>
              {count > 0 && <span className="ev-dot">{count}</span>}
            </button>
          );
        })}
      </div>
      <div className="day-panel">
        <div className="day-panel-header">
          <h3>
            {new Date(selectedISO + "T00:00").toLocaleDateString(
              lang === "fr" ? "fr-FR" : "en-US",
              { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </h3>
          <button className="primary" onClick={() => setEditing("new")}>+ {t.newEvent}</button>
        </div>
        {dayEvents.length === 0 && <p className="empty">{t.noEventsToday}</p>}
        {dayEvents.map(ev => (
          <article key={ev.id} className="event-row" onClick={() => setEditing(ev)}>
            <div className="ev-time">{ev.allDay ? "🌞" : (ev.time || "--:--")}</div>
            <div className="ev-body">
              <strong>{ev.title}</strong>
              {ev.description && <p>{ev.description}</p>}
              {ev.reminder && <small>🔔 {ev.reminder} min</small>}
            </div>
          </article>
        ))}
      </div>
      {editing && (
        <EventModal t={t}
          initial={editing === "new" ? { date: selectedISO } : editing}
          onSave={saveEvent} onDelete={deleteEvent}
          onClose={() => setEditing(null)} />
      )}
    </main>
  );
}

/* ---------- À-propos ---------- */
function AboutSection({ t }) {
  const [copied, setCopied] = useState(false);
  const lang = t === I18N.fr ? "fr" : "en";
  const copyInfo = async () => {
    const text = `${APP_META.name} — v${APP_META.version} (Build ${APP_META.build}) — ${APP_META.date[lang]} — ${t.aboutBy} ${APP_META.author}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="about-block">
      <div className="about-logo-wrap">
        <img src="ln-icon.png" alt="LN" className="about-logo" />
      </div>
      <h4 className="about-name">{APP_META.name}</h4>
      <p className="about-tagline">{t.aboutTagline}</p>
      <div className="about-meta">
        <div className="about-row">
          <span className="about-label">{t.aboutVersion}</span>
          <span className="about-value">{APP_META.version}</span>
        </div>
        <div className="about-row">
          <span className="about-label">{t.aboutBuild}</span>
          <span className="about-value">{APP_META.build}</span>
        </div>
        <div className="about-row">
          <span className="about-label">{t.aboutDate}</span>
          <span className="about-value">{APP_META.date[lang]}</span>
        </div>
      </div>
      <p className="about-by">
        <span className="about-label">{t.aboutBy}</span>{" "}
        <strong className="about-author">{APP_META.author}</strong>
      </p>
      <button className="about-copy" onClick={copyInfo}>
        {copied ? `✓ ${t.aboutCopied}` : `📋 ${t.aboutCopy}`}
      </button>
    </div>
  );
}

/* ============================================================
   13. APP
   ============================================================ */
function App() {
  const [data, setData] = useState(load);
  const [view, setView] = useState({ type: "notes", folderId: null });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pwModal, setPwModal] = useState(null);
  const [locked, setLocked] = useState(() => !!lockUtil.get());
  const [storageStatus, setStorageStatus] = useState({ persisted: null, estimate: null });
  const [offline, setOffline] = useState(!navigator.onLine);
  const [recoveryWords, setRecoveryWords] = useState(null);
  const [recoverySetupOpen, setRecoverySetupOpen] = useState(false);
  const [recoveryResetOpen, setRecoveryResetOpen] = useState(false);
  const [missedReminders, setMissedReminders] = useState([]);
  const [swStatus, setSwStatus] = useState({ triggers: false, periodic: false });
  const [resetInfo, setResetInfo] = useState(null);
  const [swHealth, setSwHealth] = useState({ ok: null });
  const [, forceUpdate] = useState(0);
  const refresh = () => forceUpdate(n => n + 1);
  const pendingAfterRecovery = useRef(null);
  const isMobile = useMedia("(max-width: 640px)");
  const t = I18N[data.lang] || I18N.fr;

  /* ---------- Sauvegarde ---------- */
  useEffect(() => {
    try { save(data); } catch {}
    if (data.notes?.length || data.folders?.length || data.trash?.length || data.events?.length) {
      idbSet("latest", { ...data, _backupAt: Date.now() });
      pushBackupToSW(data);
      markHealthy();
    }
  }, [data]);

  /* ---------- Thème + accent ---------- */
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = data.theme || "deepin-dark";
    const isLight = data.theme === "deepin-light" || data.theme === "light";
    if (isLight && data.accent) root.style.setProperty("--accent", data.accent);
    else root.style.removeProperty("--accent");
  }, [data.theme, data.accent]);

  /* ---------- Police + couleur des notes ---------- */
  useEffect(() => {
    const root = document.documentElement;
    const key = data.font || "cinzel";
    root.dataset.font = key;
    loadFont(key);
    root.style.setProperty("--note-ink", data.noteColor || "#ede4d3");
  }, [data.font, data.noteColor]);

  /* ---------- Online / offline ---------- */
  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  /* ---------- Verrouillage auto ---------- */
  useEffect(() => {
    const lockNow = () => { if (lockUtil.get()) setLocked(true); };
    const onVis = () => { if (document.hidden) lockNow(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", lockNow);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", lockNow);
    };
  }, []);

  /* ---------- Init : persistance + détection reset + santé SW ---------- */
  useEffect(() => {
    (async () => {
      const p = await requestPersistentStorage();
      const est = await getStorageEstimate();
      setStorageStatus({ persisted: p.persisted, estimate: est });

      const sw = await querySWHealth();
      setSwHealth(sw);
      setSwStatus({ triggers: supportsTriggers, periodic: supportsPeriodicSync });

      const hadData = wasHealthy();
      const hasLocalData = !!localStorage.getItem(LS_KEY);
      const diag = (() => { try { return JSON.parse(localStorage.getItem(DIAG_KEY) || "[]"); } catch { return []; } })();
      const lastDiag = diag[diag.length - 1];

      if (hadData && !hasLocalData) {
        pushDiagnostic({ kind: "reset-detected" });
        let recovered = false, snapshot = null, source = null;
        const idbSnap = await idbGet("latest");
        if (idbSnap && (idbSnap.notes?.length || idbSnap.folders?.length || idbSnap.events?.length)) {
          snapshot = idbSnap; source = "idb";
        } else {
          const swSnap = await pullBackupFromSW();
          if (swSnap && (swSnap.notes?.length || swSnap.folders?.length || swSnap.events?.length)) {
            snapshot = swSnap; source = "sw";
          }
        }
        if (snapshot) {
          const { _backupAt, _snapshotAt, ...restore } = snapshot;
          setData(d => ({ ...d, ...restore }));
          recovered = true;
          pushDiagnostic({ kind: "auto-restored", source });
        }
        setResetInfo({
          recovered,
          partialLoss: recovered && lastDiag && Date.now() - lastDiag.at > 60_000,
          detectedAt: Date.now()
        });
        markHealthy();
        return;
      }

      if (!hasRecovery()) setRecoverySetupOpen(true);
      if (hasLocalData) markHealthy();

      // Catch-up rappels manqués
      const now = Date.now();
      const missed = (data.events || []).filter(ev => {
        if (!ev.reminder || ev.notified) return false;
        const dt = new Date(`${ev.date}T${ev.allDay ? "00:00" : (ev.time || "00:00")}:00`);
        const triggerAt = dt.getTime() - ev.reminder * 60_000;
        return triggerAt <= now && now - triggerAt < 7 * 24 * 3600 * 1000;
      });
      if (missed.length) setMissedReminders(missed);
    })();
  }, []);

  /* ---------- Vérif rappels agenda (30 s) ---------- */
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      let updated = false;
      const newEvents = (data.events || []).map(ev => {
        if (!ev.reminder || ev.notified) return ev;
        const dt = new Date(`${ev.date}T${ev.allDay ? "00:00" : (ev.time || "00:00")}:00`);
        const triggerAt = dt.getTime() - ev.reminder * 60_000;
        if (now >= triggerAt && now - triggerAt < 60 * 60_000) {
          playReminderSound(data.reminderSound || "bell");
          sendSystemNotification(
            `⏰ ${ev.title}`,
            ev.allDay ? (data.lang === "en" ? "Today" : "Aujourd'hui")
              : new Date(dt).toLocaleTimeString(data.lang === "en" ? "en-US" : "fr-FR", { hour: "2-digit", minute: "2-digit" })
          );
          updated = true;
          return { ...ev, notified: true };
        }
        return ev;
      });
      if (updated) setData(d => ({ ...d, events: newEvents }));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [data.events, data.reminderSound, data.lang]);

  /* ---------- Sync rappels SW + re-sync on hide ---------- */
  useEffect(() => {
    if ((data.events || []).length > 0) syncRemindersToSW(data.events, t);
  }, [data.events, data.lang]);

  useEffect(() => {
    const onHide = () => { if ((data.events || []).length > 0) syncRemindersToSW(data.events, t); };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
    };
  }, [data.events, data.lang]);

  /* ---------- Messages SW ---------- */
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const onMsg = (e) => {
      const msg = e.data || {};
      if (msg.type === "LN_REMINDERS_FIRED" && msg.ids?.length) {
        setData(d => ({
          ...d,
          events: (d.events || []).map(ev => msg.ids.includes(ev.id) ? { ...ev, notified: true } : ev)
        }));
      }
      if (msg.type === "LN_OPEN_EVENT") setView({ type: "agenda" });
    };
    navigator.serviceWorker.addEventListener("message", onMsg);
    return () => navigator.serviceWorker.removeEventListener("message", onMsg);
  }, []);

  /* ---------- SW health périodique ---------- */
  useEffect(() => {
    const id = setInterval(async () => setSwHealth(await querySWHealth()), 60_000);
    return () => clearInterval(id);
  }, []);

  /* ---------- Raccourcis clavier ---------- */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") {
        e.preventDefault(); createNote(view.folderId);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); document.querySelector(".search")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view.folderId]);

  /* ============================================================
     ACTIONS
     ============================================================ */
  const createNote = (folderId = null) => {
    const n = {
      id: uid(), title: "", content: "", folderId,
      createdAt: Date.now(), updated: Date.now(), fileType: "txt"
    };
    setData(d => ({ ...d, notes: [n, ...d.notes] }));
    setEditing(n.id);
  };

  const updateNote = (id, patch) =>
    setData(d => ({ ...d, notes: d.notes.map(n => n.id === id ? { ...n, ...patch, updated: Date.now() } : n) }));

  const moveToTrash = (id) => {
    const note = data.notes.find(n => n.id === id);
    if (!note) return;
    setData(d => ({
      ...d,
      notes: d.notes.filter(n => n.id !== id),
      trash: [{ ...note, deletedAt: Date.now() }, ...d.trash]
    }));
    setEditing(null);
  };

  const restoreFromTrash = (id) =>
    setData(d => {
      const note = d.trash.find(n => n.id === id);
      return {
        ...d, trash: d.trash.filter(n => n.id !== id),
        notes: [{ ...note, deletedAt: undefined }, ...d.notes]
      };
    });

  const purgeFromTrash = (id) =>
    setData(d => ({ ...d, trash: d.trash.filter(n => n.id !== id) }));

  const emptyTrash = () =>
    confirm(t.emptyTrash + " ?") && setData(d => ({ ...d, trash: [] }));

  const createFolder = (parentId = null) => {
    const name = prompt(t.newFolder);
    if (!name) return;
    setData(d => ({ ...d, folders: [...d.folders, { id: uid(), name, parentId, cover: null }] }));
  };

  const updateFolder = (id, patch) =>
    setData(d => ({ ...d, folders: d.folders.map(f => f.id === id ? { ...f, ...patch } : f) }));

  const deleteFolder = (id) => {
    if (!confirm(t.confirmDel)) return;
    setData(d => ({
      ...d,
      folders: d.folders.filter(f => f.id !== id && f.parentId !== id),
      notes: d.notes.filter(n => n.folderId !== id)
    }));
  };

  const importFile = async (file) => {
    try {
      const text = await file.text();
      const ext = extOf(file.name);
      const type = FILE_TYPES[ext] ? ext : "txt";
      const title = file.name.replace(/\.[^.]+$/, "");
      const content = ["html","htm","svg","xml"].includes(type) ? text : textToHtml(text);
      const note = {
        id: uid(), title, content, folderId: view.folderId,
        createdAt: Date.now(), updated: Date.now(), fileType: type
      };
      setData(d => ({ ...d, notes: [note, ...d.notes] }));
      setEditing(note.id);
    } catch { alert(t.fileImportErr); }
  };

  /* ---------- Export / Import .notesafe ---------- */
  const exportSafe = () => requireRecovery(() => setPwModal({ mode: "export" }));
  const importSafe = (file) => setPwModal({ mode: "import", file });

  const doExport = async (pwd) => {
    try {
      const buf = await cryptoUtil.encrypt(pwd, {
        notes: data.notes, folders: data.folders, trash: data.trash,
        events: data.events, categories: data.categories, exportedAt: Date.now()
      });
      const blob = new Blob([buf], { type: "application/octet-stream" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `larecherches-${Date.now()}.notesafe`;
      a.click();
      setData(d => ({ ...d, lastBackupAt: Date.now() }));

      if (hasRecovery()) {
        try {
          let words = recoveryWords;
          if (!words) {
            const answer = prompt(t.recoveryEnter);
            if (answer) {
              words = answer.split(/[\s,;]+/).map(w => w.trim()).filter(Boolean);
              await getRecoveryVault(words);
              setRecoveryWords(words);
            }
          }
          if (words) await updateRecoveryVault(words, { backupPwd: pwd });
        } catch {}
      }
      setPwModal(null);
      alert(t.exportOk);
    } catch { alert(t.exportErr); }
  };

  const doImport = async (pwd, strategy = "merge") => {
    try {
      const buf = new Uint8Array(await pwModal.file.arrayBuffer());
      const obj = await cryptoUtil.decrypt(pwd, buf);

      if (strategy === "replace") {
        setData(d => ({
          ...d,
          notes: obj.notes || [], folders: obj.folders || [],
          trash: obj.trash || [], events: obj.events || [],
          categories: obj.categories || d.categories
        }));
      } else {
        setData(d => {
          const mergeById = (a, b) => {
            const map = new Map();
            [...(a || []), ...(b || [])].forEach(item => {
              const existing = map.get(item.id);
              if (!existing) return map.set(item.id, item);
              const ta = existing.updated || existing.createdAt || existing.deletedAt || 0;
              const tb = item.updated || item.createdAt || item.deletedAt || 0;
              if (tb > ta) map.set(item.id, item);
            });
            return [...map.values()];
          };
          return {
            ...d,
            notes: mergeById(d.notes, obj.notes),
            folders: mergeById(d.folders, obj.folders),
            trash: mergeById(d.trash, obj.trash),
            events: mergeById(d.events, obj.events),
            categories: [...new Set([...(d.categories || []), ...(obj.categories || [])])]
          };
        });
      }
      setPwModal(null);
      alert(t.importOk);
    } catch { alert(t.importErr); }
  };

  /* ---------- Récupération ---------- */
  const requireRecovery = (action) => {
    if (hasRecovery()) return action();
    pendingAfterRecovery.current = action;
    setRecoverySetupOpen(true);
  };

  const syncPinToVault = async (pin) => {
    let words = recoveryWords;
    if (!words) {
      const answer = prompt(t.recoveryEnter);
      if (!answer) return;
      words = answer.split(/[\s,;]+/).map(w => w.trim()).filter(Boolean);
      try { await getRecoveryVault(words); setRecoveryWords(words); }
      catch { alert(t.recoveryBadWords); return; }
    }
    await updateRecoveryVault(words, { pin });
  };

  const markMissedAsRead = (ids) => {
    setData(d => ({
      ...d,
      events: (d.events || []).map(ev => ids.includes(ev.id) ? { ...ev, notified: true } : ev)
    }));
    setMissedReminders(list => list.filter(ev => !ids.includes(ev.id)));
  };

  const handleResetImport = () => {
    setResetInfo(null);
    const input = document.createElement("input");
    input.type = "file"; input.accept = ".notesafe";
    input.onchange = (e) => { if (e.target.files[0]) importSafe(e.target.files[0]); };
    input.click();
  };
  const handleResetRepair = async () => {
    const ok = await forceSWRepair();
    pushDiagnostic({ kind: "manual-repair", ok });
    return ok;
  };

  /* ---------- Filtres ---------- */
  const results = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    const inNote = (n) =>
      (n.title || "").toLowerCase().includes(q) ||
      stripHtml(n.content).toLowerCase().includes(q);
    return {
      notes: data.notes.filter(inNote),
      trash: data.trash.filter(inNote)
    };
  }, [search, data]);

  const foldersHere = data.folders.filter(f => f.parentId === view.folderId);
  const notesHere = data.notes
    .filter(n => n.folderId === view.folderId)
    .filter(n => !filterCat || n.category === filterCat);
  const currentFolder = data.folders.find(f => f.id === view.folderId);
  const editingNote = data.notes.find(n => n.id === editing);

  /* ============================================================
     RENDU
     ============================================================ */
  if (locked && lockUtil.get()) {
    return <LockScreen onUnlock={() => setLocked(false)} t={t} />;
  }

  return (
    <>
      {resetInfo && (
        <ResetNotice t={t} info={resetInfo}
          onRestore={() => setResetInfo(null)}
          onImport={handleResetImport}
          onIgnore={() => setResetInfo(null)}
          onRepair={handleResetRepair} />
      )}

      <div className="app">
        <header className="topbar">
          <div className="brand">
            <img src="ln-icon.png" alt="LN" className="logo" />
            <h1>{t.appName}</h1>
            {offline && <span className="offline-badge" title={t.offlineReady}>⚡</span>}
          </div>
          <div className="topbar-actions">
            {!isMobile && (
              <select value={data.lang} onChange={e => setData(d => ({ ...d, lang: e.target.value }))}>
                <option value="fr">🇫🇷 FR</option>
                <option value="en">🇬🇧 EN</option>
              </select>
            )}
            <button className="gear" onClick={() => setSettingsOpen(true)} title={t.settings}>
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path fill="currentColor" d="M19.4 13a7.9 7.9 0 0 0 .05-1 7.9 7.9 0 0 0-.05-1l2.1-1.6-2-3.4-2.5 1a8 8 0 0 0-1.7-1L14.9 2h-4l-.4 2.6a8 8 0 0 0-1.7 1l-2.5-1-2 3.4 2.1 1.6a8 8 0 0 0 0 2l-2.1 1.6 2 3.4 2.5-1a8 8 0 0 0 1.7 1L11 21h4l.4-2.6a8 8 0 0 0 1.7-1l2.5 1 2-3.4-2.2-1.6ZM12 15.5A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5Z"/>
                <circle cx="12" cy="12" r="2.2" fill="var(--bg)"/>
              </svg>
            </button>
          </div>
        </header>

        <nav className="tabs">
          <button className={view.type === "notes" ? "active" : ""}
            onClick={() => setView({ type: "notes", folderId: null })}>{t.notes}</button>
          <button className={view.type === "agenda" ? "active" : ""}
            onClick={() => setView({ type: "agenda" })}>{t.agenda}</button>
        </nav>

        {/* Bandeau rappels manqués */}
        {missedReminders.length > 0 && (
          <div className="missed-banner">
            <div className="missed-header">
              <strong>⏰ {t.missedReminders} ({missedReminders.length})</strong>
              <button onClick={() => markMissedAsRead(missedReminders.map(m => m.id))}>
                {t.dismissAll}
              </button>
            </div>
            <p className="missed-intro">{t.missedIntro}</p>
            {missedReminders.map(ev => (
              <div key={ev.id} className="missed-item">
                <div>
                  <strong>{ev.title}</strong>
                  <small> — {ev.date} {ev.time || ""}</small>
                </div>
                <button onClick={() => markMissedAsRead([ev.id])}>{t.markNotified}</button>
              </div>
            ))}
          </div>
        )}

        {/* Bandeau rappel de sauvegarde */}
        {(() => {
          const last = data.lastBackupAt || 0;
          const days = (Date.now() - last) / 86400000;
          const hasContent = (data.notes?.length || 0) > 3;
          if (!hasContent) return null;
          if (last && days < 14) return null;
          return (
            <div className="backup-banner" onClick={() => setPwModal({ mode: "export" })}>
              💾 {t.backupReminder}
            </div>
          );
        })()}

        {/* Vue Notes */}
        {view.type === "notes" && !editingNote && (
          <main className="board" key={view.type + (view.folderId || "")}>
            <div className="toolbar">
              {currentFolder && (
                <button onClick={() => setView({ type: "notes", folderId: currentFolder.parentId })}>
                  ← {t.back}
                </button>
              )}
              <button onClick={() => createNote(view.folderId)}>+ {t.newNote}</button>
              <button onClick={() => createFolder(view.folderId)}>
                + {currentFolder ? t.newSub : t.newFolder}
              </button>
              <label className="file-btn" title={t.importFile}>
                📂 {t.importFile}
                <input type="file"
                  accept=".txt,.md,.html,.htm,.css,.js,.json,.csv,.xml,.svg,.log,.yml,.yaml"
                  hidden
                  onChange={e => e.target.files[0] && importFile(e.target.files[0])} />
              </label>
              <input className="search" placeholder={t.searchAll} value={search}
                onChange={e => setSearch(e.target.value)} />
              <select value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                <option value="">{t.all}</option>
                {data.categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {foldersHere.length > 0 && (
              <section className="folders" key={"f-" + (view.folderId || "root")}>
                {foldersHere.map(f => (
                  <FolderCard key={f.id} folder={f} small={!!currentFolder}
                    onOpen={() => setView({ type: "notes", folderId: f.id })}
                    onRename={() => { const n = prompt(t.rename, f.name); if (n) updateFolder(f.id, { name: n }); }}
                    onDelete={() => deleteFolder(f.id)}
                    onCover={(url) => updateFolder(f.id, { cover: url })}
                    t={t} />
                ))}
              </section>
            )}

            <section className="notes">
              {notesHere.length === 0 && foldersHere.length === 0 && (
                <p className="empty">{t.empty}</p>
              )}
              {notesHere.map(n => (
                <article key={n.id} className="note-card" onClick={() => setEditing(n.id)}>
                  {n.fileType && n.fileType !== "txt" && (
                    <span className="file-badge">{n.fileType.toUpperCase()}</span>
                  )}
                  <h3>{n.title || t.title}</h3>
                  <p>{stripHtml(n.content).slice(0, 80)}</p>
                  <small className="dates">
                    {t.created}: {new Date(n.createdAt || n.updated).toLocaleDateString()} ·{" "}
                    {t.updated}: {new Date(n.updated).toLocaleDateString()}
                  </small>
                </article>
              ))}
            </section>

            {results && (
              <section className="results">
                <h2>{t.searchAll}</h2>
                {results.notes.length === 0 && results.trash.length === 0 && (
                  <p className="empty">{t.noResult}</p>
                )}
                {results.notes.map(n => (
                  <div key={n.id} className="result-row" onClick={() => setEditing(n.id)}>
                    <strong>{n.title || t.title}</strong> — <em>{stripHtml(n.content).slice(0, 60)}</em>
                  </div>
                ))}
                {results.trash.map(n => (
                  <div key={n.id} className="result-row trash">
                    🗑 <strong>{n.title || t.title}</strong> — {t.deletedOn}{" "}
                    {new Date(n.deletedAt).toLocaleDateString()}
                    <button onClick={() => restoreFromTrash(n.id)}>{t.restore}</button>
                  </div>
                ))}
              </section>
            )}
          </main>
        )}

        {/* Vue Agenda */}
        {view.type === "agenda" && (
          <Agenda data={data} setData={setData} t={t} />
        )}

        {/* Vue Corbeille */}
        {view.type === "trash" && (
          <main className="board">
            <div className="toolbar">
              <button onClick={() => setView({ type: "notes", folderId: null })}>← {t.back}</button>
              <button onClick={emptyTrash}>{t.emptyTrash}</button>
            </div>
            {data.trash.length === 0 && <p className="empty">{t.trash} vide</p>}
            {data.trash.map(n => (
              <div key={n.id} className="note-card">
                <h3>{n.title || t.title}</h3>
                <p>{stripHtml(n.content).slice(0, 80)}</p>
                <small>{t.deletedOn} {new Date(n.deletedAt).toLocaleString()}</small>
                <div className="row">
                  <button onClick={() => restoreFromTrash(n.id)}>{t.restore}</button>
                  <button onClick={() => purgeFromTrash(n.id)}>🗑</button>
                </div>
              </div>
            ))}
          </main>
        )}

        {/* FAB mobile */}
        {isMobile && view.type === "notes" && !editingNote && (
          <button className="fab" onClick={() => createNote(view.folderId)} title={t.newNote}>+</button>
        )}
      </div>

      {/* Éditeur */}
      {editingNote && (
        <NoteEditor note={editingNote} t={t}
          onChange={patch => updateNote(editingNote.id, patch)}
          onClose={() => setEditing(null)}
          onDelete={() => moveToTrash(editingNote.id)} />
      )}

      {/* Drawer Paramètres */}
      {settingsOpen && (
        <aside className="drawer" onClick={() => setSettingsOpen(false)}>
          <div className="drawer-inner" onClick={e => e.stopPropagation()}>
            <h2>{t.settings}</h2>

            <label>{t.language}
              <select value={data.lang} onChange={e => setData(d => ({ ...d, lang: e.target.value }))}>
                <option value="fr">🇫🇷 FR</option>
                <option value="en">🇬🇧 EN</option>
              </select>
            </label>

            <label>{t.theme}
              <select value={data.theme} onChange={e => setData(d => ({ ...d, theme: e.target.value }))}>
                {THEMES.map(th => <option key={th.id} value={th.id}>{th.label}</option>)}
              </select>
            </label>

            {(data.theme === "deepin-light" || data.theme === "light") && (
              <div className="accent-block">
                <span className="accent-label">{t.colorSet}</span>
                <div className="accent-grid">
                  {ACCENTS.map(a => (
                    <button key={a.id} title={a.label}
                      className={"swatch" + (data.accent === a.id ? " active" : "")}
                      style={{ background: a.id }}
                      onClick={() => setData(d => ({ ...d, accent: a.id }))} />
                  ))}
                </div>
              </div>
            )}

            <label>{t.font}
              <select value={data.font} onChange={e => setData(d => ({ ...d, font: e.target.value }))}>
                {Object.entries(FONTS).map(([k, f]) => (
                  <option key={k} value={k}>{f.name}</option>
                ))}
              </select>
            </label>

            <div className="accent-block">
              <span className="accent-label">{t.noteColor}</span>
              <div className="color-grid">
                {TEXT_COLORS.map(c => (
                  <button key={c.id} title={c.label}
                    className={"swatch color-swatch" + (data.noteColor === c.value ? " active" : "")}
                    style={{ background: c.value, borderColor: c.value === "#ffffff" ? "#ccc" : c.value }}
                    onClick={() => setData(d => ({ ...d, noteColor: c.value }))} />
                ))}
                <label className="swatch custom-color" title={t.pickColor}>
                  🎨
                  <input type="color" value={data.noteColor || "#ede4d3"}
                    onChange={e => setData(d => ({ ...d, noteColor: e.target.value }))} hidden />
                </label>
              </div>
              <button className="reset-color"
                onClick={() => setData(d => ({ ...d, noteColor: "#ede4d3" }))}>
                ↺ {t.resetColor}
              </button>
            </div>

            <h3>{t.categories}</h3>
            <ul>
              {data.categories.map(c => <li key={c}>{c}</li>)}
            </ul>
            <button onClick={() => {
              const name = prompt(t.newCategory);
              if (name) setData(d => ({ ...d, categories: [...d.categories, name] }));
            }}>+ {t.newCategory}</button>

            <hr />
            <button onClick={exportSafe}>⬇ {t.export}</button>
            <label className="import-btn">
              ⬆ {t.import}
              <input type="file" accept=".notesafe" hidden
                onChange={e => e.target.files[0] && importSafe(e.target.files[0])} />
            </label>

            <hr />
            <button onClick={() => setView({ type: "trash", folderId: null })}>
              🗑 {t.trash} ({data.trash.length})
            </button>

            {/* Stockage */}
            <hr />
            <h3>{t.storage}</h3>
            <p className="storage-status">
              {storageStatus.persisted === true && <span className="ok">✓ {t.storagePersistent}</span>}
              {storageStatus.persisted === false && <span className="warn">⚠ {t.storageNotPersistent}</span>}
              {storageStatus.persisted === null && <span className="muted">◌ {t.storageUnknown}</span>}
            </p>
            {storageStatus.estimate && (
              <p className="storage-usage"><small>
                {t.storageUsage} : {fmtBytes(storageStatus.estimate.usage)} / {fmtBytes(storageStatus.estimate.quota)}
                {" "}({(storageStatus.estimate.pct * 100).toFixed(1)} %)
              </small></p>
            )}
            <p className="storage-usage"><small>
              {t.lastBackup} : {data.lastBackupAt ? new Date(data.lastBackupAt).toLocaleString() : t.never}
            </small></p>
            <p className="storage-status">
              {swHealth.ok === true && <span className="ok">✓ {t.swHealthy}</span>}
              {swHealth.ok === false && <span className="warn">⚠ {t.swBroken}</span>}
              {swHealth.ok === null && <span className="muted">◌ —</span>}
            </p>
            <button onClick={handleResetRepair}>🔧 {t.resetRepair}</button>

            {/* Verrouillage */}
            <hr />
            <h3>{t.lock}</h3>
            {!lockUtil.get() && (
              <button onClick={() => requireRecovery(async () => {
                const pin = prompt(t.setPin + " (min 4)");
                if (!pin || pin.length < 4) return alert(t.pinMin);
                const confirmPin = prompt(t.confirmPassword);
                if (pin !== confirmPin) return alert(t.pinMismatch);
                lockUtil.set(await lockUtil.hash(pin));
                if (recoveryWords) await updateRecoveryVault(recoveryWords, { pin });
                alert(t.pinSet); refresh();
              })}>🔒 {t.setPin}</button>
            )}
            {lockUtil.get() && (
              <>
                <button onClick={async () => {
                  const old = prompt(t.enterPin);
                  if (!old || await lockUtil.hash(old) !== lockUtil.get()) return alert(t.importErr);
                  const pin = prompt(t.setPin + " (min 4)");
                  if (!pin || pin.length < 4) return alert(t.pinMin);
                  lockUtil.set(await lockUtil.hash(pin));
                  await syncPinToVault(pin);
                  alert(t.pinSet); refresh();
                }}>🔑 {t.changePin}</button>
                <button onClick={async () => {
                  const old = prompt(t.enterPin);
                  if (!old) return;
                  if (await lockUtil.hash(old) !== lockUtil.get()) return alert(t.importErr);
                  lockUtil.clear();
                  alert(t.pinRemoved); refresh();
                }}>🚫 {t.removePin}</button>
                <button onClick={() => setLocked(true)}>🔒 {t.lock}</button>
              </>
            )}

            {/* Agenda / Son */}
            <hr />
            <h3>{t.agenda}</h3>
            <label>{t.sound}
              <select value={data.reminderSound || "bell"}
                onChange={e => setData(d => ({ ...d, reminderSound: e.target.value }))}>
                <option value="bell">{t.soundBell}</option>
                <option value="chime">{t.soundChime}</option>
                <option value="beep">{t.soundBeep}</option>
              </select>
            </label>
            <button onClick={() => playReminderSound(data.reminderSound || "bell")}>
              🔊 {t.testSound}
            </button>
            {("Notification" in window) && Notification.permission !== "granted" && (
              <button onClick={async () => {
                const r = await requestNotifPermission();
                setData(d => ({ ...d, notificationsEnabled: r === "granted" }));
                alert(r === "granted" ? t.notificationsOn : t.notificationsOff);
              }}>🔔 {t.enableNotifications}</button>
            )}
            {("Notification" in window) && Notification.permission === "granted" && (
              <p className="storage-status"><span className="ok">✓ {t.notificationsOn}</span></p>
            )}

            {/* Rappels hors-ligne */}
            <hr />
            <h3>{t.offlineReminders}</h3>
            <p className="storage-status">
              {swStatus.triggers || swStatus.periodic
                ? <span className="ok">✓ {t.offlineStatusFull}</span>
                : <span className="warn">⚠ {t.offlineStatusPartial}</span>}
            </p>
            <p className="storage-usage"><small>
              {t.offlineTriggers} : {swStatus.triggers ? "✓" : "—"} · {t.offlinePeriodic} : {swStatus.periodic ? "✓" : "—"}
            </small></p>
            <button onClick={checkRemindersNow}>🔁 {t.testSound}</button>

            {/* Récupération */}
            <hr />
            <h3>{t.recovery}</h3>
            <p className="storage-status">
              {hasRecovery()
                ? <span className="ok">{t.recoveryStatusSet}</span>
                : <span className="warn">{t.recoveryStatusMissing}</span>}
            </p>
            {!hasRecovery()
              ? <button onClick={() => setRecoverySetupOpen(true)}>🔑 {t.recoveryTitle}</button>
              : <button onClick={() => setRecoveryResetOpen(true)}>🔓 {t.recoveryReset}</button>}
            <p className="storage-usage"><small>⚠ {t.recoveryWarning}</small></p>

            {/* À-propos */}
            <hr />
            <h3>{t.about}</h3>
            <AboutSection t={t} />
          </div>
        </aside>
      )}

      {/* Modale mot de passe */}
      {pwModal && (
        <PasswordModal mode={pwModal.mode} t={t}
          onCancel={() => setPwModal(null)}
          onSubmit={(pwd, strategy) => pwModal.mode === "export" ? doExport(pwd) : doImport(pwd, strategy)} />
      )}

      {/* Récupération */}
      {recoverySetupOpen && (
        <RecoverySetup t={t}
          mandatory={!hasRecovery() && !recoveryWords}
          onCancel={() => setRecoverySetupOpen(false)}
          onDone={(words) => {
            setRecoveryWords(words);
            setRecoverySetupOpen(false);
            alert(t.recoveryCreated);
            const next = pendingAfterRecovery.current;
            pendingAfterRecovery.current = null;
            if (next) next();
          }} />
      )}
      {recoveryResetOpen && (
        <RecoveryReset t={t}
          onClose={() => setRecoveryResetOpen(false)}
          onApplyPin={async (pin) => {
            lockUtil.set(await lockUtil.hash(pin));
            alert(t.recoveryRecovered);
            setLocked(false);
            setRecoveryResetOpen(false);
          }} />
      )}
    </>
  );
}

/* ============================================================
   14. RENDER
   ============================================================ */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);