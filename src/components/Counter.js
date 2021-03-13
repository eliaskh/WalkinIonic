import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { imagesOutline, eyeOutline } from 'ionicons/icons';
import { IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';
import { ProductContext } from '../context/products';
export default function Counter({ uuid1 }) {
  const { counter } = React.useContext(ProductContext);
  const counter1 = counter.filter((item) => {
    return item.uuid1 === uuid1;
  });
  console.log(counter1);
  const count = counter1.map((item) => {
    return item.count;
  });

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <span>{count}</span>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
