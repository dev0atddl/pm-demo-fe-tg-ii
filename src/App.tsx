import { useEffect } from "react"; 
import { AuthClient } from "@dfinity/auth-client";
import eruda from 'eruda';

eruda.init();

function App() {
  const isLocal = _isLocal(location.hostname);
  const identityProvider = isLocal ? `http://by6od-j4aaa-aaaaa-qaadq-cai.localhost:4943/` 
                                   : 'https://identity.ic0.app/';
  const keyType = 'Ed25519';
  let identity = null;
  let principal = '';

  useEffect(() => {
  }, [])
  
  async function IILogin() {
    /*
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
    */
  }
 
  /*
  window.open = function (open) {
    return function (url, name, features) {
      console.log(url);
      // set name if missing here
      name = name || "default_window_name";
      if (openLink.isAvailable()) {
        openLink(url!, { tryInstantView: true });
        return open.call(window, url, name, features);
      } else {
        return open.call(window, url, name, features);
      }
    };
  }(window.open); 
  */

  return (
    <main>
      <button onClick={IILogin}>Login</button>
    </main>
  );
}

export default App;

function _isLocal(str:any) {
  return (str).indexOf('127.0.0.1') != -1 || (str).indexOf('localhost') != -1;
}