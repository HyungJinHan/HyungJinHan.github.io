# HyungJin's Tech Blog

안녕하세요! 개발과 학습 내용을 기록하고 공유하는 개인 블로그입니다. 이 블로그는 [Jekyll](https://jekyllrb.com/)과 [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy/) 테마를 기반으로 구축되었습니다.

## 📚 블로그 주요 내용

이 블로그는 주로 다음과 같은 기술 및 학습 내용을 다룹니다.

- **알고리즘**: 다양한 알고리즘 문제 풀이 및 개념 설명
- **프로그래밍 언어**: C, JavaScript 등 특정 언어의 문법, 특징 및 활용
- **컴퓨터 과학**: 자료구조, 네트워크, 객체 지향 프로그래밍, 웹 개발 등 컴퓨터 과학의 핵심 개념
- **디자인 패턴**: 소프트웨어 설계 시 자주 사용되는 디자인 패턴에 대한 이해와 적용
- **DevOps**: AWS, Docker 등 개발 및 운영 환경 구축 관련 기술
- **Notion 연동 포스트**: Notion에서 정리한 학습 노트 및 기타 기술 관련 글

## 🚀 로컬에서 실행하기

로컬 환경에서 블로그를 실행하고 테스트하려면 다음 명령어를 사용하세요.

```bash
# Jekyll 서버 실행 (실시간 리로드 포함)
bundle exec jekyll serve --livereload

# Bundler Gem 업데이트
bundle update
```

## ✍️ 포스팅 가이드

이 블로그에 글을 게시하는 방법은 크게 두 가지가 있습니다.

### 1. Notion을 통한 포스팅

> 이 자동화 프로세스를 위해 레포지토리 Secrets에 `NOTION_TOKEN`과 `DATABASE_ID`가 설정하여 사용했습니다.

해당 포스팅(`_posts/notion-post`)은 Notion 데이터베이스를 통해 관리되며, 자동화된 워크플로우를 통해 블로그에 게시됩니다.

1.  **Notion에 글 작성**: 지정된 Notion 데이터베이스에 새로운 글을 작성하고 `published` 속성을 체크합니다.
2.  **배포 스크립트 실행**: GitHub Actions 워크플로우 (`.github/workflows/pages-deploy-notion.yml`)가 노션 페이지의 트리거 코드 실행을 통해 `_scripts/notion-import.js` 스크립트를 실행합니다.
3.  **포스트 생성 및 커밋**: 스크립트는 Notion API를 통해 글을 가져와 마크다운 파일로 변환하고, 관련 이미지를 다운로드한 후, 레포지토리에 자동으로 커밋합니다.
4.  **자동 배포**: 새로운 커밋이 `main` 브랜치에 푸시되면, 또 다른 GitHub Actions 워크플로우가 사이트를 빌드하여 GitHub Pages에 배포합니다.

### 2. 코드 직접 수정을 통한 포스팅

Notion 연동 없이 직접 마크다운 파일을 생성하여 포스팅할 수도 있습니다.

1.  **마크다운 파일 생성**: `_posts` 디렉토리 내에 `YYYY-MM-DD-제목.md` 형식으로 새로운 마크다운 파일을 생성합니다.
    - 예시: `_posts/notion-post/2025-11-13-새로운-글-제목.md`
2.  **Front Matter 작성**: 파일 상단에 Jekyll의 Front Matter를 추가하여 제목, 날짜, 카테고리, 태그 등을 정의합니다.
    ```yaml
    ---
    layout: post
    title: "새로운 글 제목"
    date: 2025-11-13 10:00:00 +0900
    categories: [카테고리1, 카테고리2]
    tags: [태그1, 태그2]
    ---
    ```
3.  **내용 작성**: Front Matter 아래에 마크다운 형식으로 글 내용을 작성합니다.
4.  **커밋 및 푸시**: 변경된 파일을 Git에 커밋하고 `main` 브랜치로 푸시합니다. GitHub Actions가 자동으로 블로그를 빌드하고 배포합니다.

## 🛠️ 기타 명령어

SASS 마이그레이션 등 테마 유지보수를 위한 명령어입니다.

```bash
# SASS 마이그레이션 툴 설치
npm install -g sass-migrator

# SASS 마이그레이션 실행
sass-migrator module --migrate-deps _sass/main.scss
```

## 📄 라이선스

이 프로젝트는 [MIT][mit] 라이선스를 따릅니다.

[mit]: https://github.com/HyungJinHan/HyungJinHan.github.io/blob/main/LICENSE
