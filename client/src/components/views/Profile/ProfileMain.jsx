import { Layout } from 'antd';
import React, { memo, useCallback } from 'react'
import LeftNav from './LeftNav';
import Profile from './ProfileSection/Profile';
import RightContent from './RightContent';
import Gugudan from './WebGamesSection/Gugudan';

const { Content, Sider } = Layout;

const ProfileMain=memo((props) =>{
    
    const contentName = props.match.params.contentName;
    let renderComponent;

    switch (contentName) {
        case "main":
                renderComponent = <Profile/>
            break;
            case "Gugudan":
                renderComponent = <Gugudan/>
            break;
        default:
            break;
    }
    
    
    console.log('contentName',contentName)
    console.log(renderComponent)
    return (
        <>
        <Layout style={{display:'flex', float:'left'}}>
        {console.log('rendering')}
            <Sider
                onBreakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                  }}
                onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
                }}
            >
                <LeftNav contentName={contentName}/>
            </Sider>
            <div style={{width:50}}/> {/* 사이더와 컨텐트 분리 */}
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <RightContent>{renderComponent}</RightContent>
                </div>
            </Content>
        </Layout>
        {/* <Layout>
            <Content style={{width:'100%', height : '100%'}}>
                <RightContent>{renderComponent}</RightContent>
            </Content>
        </Layout> */}
        </>
    )
})

export default ProfileMain
