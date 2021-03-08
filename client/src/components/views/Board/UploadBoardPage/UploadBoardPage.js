import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";
import { Typography, Button, Form, Input, Modal, Avatar } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { Title } = Typography;
const { TextArea } = Input;


function UploadBoardPage(props) {
    const [Description, setDescription] = useState("");
    const user = useSelector(state => state.user)
    const DescriptionHandler = (e) => {
        setDescription(e.currentTarget.value);
    }
    const handleOk = () => {
        console.log(user)
        if(!user.userData.isAuth){
            alert("로그인을 해주세요.")
            props.history.push('/login')
            return;
        }
        if (!Description) {
            return alert("내용을 입력해주세요.");
        }
        const body = {
            writer: user.userData._id,
            description: Description,
        }
        // 서버에 값 전달
        Axios.post("/api/board/save", body)
            .then(response => {
                if (response.data.success) {
                    alert("게시물 업로드에 성공했습니다.")
                    props.UploadHandler()
                    props.ModalHandler(false);
                    modalReset();
                } else {
                    alert("게시물 업로드에 실패했습니다.")
                }
            })
    }
    const handleCancel = () => {
        props.ModalHandler(false);
        modalReset();
    }
    const modalReset = () => {
        setDescription("");
    }

    return (
        <>
            {user.userData &&
                <Modal title={[<Avatar src={user.userData.image} />, <p>게시물 업로드</p>]} visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel} >
                    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                        <Form >
                            <br />
                            <label>설명</label>
                            <TextArea rows={15} value={Description} onChange={DescriptionHandler} placeholder="오늘 하루는 어떠셨나요?"/>
                            <br />
                            <br />
                        </Form>
                    </div>
                </Modal>
            }
        </>
    )
}

export default withRouter(UploadBoardPage)
