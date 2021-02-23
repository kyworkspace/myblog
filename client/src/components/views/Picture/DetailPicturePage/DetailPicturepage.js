import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import PictureImage from './Sections/PictureImage';
import PictureInfo from './Sections/PictureInfo';
import { Row, Col } from 'antd';

function DetailPicturepage(props) {

    const pictureId = props.match.params.pictureId;
    //정보가 오브젝트 이기 때문에 {}로 받음
    const [Product, setProduct] = useState({});
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(pictureId)
        //url에서 유니크값을 가져와야함
        Axios.get(`/api/picture/picturedetail?id=${pictureId}&type=single`)
            .then(response => {
                setProduct(response.data[0]);
                setLoading(false);
            })
            .catch(err => alert(err))

    }, [])
    return (
        <>
            {
                Loading
                    ?
                    <div>로딩중</div>
                    :
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h1>{Product.title}</h1>
                        </div>
                        <br />
                        <Row gutter={[16, 16]}>
                            <Col lg={12} sm={24}>
                                {/* Product Image */}
                                <PictureImage detail={Product} />
                            </Col>
                            <Col lg={12} sm={24}>
                                {/* Product Info */}
                                <PictureInfo detail={Product} />
                            </Col>
                        </Row>
                    </div>
            }
        </>
    )
}

export default DetailPicturepage
