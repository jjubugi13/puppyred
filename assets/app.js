import { orderedEntries, releaseURL, koreanDate } from './content.js';

const select = id => document.getElementById(id);
const pageNames = { home: '퍼피레드', download: '다운로드', guide: '설치 및 이용 가이드', before: '이용 전 안내 사항', faq: '다운로드가 안 돼요!', patches: '패치 내역' };
document.body.classList.add('enhanced');
function showPage() {
  const hash = location.hash.slice(1);
  const page = Object.hasOwn(pageNames, hash) ? hash : 'home';
  document.querySelectorAll('#navigation a').forEach(link => {
    if (link.hash === `#${page}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  select('navigation').classList.remove('is-open');
  select('menu-toggle').setAttribute('aria-expanded', 'false');
  select('menu-toggle').setAttribute('aria-label', '메뉴 열기');
  openLinkedNotice();
}
select('menu-toggle').addEventListener('click', () => {
  const expanded = select('navigation').classList.toggle('is-open');
  select('menu-toggle').setAttribute('aria-expanded', String(expanded));
  select('menu-toggle').setAttribute('aria-label', expanded ? '메뉴 닫기' : '메뉴 열기');
});
window.addEventListener('hashchange', showPage);
showPage();
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function dateNode(value) {
  const node = element('time', '', koreanDate(value));
  node.dateTime = value;
  return node;
}
function state(container, message) { container.replaceChildren(element('p', 'state-message', message)); }
async function readJSON(name) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(new URL(`../data/${name}.json`, import.meta.url), { cache: 'no-cache', signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally { clearTimeout(timeout); }
}

async function loadNotices() {
  try {
    const entries = orderedEntries(await readJSON('notices'), 'notice');
    const list = select('notice-list');
    list.replaceChildren();
    if (!entries.length) { state(list, '아직 등록된 공지가 없어요. 새 소식을 기다려 주세요.'); select('latest-notice').textContent = '아직 등록된 공지가 없어요.'; return false; }
    entries.forEach(entry => {
      const detail = element('details');
      detail.id = `notice-${entry.id}`;
      const summary = element('summary');
      summary.append(element('span', 'pill', entry.sample ? '샘플' : '공지'), element('span', 'notice-title', entry.title), dateNode(entry.publishedAt));
      const body = element('div', 'detail-body');
      if (entry.sample) body.append(element('p', '', '작성 예시입니다. 실제 공지나 배포 일정이 아니에요.'));
      body.append(element('p', '', entry.body));
      detail.append(summary, body);
      list.append(detail);
    });
    const latest = entries[0];
    const top = select('latest-notice');
    top.textContent = `${latest.sample ? '[샘플] ' : ''}${latest.title}`;
    top.href = `#notice-${latest.id}`;
    return entries.some(entry => entry.sample);
  } catch {
    state(select('notice-list'), '공지사항을 불러오지 못했어요. 잠시 후 페이지를 새로고침해 주세요.');
    select('latest-notice').textContent = '공지사항을 불러오지 못했어요. 잠시 후 다시 확인해 주세요.';
    return false;
  }
}

async function loadPatches() {
  try {
    const entries = orderedEntries(await readJSON('patches'), 'patch');
    const list = select('patch-list');
    list.replaceChildren();
    if (!entries.length) { state(list, '아직 등록된 패치 내역이 없어요.'); return false; }
    entries.forEach(entry => {
      const article = element('article', 'patch-entry');
      const meta = element('div', 'patch-meta');
      meta.append(dateNode(entry.publishedAt), element('span', '', entry.version));
      const content = element('div', 'patch-content');
      const title = element('h3', '', entry.title);
      if (entry.sample) title.append(element('span', 'pill', '샘플 · 실제 패치 아님'));
      const changes = element('ul');
      entry.changes.forEach(change => changes.append(element('li', '', change)));
      content.append(title, changes); article.append(meta, content); list.append(article);
    });
    return entries.some(entry => entry.sample);
  } catch {
    state(select('patch-list'), '패치 내역을 불러오지 못했어요. 잠시 후 페이지를 새로고침해 주세요.');
    return false;
  }
}

async function loadConfig() {
  try {
    const config = await readJSON('site');
    if (!config || typeof config.sample !== 'boolean' || typeof config.downloadEnabled !== 'boolean') throw new Error('Invalid site config');
    const url = releaseURL(config);
    select('release-label').textContent = url ? 'GitHub Releases에서 배포 정보 확인' : '배포 준비 중 · 설치 파일 미연결';
    if (url) {
      document.querySelectorAll('[data-download]').forEach(link => {
        link.href = url;
        link.removeAttribute('aria-disabled');
      });
      select('download-link').textContent = '퍼피레드 다운로드 ↗';
      document.querySelector('[data-download-caption]').textContent = 'GitHub Releases에서 설치 파일 받기';
      select('download-description').textContent = 'GitHub Releases에서 최신 배포 안내와 설치 파일을 확인해 주세요.';
      select('download-help').textContent = '릴리스 페이지의 Assets에서 설치 파일을 선택해 주세요.';
    }
    return { sample: config.sample, ready: Boolean(url) };
  } catch {
    select('release-label').textContent = '배포 정보를 불러오지 못했어요';
    select('download-description').textContent = '잠시 후 페이지를 새로고침해 주세요.';
    document.querySelector('[data-download-caption]').textContent = '배포 정보를 불러오지 못했어요';
    return { sample: false, ready: false, failed: true };
  }
}

function openLinkedNotice() {
  const hash = window.location.hash.slice(1);
  if (!hash.startsWith('notice-')) return;
  const target = document.getElementById(hash);
  if (target instanceof HTMLDetailsElement) { target.open = true; target.scrollIntoView({ block: 'start' }); }
}
select('latest-notice').addEventListener('click', () => {
  const target = document.getElementById(select('latest-notice').hash.slice(1));
  if (target instanceof HTMLDetailsElement) target.open = true;
});

const [sampleNotices, samplePatches, site] = await Promise.all([loadNotices(), loadPatches(), loadConfig()]);
const sampleBanner = select('sample-banner');
if (!sampleNotices && !samplePatches && !site.sample) {
  sampleBanner.hidden = true;
  sampleBanner.style.display = 'none';
} else {
  const message = sampleBanner.querySelector('.sample-message');
  message.textContent = `‘샘플’ 공지·패치는 작성 예시입니다. ${site.ready ? '다운로드는 등록된 GitHub Releases로 연결됩니다.' : '현재 다운로드는 준비 중입니다.'}`;
}
openLinkedNotice();
