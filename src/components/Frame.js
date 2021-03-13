import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'aframe';
import check from '../components/Frame';
export default function Frame(props) {
  const { image, materialtextureloaded } = props;
  const [loadedtheimage, setLoadedtheimage] = useState(false);
  const [loading, setLoading] = useState(false);
  document.addEventListener('materialtextureloaded', function () {
    setLoadedtheimage(true);
  });
  console.log(loadedtheimage);
  useEffect(() => {
    setLoading(true);
    setInterval(() => {
      setLoading(false);
      setLoadedtheimage(true);
    }, 1000);
  }, []);
  return (
    <>
      {loadedtheimage ? (
        <>
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
            <a-sky materialtextureloaded id="sky-id" src={image}></a-sky>

            <a-camera id="cam" wasd-controls-enabled="false"></a-camera>
          </a-scene>
        </>
      ) : (
        <>
          <a-scene
            loading-screen="enabled:false"
            embedded
            style={{
              width: '0px!important',
              borderRadius: '40px',
            }}
            vr-mode-ui="enabled: false "
          >
            {/* <a-image materialtextureloaded id="sky-id" src={imagee}></a-image> */}
            <a-sky
              animation="property: rotation"
              id="sky-id"
              opacity={0.1}
              color="#fff"
              src={check}
            ></a-sky>

            <a-camera id="cam" wasd-controls-enabled="false"></a-camera>
          </a-scene>
        </>
      )}
    </>
  );
}
