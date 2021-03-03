import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"

import VideoUploadPage from './views/Video/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './views/Video/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './views/Video/SubscriptionPage/SubscriptionPage';
import VideoLandingPage from './views/Video/VideoLandingPage/VideoLandingPage';
import PictureLandingPage from './views/Picture/PictureLandingPage/PictureLandingPage';
import UploadPicturePage from './views/Picture/UploadPicturePage/UploadPicturePage';
import DetailPicturepage from './views/Picture/DetailPicturePage/DetailPicturepage';
import BoardLandingPage from './views/Board/BoardLandingPage/BoardLandingPage';
import UploadBoardPage from './views/Board/UploadBoardPage/UploadBoardPage';
import DetailBoardPage from './views/Board/DetailBoardPage/DetailBoardPage'

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />

          <Route exact path="/board" component={Auth(BoardLandingPage, null)} />

          {/* 리스트 */}
          <Route exact path="/picture" component={Auth(PictureLandingPage, null)} />
          {/* 업로드 */}
          <Route exact path="/picture/:type" component={Auth(UploadPicturePage, true)} />
          {/* 디테일 */}
          <Route exact path="/picture/detail/:pictureId" component={Auth(DetailPicturepage, null)} />
          {/* 수정 */}
          <Route exact path="/picture/:type/:pictureId" component={Auth(UploadPicturePage, null)} />

          <Route exact path="/video" component={Auth(VideoLandingPage, null)} />
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
