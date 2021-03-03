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
