import React, { useEffect, useMemo, useState } from 'react'
import PropType from 'prop-types';
import { Collapse, Row,DatePicker, Button} from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const dateFormat = 'YYYY/MM/DD';

const today = new Date();
const oneMonthAgo = new Date(today.getFullYear(),today.getMonth()-1,today.getDate())

function SearchDateRange(props) {
    const [startDate, setStartDate] = useState(oneMonthAgo);
    const [endDate, setEndDate] = useState(today);
    // useEffect(() => {
    // }, [])
    const onRangePickerHandler =(date,str)=>{
        setStartDate(str[0]);

        let endTime = new Date(str[1]);
        endTime.setHours(23);
        endTime.setMinutes(59);
        endTime.setSeconds(59);
        setEndDate(endTime);
        str[1] = endTime;
        
        props.onRangePicker(str)
    }
    return (
        <div>
            <Collapse>
                <Panel header="기간 선택" key="1">
                    <Row gutter={[16, 16]}>
                        <RangePicker
                            style={{display:'flex', justifyContent:'center'}}
                            defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
                            format={dateFormat}
                            size="large"
                            onChange={onRangePickerHandler}
                        />
                    </Row>
                </Panel>
            </Collapse>
        </div>
    )
}

SearchDateRange.propTypes={
    onRangePicker : PropType.func
}

export default SearchDateRange
