## 웹팩

작성한 코드를 하나의 파일로 번들링하기 위해 사용합니다

## 바벨

Jest 에서 ESM 을 사용할 수 없기 때문에, 트랜스파일링이 필요합니다 <br/>
`@babel/plugin-transform-modules-commonjs` 플러그인을 이용하기 위해 바벨을 추가했습니다 <br/>
Jest 가 실행될때, `babel.config.js` 가 존재한다면 자동으로 transpiling 해줍니다
