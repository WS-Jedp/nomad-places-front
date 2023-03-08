import { Switch, BrowserRouter } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { SearchPlaces } from './pages/SearchPlaces';
import { AppLayout } from './layouts/AppLayout';


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
import Home from './pages/Home';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppLayout>
          <Switch>
              <Route path="/home">
                <SearchPlaces />
              </Route>
              <Route exact path="/random">
                <Home />
              </Route>
              <Route path="*">
                <Redirect to="/home" />
              </Route>
          </Switch>
      </AppLayout>
    </IonReactRouter  >
  </IonApp>
);

export default App;
