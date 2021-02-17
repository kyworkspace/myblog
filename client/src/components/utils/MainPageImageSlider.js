import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'

function MainPageImageSlider(props) {

    const [Images, setImages] = useState([]);

    useEffect(() => {
    }, [])

    const onBeforeChange = () => {

    }
    return (
        <div>
            <Carousel autoplay
                beforeChange={onBeforeChange} >
                {props.images.map((image, i) => (
                    <div key={i} >
                        <div style={{ height: '100%', width: '100%', textAlign: 'center' }}>
                            <img src={`http://localhost:5000/${image}`} style={{ height: "300px" }} />
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>

    )
}

export default MainPageImageSlider
