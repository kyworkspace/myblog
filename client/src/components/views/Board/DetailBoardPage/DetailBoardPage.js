import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Input, Modal, Avatar, Typography } from 'antd';



function DetailBoardPage(props) {
    const { Text } = Typography;
    const { item } = props;
    const [IsModalVisible, setIsModalVisible] = useState(false)
    useEffect(() => {
        console.log(props.item)
    }, [])
    return (
        <div>
            <Modal title={[<Avatar src={item.writer.image} />, <Text >{item.writer.name}</Text>]} visible={props.isModalVisible} onOk={() => props.ModalHandler(false)}>
                <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                    <Form >
                        <label>제목</label>
                        <br />
                        <Text>{item.title}</Text>
                        <br />
                        <br />
                        <label>설명</label>
                        <div>
                            <Text keyboard>{item.description}</Text>
                            <Text >Ant Design (keyboard)</Text>
                        </div>
                        <br />
                        <br />
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default DetailBoardPage
