# 블로그 페이지 제작
## 쇼핑클론 + 유튜브 클론 + 보일러 플레이트
- node.js
- React.js
- MongoDB

### 2021-02-12 페이지, 기능 병합
- FISRT INIT
- 사진 갤러리, 동영상 갤러리 기능 분할
- Picture route, Model 추가
- 접속자 정보는 redux로 관리
![image](https://user-images.githubusercontent.com/45280952/107959791-2beccd80-6fe7-11eb-8818-7be91d37957b.png)

### 2021-02-15
- 게시판 기능 추가
- 신규입력은 모달로 처리
- react-lines-ellipsis 설치
- 사진 목록
- 영상 목록
![image](https://user-images.githubusercontent.com/45280952/107959668-0bbd0e80-6fe7-11eb-9cbd-a64c251c3dfc.png)

- 
    ##### mongoDB  order by desc
    1. COLLECTION_MODEL.sort({컬럼명 : -1}) 
    2. COLLECTION_MODEL.find({$query :{}, $orderby :{컬럼명 : -1}})
- 목록
![image](https://user-images.githubusercontent.com/45280952/107959288-93564d80-6fe6-11eb-895f-978a7fd32fbf.png)
- 모달
![image](https://user-images.githubusercontent.com/45280952/107959336-a1a46980-6fe6-11eb-9aa0-85817a327663.png)

- 상세보기도 모달로 제작함
- textArea로 받은 개행 문장들은 div - stlye - preLine으로 표시해주면 된다.
### 2021-02-17
- 메인 페이지 구역을 나눔, 사진, 동영상, 게시물
- 사진을 올리는 비율에 따라서 크기를 조정하고 싶은데 어떻게 해야할지 고민중임

### 2021-02-18
- 메인 랜딩 페이지 화면 레이아웃 완료
![image](https://user-images.githubusercontent.com/45280952/108357386-b6743d80-7230-11eb-98c8-2dcec7ede358.png)

- getBoardList는 메서드 공유로 바꿔봄
### 2021-02-22
- Landing Page 이미지 슬라이더 직접만들어서 추가함
- 비록 setTimeout으로 만든 간단한 거지만, 이미지 위치 조정가능해서 좋구만
![image](https://user-images.githubusercontent.com/45280952/108722523-9b723800-7566-11eb-8fa9-13feb953fc2a.png)

### 2021-02-23
- 사진 삭제기능 추가.

### 2021-03-08
- 사진 수정 기능 완료
- 필터 기능추가
- 프로필 메뉴바 추가
- 메인 홈 나브메뉴 추가