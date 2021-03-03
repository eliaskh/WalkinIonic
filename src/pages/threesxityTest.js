import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'aframe';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonText,
} from '@ionic/react';

import AllProductList from '../components/AllProductList';
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import imagee from '../assets/image.jpg';

export default function Threesxity({ product }) {
  console.log(product);
  const history = useHistory();
  const [loading, setloading] = useState(false);
  const { finalId } = useParams();
  const [allproducts, setallproducts] = useState([]);
  // const [product, setProduct] = useState();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const { id } = useParams();
  console.log(id);
  // useEffect(() => {
  //   getPlaces();
  // }, []);

  // async function getPlaces() {
  //   setloading(true);
  //   axios
  //     .get('https://walkin-start.herokuapp.com/api/places')
  //     .then((res) => {
  //       console.log(res.data.place);
  //       setallproducts(res.data.place);

  //       // setTitle(res.data.place.title);
  //       // console.log(JSON.parse(res.data.place.imgsData[0])[0].secure_url);
  //       // setImage(JSON.parse(res.data.place.imgsData[0])[0].secure_url);
  //       setInterval(() => {
  //         setloading(false);
  //       }, 1000);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // if (loading) {
  //   return (
  //     <IonPage>
  //       <IonHeader>
  //         <IonToolbar>
  //           <IonButtons slot="start">
  //             <IonBackButton defaultHref="/home" />
  //           </IonButtons>
  //           <IonTitle>wait</IonTitle>
  //         </IonToolbar>
  //       </IonHeader>
  //       <IonContent fullscreen>
  //         <IonText color="primary">
  //           <h1>Loading...</h1>
  //         </IonText>
  //       </IonContent>
  //     </IonPage>
  //   );
  // }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>tite</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText color="primary">
          <h1>{id}</h1>
        </IonText>
      </IonContent>
    </IonPage>
  );
}
