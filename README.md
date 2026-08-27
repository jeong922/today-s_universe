# 🌌 Explore Universe

~~원래 프로젝트 제목은 오늘의 우주는?이지만 보여주는 데이터 때문에 우주 탐험으로 바뀌었다.~~

## 배포

### [🌌 Explore Universe](https://today-s-universe.vercel.app/)

**🚨사용한 APOD API가 자체 오류로 인해 동작하지 않을 수 있다.** (아래는 NASA API의 안내문(?))

> ⚠ Service Outage Notice: This API is currently experiencing an unscheduled outage. We are working to resolve the issue as quickly as possible. We apologize for any inconvenience.

## 설명

> Three.js를 이용해 3D 우주 공간을 구현하고, 5일치 우주 사진과 정보를 알려주는 사이트

프로젝트 주제를 고민하던 중 NASA Open APIs를 알게 되었다. 단순히 API 데이터를 받아와 화면에 보여주는 방식은 이미 여러 번 해왔던 방식이라 새로운 접근이 필요하다고 생각했다. 그래서 이전부터 사용해 보고 싶었던 Three.js를 활용해 우주 배경을 구현하고, 그 위에 API로 받아온 데이터를 시각화하는 방법을 떠올렸다. 이는 직접 개발하는 나에게도 새로운 경험이 될 뿐만 아니라, 사용자에게도 색다른 경험을 줄 수 있는 방식이라고 생각했다. ~~그리고 Three.js에 대한 로망이 있다.~~

## 기술

- HTML, CSS, JavaScript, Three.js, NASA Open APIs APOD, Vite, Git, GitHub, TypeScript, React, Framer Motion, Tailwind CSS

### 왜 Three.js인가?

- Three.js는 GPU 기반 게임 및 기타 그래픽 앱을 브라우저에서 바로 실행할 수 있는 JavaScript 기반의 WebGL 엔진으로, 브라우저에서 3D 장면을 그리기 위한 다양한 기능과 API를 제공한다.
- WebGL은 강력하지만 너무 로우레벨이라 개발에 시간이 오래걸리지만, Three.js는 이를 보완해 더 빠르고 직관적인 3D 웹 개발을 가능하게 하기 때문에 선택하게 되었다.

## 실행 방법

### 설치

저장소를 clone한 후 의존성 패키지를 설치한다.

```bash
npm install
```

### 환경변수 설정

NASA APOD API를 사용하기 위해 프로젝트 루트에 `.env.local` 파일을 생성하고 NASA API Key를 설정한다.

```env
NASA_API_KEY=YOUR_NASA_API_KEY
```

NASA API Key는 [NASA Open APIs](https://api.nasa.gov/)에서 발급받을 수 있다.

### 개발 서버 실행

Vercel Function을 포함한 전체 기능을 로컬에서 실행한다.

```bash
npm run dev:vercel
```

프론트엔드만 실행하려면 다음 명령어를 사용한다.

```bash
npm run dev
```

> `npm run dev`는 Vite 개발 서버만 실행하기 때문에 Vercel Function을 사용하는 NASA APOD API 요청은 정상적으로 동작하지 않는다.

## 화면

### 시작 화면

### 우주 배경

### 데이터 상세 모달

---

## 📜 설계

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

## 🖥️ 구현

### 타이틀 구현

- 처음에는 타이틀도 Three.js를 이용해 구현하려고 했다. `오늘의 우주는?`이라는 타이틀이 나타나고 시작 버튼을 누르면 글자를 구성하던 점들이 흩어져 배경의 별이 되는 연출을 생각했지만, 예상보다 구현이 복잡하여 일반적인 HTML 요소와 DOM을 조작하는 방식으로 변경했다.

- 이후 NASA APOD API에서 제공하는 데이터가 영어로 되어 있어 번역 기능을 추가하는 것도 고민했지만, 전체적인 언어와 분위기의 일관성을 위해 프로젝트 타이틀을 `Explore Universe`로 변경했다.

- 타이틀 화면의 시각적인 연출을 보완하기 위해 AI의 도움을 받아 Framer Motion을 활용한 애니메이션을 적용했다.

### Three.js 설정

- 초기 JavaScript 구현에서는 `Universe` 클래스를 중심으로 Scene, Camera, Light, Renderer, Post-Processing과 별, 은하 등의 요소를 관리했다. React 전환 후에는 R3F의 `Canvas`를 중심으로 각 요소를 `Starfield`, `Galaxy`, `ApodSphere` 등의 컴포넌트로 분리했다.

### 배경 별 뿌리기

- JavaScript와 Three.js로 구현했던 별 배경을 React 전환 후 R3F의 `Starfield` 컴포넌트로 다시 구현했다.

- 별의 위치와 색상을 랜덤으로 배치하고, `ShaderMaterial`을 활용해 반짝임 효과를 적용했다.

- `@react-three/drei`에서 제공하는 `Stars` 컴포넌트도 확인했지만, 별의 위치·색상과 반짝임 효과를 직접 제어하고 싶어 기존에 구현한 `Starfield`를 R3F 환경에 맞게 전환해 사용했다.

### 나선 은하 구현

- JavaScript와 Three.js로 구현했던 나선 은하를 React 전환 후 R3F의 `Galaxy` 컴포넌트로 다시 구현했다.

- `galaxyParams` props를 통해 별 개수, 크기, 반지름, 나선 팔, 회전, 색상 등을 설정할 수 있도록 구현했다.

- 50,000개의 별에 대한 위치, 색상, 크기를 계산하고, 각 별을 개별 객체로 생성하는 대신 데이터를 `Float32Array`에 저장하여 `BufferGeometry`의 attribute로 전달했다. 또한 위치와 색상 등의 데이터를 렌더링마다 다시 계산하지 않도록 생성 로직을 `useMemo`로 메모이제이션했다.
  - `Float32Array`는 32비트 부동소수점 값을 연속된 메모리 공간에 저장하는 TypedArray로, Three.js의 `BufferAttribute`를 통해 vertex 위치나 색상 등의 데이터를 GPU 버퍼로 전달하는 데 적합하다.

- 각 별에는 나선 팔(branch)과 중심에서의 거리(r)에 비례한 회전 각도(spinAngle)를 적용하고, Y축과 XZ 평면에 랜덤 오프셋을 추가해 입체적인 나선 형태를 구성했다.

- R3F의 `useFrame`을 이용해 매 프레임 은하를 조금씩 회전시키는 애니메이션을 구현했다.

### APOD API

- `fetch`를 이용해 NASA APOD 데이터를 받아왔지만, 단순히 오늘을 기준으로 이전 5일 동안의 데이터를 요청하면 특정 날짜에 데이터가 없을 경우 원하는 개수만큼 받아오지 못하는 문제가 있었다.

- 개선 방법으로 최근 날짜부터 순차적으로 데이터를 요청하고, APOD 데이터가 5개가 될 때까지 반복해서 요청하는 방식도 시도했다. 하지만 특정 날짜에 데이터가 없을 경우 추가 요청이 계속 발생하고, 원하는 개수의 데이터를 확보하기 위해 여러 번의 네트워크 요청이 필요할 수 있어 비효율적이라고 판단했다.

- 최종적으로 APOD API에서 제공하는 `count` 파라미터를 사용하면 지정한 개수의 데이터를 한 번에 요청할 수 있어 최종적으로 이 방식을 사용했다. 다만 `count`는 랜덤 APOD 데이터를 반환하기 때문에 처음 의도했던 '최근 5개의 APOD'와는 차이가 있다.

- 데이터 요청과 서버 상태 관리는 `@tanstack/react-query`를 이용해 구현했고, 데이터 요청 로직을 커스텀 훅(`useApodData`)으로 분리하여 UI와 API 요청 로직의 역할을 분리했다.

### NASA API 응답 지연에 따른 긴 로딩 시간 개선

- NASA API가 정상적으로 응답하지 않는 상황에서 약 1분 동안 로딩 화면만 표시되는 문제가 발생했다. React Query 옵션만으로는 해당 문제를 해결하기 어려워 `AbortController`와 `setTimeout`을 사용해 요청에 타임아웃을 설정하고, 일정 시간이 지나면 요청을 강제로 취소하도록 구현했다.

- 네트워크 환경이 느린 경우에도 요청이 취소될 수 있다는 점을 고려하여 최대 대기 시간을 30초로 설정했다.

```tsx
export default async function APOD(count: number = 5): Promise<ApodResponse[]> {
  const TIMEOUT_MS = 30000;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`/api/apod?count=${count}`, {
      signal: controller.signal,
    });

    // ...
  } catch (error) {
    console.error('Error fetching NASA APOD:', error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
```

- 요청이 실패하거나 타임아웃으로 취소되면 React Query의 에러 상태를 이용해 Error UI를 표시하도록 구현했다. 또한 `refetch`를 전달해 사용자가 직접 데이터 요청을 다시 시도할 수 있도록 처리했다.

```tsx
const { data, isLoading, error, refetch } = useApodData(5);

// ...

{
  isLoading && <Loading />;
}
{
  error && <Error onRetry={refetch} />;
}
```

이를 통해 NASA API의 응답이 지연되거나 일시적인 장애가 발생하더라도 로딩 화면이 계속 유지되지 않고, 일정 시간이 지나면 사용자에게 오류 상태를 안내하고 재시도할 수 있도록 개선했다.

### APOD API Key 노출 문제 개선

기존에는 `src/api/api.ts`에서 NASA APOD API를 직접 호출하고, Vite 환경변수를 통해 API Key를 사용했다.

```tsx
const response = await fetch(
  `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_API_KEY}&count=${count}`,
);
```

환경변수로 API Key를 관리하고 있었지만, Vite에서 `VITE_` 접두사가 붙은 환경변수는 클라이언트 번들에 포함되기 때문에 브라우저 개발자 도구에서 API Key를 확인할 수 있는 문제가 있었다.

이를 해결하기 위해 별도의 백엔드 서버를 구축하는 대신 Vercel Functions를 이용해 서버 측에서 NASA API를 호출하도록 구조를 변경했다.

```text
- 기존
Browser
  ↓
src/api/api.ts
  ↓ API Key를 포함해 요청
NASA APOD API


- 개선
Browser
  ↓
src/api/api.ts
  ↓ /api/apod
Vercel Function (api/apod.ts)
  ↓ API Key를 포함해 요청
NASA APOD API
```

기존 `src/api/api.ts`에서는 NASA API를 직접 호출하지 않고 Vercel Function의 `/api/apod` 엔드포인트만 호출하도록 변경했다.

```tsx
const response = await fetch(`/api/apod?count=${count}`, {
  signal: controller.signal,
});
```

프로젝트 루트의 `api/apod.ts`에 Vercel Function을 생성하고, 해당 함수에서 서버 환경변수에 저장된 API Key를 이용해 NASA APOD API를 호출하도록 구현했다.

```tsx
const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&count=${count}`, {
  signal: controller.signal,
});
```

기존 클라이언트에서 사용하던 `VITE_API_KEY`를 제거하고, Vercel Function에서만 접근하는 서버 환경변수 `NASA_API_KEY`로 분리했다. `VITE_` 접두사가 붙은 환경변수는 클라이언트에서 접근할 수 있도록 빌드 결과에 포함되지만, `NASA_API_KEY`는 Vercel Function에서 `process.env.NASA_API_KEY`를 통해 서버 측에서만 사용한다.

이를 통해 브라우저에서는 `/api/apod` 요청만 확인할 수 있고, 실제 NASA API 요청과 API Key는 Vercel Function 내부에서 처리되도록 개선했다.

### APOD 이미지 로딩 UX 개선

- NASA APOD API에서 제공하는 이미지는 날짜마다 크기와 용량이 달라, 이미지 응답이 느린 경우 상세 모달에서 이미지가 점진적으로 표시되는 문제가 있었다.

- 이미지 자체를 압축하거나 변환하는 대신, 브라우저의 이미지 로딩 방식과 UI를 개선하여 이미지가 로딩되는 동안의 사용자 경험과 레이아웃 안정성을 개선했다.

- `<img>`에 기존 `loading="lazy"`와 함께 `decoding="async"`를 적용하여 이미지 디코딩이 렌더링을 불필요하게 차단하지 않도록 했다.

```tsx
<img
  src={url}
  alt={title}
  loading='lazy'
  decoding='async'
  onLoad={() => setIsImageLoading(false)}
  onError={() => setIsImageLoading(false)}
/>
```

- 이미지 로딩 상태를 별도로 관리하여 이미지가 준비되기 전에는 Loading UI를 표시하고, 로딩이 완료되면 opacity transition을 이용해 자연스럽게 이미지가 나타나도록 구현했다.

```tsx
const [isImageLoading, setIsImageLoading] = useState(true);

{
  isImageLoading && (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-white/80' />
    </div>
  );
}
```

- 기존에는 콘텐츠 크기에 따라 모달의 높이가 달라질 수 있었기 때문에 모달 높이를 viewport 기준으로 고정하고, 내부 콘텐츠만 스크롤되도록 변경했다.

```tsx
<section className='h-[90dvh] overflow-hidden'>
  <div className='detail-scroll h-full overflow-y-auto'>{/* ... */}</div>
</section>
```

- 스크롤바가 생성되거나 사라질 때 콘텐츠 영역의 너비가 미세하게 변경되는 현상을 방지하기 위해 `scrollbar-gutter: stable`을 적용했다. 또한 우주 테마의 모달 디자인에 맞게 스크롤바 스타일을 별도로 지정했다.

```css
.detail-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
  scrollbar-gutter: stable;
}

.detail-scroll::-webkit-scrollbar {
  width: 6px;
}

.detail-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.detail-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.16);
  border-radius: 9999px;
}

.detail-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.28);
}
```

이를 통해 이미지 응답이 느린 상황에서도 현재 로딩 상태를 사용자에게 명확하게 전달하고, 이미지 로딩 및 스크롤 발생으로 인한 레이아웃 변화를 줄여 상세 모달의 사용성을 개선했다.

## React로 전환

### 전환 이유는?

개선이나 추가 기능 구현 이전에 React로 전환하기로 결정했다. 그 이유는 React 사용을 목표로 하고 있는데 더 많은 기능을 구현하고 전환하려면 복잡할 것이라고 생각했고, React가 상태 관리와 DOM 조작을 더 간편하게 해주기 때문이다. 그리고 Three.js를 사용할 때 React 환경에서는 어떻게 활용할 수 있는지도 학습하고 싶었기 때문이다.

### 전환 과정

- React 설정
  - 버전 관리를 위해 Git 브랜치를 새로 만들어 (dev-react) 작업했다.
  - React로 기존 Three.js 프로젝트를 전환하는 작업은 처음이라, 기존 코드를 한 번에 제거하지 않고 legacy 폴더에 유지한 상태에서 기능을 하나씩 옮기는 방식으로 진행했다.
  - React에서 Three.js를 사용하기 위해 fiber(R3F)와 drei를 설치해줬다.
    | 라이브러리 | 역할 | 필요성 |
    | ------------------ | ------------------- | ------------------------------------- |
    | @react-three/fiber | React용 Three.js 렌더러 | JSX + Hooks로 Three.js 제어 가능 |
    | @react-three/drei | R3F용 컴포넌트/유틸 | 반복 구현 없이 OrbitControls, Stars 등 바로 사용 |

- useFrame
  - React Three Fiber(R3F)에서 매 프레임마다 호출되는 훅으로, Three.js의 `requestAnimationFrame`과 유사하게 동작하며, 렌더 루프에 로직을 등록할 수 있다.
  - 반드시 `<Canvas>` 내부 컴포넌트에서만 사용 가능하다. 이걸 모르고 외부에서 호출했다가 아래와 같은 오류가 발생했었다.

    > R3F: Hooks can only be used within the Canvas component!

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

  ### React 전환 후 Vercel 배포 오류 해결
  - Rollup Linux 바이너리 누락 문제
    - Vercel로 배포 시도 중 아래와 같은 에러가 발생했다.
      > Error: Cannot find module '@rollup/rollup-linux-x64-gnu'Require stack: /vercel/path0/node_modules/rollup/dist/native.js
    - Rollup이 일부 네이티브 바이너리를 optional dependency로 설치하는데, Vercel Linux 환경에서는 해당 모듈을 찾지 못한 경우와 Node 환경과 로컬 환경에서 설치된 바이너리가 불일치 되서 생기는 문제라고 한다.
    - `npm install rollup@4.18.0 --save-dev`를 이용해 설치한 뒤, 다시 배포를 시도 했더니 해결 되었다.
  - SWC 네이티브 바인딩 로드 실패
    - 배포 시도 중 아래와 같은 에러가 발생했다.
      > Error: Failed to load native binding at Object.<anonymous> (/vercel/path0/node_modules/@swc/core/binding.js:333:11)
    - @swc/core 모듈의 네이티브 바이너리가 Vercel Linux 환경과 호환되지 않아서 생기는 문제라고 한다.
    - `npm install @swc/core --save-dev`를 이용해 설치한 뒤, 다시 배포를 시도 했더니 해결 되었다.

## 🚀 개선할 점

- [ ] 모바일 환경의 Three.js 렌더링 및 인터랙션 최적화
- [ ] 주요 기능 테스트 코드 작성
- [x] APOD 이미지 크기·용량 차이로 발생하는 로딩 UX 개선
- [x] NASA APOD API 장애 시 fallback UI 및 데이터 처리 개선
