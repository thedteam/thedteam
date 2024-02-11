if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
  
  /*=============== Offline Page ===============*/
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('');
  }
});
