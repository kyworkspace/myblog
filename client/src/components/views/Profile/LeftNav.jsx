import React, { memo } from 'react'
import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import {withRouter} from 'react-router-dom'

const LeftNav = memo((props) => {

    const handleClick =({item, key, keyPath, domEvent})=>{
        props.history.push(`/profile/${key}`)
    }


    return (
        <Menu
        onClick={handleClick}
        style={{ width: 256, height:800 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1','sub2']}
        mode="inline"
      >
        <Menu.Item key = "main">P R O F I L E</Menu.Item>
        <SubMenu key="sub1" title="Personal Project">
            <Menu.Item key="shopping">여행 쇼핑몰</Menu.Item>
            <Menu.Item key="youtube">유튜브 클론</Menu.Item>
            <Menu.Item key="coin-trader">가상화폐 거래소</Menu.Item>
            <Menu.Item key="movieApp">영화평점 사이트</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="Web-Game">
            <Menu.Item key="Gugudan">구구단</Menu.Item>
            <Menu.Item key="NumberBaseball">숫자야구</Menu.Item>
            <Menu.Item key="WordRelay">끝말잇기</Menu.Item>
            <Menu.Item key="Lotoo">로또번호</Menu.Item>
            <Menu.Item key="ResponseCheck">반응속도 체크</Menu.Item>
            <Menu.Item key="RSP">가위바위보</Menu.Item>
            <Menu.Item key="TicTacTo">틱택토</Menu.Item>
            <Menu.Item key="MineSearch">지뢰찾기</Menu.Item>
        </SubMenu>
        </Menu>
    )
})

export default withRouter(LeftNav)
