import { AuthClient } from "@dfinity/auth-client";
import { openLink } from '@telegram-apps/sdk';

function App() {
  const isLocal = _isLocal(location.hostname);
  const identityProvider = isLocal ? `http://by6od-j4aaa-aaaaa-qaadq-cai.localhost:4943/` 
                                   : 'https://identity.ic0.app/';
  const keyType = 'Ed25519';
  let identity = null;
  let principal = '';
  
  async function IILogin() {
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
  } 

  function wrap(object:any, method:any, wrapper:any){
    var fn = object[method];

    return object[method] = function(){
        return wrapper.apply(this, [fn.bind(this)].concat(
            Array.prototype.slice.call(arguments)));
    };
  };

  wrap(window, "open", function(orginalFn:any){
    var originalParams = Array.prototype.slice.call(arguments, 1);
    console.log('open is being overridden');
    console.log(originalParams);
    //Perform some logic
    //Call the original window.open with the original params
      if (openLink.isAvailable()) {
        return openLink(originalParams[0]!, {
          tryInstantView: true,
        });
      } else {
        orginalFn.apply(undefined, originalParams); 
      }
  });
 
  /*
  window.open = function (open) {
    return function (url, name, features) {
      console.log(url);
      // set name if missing here
      name = name || "default_window_name";
      if (openLink.isAvailable()) {
        return openLink(url!, {
          tryInstantView: true,
        });
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