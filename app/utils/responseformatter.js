export default class ResponseFormatter {
  constructor (response) {
    this.response_date = new Date()
    this.response = response
  }

  static response (response) {
    const ResponseClass = new ResponseFormatter(response)
    return ResponseClass
  }

  success () {
    return {
      success: true,
      response: this.response,
      date: this.response_date
    }
  }

  error () {
    return {
      success: false,
      error: true,
      response: this.response,
      data: this.response_date
    }
  }
}
