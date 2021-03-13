import React, { useState, useEffect } from 'react';
import 'aframe';
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonSlides,
  IonSlide,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonImg,
  IonInput,
  IonText,
  IonTextarea,
  IonGrid,
  IonBackButton,
  IonMenuButton,
} from '@ionic/react';
import AllProductList from '../../components/AllProductList';
import axios from 'axios';
import ExploreContainer from '../../components/ExploreContainer';
import image from '../../assets/bg.png';
import './contact.scss';

export default function Contact() {
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
          <IonTitle className="ion-text-center">CONTACT US</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="contact-us-nine-content">
        {/* <IonImg
          className="ion-margin-top ion-margin-bottom"
          src={image}
        ></IonImg> */}
        <IonText>
          <h1 className="ion-margin ion-text-center">
            <b>we are happy to support you </b>
          </h1>
        </IonText>
        <div className="ion-padding-top">
          <IonItem className="ion-margin item-input">
            <IonInput placeholder="Name" type="text"></IonInput>
          </IonItem>
          <IonItem className="ion-margin item-input">
            <IonInput placeholder="Email" type="email"></IonInput>
          </IonItem>
          <IonItem className="ion-margin item-input">
            <IonTextarea
              className="textarea-color"
              rows={7}
              cols={20}
              placeholder="Type Your Message Here"
            ></IonTextarea>
          </IonItem>
          <IonGrid className="ion-no-padding">
            <IonRow>
              <IonCol className="ion-text-center ion-margin">
                <IonButton expand="block" size="large">
                  Send Message
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
}
