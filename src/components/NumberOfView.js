import React from 'react';
import { ProductContext } from '../context/products';
import { imagesOutline, eyeOutline } from 'ionicons/icons';
import { IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';
export default function NumberOfView({ id }) {
  const { products } = React.useContext(ProductContext);
  console.log(products);
  const images = products.filter((item) => {
    return item.id === id;
  });
  const finalNumber = images.map((item) => {
    return JSON.parse(item.imgsData[0]).length;
  });
  console.log(images);
  console.log('final nuumber=>', finalNumber);
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <span>{finalNumber}</span>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
