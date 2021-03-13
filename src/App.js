import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonBadge,
  IonTab,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
} from '@ionic/react';
import { IonReactRouter, PrivateRoute } from '@ionic/react-router';
import {
  calendar,
  personCircle,
  map,
  informationCircle,
  medalOutline,
  options,
  gridOutline,
  mailOpenOutline,
  informationCircleOutline,
} from 'ionicons/icons';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/contact/Contact';
import Threesixty from './pages/Threesxity';
import Filter from './pages/Filter';
import Map from './pages/Map';
import Featured from './pages/Featured';
import Login from './pages/Login/Login';
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
import {
  flagOutline,
  list,
  locationOutline,
  starOutline,
} from 'ionicons/icons';
export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>WALKIN</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle>
                <IonItem button routerLink="/about" routerDirection="none">
                  <IonIcon slot="start" icon={informationCircleOutline} />
                  <IonLabel>about us</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem button routerLink="/contact" routerDirection="none">
                  <IonIcon slot="start" icon={mailOpenOutline} />
                  <IonLabel>contact us</IonLabel>
                </IonItem>
                <IonItem button routerLink="/login" routerDirection="none">
                  <IonIcon slot="start" icon={mailOpenOutline} />
                  <IonLabel>Login</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
        {/* <IonTabs> */}
        <IonRouterOutlet id="main">
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/virtual/:id" exact>
            <Threesixty />
          </Route>
          <Redirect to="/" />
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="/map" exact>
            <Map />
          </Route>
          <Route path="/filter" exact>
            <Filter />
          </Route>
          <Route path="/featured" exact>
            <Featured />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
        </IonRouterOutlet>

        {/* <IonTabBar slot="bottom">
            <IonTabButton tab="list" href="/">
              <IonIcon icon={list} />
              <IonLabel>all</IonLabel>
              <IonBadge>6</IonBadge>
            </IonTabButton>

            <IonTabButton tab="featured" href="/featured">
              <IonIcon icon={medalOutline} />
              <IonLabel>featured</IonLabel>
            </IonTabButton>

            <IonTabButton tab="map" href="/map">
              <IonIcon icon={map} />
              <IonLabel>Map</IonLabel>
            </IonTabButton>
          </IonTabBar> */}
        {/* </IonTabs> */}
      </IonReactRouter>
    </IonApp>
  );
}
