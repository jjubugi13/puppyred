import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { orderedEntries, releaseURL, koreanDate } from '../assets/content.js';
const root = new URL('../', import.meta.url);
const read = file => readFile(new URL(file, root), 'utf8');
const notices = JSON.parse(await read('data/notices.json'));
const patches = JSON.parse(await read('data/patches.json'));
const config = JSON.parse(await read('data/site.json'));
orderedEntries(notices, 'notice');
orderedEntries(patches, 'patch');
assert.equal(typeof config.sample, 'boolean');
assert.equal(typeof config.downloadEnabled, 'boolean');
if (config.downloadEnabled) assert.ok(releaseURL(config), '다운로드 활성화 시 실제 Releases 주소가 필요합니다.');
const fixture = { id: 'a', title: 'test', body: '<img src=x onerror=alert(1)>', publishedAt: '2025-01-01T00:00:00+09:00', sample: false, draft: false };
const entries = [fixture, { ...fixture, id: 'b', publishedAt: '2025-02-01T00:00:00+09:00' }, { ...fixture, id: 'draft', draft: true }, { ...fixture, id: 'future', publishedAt: '2099-01-01T00:00:00+09:00' }];
assert.deepEqual(orderedEntries(entries, 'notice', Date.parse('2026-01-01')).map(e => e.id), ['b', 'a']);
assert.deepEqual(orderedEntries([], 'notice'), []);
assert.throws(() => orderedEntries([fixture, fixture], 'notice'));
assert.throws(() => orderedEntries([{ ...fixture, publishedAt: '2025-02-30T00:00:00+09:00' }], 'notice'));
assert.throws(() => orderedEntries([{ ...fixture, publishedAt: '2025-01-01' }], 'notice'));
const enabled = { sample: false, downloadEnabled: true, releaseUrl: 'https://github.com/test-account/puppyred/releases/latest' };
assert.ok(releaseURL(enabled));
for (const releaseUrl of ['javascript:alert(1)', 'https://github.com.evil.test/a/puppyred/releases', 'https://github.com/YOUR-USERNAME/puppyred/releases/latest', 'http://github.com/test-account/puppyred/releases', 'https://github.com/test-account/another/releases', 'https://user:pass@github.com/test-account/puppyred/releases']) assert.equal(releaseURL({ ...enabled, releaseUrl }), null);
assert.equal(releaseURL({ ...enabled, sample: true }), null);
assert.equal(releaseURL({ ...enabled, downloadEnabled: false }), null);
assert.match(koreanDate('2025-01-01T16:00:00Z'), /02/);
const html = await read('index.html');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, '중복 HTML ID');
let references = 0;
for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (url.startsWith('#')) assert.ok(ids.includes(url.slice(1)), `없는 앵커: ${url}`);
  else if (url.startsWith('./')) { await access(new URL(url, root)); references++; }
  else if (url === 'https://open.kakao.com/o/gOSqnZOi') continue;
  else assert.fail(`허용하지 않은 경로입니다: ${url}`);
}
assert.ok(!/innerHTML|document\.write/.test(await read('assets/app.js')), '콘텐츠는 textContent로 표시해야 합니다.');
console.log(`PASS: JSON 3개, 정렬·초안·미래 게시·빈 목록·잘못된 날짜·중복 ID, URL 보호, 한국 날짜, HTML 앵커와 상대 파일 ${references}개.`);
