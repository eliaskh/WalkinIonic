import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  HYBRID,
  ROADMAP,
  SATELLITE,
  TERRAIN,
} from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import publicIp from 'public-ip';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

const API_IP_LOCATION_URL = 'https://api.ipstack.com';
const API_GOOGLE_MAP_GEOLOACATION_URL =
  'https://www.googleapis.com/geolocation/v1/geolocate';
const GEOLOCATION_ACCESS_KEY = 'AIzaSyBe-OS18GiF54dx5IXE0K_sl5RofP2D7T8';
const IP_LOCATION_ACCESS_KEY = '6c4dc15e4638af96a8c6359598a3934f';

export const getGeoLocationFromGoogle = async () => {
  try {
    const url = `${API_GOOGLE_MAP_GEOLOACATION_URL}?key=${GEOLOCATION_ACCESS_KEY}`;
    const jsonLocationInfo = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        radioType: 'gsm',
        considerIp: 'true',
        // "radioType": "lte"
      }),
    }).then((response) => response.json());
    console.log('GeoLocationInfo=>', jsonLocationInfo);
    return jsonLocationInfo;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export const getIpLocation = async () => {
  try {
    const ip = await publicIp.v4();
    const url = `${API_IP_LOCATION_URL}/${ip}?access_key=${IP_LOCATION_ACCESS_KEY}`;
    const jsonLocationInfo = await fetch(url, {
      method: 'GET',
    }).then((response) => response.json());
    console.log('ip, LocationInfo=>', ip, jsonLocationInfo);
    return jsonLocationInfo;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    maxWidth: '1200px',
    cursor: 'pointer',
  },
}));

export const MyGoogleMap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDGZBk8XIFz9IheDYhUbB0g-2-kIOJkOo0&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ width: '100%', height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const classes = useStyles();
  const {
    isMarkerShown,
    defaultCenter,
    fixed,
    tip,
    getMapInfo,
    setMap,
    zoom,
    markers,
  } = props;
  const [position, setPosition] = useState(defaultCenter);
  const [refs, setRefs] = useState({});
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedCenter(null);
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  useEffect(() => {
    setPosition(defaultCenter);
  }, [defaultCenter]);

  const onMarkerMounted = (ref) => {
    refs.marker = ref;
  };
  const onSearchBoxMounted = (ref) => {
    refs.searchBox = ref;
  };
  const onPositionChanged = () => {
    const pos = refs.marker.getPosition();
    getMapInfo({
      location: { lat: pos.lat(), lng: pos.lng() },
      zoom: mapInstance.getZoom(),
    });
  };

  const onClick = (e) => {
    if (!fixed) {
      setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      getMapInfo({
        location: { lat: e.latLng.lat(), lng: e.latLng.lng() },
        zoom: mapInstance.getZoom(),
      });
    }
  };
  const onMapMounted = (map) => {
    refs.map = map;
    setMapInstance(map);
    // setMap(map);
  };
  const onBoundsChanged = () => {
    setBounds(refs.map.getBounds());
    // setPosition(refs.map.getCenter())
  };
  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces();
    const bounds = new window.google.maps.LatLngBounds();

    places.forEach((place) => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    const nextMarkers = places.map((place) => ({
      position: place.geometry.location,
    }));
    const nextCenter = _.get(nextMarkers, '0.position', position);

    setPosition(nextCenter);
    getMapInfo({
      location: { lat: nextCenter.lat(), lng: nextCenter.lng() },
      zoom: mapInstance.getZoom(),
    });

    refs.map.fitBounds(bounds);
  };
  // console.log('Google defaultCenter=>', defaultCenter)
  // console.log('Google position=>', position)
  console.log('Google markers=>', markers);
  return (
    <Grid className={classes.root} container>
      <GoogleMap
        defaultMapTypeId={ROADMAP}
        defaultZoom={zoom}
        defaultCenter={defaultCenter}
        onClick={onClick}
        ref={onMapMounted}
        onBoundsChanged={onBoundsChanged}
      >
        <SearchBox
          ref={onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={window.google.maps.ControlPosition.TOP}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Address to search"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </SearchBox>
        {isMarkerShown && (
          <Marker
            position={position}
            draggable={!fixed}
            ref={onMarkerMounted}
            onPositionChanged={onPositionChanged}
            onClick={() => {
              setSelectedCenter(position);
            }}
          />
        )}
        {selectedCenter && tip && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedCenter(null);
            }}
            position={position}
          >
            <div>
              <h4>Title</h4>
              <h5>location</h5>
              <p>Hours of operation:</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </Grid>
  );
});
