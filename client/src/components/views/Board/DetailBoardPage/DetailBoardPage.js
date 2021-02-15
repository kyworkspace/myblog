import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';

function DetailBoardPage(props) {

    const boardId = props.match.params.boardId;

    //정보가 오브젝트 이기 때문에 {}로 받음
    const [Product, setProduct] = useState({});

    useEffect(() => {
        console.log(boardId)
        //url에서 유니크값을 가져와야함
        // Axios.get(`/api/picture/picturedetail?id=${pictureId}&type=single`)
        //     .then(response => {
        //         setProduct(response.data[0]);
        //     })
        //     .catch(err => alert(err))

    }, [])
    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>
            <br />
            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    {/* Board Information */}
                </Col>
                <Col lg={12} sm={24}>
                    {/* Comment */}
                </Col>
            </Row>
        </div>
    )
}

export default DetailBoardPage
