import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <SubMenu title={<span>Video</span>}>
        <Menu.Item key="setting:1"><a href="/video"></a>Main Home</Menu.Item>
        <Menu.Item key="setting:1"><a href="/video/upload"></a>Video Upload</Menu.Item>
        <Menu.Item key="setting:2"><a href="/subscription">Subscribe Page</a></Menu.Item>
      </SubMenu>
    </Menu>
  )
}

export default LeftMenu