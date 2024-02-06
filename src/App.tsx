import { Switch, BrowserRouter } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { SearchPlaces } from './pages/SearchPlaces';
import { PlaceDetailPage } from './pages/PlaceDetail';
import { ProfilePage } from './pages/Users/Profile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './index.css'
import './tailwind/input.css'
import './tailwind/output.css'

import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch, useAppSelector } from './common/hooks/useTypedSelectors';
import { useEffect } from 'react';
import { addDisplayedAlert, addDisplayedError, removeAlert, removeError } from './store/redux/slices/controlledErrors';

setupIonicReact();

const App: React.FC = () => {
  const { errors, displayedErrors, alerts, displayedAlerts } = useAppSelector(state => state.controlledErrors)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(errors.length == 0) return

    errors.forEach(error => { 
      if(!displayedErrors.find(err => err === error.id)) {
        toast.error(error.message, { onClose: () => dispatch( removeError(error.id) ) } )
        dispatch( addDisplayedError(error.id) )
      }
    })

  }, [errors])

  useEffect(() => {
    if(alerts.length == 0) return

    alerts.forEach(alert => { 
      if(!displayedAlerts.find(al => al === alert.id)) {
        toast.warning(alert.message, { onClose: () => dispatch( removeAlert(alert.id) ) } )
        dispatch( addDisplayedAlert(alert.id) )
      }
    })

  }, [alerts])

  return (
      <IonApp>
        <ToastContainer stacked limit={3} position='bottom-left' />
        <IonReactRouter>
              <Switch>
                  <Route path="/home">
                    <SearchPlaces />
                  </Route>
                  <Route exact path="/place/:id/session">
                    <PlaceDetailPage />
                  </Route>
                  <Route exact path="/me/profile">
                    <ProfilePage />
                  </Route>
                  <Route path="*">
                    <Redirect to="/home" />
                  </Route>
              </Switch>
        </IonReactRouter>
      </IonApp>
  );
}

export default App;
