export const onInitialClientRender = (_, pluginOptions) => {
  const hotjarId = pluginOptions.id;
  const hotjarSv = pluginOptions.sv;
  const delayLoad = pluginOptions.optimize;

  const script = document.createElement("script");

  script.innerHTML = ` (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:${hotjarId},hjsv:${hotjarSv}};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`;

  const appendScript = () => {
    document.body.appendChild(script);
  };

  if (!delayLoad) {
    appendScript();
  } else {
    setTimeout(() => {
      window["requestIdleCallback"]
        ? window.requestIdleCallback(appendScript)
        : appendScript();
    }, 3000);
  }
};
