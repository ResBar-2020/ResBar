import ordenes from './data/ordenes.json';


const fetch = (mockData, time = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData)
      }, time)
    })
  }
  
  
  export default {
      getOrdenes () {
        return fetch(ordenes, 1000) // wait 1s before returning posts
      }
    }