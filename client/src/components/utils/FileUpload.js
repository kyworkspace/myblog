import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import Axios from 'axios';

/**
 * 사진을 드랍존에 떨어뜨릴 경우.
 * 루트 파일에 업로드함
 * 경로는 uploads/pictures
 * **/
const pictureInsert = (file) => {
    const formData = new FormData();
    const config = {
        header: { 'content-type': 'multipart/form-data' }
    }
    formData.append("file", file)
    return new Promise((resolve, reject) => {
        Axios.post("/api/picture/image", formData, config)
            .then(response => {
                resolve(response);
            })
    })
}


function FileUpload(props) {

    const { parentImages } = props;
    const [Images, setImages] = useState(parentImages.length > 0 ? parentImages : []);
    const dropHandler = async (files) => {
        const uploadFileList = await Promise.all(
            files.map(file => {
                return pictureInsert(file).then(response => {
                    return response.data.filePath
                });
            })
        )
        setImages([...Images, ...uploadFileList])
        props.refreshFunction([...Images, ...uploadFileList])
    }
    const deleteHandler = (image) => {
        //삭제하고자하는 이미지 인덱스
        const currentIndex = Images.indexOf(image);
        //기존 이미지 복사
        let newImages = [...Images]
        //삭제
        newImages.splice(currentIndex, 1);
        //덮어씌움
        setImages(newImages)
        //부모 컴포넌트에 값 전달
        props.refreshFunction(newImages);
    }


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Dropzone onDrop={dropHandler}>
                    {({ getRootProps, getInputProps }) => (
                        <div
                            style={{
                                width: 600, height: 200, border: '1px solid lightgray',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}

                            {...getRootProps()}
                        >
                            <input {...getInputProps()} accept='image/*' />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />
                            이미지를 올려주세요
                        </div>
                    )}
                </Dropzone>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', width: '600px', height: '240px', overflow: 'scroll', overflowY: 'hidden' }}>
                    {Images.map((item, index) => (
                        <div key={index} onClick={() => deleteHandler(item)}>
                            <div style={{ display: 'flex', justifyContent: "center", margin: '20px', backgroundColor: 'grey', borderRadius: "20px", minHeight: '200px' }}>
                                <img style={{ minWidth: '150px', width: '250px', minHeight: '120 px', maxHeight: '200px' }}
                                    src={`http://localhost:5000/${item}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FileUpload