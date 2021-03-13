import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Fade from 'react-reveal/Fade';
import 'aframe';
import './Threesxity.css';
import 'aframe-mouse-cursor-component';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Swiper,
} from 'swiper/core';
import FacebookBtn from '../assets/facebook.svg';
import TwitterBtn from '../assets/twitter.svg';
import LinkedBtn from '../assets/linkedin.svg';
import Typewriter from 'typewriter-effect';
import {
  IonSlides,
  IonSlide,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
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
  IonModal,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import {
  gridOutline,
  heartOutline,
  imageOutline,
  locationOutline,
  informationCircle,
  closeOutline,
  appsOutline,
  chevronDownOutline,
  compassOutline,
  refreshOutline,
  handRightOutline,
  arrowBackCircle,
  playCircleOutline,
  diamondOutline,
  imagesOutline,
} from 'ionicons/icons';
import axios from 'axios';
import './Home.css';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
export default function Threesxity({ product }) {
  let Sky = document.querySelector('#sky-id');
  const history = useHistory();
  const [loading, setloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalMap, setShowModalMap] = useState(false);
  const [featuredimage, setFeaturedimage] = useState();
  const [allproducts, setallproducts] = useState([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState([]);
  const [img, setImg] = useState([]);
  const [imageURLHd, setImageURLHd] = useState({});
  const [imageURLSd, setImageURLSd] = useState({});
  const [panoramaId, setPanoramaId] = useState(0);
  const [title, setTitle] = useState('');
  const [loadedtheimage, setLoadedtheimage] = useState(false);
  const [firstloading, setFirstloading] = useState(false);
  const [zoom, setZoom] = useState();
  const [isGyroscope, setGyroscope] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState();
  const [rotation, setRotation] = useState(false);
  const [loop, setLoop] = useState();
  const [direction, setdirection] = useState();
  const [geoLocation, setGeoLocation] = useState(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  // images gallery
  const [storyImages, setStoryImages] = useState([]);
  const [storyTitles, setStoryTitles] = useState([]);
  const [storyDescription, setStoryDescription] = useState([]);
  const [enableImageGallery, setEnableImageGallery] = useState();
  const [showSky, setShowSky] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [countero, setCountero] = useState([]);

  const slideOpts = {
    initialSlide: 1,
  };
  const startSlideOpts = {
    direction: 'vertical',
  };
  const RelatedslideOpts = {
    initialSlide: 1,
    slidesPerView: 2,
    direction: 'vertical',
    spaceBetween: 15,
  };
  const [showModalGallery, setShowModalGallery] = useState(false);
  // end images gallery

  // start screen

  const [pause, setPause] = useState(true);
  // end start screen
  const [allUsers, setAllUsers] = useState([]);
  const [owner, setOwner] = useState();
  const [EnableSocial, setEnableSocial] = useState();
  const [EnableCredit, setEnableCredit] = useState();
  const [ShowImageOnstart, setShowImageOnstart] = useState();
  const [enableRelated, setEnableRelated] = useState(false);
  const [showRelated, setShowRelated] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const { id } = useParams();

  const handelshowGallery = () => {
    setShowSky(!showSky);
    setShowGallery(!showGallery);
  };

  const handelshowMap = () => {
    setShowSky(!showSky);
    setShowMap(!showMap);
  };

  const handelshowDescription = () => {
    setShowSky(!showSky);
    setShowDescription(!showDescription);
  };
  const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: longitude, lng: latitude }}
      >
        {props.isMarkerShown && (
          <Marker position={{ lat: longitude, lng: latitude }} />
        )}
      </GoogleMap>
    ))
  );

  document.addEventListener('materialtextureloaded', function () {
    setLoadedtheimage(true);
    setFirstloading(true);
  });

  const getPlaces = () => {
    setloading(true);
    axios
      .get(`https://walkin-start.herokuapp.com/api/places/${id}`)
      .then((res) => {
        console.log(res.data.place);
        setallproducts(res.data.place);
        setImage(JSON.parse(res.data.place.imgsData[0]));
        setImg(JSON.parse(res.data.place.imgsData[0])[0]);
        console.log(JSON.parse(res.data.place.imgsData[0])[0]);
        setFeaturedimage(JSON.parse(res.data.place.image).uploadInfo.url);
        setTitle(res.data.place.title);
        setDescription(res.data.place.description);
        setZoom(res.data.place.zoom);
        setRotation(res.data.place.rotation);
        setRotationSpeed(res.data.place.rotationSpeed);
        setLoop(res.data.place.loop);
        setdirection(res.data.place.direction);
        setGeoLocation(res.data.place.location);
        setLatitude(res.data.place.location.coordinates[0]);
        setLongitude(res.data.place.location.coordinates[1]);
        if (res.data.place.StoryImages) {
          let storyimages1 = JSON.parse(res.data.place.StoryImages);
          console.log(storyimages1);
          setStoryImages(storyimages1.images ? storyimages1.images : []);
          setStoryTitles(storyimages1.titles ? storyimages1.titles : []);
          setStoryDescription(
            storyimages1.description ? storyimages1.description : []
          );
          console.log(storyImages);
        }
        setEnableImageGallery(res.data.place.enableImageGallery);
        setPause(res.data.place.pause);
        setOwner(res.data.place.userId);
        setEnableSocial(res.data.place.EnableSocial);
        setEnableCredit(res.data.place.EnableCredit);
        setShowImageOnstart(res.data.place.ShowImageOnstart);
        setEnableRelated(res.data.place.enableRelated);
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

  const getUsers = () => {
    setloading(true);
    axios
      .get(`https://walkin-start.herokuapp.com/api/users/`)
      .then((res) => {
        console.log(res.data);
        setAllUsers(res.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllPlaces = () => {
    setloading(true);
    axios
      .get(`https://walkin-start.herokuapp.com/api/places/`)
      .then((res) => {
        console.log(res.data);
        setAllProducts(res.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPlaces();
    getUsers();
    getAllPlaces();
  }, []);
  const handleChangeCarousPanorama = (panorama, id) => (e) => {
    setLoadedtheimage(false);

    setPanoramaId(id);
    let interval1 = 0;
    interval1 = setInterval(() => {
      setImg(panorama);
      clearInterval(interval1);
    }, 500);
  };
  const handleSetGyroscope = (e) => {
    if (!isGyroscope) setRotation(false);
    setGyroscope(!isGyroscope);
  };

  const handelRoration = (e) => {
    setRotation(!rotation);
  };
  const handleShowHideRelated = () => {
    setShowRelated(!showRelated);
  };
  const LastFinalUser = allUsers.filter((item) => {
    return item._id === owner;
  });
  console.log(allProducts);
  const allUserItems = allProducts.filter((item) => item.userId === owner);
  {
    console.log(allUserItems);
  }
  SwiperCore.use([Navigation, Pagination, Scrollbar]);
  if (loading) {
    return (
      <IonPage>
        <IonProgressBar type="indeterminate" reversed={true}></IonProgressBar>
      </IonPage>
    );
  }
  {
    console.log(LastFinalUser);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-text-center">
          {showMap && (
            <>
              <IonButtons slot="start">
                <IonBackButton onClick={handelshowMap} />
              </IonButtons>
              <IonButtons slot="end">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Loacation</IonTitle>
            </>
          )}
          {showDescription && (
            <>
              <IonButtons slot="start">
                <IonBackButton onClick={handelshowDescription} />
              </IonButtons>
              <IonButtons slot="end">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>About</IonTitle>
            </>
          )}
          {showGallery && (
            <>
              <IonButtons slot="start">
                <IonBackButton onClick={handelshowGallery} />
              </IonButtons>
              <IonButtons slot="end">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Gallery</IonTitle>
            </>
          )}
          {showRelated && (
            <>
              <IonButtons slot="start">
                <IonBackButton onClick={handleShowHideRelated} />
              </IonButtons>
              <IonButtons slot="end">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Related</IonTitle>
            </>
          )}
          {!showMap && !showDescription && !showGallery && !showRelated && (
            <>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/" />
              </IonButtons>
              <IonButtons slot="end">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>{title}</IonTitle>
            </>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* carosel */}
        <CarouselDesign>
          {!showDescription && !showMap && !showGallery && !showRelated ? (
            <>
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
                      <>
                        <img
                          src={panorama.thumbnail_url}
                          onClick={handleChangeCarousPanorama(panorama, index)}
                          style={{
                            width: '200px!important',
                            height: '100px',
                            objectFit: 'cover',
                            cursor: 'pointer',
                          }}
                        />

                        {panorama.thumbnail_url == img.thumbnail_url && (
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              top: '0px',
                              left: '0px',
                              position: 'absolute',
                              backgroundColor: 'black',
                              opacity: '0.5',
                            }}
                          ></div>
                        )}
                      </>
                    );
                  })}
                </Carousel>
              </div>
            </>
          ) : (
            ''
          )}
        </CarouselDesign>
        {/* carousel */}

        {/* related */}
        {enableRelated ? (
          <>
            {showRelated ? (
              <>
                <IonSlides pager={true} options={RelatedslideOpts}>
                  {allUserItems.map((item, index) => {
                    return (
                      <IonSlide>
                        <IonContent>
                          <img
                            src={
                              JSON.parse(item.image).uploadInfo.thumbnail_url
                            }
                            style={{
                              backgroundColor: 'black',
                              objectFit: 'cover',
                              width: '100%',
                              height: '100%',
                            }}
                          ></img>
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              position: 'absolute',
                              top: '0px',
                              left: '0px',
                              backgroundColor: 'rgba(0,0,0,0.4)',
                            }}
                          />
                          {/* nubmer of image */}
                          {/* <div
                            style={{
                              display: 'grid',
                              gridAutoColumns: '1fr 1fr',
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                top: '30%',
                                right: '50%',
                                transform: 'translate(50%, -50%)',

                                zIndex: '111111',
                                display: 'grid',
                                gridTemplateColumns: 'auto auto',
                                gap: '10px',
                              }}
                            >
                              <div
                                style={{
                                  alignSelf: 'center',
                                }}
                              >
                                <IonIcon icon={imagesOutline} />
                              </div>
                              <div style={{ alignSelf: 'end' }}>
                                <span
                                  style={{
                                    color: 'white',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {JSON.parse(item.imgsData).length}
                                </span>
                              </div>
                            </div>
                          </div> */}
                          {/* end number of images */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '20%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          >
                            <img
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '40px',
                                objectFit: 'cover',
                                border: '2px solid white',

                                justifySelf: 'center',
                              }}
                              src={LastFinalUser.map((item) => item.image)}
                            ></img>
                          </div>
                          {/* numbeor of images */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              zIndex: '111',
                            }}
                          >
                            <h3
                              style={{
                                color: 'white',
                                textTransform: 'uppercase',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {item.title}
                            </h3>
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: '80%',
                              left: '50%',
                              zIndex: '111',
                              transform: 'translate(-50%, -50%)',
                            }}
                          >
                            <IonButton
                              onClick={() => {
                                history.push(`/virtual/${item._id}`, {
                                  product: product,
                                });
                              }}
                            >
                              EXPLORE
                            </IonButton>
                          </div>
                        </IonContent>
                      </IonSlide>
                    );
                  })}
                </IonSlides>
              </>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}
        {/* end related */}
        {/* modal map */}
        {showMap ? (
          <>
            <div
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGZBk8XIFz9IheDYhUbB0g-2-kIOJkOo0&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
          </>
        ) : (
          ''
        )}
        {/* end modal map */}

        {/* image gallery start */}
        {showGallery ? (
          <>
            <IonContent fullscreen>
              <IonSlides pager={true} options={slideOpts}>
                {storyImages.map((item, index) => {
                  return (
                    <IonSlide>
                      <div
                        style={{
                          height: '100vh',
                          width: '100vw',
                        }}
                        key="0"
                      >
                        <img
                          src={item.secure_url}
                          style={{
                            backgroundColor: 'black',
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                        ></img>
                      </div>
                    </IonSlide>
                  );
                })}
              </IonSlides>
            </IonContent>
          </>
        ) : (
          ''
        )}
        {/* image gallery end */}
        {showDescription ? (
          <>
            <IonContent>
              <IonGrid>
                <IonRow>
                  <IonCol className="ion-padding">
                    <IonText color="primary" className="ion-text-center">
                      <p>{description}</p>
                    </IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
          </>
        ) : (
          ''
        )}
        {/* aframe scene */}
        {showSky ? (
          <>
            <a-scene
              loading-screen="enabled:false"
              embedded
              id="sky-id"
              vr-mode-ui="enabled: false "
              cursor="rayOrigin: mouse"
              raycaster="objects: .clickable"
            >
              <a-sky
                cursor="rayOrigin: mouse"
                materialtextureloaded
                src={img.secure_url}
                event-set__click={() => console.log('clickeeeeed')}
                event-set__leave="_event: click; console.log('click')"
                opacity="0.1"
                animation="property: opacity; to : 1; dur: 1000; easing: linear"
              ></a-sky>

              {/* <a-camera id="cam" wasd-controls-enabled="false"></a-camera> */}
              <a-camera
                position="0 0 0"
                id="tour-cammera"
                animation={`property: rotation; enabled:${rotation};from: 0 0 0;  to: 0 360 0; loop: ${loop}; dur: ${rotationSpeed};  dir:${direction}; easing :easeOutBack`}
                zoom={zoom}
                wasd-controls-enabled="false"
                look-controls={`enabled:true; magicWindowTrackingEnabled: ${
                  isGyroscope ? 'true;' : 'false;'
                }`}
                // fov={fov}
              ></a-camera>
            </a-scene>
          </>
        ) : (
          ''
        )}

        {/* end aframe scene */}
        {/* pause */}

        {/* end pause */}
        {/* splash screen and first loading */}

        {!loadedtheimage && !firstloading && (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              position: 'fixed',
              left: '0px',
              top: '0px',
              zIndex: '4',
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
                zIndex: '5',
                opacity: '0.6',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                zIndex: '6',

                transform: 'translate(-50%, -50%)',
              }}
            >
              <h1 style={{ color: 'white' }}>{title}</h1>
            </div>
          </div>
        )}
        {/* end splash screen and first loading */}

        {/* loading when click on each thumb in the carousel */}
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

        {/* end loading when click on each thumb in the carousel */}

        {/* show pause */}

        {pause ? (
          <>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,1)',
                position: 'fixed',
                left: '0px',
                top: '0px',
                zIndex: '10',
              }}
            >
              <IonSlides pager={true} options={startSlideOpts}>
                <IonSlide>
                  <img
                    src={featuredimage}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      // zIndex: '9',
                    }}
                  />
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.55)',
                      position: 'fixed',
                      left: '0px',
                      top: '0px',
                      zIndex: '10',
                    }}
                  ></div>
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      zIndex: '11',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {loadedtheimage ? (
                      <>
                        <IonIcon
                          className="icon-play"
                          icon={playCircleOutline}
                          onClick={() => setPause(false)}
                        />
                      </>
                    ) : (
                      <IonButton onClick={() => setPause(false)}>
                        LOADING{' '}
                        <IonSpinner name="dots" class="ion-margin-start" />
                      </IonButton>
                    )}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '65%',
                      zIndex: '11',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <ion-text color="primary">
                      <h1
                        style={{
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                        }}
                      >
                        {title}
                      </h1>
                    </ion-text>
                  </div>
                </IonSlide>
                <IonSlide>
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '40%',
                      zIndex: '11',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <ion-text>
                      <h1
                        style={{
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: 'white',
                        }}
                      >
                        {title}
                      </h1>
                    </ion-text>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '60%',
                      zIndex: '11',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <ion-text color="primary">
                      <p
                        style={{
                          textTransform: 'capitalize',
                          color: 'white',
                        }}
                      >
                        {description}
                      </p>
                    </ion-text>
                  </div>
                </IonSlide>
                <IonSlide>
                  {EnableSocial ? (
                    <div className="social-btns">
                      {/* twitter btn */}

                      {LastFinalUser.map((item) => {
                        return item.twitter !== '' ? (
                          <>
                            {' '}
                            <img
                              src={TwitterBtn}
                              style={{
                                width: '50px',
                                cursor: 'pointer',
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                window.location.href = `${LastFinalUser.map(
                                  (item) => {
                                    return item.twitter;
                                  }
                                )}`;
                              }}
                            />
                          </>
                        ) : (
                          ''
                        );
                      })}

                      {/* end twitter btn */}

                      {/* facebook btn */}
                      {LastFinalUser.map((item) => {
                        return item.facebook !== '' ? (
                          <>
                            <img
                              src={FacebookBtn}
                              style={{
                                width: '50px',
                                cursor: 'pointer',
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                window.location.href = `${LastFinalUser.map(
                                  (item) => {
                                    return item.facebook;
                                  }
                                )}`;
                              }}
                            />
                          </>
                        ) : (
                          ''
                        );
                      })}
                      {/* end facebook btn */}
                      {/* linkedin btn */}
                      {LastFinalUser.map((item) => {
                        return item.linkid !== '' ? (
                          <>
                            {' '}
                            <img
                              src={LinkedBtn}
                              style={{
                                width: '50px',
                                cursor: 'pointer',
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                window.location.href = `${LastFinalUser.map(
                                  (item) => {
                                    return item.linkid;
                                  }
                                )}`;
                              }}
                            />
                          </>
                        ) : (
                          ''
                        );
                      })}
                      {/* end linkedin btn */}
                    </div>
                  ) : (
                    ''
                  )}
                  {EnableCredit ? (
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '30%',
                        transform: 'translate(-50%,-50%)',
                        zIndex: '11111111111',
                        color: 'white',
                        textTransform: 'uppercase',
                      }}
                    >
                      <h4 style={{ color: 'white' }}>
                        <Typewriter
                          options={{
                            strings: [
                              'Credit',
                              ` ${LastFinalUser.map((item) => {
                                return item.username;
                              })}`,
                            ],
                            autoStart: true,
                            loop: true,
                          }}
                        />
                      </h4>
                    </div>
                  ) : (
                    ' '
                  )}
                  {ShowImageOnstart ? (
                    <img
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '20%',
                        width: '70px',
                        height: '70px',
                        zIndex: '11111',
                        borderRadius: '70px',
                        transform: 'translate(-50%,-50%)',
                        border: '4px solid white',
                      }}
                      src={LastFinalUser.map((item) => {
                        return item.image;
                      })}
                    ></img>
                  ) : (
                    ''
                  )}
                  <p className="bioDesc">
                    {LastFinalUser.map((item) => {
                      return item.bio;
                    })}
                  </p>
                </IonSlide>
              </IonSlides>
            </div>
          </>
        ) : (
          ''
        )}

        {/* end show pause */}

        {/* right menu */}
        {!showDescription &&
          !showGallery &&
          !showMap &&
          loadedtheimage &&
          !pause &&
          !showRelated && (
            <IonFab vertical="top" horizontal="end" slot="fixed">
              <IonFabButton side="end">
                <IonIcon icon={chevronDownOutline} />
              </IonFabButton>
              <IonFabList side="start">
                <IonFabButton onClick={handleShowHideRelated}>
                  <IonIcon icon={diamondOutline} />
                </IonFabButton>
              </IonFabList>
              <IonFabList side="bottom">
                <IonFabButton>
                  <IonIcon icon={heartOutline} />
                </IonFabButton>
                <IonFabButton onClick={handelshowGallery}>
                  <IonIcon icon={imageOutline} />
                </IonFabButton>
                <IonFabButton onClick={handelshowMap}>
                  <IonIcon icon={locationOutline} />
                </IonFabButton>
                {rotation ? (
                  <>
                    <IonFabButton onClick={handelRoration} color="danger">
                      <IonIcon icon={refreshOutline} />
                    </IonFabButton>
                  </>
                ) : (
                  <>
                    {' '}
                    <IonFabButton onClick={handelRoration}>
                      <IonIcon icon={refreshOutline} />
                    </IonFabButton>{' '}
                  </>
                )}

                {isGyroscope ? (
                  <>
                    <IonFabButton onClick={handleSetGyroscope}>
                      <IonIcon icon={compassOutline} />
                    </IonFabButton>
                  </>
                ) : (
                  <>
                    <IonFabButton onClick={handleSetGyroscope}>
                      <IonIcon icon={handRightOutline} />
                    </IonFabButton>
                  </>
                )}
                <IonFabButton onClick={handelshowDescription}>
                  <IonIcon icon={informationCircle} />
                </IonFabButton>
              </IonFabList>
            </IonFab>
          )}

        {/* end right menu */}

        {/*end loading when click on each thumb in the carousel */}
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
    padding: 0.8rem 0.4rem;
    /* cursor: pointer; */
    background-color: white;
    z-index: 3;
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

const ModalDesign = styled.div`
  /* Works - pass "my-custom-class" in cssClass to increase specificity */
  .my-custom-class .modal-wrapper {
    background: #3a7be0;
    color: black;
    padding: 1rem;
  }
  .my-custom-class {
    --background: #222;
  }
  .modal-text {
    color: black;
  }
`;
