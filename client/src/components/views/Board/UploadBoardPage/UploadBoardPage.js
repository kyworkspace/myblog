import React, { useEffect, useState } from 'react'
import { Typography, Button, Form, Input, Modal, Avatar } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { Title } = Typography;
const { TextArea } = Input;


function UploadBoardPage(props) {
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const user = useSelector(state => state.user)
    const TitileHandler = (e) => {
        setTitle(e.currentTarget.value);
    }
    const DescriptionHandler = (e) => {
        setDescription(e.currentTarget.value);
    }
    const handleOk = () => {
        console.log(user)
        if (!Title || !Description) {
            return alert("모든 값이 입력되어야 합니다.");
        }
        const body = {
            writer: user.userData._id,
            title: Title,
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
        setTitle("");
        setDescription("");
    }

    return (
        <>
            {user.userData &&

                <Modal title={[<Avatar src={user.userData.image} />, <p>게시물 업로드</p>]} visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel} >
                    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                        <Form >
                            <label>제목</label>
                            <Input value={Title} onChange={TitileHandler} />
                            <br />
                            <br />
                            <label>설명</label>
                            <TextArea rows={15} value={Description} onChange={DescriptionHandler} />
                            <br />
                            <br />
                        </Form>
                    </div>
                </Modal>
            }
        </>
    )
}

export default UploadBoardPage
