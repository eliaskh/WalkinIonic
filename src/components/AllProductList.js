import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
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
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { pin, wifi, wine, warning, walk, eyeOutline } from 'ionicons/icons';
import './AllProductList.css';
import { copyFileSync } from 'fs';
import MainProductCard from './MainProductCard';
import imago from '../assets/image.jpg';
export default function AllProductList({ products }) {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {products.map((product, index) => {
          return (
            <>
              <IonCard id="card" className="ion-margin ">
                <IonCardHeader className="ion-no-margin">
                  {console.log(JSON.parse(product.image).uploadInfo.url)}
                  <img
                    src={JSON.parse(product.image).uploadInfo.url}
                    id="image"
                  />
                  <IonCardSubtitle id="title" className="ion-text-center">
                    EXPLORE 360
                  </IonCardSubtitle>
                  <IonCardTitle className="ion-text-center">
                    {product.title}
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent className="ion-text-center">
                  {product.description}
                </IonCardContent>
                <IonGrid>
                  <IonRow>
                    {console.log(product._id)}
                    <IonCol className="ion-float-right ion-text-center ion-padding-bottom ion-margin-bottom">
                      <IonButton
                        color="primary"
                        size="large"
                        // expand="block"
                        fill="solid"
                        className="ion-text-uppercase"
                        onClick={() => {
                          history.push(`/virtual/${product._id}`, {
                            id: product._id,
                          });
                        }}
                        // routerLink={`/virtual/${product._id}`}
                      >
                        360 tour
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
            </>
          );
        })}
      </IonContent>
    </IonPage>
  );
}
