# YOUTUBE HUB


### 소개

- 자신의 유튜브 시청기록을 통계로 확인할 수 있는 서비스
- 비공개된 동영상 혹은 누구나 접근할 수 없는 동영상은 통계에 들어가지 않습니다.

### 개발하면서 알게된 유튜브영상 관련 자료 가져오기 

- 처음엔 youtube API를 통해 썸네일을 가져오려했지만 따로 해당 영상의 썸네일을 가져올 수 있는 주소가있었다

- 썸네일 가져오기 (기본/상하여백 o)

: https://img.youtube.com/ + id + /0.jpg

(ex. https://img.youtube.com/vi/YwC0m0XaD2E/0.jpg)

 

- 썸네일 가져오기 (기본/상하여백 x)

: https://img.youtube.com/ + id + /default.jpg

(ex. https://img.youtube.com/vi/YwC0m0XaD2E/default.jpg) 

 

- 썸네일 가져오기 (상하 여백 없는 mqdefault)

: https://img.youtube.com/ + id + /mqdefault.jpg

(ex. https://img.youtube.com/vi/YwC0m0XaD2E/mqdefault.jpg) 

 

- 썸네일 가져오기 (상하 여백없는 default, 최대 크기)

: https://img.youtube.com/ + id + /maxresdefault.jpg

(ex. https://img.youtube.com/vi/YwC0m0XaD2E/maxresdefault.jpg)
