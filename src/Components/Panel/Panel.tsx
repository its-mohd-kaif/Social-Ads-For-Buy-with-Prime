import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '../Footer/Footer'
import ConnectFB from './ConnectFB/ConnectFB'
import PrepareDashboard from './ConnectFB/PrepareDashboard'
import Dashboard from './Dashboard/Dashboard';
import { DI, DIProps } from "../../../src/Core"
import { syncConnectorInfo, syncNecessaryInfo } from "../../Actions"
import { StoreDispatcher } from '../../../src'
import { Loader } from '@cedcommerce/ounce-ui'
interface PropsInfo extends DIProps {
  syncConnectorInfo: any;
  syncNecessaryInfo: () => void;
}
function Panel(_props: PropsInfo) {
  const dispatcher = useContext(StoreDispatcher);
  const [flag, setFlag] = useState(false)
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
  useEffect(() => {
    setFlag(true)
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
      {flag === false ? <Loader
        percentage={20}
        type="Loader1"
      /> : null}

      <Routes>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='connect-fb' element={<ConnectFB />} />
        <Route path='prepareDashboard' element={<PrepareDashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default DI(Panel, { func: { syncConnectorInfo, syncNecessaryInfo } })