import React, { useState, useEffect } from 'react';
import 'aframe';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import AllProductList from '../components/AllProductList';
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import imagee from '../assets/image.jpg';
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    showPlaces();
  }, []);
  const showPlaces = () => {
    setLoading(true);
    axios.get('https://walkin-start.herokuapp.com/api/places/').then((res) => {
      console.log(res.data);
      setProducts(res.data);
      setLoading(false);
    });
  };
  if (loading) {
    return (
      <ion-text color="secondary">
        <h1>LOADING ...</h1>
      </ion-text>
    );
  } else
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <AllProductList products={products} />
        </IonContent>
      </IonPage>
    );
}

{
  /* <div>
<a-scene
  cursor="rayOrigin: mouse"
  raycaster="objects: .clickable"
  vr-mode-ui="enabled: ture"
>
  <a-sky src={imagee}></a-sky>


  <a-entity
    camera
    wasd-controls-enabled="true"
    magicWindowTrackingEnabled="true"
    mouseEnabled="true"
    touchEnabled="true"
    hmdEnabled="true"
    enable
  ></a-entity>
</a-scene>
</div> */
}
