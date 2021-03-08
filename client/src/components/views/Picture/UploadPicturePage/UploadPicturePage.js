import React, { useEffect, useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../../utils/FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;


function UploadPicturePage(props) {
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Image, setImage] = useState([]);
    const [Loading, setLoading] = useState(true)
    const [action, setAction] = useState("저장");

    const { type, pictureId } = props.match.params

    const TitileHandler = (e) => {
        setName(e.currentTarget.value);
    }
    const DescriptionHandler = (e) => {
        setDescription(e.currentTarget.value);
    }
    const updateImages = (newImages) => {
        setImage(newImages);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        if (Image.length === 0) {
            return alert("사진을 등록해주세요.")
        }
        console.log(Image)
        if (!Name || !Description) {
            return alert("내용이 입력되어야 합니다.");
        }
        let api;
        let body = {};
        if (type === 'upload') {
            api = '/api/picture/save'
            body = {
                writer: props.user.userData._id,
                title: Name,
                description: Description,
                images: Image,
            }
        } else {
            api = '/api/picture/update'
            body = {
                pictureId: props.match.params.pictureId,
                writer: props.user.userData._id,
                title: Name,
                description: Description,
                images: Image,
            }
        }
        //서버에 값 전달
        Axios.post(api, body)
            .then(response => {
                if (response.data.success) {
                    alert(`사진 ${action}에 성공했습니다.`)
                    props.history.push("/picture");
                } else {
                    alert(`사진 ${action}에 실패했습니다.`)
                }
            })


    }
    useEffect(() => {
        if (type === 'update') {
            Axios.get(`/api/picture/picturedetail?id=${pictureId}&type=single`)
                .then(response => {
                    setImage(response.data[0].images)
                    setLoading(false);
                    setName(response.data[0].title)
                    setDescription(response.data[0].description)
                })
                .catch(err => alert(err))
            setAction("수정")
        } else {
            setLoading(false);
        }
    }, [])

    return (
        <>
            {
                Loading
                    ?
                    <div>로딩중....</div>
                    :
                    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <Title>{
                                type === 'upload' ?
                                    '사진 업로드'
                                    : '사진 업데이트'
                            }</Title>
                        </div>
                        <Form onSubmit={submitHandler}>
                            {/* DROP ZONE */}
                            <FileUpload refreshFunction={updateImages} parentImages={Image} />
                            <br />
                            <br />
                            <label>제목</label>
                            <Input value={Name} onChange={TitileHandler} />
                            <br />
                            <br />
                            <label>설명</label>
                            <TextArea value={Description} onChange={DescriptionHandler} />
                            <br />
                            <br />
                            <Button type="submit" onClick={submitHandler}>
                                {
                                    type === 'upload' ?
                                        '저장'
                                        : '수정'
                                }
                            </Button>

                        </Form>

                    </div>
            }
        </>

    )
}

export default UploadPicturePage
