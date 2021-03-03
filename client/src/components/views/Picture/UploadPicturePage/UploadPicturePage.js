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
        if (!Name || !Description || !Image) {
            return alert("모든 값이 입력되어야 합니다.");
        }
        const body = {
            writer: props.user.userData._id,
            title: Name,
            description: Description,
            images: Image,

        }
        //서버에 값 전달
        Axios.post("/api/picture/save", body)
            .then(response => {
                if (response.data.success) {
                    alert("사진 업로드에 성공했습니다.")
                    props.history.push("/picture");
                } else {
                    alert("사진 업로드에 실패했습니다.")
                }
            })


    }
    useEffect(() => {
        if (type === 'update') {
            Axios.get(`/api/picture/picturedetail?id=${pictureId}&type=single`)
                .then(response => {
                    console.log(response.data[0].images)
                    setImage(response.data[0].images)
                    setLoading(false);
                })
                .catch(err => alert(err))
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
                                확인
                </Button>

                        </Form>

                    </div>
            }
        </>

    )
}

export default UploadPicturePage
