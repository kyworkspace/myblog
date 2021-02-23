import React from 'react'
import { Descriptions, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';


function PictureInfo(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const onUpdatePicture = () => {
        console.log(user);
    }
    const onDeletePicture = () => {
        let body = {
            pictureId: props.detail._id
        }
        Axios.post("/api/picture/delete", body)
            .then(response => {
                if (response.data.success) {
                    alert("삭제 성공하였습니다.")
                    props.history.push("/picture");
                } else {
                    alert("삭제 실패하였습니다.")
                }
            })
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
            <br />
            <br />
            {
                props.detail.writer._id === user.userData._id &&
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" onClick={onUpdatePicture}>수정</Button>
                    <Button type="danger" onClick={onDeletePicture}>삭제</Button>
                </div>

            }


        </div>
    )
}

export default withRouter(PictureInfo)
