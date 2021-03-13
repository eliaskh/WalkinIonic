import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import LoadingBasic from '../components/LoadingBasic';
import { makeStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade';

import CircularProgress from '@material-ui/core/CircularProgress';
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
  IonProgressBar,
  IonMenuButton,
  IonSpinner,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
} from '@ionic/react';
import {
  add,
  settings,
  share,
  person,
  arrowForwardCircle,
  arrowBackCircle,
  arrowUpCircle,
  logoVimeo,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoYoutube,
  gridOutline,
  heartOutline,
  imageOutline,
  locationOutline,
  informationCircle,
} from 'ionicons/icons';

import img from '../assets/image.jpg';
import AllProductList from '../components/AllProductList';
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import imagee from '../assets/patern.jpg';
import check from '../assets/newpattenr.jpg';

import styled from 'styled-components';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Threesxity({ product }) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  const history = useHistory();
  const [loading, setloading] = useState(false);
  const [featuredimage, setFeaturedimage] = useState();
  const [allproducts, setallproducts] = useState([]);
  const [loaded, setLoaded] = useState();
  const [image, setImage] = useState([]);
  const [img, setImg] = useState();
  // const [qImg, setQImg] = useState();
  const [imageURLHd, setImageURLHd] = useState({});
  const [imageURLSd, setImageURLSd] = useState({});
  const [panoramaId, setPanoramaId] = useState(0);
  const [title, setTitle] = useState('');
  const [loadedtheimage, setLoadedtheimage] = useState(false);
  const [firstloading, setFirstloading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { id } = useParams();
  const sky = document.querySelector('a-sky');

  let imageQ = 50;

  document.addEventListener('materialtextureloaded', function () {
    setLoadedtheimage(true);
    setFirstloading(true);
  });
  console.log(loadedtheimage);
  const getPlaces = () => {
    setloading(true);
    axios
      .get(`https://walkin-start.herokuapp.com/api/places/${id}`)
      .then((res) => {
        console.log(res.data.place);
        setallproducts(res.data.place);
        setImage(JSON.parse(res.data.place.imgsData[0]));
        setImg(JSON.parse(res.data.place.imgsData[0])[0].secure_url);

        setFeaturedimage(JSON.parse(res.data.place.image).uploadInfo.url);
        setTitle(res.data.place.title);
        console.log(JSON.parse(res.data.place.imgsData[0]));
        console.log(JSON.parse(res.data.place.imgsData[0])[0].secure_url);

        let interval = 0;
        setInterval(() => {
          setloading(false);
          clearInterval(interval);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPlaces();
  }, []);
  const handleChangeCarousPanorama = (panorama, id) => (e) => {
    setLoadedtheimage(false);
    setShowSpinner(true);
    setPanoramaId(id);
    let interval1 = 0;
    interval1 = setInterval(() => {
      setImg(panorama.secure_url);
      clearInterval(interval1);
    }, 500);

    let interval = 0;
    interval = setInterval(() => {
      setShowSpinner(false);
      clearInterval(interval);
    }, 800);
  };

  if (loading) {
    return (
      <IonPage>
        <IonProgressBar type="indeterminate" reversed={true}></IonProgressBar>
      </IonPage>
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-text-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={gridOutline} />
          </IonFabButton>
          <IonFabList side="bottom">
            <IonFabButton>
              <IonIcon icon={heartOutline} />
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={imageOutline} />
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={locationOutline} />
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={informationCircle} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
        <CarouselDesign>
          <div className="carousel">
            <Carousel
              slidesPerPage={6}
              offset={10}
              draggable
              itemWidth={200}
              minDraggableOffset={1}
              keepDirectionWhenDragging
            >
              {image.map((panorama, index) => {
                return (
                  <img
                    src={panorama.thumbnail_url}
                    onClick={handleChangeCarousPanorama(panorama, index)}
                    style={{
                      width: '200px!important',
                      height: '100px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      margin: '10px',
                    }}
                  />
                );
              })}
            </Carousel>
          </div>
        </CarouselDesign>
        <a-scene
          loading-screen="enabled:false"
          embedded
          style={{
            zIndex: '1',
            width: '100%',
            height: '100%',
            position: 'absolute',
            right: '0px',
            borderRadius: '40px',
          }}
          vr-mode-ui="enabled: false "
        >
          <a-sky
            materialtextureloaded
            id="sky-id"
            src={img}
            opacity="0.1"
            animation="property: opacity; to : 1; dur: 1000; easing: linear"
          ></a-sky>

          <a-camera id="cam" wasd-controls-enabled="false"></a-camera>
        </a-scene>

        {!loadedtheimage && !firstloading && (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              position: 'fixed',
              left: '0px',
              top: '0px',
              zIndex: '11111111',
            }}
          >
            <img
              src={featuredimage}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                position: 'absolute',
                left: '0px',
                top: '0px',
                zIndex: '11111111',
                opacity: '0.6',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                zIndex: '11111111',

                transform: 'translate(-50%, -50%)',
              }}
            >
              <h1 style={{ color: 'white' }}>{title}</h1>
            </div>
          </div>
        )}
        <Sky1>
          {!loadedtheimage && firstloading ? (
            <>
              <Fade>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: ' rgba(0, 0, 0, 0.85)',
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    zIndex: '1',
                  }}
                >
                  <IonProgressBar type="indeterminate"></IonProgressBar>
                </div>
              </Fade>
            </>
          ) : (
            ''
          )}
        </Sky1>
      </IonContent>
    </IonPage>
  );
}

const CarouselDesign = styled.div`
  .BrainhubCarousel__container {
    width: 100%;
    overflow: hidden;
    position: fixed;
    right: 0px;
    bottom: 0px;

    /* cursor: pointer; */
    background-color: white;
    z-index: 2;
  }
  .BrainhubCarouselItem {
    margin-left: 0px;
  }
`;

const Sky1 = styled.div`
  .hydrated {
    position: fixed;
    top: 55px;
    height: 10px;
  }
`;
