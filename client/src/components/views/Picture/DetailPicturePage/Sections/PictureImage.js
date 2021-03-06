import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function PictureImage(props) {
    const [Images, setImages] = useState([])
    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) { //등록된 이미지가 있는 경우
            let images = [];
            props.detail.images.map(item => {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default PictureImage
