import React, { useState } from 'react'
import PropType from 'prop-types';
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;


function RadioBox(props) {

    const [Value, setValue] = useState(0)
    const { title } = props;

    const renderRadioBox = () => props.list && props.list.map((item, i) => (
        <React.Fragment>
            <Radio key={item._id} value={item._id}>{item.name}</Radio>
        </React.Fragment>
    ))
    const handleChange = (e) => {
        setValue(e.target.value)
        props.handlerFilters(e.target.value)
    }

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header={title}>
                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}
RadioBox.propTypes = {
    title: PropType.string,
    handlerFilters: PropType.func,
    list: PropType.array,
}


export default RadioBox
