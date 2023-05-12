import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '../Footer/Footer'
import ConnectFB from './ConnectFB/ConnectFB'
import Dashboard from './Dashboard/Dashboard';
import { DI, DIProps } from "../../../src/Core"
import { syncConnectorInfo, syncNecessaryInfo } from "../../Actions"
import { StoreDispatcher } from '../../../src'
import TopbarComp from './Dashboard/TopbarComp';
import SidebarComp from './Dashboard/SidebarComp';
import { BodyLayout } from '@cedcommerce/ounce-ui';
import LoaderComp from './Dashboard/LoaderComp';
import CreateCamp from './Dashboard/CreateCamp';
import Products from './Dashboard/Products/Products';
import SettingsComp from './Dashboard/Settings/SettingsComp';
import NotificationComp from './Dashboard/Notification/NotificationComp';
import HelpComp from './Dashboard/Help/HelpComp';
interface PropsInfo extends DIProps {
  syncConnectorInfo: any;
  syncNecessaryInfo: () => void;
}
function Panel(_props: PropsInfo) {
  const dispatcher = useContext(StoreDispatcher);
  const [flag, setFlag] = useState(false);
  /**
   * in this useEffect we dispatch actions
   */
  useEffect(() => {
    async function getAsyncCall() {
      await _props.syncConnectorInfo(_props);
      await _props.syncNecessaryInfo()
      setFlag(true);
    };
    // You need to restrict it at some point
    if (!flag) {
      getAsyncCall();
    }
    dispatcher({
      type: "user_id",
      state: {
        user_id: _props.match.uId
      }
    })

  }, [])


  /**
   * in this useEffect we check stepActive redux state
   * and we redirect according to value
   */
  useEffect(() => {
    if (_props.redux.basic !== undefined) {
      if (parseInt(_props.redux.basic.stepActive) === 0) {
        _props.history(`/panel/${_props.redux.user_id}/connect-fb`)
      }
    }
  }, [_props.redux])

  if (_props.redux.basic !== undefined) {
    if (parseInt(_props.redux.basic.stepActive) === 0) {
      return (
        <>
          <Routes>
            <Route path='connect-fb' element={<ConnectFB />} />
          </Routes>
          <Footer />
        </>

      )
    } else if (parseInt(_props.redux.basic.stepActive) === 1) {
      return (
        <>
          <TopbarComp />
          <SidebarComp />
          <BodyLayout>
            <Routes>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='product' element={<Products />} />
              <Route path='settings' element={<><SettingsComp /></>} />
              <Route path='help' element={<HelpComp />} />
              <Route path='faq' element={<>faq</>} />
              <Route path='create' element={<CreateCamp />} />
              <Route path='notifications' element={<NotificationComp />} />
            </Routes>
          </BodyLayout>
          <Footer />
        </>
      )
    }
  } else return (<LoaderComp />)





}

export default DI(Panel, { func: { syncConnectorInfo, syncNecessaryInfo } })