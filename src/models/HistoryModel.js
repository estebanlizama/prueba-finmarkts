export class HistoryInfoModel {
  constructor({
    name = '',
    shortName = '',
    countryName = '',
    currencyName = '',
    currencySymbol = '',
    codeInstrument = '',
    hourOpen = '',
    hourClose = '',
  } = {}) {
    this.name = name
    this.shortName = shortName
    this.countryName = countryName
    this.currencyName = currencyName
    this.currencySymbol = currencySymbol
    this.codeInstrument = codeInstrument
    this.hourOpen = hourOpen
    this.hourClose = hourClose
  }

  static fromJson(json = {}) {
    return new HistoryInfoModel({
      name: json.name ?? '',
      shortName: json.shortName ?? '',
      countryName: json.countryName ?? '',
      currencyName: json.currencyName ?? '',
      currencySymbol: json.currencySymbol ?? '',
      codeInstrument: json.codeInstrument ?? '',
      hourOpen: json.hourOpen ?? '',
      hourClose: json.hourClose ?? '',
    })
  }
}

export class HistoryChartModel {
  constructor({
    datetimeLastPrice = '',
    datetimeLastPriceTs = 0,
    lastPrice = 0,
    highPrice = 0,
    lowPrice = 0,
    openPrice = 0,
    closePrice = 0,
    volume = 0,
    volumeMoney = 0,
    performanceRelative = 0,
    performanceAbsolute = 0,
    tend = '',
  } = {}) {
    this.datetimeLastPrice = datetimeLastPrice
    this.datetimeLastPriceTs = datetimeLastPriceTs
    this.lastPrice = lastPrice
    this.highPrice = highPrice
    this.lowPrice = lowPrice
    this.openPrice = openPrice
    this.closePrice = closePrice
    this.volume = volume
    this.volumeMoney = volumeMoney
    this.performanceRelative = performanceRelative
    this.performanceAbsolute = performanceAbsolute
    this.tend = tend
  }

  static fromJson(json = {}) {
    if (Array.isArray(json)) {
      return json.map((item) => new HistoryChartModel(item))
    }
  }
}
