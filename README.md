# 🌌 오늘의 우주는?

## 배포

### [🌌 오늘의 우주는?](https://today-s-universe.vercel.app/)

## 설명

> Three.js를 이용해 3D 우주 공간을 구현하고, 오늘의 NASA 우주 사진 정보를 알려주는 사이트

프로젝트 주제를 고민하던 중 NASA Open APIs를 알게 되었다. 단순히 API 데이터를 받아와 화면에 보여주는 방식은 이미 여러 번 해왔던 방식이라 새로운 접근이 필요하다고 생각했다. 그래서 이전부터 사용해 보고 싶었던 Three.js를 활용해 우주 배경을 구현하고, 그 위에 API로 받아온 데이터를 시각화하는 방법을 떠올렸다. 이는 직접 개발하는 나에게도 새로운 경험이 될 뿐만 아니라, 사용자에게도 색다른 경험을 줄 수 있는 방식이라고 생각했다.

## 기술

- HTML, CSS, JavaScript, Three.js, NASA Open APIs APOD, Vite, Git, GitHub

### 왜 Three.js인가?

- Three.js는 GPU 기반 게임 및 기타 그래픽 앱을 브라우저에서 바로 실행할 수 있는 JavaScript 기반의 WebGL 엔진으로, 브라우저에서 3D 장면을 그리기 위한 다양한 기능과 API를 제공한다.
- WebGL은 강력하지만 너무 로우레벨이라 개발에 시간이 오래걸리지만, Three.js는 이를 보완해 더 빠르고 직관적인 3D 웹 개발을 가능하게 하기 때문에 선택하게 되었다.

## 설계

### 타이틀

- Three.js를 이용해 오늘의 우주는? 이라는 타이틀을 보여주고 시작 버튼을 누르면 타이틀 사라진다.

### 3D 우주 배경

- 배경 별
  - Three.js를 이용해 별 랜덤 배치한다.
    - 특정 수만큼 별의 위치와 색상을 랜덤으로 설정한다.
    - 각 별마다 다른 위상으로 깜빡이도록 구현한다.
  - 카메라 기준으로 가까운 별은 크게, 작은 별은 작게 표현한다.
- 나선 은하

  - Three.js를 이용해 구현한다.
  - 팽대부
    - 은하 중심으로 별이 가장 밀집되어 있는 영역이다.
    - 늙은 별로 구성되어 있다고 가정하고, 노란빛이나 붉은빛 계열로 표현한다.
    - 중심기준으로 빛나도록 구현한다.
  - 나선팔
    - 은하의 시각적 특징을 결정하는 중요한 구조이다.
    - 중심에서 멀어질수록 어린 별이 많아 파린빛 계열로 구현한다.
    - 팔의 형태는 나선곡선 형태로 구현한다.
  - 별 분포
    - 팽대부와 나선팔을 중심으로 별이 자연스럽게 분포하도록 배치한다.

- 헹성(일단 예정)
  - Three.js를 이용해 달, 지구 또는 그냥 행성을 구현하여 궤도 표현한다.

### NASA API 호출

- NASA Open APIs APOD를 이용해 5일치 데이터를 가져온다.
- 화면에 구형태를 만들어 각 구마다 데이터를 매칭시켜 클릭시 상세 정보를 확인할 수 있도록 구현한다.

### 성능 고려

- 별 수
  - 배경 별: 1000 ~ 2000개 사이로 설정한다.
  - 은하 입자: 50000개 이하로 설정한다.

## 구현 (수정 필요)

### 타이틀 구현

처음에는 이부분도 Three.js를 이용해 구현하려고 했다. 처음 계획은 오늘의 우주는? 이라는 타이틀이 뜨고 시작 버튼을 누르면 글자의 점들이 흩어져서 배경 별이 되는걸 생각했는데 생각보다 복잡하여 간단하게 일반적인 HTML 태그를 이용해 구현하고 DOM을 조작하는 형태로 변경하였다.

### Three.js 설정

Universe 클래스는 Three.js를 기반으로 한 3D 우주 시뮬레이션의 최상위 클래스이다. 씬(Scene), 카메라(Camera), 조명(Light), 렌더러(Renderer), 포스트 프로세싱(Post-Processing)과 우주 구성 요소(별, 은하, 사진 구)를 모두 관리하고 있다.

### 배경 별 뿌리기

Stars 클래스에서 이부분을 처리한다.

### 나선 은하 구현

Galaxy 클래스에서 이부분을 처리한다.

### APOD API

간단하게 try...catch와 async...await, 그리고 fetch를 이용해 데이터를 받아오도록 구현했다.

---

## React로 전환

### 전환 이유는?

개선이나 추가 기능 구현 이전에 React로 전환하기로 결정했다. 그 이유는 React 사용을 목표로 하고 있는데 더 많은 기능을 구현하고 전환하려면 복잡할 것이라고 생각했고, React가 상태 관리와 DOM 조작을 더 간편하게 해주기 때문이다. 그리고 Three.js를 사용할 때 React 환경에서는 어떻게 활용할 수 있는지도 학습하고 싶었기 때문이다.

### 전환 과정

- React 설정

  - ⚠️ 처음해보는 작업이라 이런 방식으로 전환하는게 아닐 수 있다.
  - 버전 관리를 위해 Git 브랜치를 새로 만들어 (dev-react) 작업했다.
  - Vite를 이용해 React를 셋팅했고 순차적으로 전환하기 위해 기존 코드는 legacy 폴더 안으로 옮겨줬다.
  - React에서 Three.js를 사용하기 위해 fiber(R3F)와 drei를 설치해줬다.
    | 라이브러리 | 역할 | 필요성 |
    | ------------------ | ------------------- | ------------------------------------- |
    | @react-three/fiber | React용 Three.js 렌더러 | JSX + Hooks로 Three.js 제어 가능 |
    | @react-three/drei | R3F용 컴포넌트/유틸 | 반복 구현 없이 OrbitControls, Stars 등 바로 사용 |

- useFrame
  - React Three Fiber(R3F)에서 매 프레임마다 호출되는 훅으로, Three.js의 requestAnimationFrame과 유사하게 동작하며, 렌더 루프에 로직을 등록할 수 있다.
  - 반드시 `<Canvas>` 내부 컴포넌트에서만 사용 가능하다. 이걸 모르고 외부에서 호출했다가 아래와 같은 오류가 발생했었다.
    `R3F: Hooks can only be used within the Canvas component!`
- Bloom 효과

  - 기존에 나선 은하가 너무 심심해보여서 Bloom 효과를 줬었다. 이 효과 사용 방법이 React에서는 설정 방법이 조금 달랐다
  - 기존 Three.js 코드는 아래와 같다. 기존 구현에서는 EffectComposer와 UnrealBloomPass를 직접 사용하여 Bloom 효과를 추가했다.

  ```js
      setupBloom() {
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));

      this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.9, 0.8, 0.2);

      this.composer.addPass(this.bloomPass);
    }

  ```

  - React 환경(`@react-three/fiber`)에서는 `EffectComposer`를 직접 다루지 않고, `@react-three/postprocessing` 패키지를 활용하는 것이 일반적인 방법이라고 한다.

  ```tsx
  <EffectComposer>
    <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
  </EffectComposer>
  ```

## 개선할 점

- 나선 은하 수정
- 모바일 반응형
- API 데이터 표현 방법 변경
- 테스트 코드 작성
- 이미지 처리 수정
