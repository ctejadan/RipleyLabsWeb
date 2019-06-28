import axios from 'axios'
import axiosRetry from 'axios-retry'

const retryConfig = {
  retries: 2,
  shouldResetTimeout: true,
  retryCondition: () => true,
}

export default class ClientAPI {

  getInstance = () => {
    const bffInstance = axios.create({
      baseURL: process.env === 'production'? 'https://ripley-bff.herokuapp.com/' : 'http://localhost:3000',
      timeout: 5000,
    })
    axiosRetry(bffInstance, retryConfig)
    return bffInstance
  }


  handleSimulatedError = (lat, lng, resolve) => {

    const simulatedError = setInterval(() => {
      if (Math.random() > 0.1) {
        this.getInstance().request({
          url: 'weather',
          method: 'get',
          params: { lat, lng }
        }).then(response => {
          resolve(response.data)
          clearInterval(simulatedError)
        })
        .catch(error => console.log(error.message))
      } else {
        console.log('random error')
      }
    }, 5000)

    if (Math.random() > 0.1) {
      this.getInstance().request({
        url: 'weather',
        method: 'get',
        params: { lat, lng }
      }).then(response => {
        resolve(response.data)
        clearInterval(simulatedError)
      })
      .catch(error => console.log(error.message))
    } else {
      console.log('random error')
    }
  }

  getWeather = async (lat, lng) => {
    return new Promise((resolve, reject) => {
      this.handleSimulatedError(lat, lng, resolve)
    })
  }

  getCoordinatesByCity = async (city) => {
    return new Promise((resolve, reject) => {
      this.getInstance().request({
        url: 'coordinates/' + city,
        method: 'get',
      }).then(response => {
        resolve(response.data)
      }).catch(error =>
        reject(error.message)
      )
    })
  }
}
