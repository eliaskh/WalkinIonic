import React, { useState, useEffect } from 'react';
import '../Login/Login.css';
import 'aframe';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonInput,
  IonText,
} from '@ionic/react';
import AllProductList from '../../components/AllProductList';
import axios from 'axios';
import ExploreContainer from '../../components/ExploreContainer';
// import './Home.css';
import imagee from '../../assets/image.jpg';
import appicon from '../../assets/appicon.svg';

import { lockClosedOutline, mailOutline } from 'ionicons/icons';
export default function Login() {
  return (
    <IonPage>
      <IonHeader class="ion-no-border" slot="fixed">
        <IonToolbar className="toolbar">
          <IonButtons slot="start">
            <IonBackButton mode="md" color="light" defaultHref="/" />
          </IonButtons>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>CONTACT US</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="all-page">
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol
              class="ion-align-self-center"
              className="col"
              size-md="6"
              size-lg="5"
              size-xs="12"
            >
              <div className="login-logo">
                <img src={appicon} alt="Ionic logo" />
              </div>
              <IonList
                class="margin-top-25 ion-margin margin-0-28"
                className="list"
              >
                <IonItem class="roundedInput8px margin-bottom-15 ">
                  <IonLabel>
                    <IonIcon icon={mailOutline}></IonIcon>
                  </IonLabel>
                  <IonInput placeholder="Username"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <IonIcon color="medium" icon={lockClosedOutline}></IonIcon>
                  </IonLabel>
                  <IonInput
                    placeholder="Password"
                    clearOnEdit="false"
                  ></IonInput>
                </IonItem>
                <IonText color="slightgray">
                  <p class="ion-text-right main-header8">Forgot password?</p>
                </IonText>
                <IonButton
                  className="button"
                  mode="ios"
                  class="ion-margin-top"
                  color="success"
                  expand="block"
                >
                  <IonText>
                    <h2 class="ion-text-center ion-margin-bottom main-header8">
                      By clicking Sign up you agree to the following Terms ans
                      Conditions without reservation
                    </h2>
                  </IonText>
                </IonButton>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
