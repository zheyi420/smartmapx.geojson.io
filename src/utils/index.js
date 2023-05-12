export const loadScript = (url, callback) => {
  return new Promise(function(resolve, reject) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Script load error for ${url}`));

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};