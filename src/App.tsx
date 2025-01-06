import { useEffect, useState } from "react"; 
import { AuthClient } from "@dfinity/auth-client";
import eruda from 'eruda';

eruda.init();

function App() {
  const [urlParams, setUrlParams] = useState('NaN');
  const [startApp, setStartApp] = useState('');
  const isLocal = _isLocal(location.hostname);
  const identityProvider = isLocal ? `http://by6od-j4aaa-aaaaa-qaadq-cai.localhost:4943/` 
                                   : 'https://identity.ic0.app/';
  const keyType = 'Ed25519';
  let IIURL = `javascript:Telegram.WebApp.openLink('${identityProvider}/#authorize',{try_instant_view:true});`;
  let identity = null;
  let principal = '';

  useEffect(() => {
    setStartApp(window.location.href);
    console.log(window.location);
    setUrlParams(window.location.href);
  }, [])
  
  async function IILogin() {
    try { 
      const authClient = await AuthClient.create({ keyType });
      // 
      await new Promise((resolve) => {
          authClient.login({
              identityProvider,
              onSuccess: resolve
          });
      });
      identity = authClient.getIdentity();
      principal = identity.getPrincipal().toString();
      console.log(identity); 
      console.log(principal);
    } catch (e) {
      alert(e);
    }
  }
 
  window.open = function (open) {
    return function (url, name, features) {
      console.log(url);
      // set name if missing here
      name = name || "default_window_name";
      return open.call(window, url, name, features);
    };
  }(window.open); 

  return (
    <main>
      <a href={randURL()} onClick={IILogin}>Login II @dfinity/auth-client</a><br />
      <a href={IIURL}>Login II URL</a><br />
      <a href="https://pm-deom-ii-proxy.vercel.app/">II Proxy</a>
      <p>{startApp}</p>
    </main>
  );
}

export default App;

function _isLocal(str:any) {
  return (str).indexOf('127.0.0.1') != -1 || (str).indexOf('localhost') != -1;
}

function randURL() {
  let url = '#?r=' + (Math.floor(Math.random() * 1000) + 1);
  return url;
}