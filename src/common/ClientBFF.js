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
      baseURL: 'https://ripley-bff.herokuapp.com/',
      timeout: 5000,
    })
    axiosRetry(bffInstance, retryConfig)
    return bffInstance
  }

  getWeather = async (lat, lng) => {
    return new Promise((resolve, reject) => {

      if (Math.random() > 0.1) {
        this.getInstance().request({
          url: 'weather',
          method: 'get',
          params: { lat, lng }
        }).then(response => {
          clearInterval(answered)
          resolve(response.data)
        })
        .catch(error => console.log(error.message))
      } else {
        console.log('random error')
      }

      const answered = setInterval(() => {
        if (Math.random() > 0.1) {
          this.getInstance().request({
            url: 'weather',
            method: 'get',
            params: { lat, lng }
          }).then(response => {
            clearInterval(answered)
            resolve(response.data)
          })
          .catch(error => console.log(error.message))
        } else {
          console.log('random error')
        }
      }, 5000)

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
