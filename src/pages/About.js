import React, { useState, useEffect } from 'react';
import 'aframe';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonBackButton,
} from '@ionic/react';
import AllProductList from '../components/AllProductList';
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import imagee from '../assets/image.jpg';
export default function About() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>ABOUT US</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ion-text color="secondary">
          <h1>about us</h1>
        </ion-text>
      </IonContent>
    </IonPage>
  );
}
