import axios from 'axios'

export default class ClientAPI {

  getInstance = () => {
    return axios.create({
      baseURL: 'https://ripley-bff.herokuapp.com/', // 'http://localhost:5000',
      timeout: 5000,
    })
  }

  handleSimulatedError = (lat, lng, resolve) => {
    if (Math.random() > 0.1) {
      this.getInstance().request({
        url: 'weather',
        method: 'get',
        params: { lat, lng }
      }).then(response => {
        resolve(response.data)
      })
      .catch(error => console.log(error.message))
    } else {
      console.log('random error')
      setTimeout(() => {
        this.handleSimulatedError(lat, lng, resolve)
      }, 2000);
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
