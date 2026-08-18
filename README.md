# Park Jiyeon Portfolio — GitHub Pages Ready

정적 HTML/CSS/JS로 만든 포트폴리오입니다. 빌드 과정 없이 GitHub Pages에 바로 배포할 수 있습니다.

## 가장 먼저 바꿀 것

1. `assets/images/project-01.jpg` ~ `project-12.jpg`, `hero-wide.jpg`를 실제 이미지로 교체
2. 각 HTML 파일의 프로젝트명/설명/연도/역할 수정
3. `about.html`의 이메일을 실제 이메일로 수정

이미지 파일명은 그대로 두고 이미지만 덮어쓰면 마크업을 수정하지 않아도 됩니다.

## 구조

- `index.html` — 홈 / 자동 캐러셀 / 양방향 자동 슬라이드 / 프로젝트 그리드
- `project.html` — 주요 프로젝트 목록
- `content.html` — 콘텐츠형 작업
- `etc.html` — 개인·실험 작업
- `about.html` — 소개 / 경력 / 스킬
- `work/*.html` — 프로젝트 상세 페이지
- `assets/css/style.css` — 전체 스타일
- `assets/js/main.js` — 캐러셀 / 드래그 / 모바일 메뉴 / 스크롤 애니메이션

## GitHub Pages 올리기

1. GitHub에서 새 Repository 생성 (예: `portfolio`)
2. 이 폴더 안의 파일을 **폴더째가 아니라 내용물 기준으로** repository 최상단에 업로드
3. Repository → **Settings → Pages**
4. **Build and deployment → Source: Deploy from a branch**
5. Branch: `main`, Folder: `/(root)` → Save
6. 잠시 후 `https://깃허브아이디.github.io/portfolio/` 형태로 공개됩니다.

## 사용자 도메인

나중에 개인 도메인을 연결하려면 GitHub Pages의 Custom domain에서 설정하면 됩니다.

## 인터랙션

- Main carousel: 4.5초 자동 전환 + 마우스/터치 드래그 + 클릭 dot
- Moving Archive: 좌/우 반대 방향 무한 루프 + hover pause
- Scroll reveal: IntersectionObserver 기반
- Responsive: 780px 이하 모바일 메뉴와 1열 레이아웃
- Reduce motion: OS 접근성 설정 지원

외부 JS 라이브러리를 쓰지 않아서 GitHub Pages에서 별도 설치 없이 작동합니다.
