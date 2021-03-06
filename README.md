# WE-AR Assignment

[데모 바로가기](https://indante.github.io/we-ar_assignment/src/canvas.html)

### 목표

- [x] 캔버스 사이즈는 가로 1000, 세로 500 고정입니다.
- [x] 스테이지에 10 ~ 20개의 공이 생성됩니다.
- [x] 0 ~ 360 사이의 랜덤한 각도로 공이 날아갑니다.
- [x] 10 ~ 20px 사이의 랜덤한 반지름을 가집니다.
- [ ] 200 ~ 400px/s 사이의 랜덤한 속도를 가집니다.
- [ ] 벽과 부딪힐경우 반사각으로 튕겨져 나갑니다.
- [ ] 공과 공이 부딪힐경우 반사각으로 튕겨져 나갑니다.

### 접근 방식

- canvas 경험이 없어 [MDN 벽돌깨기](https://developer.mozilla.org/ko/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript) 튜토리얼을 진행함
- 튜토리얼을 진행하며 공이 벽에 부딪혔을 때 반사각으로 튕겨져 나오게 구현함
- OOP에 대한 경험이 없어 문서와 영상을 보며 학습하며 `class` 기반으로 리팩토링함
- 랜덤한 각도에 맞추어 일관된 x, y의 움직임을 알기 위해 사분면의 개념에 접근하여 `getMovement` 함수를 구현함
- TypeScript 경험이 없어 JavaScript로 구현 후 TypeScript로 리팩토링함
