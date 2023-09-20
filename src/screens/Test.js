import React,{ useEffect } from 'react';

function Test() {
  function fn(response){
    console.log(response.credential)
  }
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "664601673419-hiir2173k5usfrm159r3ttg9108cpuhi.apps.googleusercontent.com",
      callback: fn
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signIn") || document.createElement("div"),
      { theme: "outline", size: "large" }
    );
  }, []);
  return (
    <div id="signIn">
    </div>
  );
}
export default Test;







