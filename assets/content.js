// Content is text, never executable markup. No external API or write endpoint is used.
export function orderedEntries(value, kind, now = Date.now()) {
  if (!Array.isArray(value)) throw new Error('목록 형식이 올바르지 않아요.');
  const ids = new Set();
  for (const entry of value) {
    if (!entry || typeof entry.id !== 'string' || !/^[a-z0-9-]+$/.test(entry.id) || ids.has(entry.id)) throw new Error('고유 ID를 확인해 주세요.');
    ids.add(entry.id);
    if (typeof entry.title !== 'string' || !entry.title.trim() || typeof entry.sample !== 'boolean' || typeof entry.draft !== 'boolean') throw new Error('제목 또는 게시 상태를 확인해 주세요.');
    if (typeof entry.publishedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/.test(entry.publishedAt) || !Number.isFinite(Date.parse(entry.publishedAt))) throw new Error('시간대가 포함된 게시 날짜가 필요해요.');
    const day = entry.publishedAt.slice(0, 10);
    if (new Date(`${day}T00:00:00Z`).toISOString().slice(0, 10) !== day) throw new Error('존재하지 않는 날짜예요.');
    if (kind === 'notice' && (typeof entry.body !== 'string' || !entry.body.trim())) throw new Error('공지 본문이 필요해요.');
    if (kind === 'patch' && (!Array.isArray(entry.changes) || !entry.changes.length || entry.changes.some(item => typeof item !== 'string' || !item.trim()) || typeof entry.version !== 'string')) throw new Error('패치 내역을 확인해 주세요.');
  }
  return value.filter(entry => !entry.draft && Date.parse(entry.publishedAt) <= now)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || a.id.localeCompare(b.id));
}

export function releaseURL(config) {
  if (!config || config.sample !== false || config.downloadEnabled !== true || typeof config.releaseUrl !== 'string') return null;
  try {
    const url = new URL(config.releaseUrl);
    if (url.protocol !== 'https:' || url.hostname !== 'github.com' || url.port || url.username || url.password || url.search || url.hash) return null;
    if (!/^\/[A-Za-z0-9][A-Za-z0-9-]*\/puppyred\/releases(?:\/latest|\/tag\/[^/]+)?\/?$/.test(url.pathname)) return null;
    const owner = url.pathname.split('/')[1];
    if (/^(YOUR[-_]?USERNAME|YOUR[-_]?NAME|USERNAME|OWNER|EXAMPLE|CHANGE[-_]?ME)$/i.test(owner)) return null;
    return url.href;
  } catch { return null; }
}

export function koreanDate(value) {
  return new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(value));
}
