/**
 * 您可以将常用的方法、或系统 API，统一封装，暴露全局，以便各页面、组件调用，而无需 require / import.
 */
const prompt = require('@system.prompt')

/**
 * 拼接 url 和参数
 */
function queryString(url, query) {
  let str = []
  for (let key in query) {
    str.push(key + '=' + query[key])
  }
  let paramStr = str.join('&')
  return paramStr ? `${url}?${paramStr}` : url
}

function showToast(message = '', duration = 0) {
  if (!message) return
  prompt.showToast({
    message: message,
    duration
  })
}

const getnativead = (typenid = '') =>{
  return new Promise((resolve, reject) => {
      const ad = require('@service.ad')
      console.log('hhhhh-Utils')
      const adUnitId = '83755'
      try {
          let nativeAd = null;
              nativeAd = ad.createNativeAd({
                  // adUnitId: this.adparams.currentparams[type]
                  adUnitId: adUnitId
                  // adUnitId: 'testb65czjivt9'
                  // adUnitId: 'testb65czjivt91'
              }) || '';
          
          if (nativeAd) {
              nativeAd.load();
              nativeAd.onLoad(e => {
                  console.log('succeeeeewww',adUnitId)
                  console.log(e)
                  e.adList[0].nativeAd = nativeAd
                  e.adList[0].isad = true
                  e.adList[0].adUnitId = adUnitId
                  // 上报曝光
                  nativeAd.reportAdShow({
                      adId: e.adList[0].adId
                  });
                  resolve(e.adList[0]);
              });
              nativeAd.onError(err => {
                  resolve(err);
                  console.log('err', err , new Date().getTime())
              });
          }
      } catch (error) {
          console.log(error)
          resolve(error);
      }
  })
}
export default {
  showToast,
  queryString,
  getnativead
}
