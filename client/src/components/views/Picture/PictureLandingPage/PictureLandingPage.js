import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Axios from 'axios';
import { Card, Icon, Col, Row } from 'antd'
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { pictureCount } from './Sections/Datas';
import RadioBox from './Sections/RadioBox';
import SearchFeatures from './Sections/SearchFeatures';
import SearchDateRangePicker from '../../../utils/SearchDateRange';

function PictureLandingPage() {
    const [Pictures, setPictures] = useState([]);
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0) // 목록에 보이는 배열 갯수
    const [Filters, setFilters] = useState({
        pictureCount: 0,
        dateRange: [],
    });
    const [SearchDateRange, setSearchDateRange] = useState([]);
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        console.log('useEffect')
        //필터값이 들어간 바디
        let body = {
            skip: Skip,
            limit: Limit,
        }
        getPictures(body)
    }, [])

    const getPictures = (body) => {
        Axios.post("/api/picture/pictures", body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) { //더보기를 눌렀을 경우
                        //기존 배열에 스프레드 오퍼레이터를 써서 붙여줌
                        setPictures([...Pictures, ...response.data.pictureInfo])
                    } else {
                        setPictures(response.data.pictureInfo)
                    }
                    setPostSize(response.data.postSize) //더보기 버튼을 보여줄지 말지
                } else {
                    alert("상품을 불러오는데 실패하였습니다.")
                }
            })
    }

    const loadMoreHandler = () => {
        //SKIP과 LIMIT은 State로 관리
        //버튼을 누를때마다 Skip을 관리해서 값을 던져움

        let skip = Skip + Limit;

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getPictures(body)
        setSkip(skip);
    }


    const renderCards = Pictures.map((picture, i) => {
        let date = new Date(picture.createdAt);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return (
            <Col key={i} xl={6} lg={8} md={12} xs={24}>
                <a href={`/picture/detail/${picture._id}`}>
                    <Card
                        cover={<ImageSlider images={picture.images} />}
                    >
                        <Meta
                            title={picture.title}
                            description={year + "-" + month + "-" + day}
                        />
                    </Card>
                </a>
            </Col>

        )
    });

    //  Filter
    const handlerFilters =  useCallback(
        (filters, category) => {
            //넘어오는 값이 filters임
        const newFilters = { ...Filters };
        let priceValues = handlePrice(filters)
        newFilters[category] = priceValues
        showFilterResults(newFilters);
        //필터 보존
        setFilters(newFilters)
        },
        [SearchTerm] //검색단어가 바뀔때 리셋
    )
    const handlePrice = (filterValue) => {
        const data = pictureCount;
        let obj = new Object();
        for (let key in data) {
            if (data[key]._id == parseInt(filterValue, 10)) {
                obj = data[key].value;
            }
        }
        return obj;
    }
    const searchDateRangeHandler = (dateList) => {
        setSearchDateRange(dateList);
        const newFilters = { ...Filters };
        newFilters['dateRange'] = dateList;
        showFilterResults(newFilters);
        setFilters(newFilters)
    }
    const updateSearchTerm = (newSearchTerm) => {
        console.log(newSearchTerm)
        let body = {
            skip: 0, //새로 하는 것이기 때문에 0부터 시작
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm,
        }
        getPictures(body)
        setSkip(0);
        setSearchTerm(newSearchTerm);
    }
    const showFilterResults = (filters) => {
        console.log(SearchTerm)
        let body = {
            skip: 0, //새로 하는 것이기 때문에 0부터 시작
            limit: Limit,
            filters: filters,
            searchTerm : SearchTerm
        }

        getPictures(body)
        setSkip(0);
    }
    return  useMemo(() => (
        <div style={{ width: '60%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>사진 갤러리<Icon type="rocket" /></h2>
            </div>
            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={8} xs={24}>
                    {/* CheckBox */}
                    < CheckBox title="#해시태그" list={pictureCount} handlerFilters={filter => handlerFilters(filter, "pictureCount")} />
                </Col>
                <Col lg={8} xs={24}>
                    {/* RadioBox */}
                    <RadioBox title="사진 수" list={pictureCount} handlerFilters={filter => handlerFilters(filter, "pictureCount")} />
                </Col>
                <Col lg={8} xs={24}>
                    {/* RadioBox */}
                    <SearchDateRangePicker onRangePicker={searchDateRangeHandler} />
                </Col>
            </Row>
            {/* Search */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeatures refreshFunction={updateSearchTerm} />
            </div>


            {/* Card */}
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
            {PostSize >= Limit &&
                <div style={{ justifyContent: 'center' }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }
        </div>
    ), [Pictures])   
}

export default PictureLandingPage
