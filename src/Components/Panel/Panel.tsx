import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '../Footer/Footer'
import ConnectFB from './ConnectFB/ConnectFB'
import Dashboard from './Dashboard/Dashboard';
import { DI, DIProps } from "../../../src/Core"
import { syncConnectorInfo, syncNecessaryInfo } from "../../Actions"
import { StoreDispatcher } from '../../../src'
interface PropsInfo extends DIProps {
  syncConnectorInfo: any;
  syncNecessaryInfo: () => void;
}
function Panel(_props: PropsInfo) {
  const dispatcher = useContext(StoreDispatcher);
  /**
   * in this useEffect we dispatch actions
   */
  useEffect(() => {
    _props.syncConnectorInfo(_props);
    _props.syncNecessaryInfo()
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
      } else if (parseInt(_props.redux.basic.stepActive) === 1) {
        _props.history(`/panel/${_props.redux.user_id}/dashboard`)
      }
    }
  }, [_props.redux])

  return (
    <div>
      <Routes>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='connect-fb' element={<ConnectFB />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default DI(Panel, { func: { syncConnectorInfo, syncNecessaryInfo } })