import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'

function MainPageImageSlider(props) {
    let idx = 0;
    const [Images, setImages] = useState([]);
    const { images } = props;
    const [ImgSrc, setImgSrc] = useState("")

    useEffect(() => {

        const imgTimer = changeImage(images, idx)

        return () => {
            console.log('타이머종료')
            clearTimeout(imgTimer)
        }
    }, [])

    const changeImage = (arr, idx) => {
        setImgSrc(`http://localhost:5000/${arr[idx]}`)
        idx = idx + 1
        if (idx === arr.length) {
            idx = 0;
        }
        setTimeout(() => {
            changeImage(arr, idx)
        }, 3000)
    }
    return (
        <div>
            <div style={{ height: '100%', width: '100%', backgroundColor: 'grey', textAlign: 'center' }}>
                <img src={ImgSrc} style={{ height: "300px" }} />
            </div>

            {/* <Carousel autoplay
            >
                {props.images.map((image, i) => (
                    <div key={i} >
                        <div style={{ height: '100%', width: '100%', backgroundColor: 'black' }}>
                            <div style={{ textAlign: 'center' }}>
                                <img src={`http://localhost:5000/${image}`} style={{ height: "300px" }} />
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel> */}
        </div>

    )
}

export default MainPageImageSlider
