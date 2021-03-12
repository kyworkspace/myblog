import React from 'react'

import Profile from './ProfileSection/Profile';
import Gugudan from './WebGamesSection/Gugudan/Gugudan';
import NumberBaseballHooks from './WebGamesSection/Baseball/NumberBaseballHooks';
import WordRelay from './WebGamesSection/WordRelay/WordRelay';
import LottoHooks from './WebGamesSection/Lotto/LottoHooks';
import ResponseCheck from './WebGamesSection/ResponseCheck/ResponseCheck';
import RSPHooks from './WebGamesSection/RSP/RSPHooks';
import TikTakTok from './WebGamesSection/TicTakTo/TikTakTok';
import MineSearch from './WebGamesSection/MineSearch/MineFind';
import MovieHome from './ProjectSection/MovieApp/routes/Home';
import MovieNavigation from './ProjectSection/MovieApp/component/Navigation';
import MovieAbout from './ProjectSection/MovieApp/routes/About';
import MovieDetail from './ProjectSection/MovieApp/component/Detail';
export const ProfileMenus = {
    main : {
        mySelf :{
            url : '/profile/main/mySelf',
        component : <Profile/>
        }
    },
    project :{
        movieApp :{
            Home : {
                url : '/profile/project/movieApp/Home',
                component : <><MovieNavigation/><MovieHome/></>,
            },
            About:{
                url : '/profile/project/movieApp/About',
                component : <><MovieNavigation/><MovieAbout/></>,
            },
            Detail :{
                url : '/profile/project/movieApp/Detail',
                component : <><MovieNavigation/><MovieDetail/></>,
            }

        }
    },
    webgame :{
        Gugudan : {
            url : '/profile/webgame/Gugudan',
            component : <Gugudan/>
        },
        NumberBaseball : {
            url : '/profile/webgame/NumberBaseball',
            component : <NumberBaseballHooks/>
        },
        WordRelay : {
            url : '/profile/webgame/WordRelay',
            component : <WordRelay/>
        },
        Lotto : {
            url : '/profile/webgame/Lotto',
            component : <LottoHooks/>
        },
        ResponseCheck : {
            url : '/profile/webgame/ResponseCheck',
            component : <ResponseCheck/>
        },
        RSP : {
            url : '/profile/webgame/RSP',
            component : <RSPHooks/>
        },
        TicTacTo : {
            url : '/profile/webgame/TicTacTo',
            component : <TikTakTok/>
        },
        MineSearch : {
            url : '/profile/webgame/MineSearch',
            component : <MineSearch/>
        }
    }
}