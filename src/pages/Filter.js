import React, { useState, useEffect } from 'react';
import 'aframe';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import AllProductList from '../components/AllProductList';
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import imagee from '../assets/image.jpg';
export default function Filter() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>filter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ion-text color="secondary">
          <h1>filter</h1>
        </ion-text>
      </IonContent>
    </IonPage>
  );
}
