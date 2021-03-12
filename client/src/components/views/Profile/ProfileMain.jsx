import { Layout } from 'antd';
import React, { memo, useCallback } from 'react'
import LeftNav from './LeftNav';

import RightContent from './RightContent';
import {ProfileMenus} from './ProfileMenuList'

// import Profile from './ProfileSection/Profile';
// import Gugudan from './WebGamesSection/Gugudan/Gugudan';
// import NumberBaseballHooks from './WebGamesSection/Baseball/NumberBaseballHooks';
// import WordRelay from './WebGamesSection/WordRelay/WordRelay';
// import LottoHooks from './WebGamesSection/Lotto/LottoHooks';
// import ResponseCheck from './WebGamesSection/ResponseCheck/ResponseCheck';
// import RSPHooks from './WebGamesSection/RSP/RSPHooks';
// import TikTakTok from './WebGamesSection/TicTakTo/TikTakTok';
// import MineFind from './WebGamesSection/MineSearch/MineFind';
// import Home from './ProjectSection/MovieApp/routes/Home';
// import MovieNavigation from './ProjectSection/MovieApp/component/Navigation';

const { Content, Sider } = Layout;


const ProfileMain=memo((props) =>{
    const gubun = props.match.params.gubun;
    const contentName = props.match.params.contentName;
    const pageName = props.match.params.pageName;
    let renderComponent;
    switch (gubun) {
        case 'project':
            renderComponent = ProfileMenus[gubun][contentName][pageName].component;
            break;
        case 'webgame':
            renderComponent = ProfileMenus[gubun][contentName].component;
            break;
        default:
            renderComponent = ProfileMenus[gubun][contentName].component;
            break;
    }
    
    return (
        <div>
        <Layout style={{display:'flex', float:'left'}}>
            <Sider>
                {/* <LeftNav contentName={contentName}/> */}
                <LeftNav/>
            </Sider>
            {/* <div style={{width:50}}/> 사이더와 컨텐트 분리 */}
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="profile-content-box" >
                    <RightContent>{renderComponent}</RightContent>
                </div>
            </Content>
        </Layout>
        </div>
    )
})

export default ProfileMain
