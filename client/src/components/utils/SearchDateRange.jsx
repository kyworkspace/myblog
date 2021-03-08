import React, { useEffect, useState } from 'react'
import { Collapse, Row,DatePicker, Button} from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const dateFormat = 'YYYY/MM/DD';

const today = new Date();
const oneMonceAgo = new Date(today.getFullYear(),today.getMonth()-1,today.getDate())

function SearchDateRange(props) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    // useEffect(() => {
    // }, [])
    return (
        <div>
            <Collapse>
                <Panel header="기간 선택" key="1">
                    <Row gutter={[16, 16]}>
                        <RangePicker
                            style={{display:'flex', justifyContent:'center'}}
                            defaultValue={[moment(oneMonceAgo, dateFormat), moment(today, dateFormat)]}
                            format={dateFormat}
                            size="large"
                        />
                    </Row>
                </Panel>
            </Collapse>
        </div>
    )
}

export default SearchDateRange
