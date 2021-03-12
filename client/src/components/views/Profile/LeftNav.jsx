import React, { memo, useState } from 'react'
import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import {Link, withRouter} from 'react-router-dom'
import { PieChartOutlined } from '@ant-design/icons'

const LeftNav = memo((props) => {

    const handleClick =({item, key, keyPath, domEvent})=>{
        let url = "/profile";
        switch (keyPath[1]) {
            case 'sub1': // 프로젝트
                url += `/project/${key}/Home`;
                break;
            case 'sub2': //웹게임
                url += `/webgame/${key}`;
                break;
        
            default:
                url +="/main/mySelf"
                break;
        }
        props.history.push(url)
    }
    const[Collapsed,setCollapsed] = useState(true);


    return (
        <Menu
        onClick={handleClick}
        style={{height:'780px' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1','sub2']}
        mode="inline"
        inlineCollapsed={Collapsed}
      >
        <Menu.Item key = "main"  >P R O F I L E</Menu.Item>
        <SubMenu key="sub1" title="Personal Project"  >
            <Menu.Item key="shopping">여행 쇼핑몰</Menu.Item>
            <Menu.Item key="youtube">유튜브 클론</Menu.Item>
            <Menu.Item key="coin-trader">가상화폐 거래소</Menu.Item>
            <Menu.Item key="movieApp">영화평점 사이트</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="Web-Game">
            <Menu.Item key="Gugudan">구구단</Menu.Item>
            <Menu.Item key="NumberBaseball">숫자야구</Menu.Item>
            <Menu.Item key="WordRelay">끝말잇기</Menu.Item>
            <Menu.Item key="Lotto">로또번호</Menu.Item>
            <Menu.Item key="ResponseCheck">반응속도 체크</Menu.Item>
            <Menu.Item key="RSP">가위바위보</Menu.Item>
            <Menu.Item key="TicTacTo">틱택토</Menu.Item>
            <Menu.Item key="MineSearch">지뢰찾기</Menu.Item>
        </SubMenu>
        </Menu>
    )
})

export default withRouter(LeftNav)
