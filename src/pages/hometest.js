import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'aframe';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonProgressBar,
  IonMenuButton,
  IonButtons,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import AllProductList from '../components/AllProductList';
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import imagee from '../assets/image.jpg';
import { sortTypes } from '../utils/Constants';
export default function Home() {
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productTotal, setProductTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [loadedEnd, setLoadingEnd] = useState(false);
  const [sortIndex, setSortIndex] = useState(0);
  const [productso, setProductso] = useState([]);

  React.useEffect(() => {
    if (sortIndex !== undefined && sortIndex > -1) {
      showPlaces();
    }
  }, [sortIndex]);

  const showPlaces = () => {
    if (!loading || !loadedEnd) {
      setLoading(true);
      axios
        .get(`https://walkin-start.herokuapp.com/api/places/`, {
          params: {
            currentPage: currentPage + 1,
            pageSize,
            sortIndex,
          },
        })
        .then((res) => {
          console.log('places=>', res.data);
          setProductTotal(productTotal + res.data.length);
          setProductso(productso.concat(res.data));
          setCurrentPage(currentPage + 1);
          setLoading(false);
          if (res.data.length < pageSize) {
            setLoadingEnd(true);
          }
        });
    }
  };

  const handleChangeSort = (index) => {
    setCurrentPage(0);
    setProductTotal(0);
    setLoadingEnd(false);
    setProductso([]);
    setSortIndex(index);
  };

  if (loading) {
    return (
      <IonPage>
        <IonProgressBar type="indeterminate" reversed={true}></IonProgressBar>
        <br />
        <br />
      </IonPage>
    );
  } else
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>WALKIN</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen class="ion-padding-top">
          {sortTypes.map((type, index) => {
            return (
              <div
                key={`${type}-${index}`}
                onClick={(e) => handleChangeSort(index)}
                style={{ borderBottom: '1px solid #cacaca' }}
              >
                <p
                  style={{
                    color: sortIndex === index ? '#0ca8fd' : '#a0a0a0',
                    padding: '10px',
                    cursor: 'pointer',
                    borderRadius: 4,
                    margin: '10px 10px 10px 30px',
                    textAlign: 'center',

                    // backgroundColor: sortIndex === index ? '#0ca8fd':'white'
                  }}
                >
                  {type.name}
                </p>
              </div>
            );
          })}
          <InfiniteScroll
            dataLength={productTotal}
            next={showPlaces}
            hasMore={!loadedEnd}
            // hasChildren={false}
            // loader={<div className="m-5" > <Spinner type='grow' color='primary' /></div>}
            loader={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingBottom: '2rem',
                }}
              >
                <h1>elias</h1>
              </div>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>All tours are loaded</b>
              </p>
            }
          >
            <AllProductList products={productso} />
          </InfiniteScroll>
        </IonContent>
      </IonPage>
    );
}
