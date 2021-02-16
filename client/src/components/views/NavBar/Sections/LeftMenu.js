import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <SubMenu title={<span>게시판</span>}>
        <Menu.Item key="setting:1"><a href="/board"></a>게시판</Menu.Item>
      </SubMenu>
      <SubMenu title={<span>사진</span>}>
        <Menu.Item key="setting:1"><a href="/picture"></a>사진 갤러리</Menu.Item>
        <Menu.Item key="setting:2"><a href="/picture/upload"></a>사진 업로드</Menu.Item>
      </SubMenu>
      <SubMenu title={<span>동영상</span>}>
        <Menu.Item key="setting:1"><a href="/video"></a>동영상 갤러리</Menu.Item>
        <Menu.Item key="setting:2"><a href="/video/upload"></a>동영상 업로드</Menu.Item>
        <Menu.Item key="setting:3"><a href="/subscription">구독영상 갤러리</a></Menu.Item>
      </SubMenu>
    </Menu>
  )
}

export default LeftMenu