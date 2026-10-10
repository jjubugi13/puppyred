# 퍼피레드 비공식 복원 프로젝트 홈페이지

빌드 없이 GitHub Pages에 올리는 정적 홈페이지입니다. HTML, CSS, JavaScript, JSON과 아이콘만 사용합니다. 서버 프로그램·데이터베이스·유료 서비스·외부 폰트·외부 CDN·GitHub API·방문자 로그인은 필요하지 않습니다.

디자인은 사용자가 지정한 게임 공지창을 기준으로 분홍색 `#FF7CB0` 프레임, 흰색 패널, 작은 글씨와 점선 목록을 사용합니다. 모바일 첫 화면은 공지 → 다운로드 → 안내 메뉴 4개 순서입니다. 첫 화면 아래에는 이용 전 안내 → 설치 가이드 → 다운로드 → 다운로드가 안 돼요! → 패치 내역이 한 페이지에 이어집니다. 큰 장식 그림이나 홍보 문구는 없습니다. PC는 상단 메뉴, 모바일은 메뉴 버튼과 바로가기로 각 안내 화면을 엽니다.

**기본 상태는 샘플 사이트입니다.** 공지와 패치는 모두 예시로 표시되며 실제 다운로드는 비활성화되어 있습니다. 홈페이지가 준비되었다는 사실은 게임 배포나 기능 검증 완료를 뜻하지 않습니다.

## 파일 구성

```text
puppyred/
  index.html             홈페이지 (6개 안내 영역, 상단 최신 공지)
  .nojekyll              Jekyll 처리 없이 정적 파일 게시
  .gitignore
  assets/
    styles.css           PC·모바일 반응형 디자인
    app.js               JSON 읽기와 화면 표시
    content.js           정렬·날짜·Releases 주소 검증
    puppyred.ico         기존 게임 아이콘을 복사한 브라우저 아이콘
    help/                사용자가 제공한 오류 안내 이미지 3개
  data/
    site.json            다운로드 설정
    notices.json         공지사항
    patches.json         날짜별 패치 내역
  tools/
    check.mjs            선택 사항: 로컬 콘텐츠·링크 검사
  package.json           선택적 Node 검사 설정 (설치할 의존성 없음)
  README.md
```

## GitHub Pages 무료 배포

1. GitHub에서 **Public** 저장소를 만들고 이름을 **`puppyred`**로 지정합니다. GitHub Free에서 Pages를 사용하려면 공개 저장소를 사용합니다.
2. **이 폴더 안의 파일과 폴더만** 저장소의 `main` 브랜치 최상위에 업로드합니다. 저장소를 열자마자 `index.html`, `assets`, `data`가 보여야 합니다. `puppyred` 폴더 자체를 한 겹 더 넣지 마세요. 게임 작업 공간 전체, 계정 데이터, 키, 런타임 파일을 업로드하지 마세요. `.nojekyll`도 포함합니다.
3. 저장소 **Settings → Pages → Build and deployment**에서 **Source: Deploy from a branch**를 선택합니다.
4. **Branch: main**, 폴더 **/ (root)**를 선택하고 **Save**를 누릅니다.
5. GitHub의 Pages 배포가 성공하면 Settings → Pages의 실제 사이트 주소를 엽니다. 일반적인 프로젝트 주소 형식은 `https://YOUR-USERNAME.github.io/puppyred/`입니다. 이 주소는 **형식 예시**이므로 `YOUR-USERNAME`을 실제 GitHub 계정명으로 바꿔야 합니다.
6. PC와 휴대폰에서 공지 펼치기, 메뉴 이동, FAQ 펼치기, 패치 목록과 다운로드 상태를 확인합니다. 파일을 수정하고 커밋하면 다음 Pages 배포에 반영됩니다. 즉시 바뀌지 않으면 배포 상태를 확인하고 새로고침하세요.

이 방식에는 별도 빌드 명령, npm 설치, 사용자 작성 Actions 워크플로가 필요하지 않습니다. GitHub Pages의 게시 처리는 GitHub가 수행합니다. 사이트 소스 공개와 방문자의 수정 권한은 별개입니다. 사이트에는 쓰기 기능이 없으며 저장소의 쓰기 권한을 가진 운영자만 게시 파일을 수정할 수 있습니다.

공식 안내: [게시 소스 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [Pages 사이트 만들기](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## 실제 다운로드 연결

1. 게임 배포에 사용할 파일을 준비하고 `puppyred` 저장소의 **Releases → Draft a new release**에서 태그와 설명을 작성합니다.
2. 설치 파일을 릴리스 첨부 파일로 업로드하고, 지원 OS·설치 방법·파일 이름을 안내합니다. GitHub가 자동 제공하는 `Source code` 압축 파일은 이 홈페이지의 소스이며 게임 설치 파일이 아닙니다.
3. 릴리스를 실제 공개합니다. `/releases/latest`는 최신 공개 릴리스용입니다. 초안은 방문자가 볼 수 없으며 시험판은 고정 `/releases/tag/태그` 주소를 사용할 수 있습니다.
4. `data/site.json`을 다음 형태로 바꿉니다. 아래 URL은 **실제 다운로드가 아닌 형식 예시**입니다. 반드시 계정명을 바꾸세요.

```json
{
  "sample": false,
  "downloadEnabled": true,
  "releaseUrl": "https://github.com/YOUR-USERNAME/puppyred/releases/latest"
}
```

`sample: false`, `downloadEnabled: true`, 유효한 실제 Releases 주소가 모두 있어야 다운로드가 활성화됩니다. 예시 계정명은 코드에서 거부합니다. HTTPS의 `github.com/<계정명>/puppyred/releases`, `/releases/latest`, `/releases/tag/<태그>`만 허용합니다. 파일 직접 링크 대신 릴리스 안내 페이지를 열어 버전과 설치 방법을 함께 확인하도록 했습니다. URL 형식 검사는 릴리스 존재 여부까지 확인하지 않으므로 운영자가 로그아웃 상태에서도 직접 열어 확인하세요.

배포 중단은 `downloadEnabled`를 `false`로 바꾸면 됩니다. 실제 주소를 모르는 상태에서는 `releaseUrl: null`을 유지하세요. 게임 설치 파일을 이 홈페이지 폴더에 넣을 필요는 없습니다.

공식 안내: [최신 릴리스 연결](https://docs.github.com/en/repositories/releasing-projects-on-github/linking-to-releases).

## 공지 관리 — `data/notices.json`

GitHub 파일 화면의 연필(Edit) 버튼을 눌러 JSON 배열을 수정하고 커밋합니다. 아래 역시 작성 형식 예시이며, 실제 소식을 확인한 뒤 내용·날짜·샘플 상태를 수정하세요.

```json
{
  "id": "notice-20261010",
  "title": "여기에 확인된 실제 공지 제목을 입력하세요",
  "publishedAt": "2026-10-10T12:00:00+09:00",
  "sample": true,
  "draft": true,
  "body": "여기에 실제 공지 본문을 입력하세요.\n줄바꿈은 이렇게 표시합니다."
}
```

- `id`: 목록 안에서 고유한 영문 소문자·숫자·하이픈 조합입니다. 공지 직접 링크에 사용하므로 게시 후 유지하세요.
- `publishedAt`: `YYYY-MM-DDTHH:mm:ss+09:00` 형태의 한국 시간입니다. 날짜가 최신인 순으로 자동 정렬되며, 가장 최근 공지가 페이지 최상단에 표시됩니다. 날짜가 같으면 ID 순입니다.
- `sample`: `true`이면 개별 공지에 샘플 표시가 붙습니다. 실제 소식으로 교체한 뒤에만 `false`로 바꾸세요.
- `draft`: `true`이면 화면에서 숨깁니다. 미래 날짜도 방문자 기기 시각 기준으로 숨깁니다. **공개 저장소의 JSON 자체는 누구나 볼 수 있으므로 비밀 초안 용도가 아닙니다.** 예약 공개는 서버 스케줄러가 아니라 페이지를 불러올 때 판단하며, 날짜가 지나면 새로고침해야 표시됩니다.
- `body`: 일반 텍스트입니다. HTML과 Markdown은 실행·변환하지 않으며 글자 그대로 표시합니다.

샘플 공지는 삭제하거나 실제 내용으로 교체합니다. 등록할 공지가 없으면 `[]`로 저장하면 됩니다. 배열의 항목 사이에는 쉼표가 필요하며 마지막 항목 뒤에는 쉼표를 붙이지 않습니다. 잘못된 JSON이나 잘못된 항목이 있으면 해당 영역에 불러오기 실패 안내가 나옵니다. 다른 영역과 기본 설치 안내·FAQ는 계속 동작합니다.

## 패치 내역 관리 — `data/patches.json`

날짜별 변경 내용은 다음 형식으로 배열에 추가합니다. 샘플을 실제 패치로 바꿀 때 `sample`을 `false`, 게시할 때 `draft`를 `false`로 바꿉니다. 완료·적용이 확인되지 않은 변경을 적용 완료라고 적지 마세요.

```json
{
  "id": "patch-example",
  "title": "패치 제목 작성 예시",
  "version": "실제 배포 버전으로 교체",
  "publishedAt": "2026-10-10T12:00:00+09:00",
  "sample": true,
  "draft": true,
  "changes": [
    "확인된 변경 사항을 적습니다.",
    "알려진 제한이나 추가 확인이 필요한 항목을 구분합니다."
  ]
}
```

공지와 같은 날짜 정렬·샘플·초안 규칙을 사용합니다. `changes`는 문자열 배열이며 각 문자열은 한 줄의 항목으로 표시됩니다. 기록이 없으면 `[]`로 저장하세요. 문의 경로는 사용자가 제공한 [오픈채팅](https://open.kakao.com/o/gOSqnZOi)으로 연결했습니다. FAQ의 오류 설명은 운영자가 제공한 각 오류 사례에 맞춰 작성했습니다.

## 경로와 로컬 미리보기

모든 CSS·JS·아이콘은 `./assets/…` 상대 경로입니다. JSON은 `import.meta.url`을 기준으로 찾습니다. 따라서 도메인 루트와 `/puppyred/` 둘 다 동작합니다. 메뉴는 `#home`, `#download`, `#guide`, `#before`, `#faq`, `#patches` 해시를 사용해 한 페이지 안의 해당 안내 위치로 이동합니다. 직접 링크·새로고침·브라우저 뒤로 가기가 동작하며 서버 라우팅은 필요하지 않습니다. JavaScript를 끄면 정적인 설치 안내와 FAQ는 한 페이지에 이어서 표시됩니다. 파일명은 대소문자를 정확히 맞추고 `/assets/...` 같은 도메인 루트 경로로 바꾸지 마세요.

JSON을 `fetch`로 읽으므로 `index.html`을 더블클릭하는 `file://` 미리보기는 지원하지 않습니다. Python이 있는 개발 PC에서만 선택적으로 다음을 실행합니다. 이것은 **로컬 확인용**이며 실제 배포에 별도 서버가 필요하다는 뜻이 아닙니다.

```powershell
# 이 README가 있는 puppyred 폴더에서 실행
python -m http.server 8765 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:8765/`를 열고, 종료할 때 터미널에서 `Ctrl+C`를 누릅니다. `/puppyred/` 경로를 시험하려면 다른 파일이 없는 임시 폴더 안에 이 홈페이지 폴더만 복사한 후, 그 임시 폴더에서 서버를 실행하여 `http://127.0.0.1:8765/puppyred/`를 엽니다. 게임 작업 공간 전체를 웹서버로 노출하지 마세요.

Node.js가 있다면 폴더에서 `node tools/check.mjs`로 JSON 구조, 샘플 보호, 정렬, 상대 파일 참조를 검사할 수 있습니다. 이 검사는 실제 GitHub 배포나 설치 파일의 안전성·게임 실행을 검증하지 않습니다.

## 공개 전 확인

- 샘플 공지와 패치를 삭제하거나 실제 정보로 교체했는지 확인합니다.
- `data/site.json`에 실제 공개 릴리스 주소를 넣고 다운로드 링크를 직접 확인합니다.
- 지원 환경과 설치 안내, 실제 문의 경로를 배포 내용에 맞춥니다.
- 개인정보, 비밀번호, 키, 계정 DB와 비공개 파일을 저장소에 넣지 않습니다.
- PC·모바일에서 글자 잘림, FAQ, 최신 공지, 이미지, 키보드 탐색을 확인합니다.

홈페이지에는 폼·댓글·회원가입·관리자 페이지·방문자 저장 기능이 없습니다. 사용자가 열고 닫는 FAQ와 공지는 해당 브라우저 화면에만 반영됩니다. 게임 HTML은 색상·디자인 확인 목적으로만 읽었으며 게임 코드와 계정 데이터는 수정하지 않았습니다. 브라우저 아이콘은 `work/assets/icons/original/puppyred_install.ico`를 홈페이지 폴더로 복사했습니다.
