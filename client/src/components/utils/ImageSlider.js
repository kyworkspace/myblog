import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'

function ImageSlider(props) {

    const [Images, setImages] = useState([]);

    useEffect(() => {
    }, [])

    const onBeforeChange = () => {

    }
    return (
        <div>
            <Carousel autoplay
                beforeChange={onBeforeChange}>
                {props.images.map((image, i) => (
                    <div key={i} >
                        <img src={`http://localhost:5000/${image}`} style={{ width: "100%", height: "150px" }} />
                    </div>
                ))}
            </Carousel>
        </div>

    )
}

export default ImageSlider
