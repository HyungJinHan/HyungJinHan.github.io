---
title: Docker Compose
description: Mac 환경에서의 Docker Compose 세팅 및 실제 사용 예제
categories: [DevOps, Docker]
tags: [docker, devops, infra] # TAG names should always be lowercase
pin: false
math: true
mermaid: true
published: false
private: true # 커스텀해서 만든 것
image-path: /assets/img/devops/docker/compose # 이미지 공통 경로 변수
image:
  path: /assets/img/devops/docker/docker-compose.jpeg
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: Docker Compose
---

> 본 게시글은 MacBook Air 15(Apple M2)를 기준으로 작성
>
> ![compose_1][compose_1]
>
> Docker 설치에 관련된 사항은 [#Docker & Docker Desktop][docker-install] 게시글을 참고

## Docker Compose 설치

![compose_2][compose_2]
_[dockerdocs][dockerdocs]의 공식으로 안내된 Mac 환경에서의 설치 방법_

## 참고 사이트

> [Contributor9 - [Docker] Docker MacOS 환경 최초 설치 및 실행 방법: Image, Container, Registry][ref_site_1]

<!-- 이미지 -->

[compose_1]: {{page.image-path}}/compose_1.png
[compose_2]: {{page.image-path}}/compose_2.png

<!-- 블로그 게시글 -->

[docker-install]: {{site.url}}/posts/docker-install

<!-- 참고 사이트 -->

[ref_site_1]: https://adjh54.tistory.com/350
[dockerdocs]: https://docs.docker.com/compose/install/
