import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Card, Icon, Col, Row, List, Avatar, Button } from 'antd'
import UploadBoardPage from '../UploadBoardPage/UploadBoardPage';
import LinesEllipsis from 'react-lines-ellipsis'
import DetailBoardPage from '../DetailBoardPage/DetailBoardPage';

export const getBoardList = (body) => {
    return new Promise((resolve, reject) => {
        Axios.post("/api/board/list", body)
            .then(response => {
                resolve(response.data)
            })
    })
}

function BoardLandingPage(props) {
    const [BoardContents, setBoardContents] = useState([]);
    const [Skip, setSkip] = useState(0) //호출 인덱스
    const [Limit, setLimit] = useState(5) //페이지당 출력갯수
    const [PostSize, setPostSize] = useState(0) // 목록에 보이는 배열 갯수
    const [SearchTerm, setSearchTerm] = useState("")
    const [IsModalVisible, setIsModalVisible] = useState(false); //게시판 글올리기 모달 플래그
    const [IsDetailModalVisible, setIsDetailModalVisible] = useState(false) //상세보기 모달 오픈 플래그
    const [DetailViewItem, setDetailViewItem] = useState({}); //상세보기 아이템

    useEffect(() => {
        //필터값이 들어간 바디
        uploadBoardReRendering();
    }, [])

    const uploadBoardReRendering = () => {
        let body = {
            skip: Skip,
            limit: Limit,
        }
        getBoardList(body).then(response => {
            if (response.success) {
                setBoardContents([...BoardContents, ...response.boardList])
                setPostSize(response.postSize) //더보기 버튼을 보여줄지 말지
            } else {
                alert("게시판 목록 정보를 불러오는데 실패하였습니다.")
            }
        })
    }

    const loadMoreHandler = () => {
        //SKIP과 LIMIT은 State로 관리
        //버튼을 누를때마다 Skip을 관리해서 값을 던져움

        let skip = Skip + Limit;

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getBoardList(body)
            .then(response => {
                if (response.success) {
                    setBoardContents([...BoardContents, ...response.boardList])
                    setPostSize(response.postSize) //더보기 버튼을 보여줄지 말지
                } else {
                    alert("게시판 목록 정보를 불러오는데 실패하였습니다.")
                }
            })
        setSkip(skip);
    }
    const onBoardUploadModalHandler = (flag) => {
        setIsModalVisible(flag);
    }
    const onBoardDetailModalHandler = (flag) => {
        setIsDetailModalVisible(flag)
    }
    const onDetailBoardModalView = (item) => {
        setIsDetailModalVisible(true)
        setDetailViewItem(item);
    }
    const renderBoardList = BoardContents.map((item, idx) => {
        let date = new Date(item.createdAt);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return (
            <>
                <div style={{ marginTop: '1rem' }} />
                <a key={idx} onClick={() => onDetailBoardModalView(item)}>
                    <Card
                        hoverable
                    >
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.writer.image} />}
                                title={[item.title, <div style={{ textAlign: "right", float: "right" }}>{year + "-" + month + "-" + day}</div>]}
                                description={<LinesEllipsis
                                    text={item.description}
                                    maxLine='3'
                                    ellipsis='...'
                                    trimRight
                                    basedOn='letters'
                                />
                                }
                            />
                        </List.Item>
                    </Card>
                </a>
            </>
        )
    })


    //  Filter

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>게시판<Icon type="rocket" /></h2>
            </div>
            {/* Filter */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}

                </Col>
            </Row>
            {/* Search */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
            </div>
            {/* 글쓰기 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <Button onClick={() => onBoardUploadModalHandler(true)}>새로운 글쓰기</Button>
            </div>
            {/* Card */}
            <Row gutter={[16, 16]}>
                <Col lg={18}>
                    <div style={{ height: '100vh' }}>
                        {renderBoardList}

                        {PostSize >= Limit &&
                            <div style={{ justifyContent: 'center', textAlign: "center" }}>
                                <button onClick={loadMoreHandler}>더보기</button>
                            </div>
                        }
                    </div>
                </Col>
                <Col lg={6}>
                    <List.Item>
                        <List.Item.Meta
                            title={"개인 인적 사항"}
                            description={"인적사항"}
                        />
                    </List.Item>
                </Col>
            </Row>
            <UploadBoardPage isModalVisible={IsModalVisible} ModalHandler={onBoardUploadModalHandler} UploadHandler={uploadBoardReRendering} />
            {IsDetailModalVisible
                && <DetailBoardPage isModalVisible={IsDetailModalVisible} ModalHandler={onBoardDetailModalHandler} item={DetailViewItem} />}

        </div>
    )
}

export default BoardLandingPage
