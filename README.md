## 목차
1. [소개](#github-actions)
2. [Actions](#actions)
    * [add-deploy-path-to-readme-based-on-path](#add-deploy-path-to-readme-based-on-path)
    * [build-by-path](#build-by-path)
    * [get-build-target-fullpaths](#get-build-target-fullpaths)
    * [move-build-output-to-parent-directory](#move-build-output-to-parent-directory)
3. [사용한 도구들](#사용한-도구들)
    * [웹팩](#웹팩)
    * [바벨](#바벨)


# Github Actions

[CodeReview](https://github.com/Awesome-Tomato/CodeReview) 레포지토리 등 <br>
`Awesome-Tomato` 에서 사용할 깃헙 액션들입니다


## Actions

### add-deploy-path-to-readme-based-on-path
`fullpaths` 들을 받아서, 해당 구현체의 배포 링크를 구하고<br>
프로젝트의 `README.md` 에 배포 링크를 추가합니다

#### inputs
- `fullpaths` : README.md 에 기재될 프로젝트 구현체들의 절대 경로 목록입니다 <br>
                ex) `["/abc/project1/maetdol", "/abc/project1/maetdol_react", "/abc/project2/maetdol"]`
- `projectBaseUrl` : 각 배포 링크에 포함될 base url 입니다 <br>
                     ex) `"https://awesome-tomato.github.io/CodeReview"`
#### outputs
- 없음

---

### build-by-path
`fullpaths` 들을 받아서, 각 구현체의 `package.json`가 있을 경우, `build` 커맨드를 실행합니다

#### inputs
- `fullpaths` : 빌드할 구현체의 절대 경로 목록입니다 <br>
                ex) `["/abc/project1/maetdol", "/abc/project1/maetdol_react", "/abc/project2/maetdol"]`
#### outputs
- 없음

---

### get-build-target-fullpaths
배포해야 하는 구현체들의 절대경로들을 가져옵니다

#### inputs
- `workspace` : 작업을 수행할 레포지토리의 루트 절대경로입니다 <br>
                ex) ${{ github.workspace }}
#### outputs
- `projectPaths` : 배포해야하는 구현체들의 절대경로 목록입니다 <br>
                   ex) `["/abc/project1/maetdol", "/abc/project1/maetdol_react", "/abc/project2/maetdol"]`

---

### move-build-output-to-parent-directory
빌드한 컨텐츠들을 부모 폴더로 이동합니다 <br>
`빌드` 의 기준은 `build`, `.next`, `dist` 폴더를 의미합니다. 필요시 추가 바랍니다

#### inputs
- `fullpaths` : 빌드 컨텐츠를 옮길 구현체의 절대경로 목록입니다 <br>
                ex) `["/abc/project1/maetdol", "/abc/project1/maetdol_react", "/abc/project2/maetdol"]`
#### outputs
- 없음

---

## 사용한 도구들

### 웹팩

작성한 코드를 하나의 파일로 번들링하기 위해 사용합니다

### 바벨

Jest 에서 ESM 을 사용할 수 없기 때문에, 트랜스파일링이 필요합니다 <br/>
`@babel/plugin-transform-modules-commonjs` 플러그인을 이용하기 위해 바벨을 추가했습니다 <br/>
Jest 가 실행될때, `babel.config.js` 가 존재한다면 자동으로 transpiling 해줍니다
