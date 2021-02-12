import React from 'react'
import { Descriptions, Button } from 'antd';
import Axios from 'axios';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../../../_actions/user_actions'
function ProductInfo(props) {
    const dispatch = useDispatch();

    const ClickHandler = () => {
        //필요한 정보를 Cart 필드에 넣어줌
        //데이터를 백엔드에 전달하지 않고 바로 던질거임
        //리덕스로 해서 값을 던집시다.
        dispatch(addToCart(props.detail._id))
    }

    return (
        <div>
            <Descriptions
                title="사진정보"
                bordered
            >
                <Descriptions.Item label="업로드 날짜" span={2}>{props.detail.createdAt}</Descriptions.Item>
                <Descriptions.Item label="조회수" span={2}>{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>{props.detail.description}</Descriptions.Item>
            </Descriptions>

        </div>
    )
}

export default ProductInfo
