# 블로그 페이지 제작
## 쇼핑클론 + 유튜브 클론 + 보일러 플레이트
- node.js
- React.js
- MongoDB

### 2021-02-12 페이지, 기능 병합
- FISRT INIT
- 사진 갤러리, 동영상 갤러리 기능 분할
- Picture route, Model 추가

### 2021-02-15
- 게시판 기능 추가
- 신규입력은 모달로 처리
- react-lines-ellipsis 설치
- 
    ##### mongoDB  order by desc
    1. COLLECTION_MODEL.sort({컬럼명 : -1}) 
    2. COLLECTION_MODEL.find({$query :{}, $orderby :{컬럼명 : -1}})
- 목록
![image](https://user-images.githubusercontent.com/45280952/107959288-93564d80-6fe6-11eb-895f-978a7fd32fbf.png)
- 모달
![image](https://user-images.githubusercontent.com/45280952/107959336-a1a46980-6fe6-11eb-9aa0-85817a327663.png)
