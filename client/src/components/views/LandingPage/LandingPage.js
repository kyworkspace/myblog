import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Card, Icon, Col, Row } from 'antd'
import ImageSlider from '../../utils/ImageSlider';
import MainPageImageSlider from '../../utils/MainPageImageSlider';
function LandingPage() {
    const [Pictures, setPictures] = useState([]);
    const [PostSize, setPostSize] = useState(0) // 목록에 보이는 배열 갯수
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
                    console.log(pics)
                    setPictures(pics)
                    //최근사진 10개
                } else {
                    alert("사진을 불러오는데 실패하였습니다.")
                }
            })
    }

    const loadMoreHandler = () => {
        //SKIP과 LIMIT은 State로 관리
        //버튼을 누를때마다 Skip을 관리해서 값을 던져움

        // let skip = Skip + Limit;

        // let body = {
        //     skip: skip,
        //     limit: Limit,
        //     loadMore: true
        // }
        // getContents(body)
        // setSkip(skip);
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>게시판 모아보기<Icon type="rocket" /></h2>
            </div>
            {/* 게시판 모아보기 */}
            <Row gutter={[16, 16]}>
                {/*  */}
                <Col lg={12} xs={24}>
                    최근 등록된 사진
                    <MainPageImageSlider images={Pictures} />
                </Col>
                <Col lg={12} xs={24}>
                    최근 등록된 동영상

                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col lg={24} xs={24}>
                    최근 등록된 게시물
                </Col>
            </Row>
        </div>
    )
}

export default LandingPage
