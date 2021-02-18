import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Card, Icon, Col, Row, Typography, List, Avatar } from 'antd'
import MainPageImageSlider from './Sections/MainPageImageSlider';
import { getBoardList } from '../Board/BoardLandingPage/BoardLandingPage'
import { skips } from 'debug';
import LinesEllipsis from 'react-lines-ellipsis';

const { Title } = Typography;

function LandingPage() {
    const [Pictures, setPictures] = useState([]);
    const [Video, setVideo] = useState({});
    const [BoardContents, setBoardContents] = useState([])
    const [Loading, setLoading] = useState(true);
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    });
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        //필터값이 들어간 바디
        getContents()
    }, [])

    const getContents = () => {
        //사진 불러오는 조건
        let body = {
            limit: 10,
        }
        Axios.post("/api/picture/pictures", body)
            .then(response => {
                if (response.data.success) {
                    let picCnt = 0;
                    let pics = [];
                    response.data.pictureInfo.forEach(item => {
                        if (item.images) {
                            item.images.forEach(image => {
                                // let obj = new Object()
                                // obj.url = image
                                // pics.push(obj);
                                pics.push(image);
                                picCnt++;
                            })
                        }
                    })
                    setPictures(pics)
                    //최근사진 10개
                } else {
                    alert("사진을 불러오는데 실패하였습니다.")
                }
            })
        //동영상 불러오는 조건
        body = {
            limit: 1,
        }
        Axios.post("/api/video/getVideos", body)
            .then(response => {
                if (response.data.success) {
                    setVideo(response.data.videos[0])
                } else {
                    alert("동영상을 불러오는데 실패했습니다.")
                }
            })
        body = {
            limit: 5,
            skip: 0
        }
        getBoardList(body).then(response => {
            if (response.success) {
                console.log(response.boardList)
                setBoardContents(response.boardList)
            } else {
                alert("게시물을 불러오는데 실패하였습니다.")
            }
        })

        //로딩끝
        setLoading(false)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>게시판 모아보기<Icon type="rocket" /></h2>
            </div>
            {
                Loading ?
                    <div>로딩중</div>
                    :
                    <>
                        <Row gutter={[16, 16]}>
                            <Col lg={12} xs={24}>
                                최근 등록된 사진 사진 게시판으로 이동
                        <MainPageImageSlider images={Pictures} />
                            </Col>
                            <Col lg={12} xs={24}>
                                <div style={{ width: "100%", height: "100%" }}>
                                    <Title level={3}>{Video.title}</Title>
                                    <video style={{ height: '300px' }} src={`http://localhost:5000/${Video.filePath}`} controls />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col lg={24} xs={24}>
                                최근 등록된 게시물
                                <List
                                    itemLayout="horizontal"
                                    dataSource={BoardContents}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.writer.image} />}
                                                title={item.title}
                                                description={<div style={{ width: "100vh", height: "50px", whiteSpace: 'pre-line', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</div>}
                                            />
                                        </List.Item>

                                    )}
                                />
                            </Col>
                        </Row>
                    </>
            }

        </div >
    )
}

export default LandingPage
