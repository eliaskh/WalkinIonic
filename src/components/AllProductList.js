import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
  IonText,
  IonTabs,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import {
  imagesOutline,
  star,
  chatbubbleEllipses,
  share,
  heartCircleSharp,
  heartCircleOutline,
  eyedropOutline,
  eyeSharp,
  heartSharp,
  imagesSharp,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { pin, wifi, wine, warning, walk, eyeOutline } from 'ionicons/icons';
import './AllProductList.css';
import { copyFileSync } from 'fs';
import Counter from '../components/Counter';
import NumberOfImages from '../components/NumberOfView';
import MainProductCard from './MainProductCard';
import imago from '../assets/image.jpg';
import { ProductContext } from '../context/products';

export default function AllProductList({ products }) {
  console.log(products);
  const history = useHistory();
  const click = (id, id2) => {
    history.push(`/virtual/${id}`);

    axios
      .put(`https://walkin-start.herokuapp.com/api/counter/${id2}/increment/`)
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <>
      {products.map((product, index) => {
        return (
          <>
            <IonCard
              key={index}
              onClick={() => click(product._id, product.userId)}
            >
              <IonImg
                className="animated fadeIn"
                src={JSON.parse(product.image).uploadInfo.thumbnail_url}
              ></IonImg>
              <IonCardContent>
                <IonCardTitle class="ion-text-center ion-padding-top">
                  {product.title}
                </IonCardTitle>
              </IonCardContent>
              <IonRow class="ion-padding">
                <IonCol size="4">
                  <IonButton size="small" color="medium" fill="clear">
                    <IonIcon
                      slot="start"
                      icon={heartSharp}
                      className="icons"
                    ></IonIcon>
                    <NumberOfImages id={product.id} />
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton size="small" color="medium" fill="clear">
                    <IonIcon
                      slot="start"
                      icon={imagesSharp}
                      className="icons"
                    ></IonIcon>
                    <NumberOfImages id={product.id} />
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton size="small" color="medium" fill="clear">
                    <IonIcon
                      slot="start"
                      icon={eyeSharp}
                      className="icons"
                    ></IonIcon>

                    <Counter uuid1={product.uuid1} />
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonCard>
            <br />
          </>
        );
      })}
    </>
  );
}
