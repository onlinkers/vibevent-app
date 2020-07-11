import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "components/layouts/Sidebar";
import NotFound from "routes/NotFound";

import { Spin } from "antd";

interface Props {

}

const Room: React.FunctionComponent<Props> = () => {

  const { roomId } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {

    // eslint-disable-next-line
    console.log("roomId", { roomId });
    if(!roomId) {
      setError(true);
      setLoaded(true);
    }
    else {
      setLoaded(true);
      const script = document.createElement("script");
      script.innerHTML = `
        var _options = {
            '_license_key':'${roomId}',
            '_role_token':'',
            '_registration_token':'',
            '_widget_containerID':'embedWidget',
            '_widget_width':'100%',
            '_widget_height':'100vh',
        };
        (function() {
            !function(i){
                i.Widget=function(c){
                    'function'==typeof c&&i.Widget.__cbs.push(c),
                    i.Widget.initialized&&(i.Widget.__cbs.forEach(function(i){i()}),
                    i.Widget.__cbs=[])
                },
                i.Widget.__cbs=[]
            }(window);
            var ab = document.createElement('script'); 
            ab.type = 'text/javascript'; 
            ab.async = true;
            ab.src = 'https://embed.livewebinar.com/em?t='+_options['_license_key']+'&'+Object.keys(_options).reduce(function(a,k){
                    a.push(k+'='+encodeURIComponent(_options[k]));
                    return a
                },[]).join('&');
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ab, s);
        })();`;

      script.async = true;
      document.body.appendChild(script);

    }

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="Page EventDetails">
      <Sidebar />
      {!loaded && (
        <div className="Page--full Loader">
          <Spin />
        </div>
      )}
      {loaded && (
        error ? (
          <NotFound type="room"/>
        ) : (
          <div id="embedWidget"></div>
        )
      )}
    </div>
  );
};

export default Room;
