# 퍼피레드 홈페이지 관리 방법

홈페이지: https://jjubugi13.github.io/puppyred/

저장소: https://github.com/jjubugi13/puppyred

홈페이지 방문자는 읽기만 가능합니다. 편집기는 내 PC로 JSON 파일을 저장하는 도구이며, 저장소 주인이 GitHub에 올려야 홈페이지가 바뀝니다. 별도 서버·DB·유료 서비스가 필요하지 않습니다.

## 이번 수정본 올리기

1. 받은 홈페이지 ZIP을 압축 해제합니다. ZIP 자체를 GitHub에 올리는 것이 아닙니다.
2. index.html, assets, data, tools, README.md가 보이는 폴더를 엽니다.
3. 저장소 첫 화면에서 **Add file → Upload files**를 누릅니다. 좁은 화면에서는 Add file 대신 **+** 버튼일 수 있습니다.
4. 2번 폴더 **안의 내용**을 업로드 영역에 드래그합니다. 바깥 폴더 자체를 올리면 경로가 한 겹 더 생기므로 주의하세요. index.html이 저장소 첫 화면에 있어야 합니다.
5. 업로드 완료 후 설명에 ‘홈페이지 공지와 안내 수정’을 적고 **Commit directly to the main branch → Commit changes**를 누릅니다.
6. **Actions**에서 Pages 배포가 완료되면 홈페이지에서 **Ctrl + F5**로 새로고침합니다. 이미 Pages를 켰다면 Settings는 다시 바꿀 필요가 없습니다.

## 공지와 패치를 가장 쉽게 수정하는 방법

이 수정본을 업로드한 뒤 아래 주소를 즐겨찾기하세요.

**https://jjubugi13.github.io/puppyred/tools/editor.html**

1. 편집기에서 **홈페이지 공지 불러오기** 또는 **홈페이지 패치 불러오기**를 누릅니다. 항상 최신 목록을 먼저 불러오세요.
2. **수정할 글**에서 글을 선택합니다.
3. 제목·한국 시간 기준 게시 날짜·본문을 바꿉니다. 추가는 **새 글 추가**, 삭제는 **선택한 글 삭제**입니다.
4. **수정한 JSON 파일 저장**을 누릅니다. 공지는 notices.json, 패치는 patches.json입니다. 파일명에 (1)이 붙었다면 지워 주세요.
5. [GitHub data 폴더](https://github.com/jjubugi13/puppyred/tree/main/data)를 엽니다.
6. **Add file → Upload files**에서 방금 저장한 JSON 파일 하나를 올립니다.
7. **Commit changes**로 저장하고 Pages 배포 완료 후 홈페이지를 새로고침합니다.

편집기에서 저장만 하면 홈페이지는 바뀌지 않습니다. 반드시 **data 폴더에 같은 이름으로 업로드**해야 합니다. JSON 하나에는 목록 전체가 들어 있습니다. 오래된 파일을 올리면 새 글이 사라질 수 있으므로 항상 최신 목록으로 작업하세요.

내 PC에서는 tools/editor.html을 더블클릭하고 **내 PC의 JSON 파일 열기**로 data/notices.json 또는 data/patches.json을 선택합니다.

### 사진

본문의 `![설명](./assets/notices/사진이름.png)` 줄이 사진입니다. 기존 사진을 유지하려면 그 줄을 남겨두세요. 새 사진은 GitHub의 assets/notices 폴더에 먼저 올리고 같은 형식으로 적습니다. 파일명은 guide-1.png처럼 영문·숫자·하이픈을 사용하고 대소문자를 맞춰 주세요.

### 날짜·공개 여부

- 설치 안내는 1번째, 이용 전 읽어주세요는 2번째에 상단 고정됩니다. 새 글을 등록해도 두 글은 내려가지 않습니다. 편집기의 **상단 고정**에서 순서를 바꿀 수 있습니다. 같은 고정 위치를 다른 글에 지정하면 기존 글의 해당 고정은 해제됩니다.
- 나머지 공지는 게시 날짜가 최신인 순서로 자동 정렬됩니다. 한 페이지에 5개씩 표시하며 6개부터 다음 페이지가 생깁니다.
- 같은 날짜·시간의 글은 고유 ID 순서로 정렬됩니다. 순서를 조정하려면 시간을 다르게 적으세요.
- ‘비공개 초안’과 미래 날짜의 글은 현재 목록에 나타나지 않습니다. 예약 시각이 지난 뒤 페이지를 불러오면 표시됩니다.
- 게임 공지와 홈페이지 공지는 자동 연동되지 않습니다. 한쪽을 바꾸면 다른 쪽도 따로 수정해야 합니다.

## 이용 안내·설치 가이드·FAQ의 문장 바꾸기

1. [index.html 편집](https://github.com/jjubugi13/puppyred/edit/main/index.html)을 엽니다.
2. 편집칸을 클릭하고 **Ctrl + F**로 바꿀 문장을 찾습니다. 예: ‘다른 서비스와 같은 비밀번호’.
3. 문장만 바꿉니다. `<p>`, `</p>`, `<h3>` 같은 괄호 부분은 남겨두세요.
4. **Commit changes → Commit directly to the main branch → Commit changes**로 저장합니다.

예: `<p>다른 서비스와 같은 비밀번호를 사용하지 마세요.</p>`에서 가운데 한글 문장만 수정하면 됩니다.

다운로드 상자의 ‘배포 정보 확인’ 등 상태에 따라 달라지는 문구는 assets/app.js에서 검색해 수정합니다. 색상·크기·간격은 assets/styles.css입니다.

FAQ 사진은 assets/help 폴더에 같은 이름으로 새 사진을 올리면 교체됩니다.

| 사진 | 파일명 |
| --- | --- |
| 구성요소 등록 오류 | component-registration.png |
| 중복 실행 오류 | duplicate-launch.png |
| 서버 연결 오류 | server-unavailable.png |

## 다운로드 버튼 주소

[data/site.json 편집](https://github.com/jjubugi13/puppyred/edit/main/data/site.json)에서 관리합니다.

```json
{
  "sample": false,
  "downloadEnabled": true,
  "releaseUrl": "https://github.com/jjubugi13/puppyred/releases/latest"
}
```

설치 EXE는 **Releases**에 첨부합니다. 홈페이지 파일 업로드 영역에는 올리지 마세요. 위 주소는 최신 정식 릴리스로 연결됩니다. 방문자는 **Assets → PuppyRedSetup.exe**로 받습니다. 다운로드를 잠시 막으려면 downloadEnabled를 false로 바꿉니다.

## 실수했을 때

- 저장 전이면 **Cancel changes**로 취소합니다.
- 저장 후라면 파일의 **History**에서 정상인 이전 내용을 확인하고 복사해 편집 화면에 붙여 넣은 뒤 Commit changes로 다시 저장합니다.
- 화면이 그대로면 **Actions**에서 Pages 배포 완료 여부를 보고 Ctrl + F5를 누릅니다.
- 공지가 안 보이면 초안 체크와 게시 날짜를 확인합니다. JSON을 직접 수정했다면 쉼표·따옴표 오류도 확인합니다.

## 처음 GitHub Pages를 켜는 방법

1. 공개 저장소 이름을 puppyred로 만듭니다.
2. index.html과 폴더들을 저장소 루트에 올립니다.
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch**를 선택합니다.
4. **Branch: main**, 폴더 **/(root)**를 선택하고 **Save**를 누릅니다.
5. 배포 완료 후 https://계정명.github.io/puppyred/ 로 접속합니다.

페이지·사진·JSON·스크립트가 상대 경로이므로 /puppyred/에서도 동작합니다. 빌드나 패키지 설치가 필요하지 않습니다.

## 옮긴 게임 공지의 출처

게임 화면과 제목이 일치하는 보존 서버 백업에서 일반 안내·가이드 4개, 패치 글 4개와 사진 13개를 옮겼습니다. 상단에는 홈페이지 설치 안내 1개를 추가했습니다. 이용 전 안내의 예전 비공개 배포 문구와 문의 경로만 현재 홈페이지·오픈채팅에 맞췄습니다. 패치 글은 당시 게시 기록이며 현재 모든 현상이 그대로 남아 있다는 의미가 아닙니다.

## 개발 확인

`node tools/check.mjs`로 JSON, 날짜 정렬, 페이지 나누기, 주소 제한, 사진 경로 등을 확인합니다. JavaScript가 꺼져 있으면 고정 안내만 읽을 수 있고 공지·패치·다운로드 설정은 불러올 수 없습니다.
