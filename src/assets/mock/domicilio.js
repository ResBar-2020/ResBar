import domicilios from './data/domicilio.json'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}


export default {
    getDomicilios () {
      return fetch(domicilios, 1000) // wait 1s before returning posts
    }
  }
  