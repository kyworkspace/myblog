import { Layout } from 'antd';
import React, { memo, useCallback } from 'react'
import LeftNav from './LeftNav';
import Profile from './ProfileSection/Profile';
import RightContent from './RightContent';
import Gugudan from './WebGamesSection/Gugudan/Gugudan';
import "./ProfileContent.css"
import NumberBaseballHooks from './WebGamesSection/Baseball/NumberBaseballHooks';
import WordRelay from './WebGamesSection/WordRelay/WordRelay';
import LottoHooks from './WebGamesSection/Lotto/LottoHooks';
import ResponseCheck from './WebGamesSection/ResponseCheck/ResponseCheck';
import RSPHooks from './WebGamesSection/RSP/RSPHooks';
import TikTakTok from './WebGamesSection/TicTakTo/TikTakTok';
import MineFind from './WebGamesSection/MineSearch/MineFind';

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
        case "NumberBaseball":
                renderComponent = <NumberBaseballHooks/>
            break;
        case "WordRelay":
                renderComponent = <WordRelay/>
            break;
        case "Lotto":
                renderComponent = <LottoHooks/>
            break;
        case "ResponseCheck":
                renderComponent = <ResponseCheck/>
            break;
        case "RSP":
                renderComponent = <RSPHooks/>
            break;
        case "TicTacTo":
                renderComponent = <TikTakTok/>
            break;
        case "MineSearch":
                renderComponent = <MineFind/>
            break;
        default:
            break;
    }
    return (
        <div>
        <Layout style={{display:'flex', float:'left'}}>
            <Sider>
                <LeftNav contentName={contentName}/>
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
