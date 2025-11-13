---
title: Docker & Docker Desktop
description: Mac 환경에서의 Docker 설치 및 기본 세팅 정리
categories: [DevOps, Docker]
tags: [docker, devops, infra] # TAG names should always be lowercase
pin: false
math: true
mermaid: true
published: true
done: true # 커스텀해서 만든 것
image-path: /assets/img/devops/docker/install # 이미지 공통 경로 변수
image:
  path: /assets/img/devops/docker/docker-logo-blue.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: Docker
---

> 본 게시글은 MacBook Air 15(Apple M2)를 기준으로 작성

## Docker 설치

Homebrew를 통한 Docker 설치도 가능하지만, 무엇보다 귀찮기도 하고 공식 홈페이지에 자세한 설명이 나와있는 방식인 Docker Desktop을 통한 설치를 진행하도록 하겠다.

### Docker Desktop 다운로드

[Install Docker Desktop on Mac][docker_site] 사이트를 통해 Docker Desktop 앱을 다운로드 받을 수 있다.

![install_1][install_1]

위의 이미지의 설명에 나와있듯, 해당 게시글은 M2를 기준으로 작성 중이므로, `Docker Desktop for Mac with Apple silicon`을 통해 설치를 진행한다.

다운로드 받은 파일을 실행하게 되면,

![install_2][install_2]

위와 같은 화면이 나오며, 드래그를 통해 해당 맥에 설치해주면 된다.

![install_3][install_3]{: .w-50}
_설치 후 해당 데스크탑 아이콘을 통해 Docker 설치 파일 추출하는 것은 잊지 않도록...._

### Docker Desktop 실행

![install_4][install_4]

위의 화면은 Docker Desktop을 실행한 첫 화면으로, 하단의 `Accept`로 설치를 진행하면 된다.

![install_5][install_5]

위의 화면은 그 다음 단계로, `Use recommended settings (requires password)` 체크를 통해 권장되는 설정으로 PC의 비밀번호를 이용한 접근이 가능하도록 구성하여 진행한다.

![install_6][install_6]{: .w-50}

위의 이미지와 같이, PC의 비밀번호를 이용한 접근이 가능하도록 암호를 입력하여 기본적인 설치를 완료한다.

![install_7][install_7]

위의 화면에서 확인할 수 있듯, 기존에 사용하던 Docker 계정이 있다면 로그인을 통해 사용하면 되며, 회원가입이 필요할 시에는 아래의 선택 사항에 맞춰 회원가입하여 Docker Desktop을 사용하면 된다.

## Docker 설치 확인

이제 설치를 완료했으니, 아래의 과정을 통해 설치(버전) 확인, 동작 확인 등을 체크할 예정이다.

### Docker 버전 확인

```bash
docker -v
```

위의 명령어를 입력하여,

![install_8][install_8]

위와 같이 Docker 버전이 출력된다면, 1차적으로 Docker 설치 자체는 성공적으로 완료되었다는 뜻이다.

### Docker Container 실행 테스트

간단하게 Docker Hub에 올라와 있는 Grafana image를 실행시켜 볼 예정이다.

우선 Grafana Labs에서 제공하는 [Docker image 페이지][grafana-docker]를 확인해보면,

![install_9][install_9]

위와 같이 아주 친절하게 Docker를 통한 Grafana 사용을 위한 Docker 커맨드가 있다.

```bash
docker run -d --name=grafana -p 3000:3000 grafana/grafana
```

위의 명령어를 보면, 우선 기본적으로 `grafana`라는 이름으로 컨테이너 명을 지정했으며, 포트는 3000번을 사용, `grafana/grafana` Docker image를 Pull 받아서 실행시킨다.

명령어를 실행시킬 경우,

![install_10][install_10]

위와 같이 터미널을 통해 컨테이너 실행과 이미지 pull에 대한 정보를 볼 수 있으며,

아래의 이미지와 같이 방금 터미널을 통해 실행되는 컨테이너의 정보는 Docker Desktop 앱을 통해 쉽게 정보를 확인할 수 있다.

![install_11][install_11]
_Grafana image를 통해 실행시킨 컨테이너 정보 (Port 번호 클릭을 통해 해당 페이지 접속 가능)_

![install_12][install_12]
_컨테이너 실행을 위해 Pull한 Grafana image_

위와 같이 설치 확인과 컨테이너 실행에 성공했다면, 해당 Grafana 페이지를 접속해보도록 한다.

![install_13][install_13]
_[http://localhost:3000/login](http://localhost:3000/login)_

이렇듯, 현재 실행 중인 Docker Container의 정보와 다양한 Docker image에 대한 정보 등을 쉽게 확인 할 수 있도록 만들어진 앱이 Docker Desktop이며, Docker 컨테이너 설정을 보다 더 쉽고 빠르게 진행하기 위한 `Dockerfile` 설정과 `docker-compose` 설치 및 사용법에 대해서도 추후에 포스팅 할 예정이다.

## 참고 사이트

> [Contributor9 - [Docker] Docker MacOS 환경 최초 설치 및 실행 방법: Image, Container, Registry][ref_site_1]

<!-- 이미지 -->

[install_1]: {{page.image-path}}/install_1.png
[install_2]: {{page.image-path}}/install_2.png
[install_3]: {{page.image-path}}/install_3.png
[install_4]: {{page.image-path}}/install_4.png
[install_5]: {{page.image-path}}/install_5.png
[install_6]: {{page.image-path}}/install_6.png
[install_7]: {{page.image-path}}/install_7.png
[install_8]: {{page.image-path}}/install_8.png
[install_9]: {{page.image-path}}/install_9.png
[install_10]: {{page.image-path}}/install_10.png
[install_11]: {{page.image-path}}/install_11.png
[install_12]: {{page.image-path}}/install_12.png
[install_13]: {{page.image-path}}/install_13.png

<!-- 블로그 게시글 -->

[post-title]: {{site.url}}/posts/heap

<!-- 참고 사이트 -->

[ref_site_1]: https://adjh54.tistory.com/350
[docker_site]: https://docs.docker.com/desktop/setup/install/mac-install/
[grafana-docker]: https://hub.docker.com/r/grafana/grafana-oss
