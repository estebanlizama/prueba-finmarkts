export class ResumenInfoModel {
  constructor({
    name = '',
    shortName = '',
    countryName = '',
    currencyName = '',
    currencySymbol = '',
    codeInstrument = '',
    marketName = '',
    hourOpen = '',
    hourClose = '',
    trading = false,
    exchangeRate = 1,
  } = {}) {
    this.name = name
    this.shortName = shortName
    this.countryName = countryName
    this.currencyName = currencyName
    this.currencySymbol = currencySymbol
    this.codeInstrument = codeInstrument
    this.marketName = marketName
    this.hourOpen = hourOpen
    this.hourClose = hourClose
    this.trading = trading
    this.exchangeRate = exchangeRate
  }

  static fromJson(json = {}) {
    return new ResumenInfoModel({
      name: json.name ?? '',
      shortName: json.shortName ?? '',
      countryName: json.countryName ?? '',
      currencyName: json.currencyName ?? '',
      currencySymbol: json.currencySymbol ?? '',
      codeInstrument: json.codeInstrument ?? '',
      marketName: json.marketName ?? '',
      hourOpen: json.hourOpen ?? '',
      hourClose: json.hourClose ?? '',
      trading: json.trading ?? false,
      exchangeRate: json.exchangeRate ?? 1,
    })
  }
}

export class ResumenPriceModel {
  constructor({
    lastPrice = 0,
    datetimeLastPrice = '',
    openPrice = 0,
    closePrice = 0,
    datetimeClosePrice = '',
    performanceAbsolute = 0,
    performanceRelative = 0,
    bid = 0,
    bidVolume = 0,
    bidDatetime = '',
    ask = 0,
    askVolume = 0,
    askDatetime = '',
    volumeMoney = 0,
    accumulatedVolumeMoney = 0,
    volumeInstrument = 0,
    accumulatedVolumeInstrument = 0,
    tend = '',
    maxDay = 0,
    minDay = 0,
    min52W = 0,
    max52W = 0,
    pct30D = 0,
    pctRelW52 = 0,
    pctRelCY = 0,
  } = {}) {
    this.lastPrice = lastPrice
    this.datetimeLastPrice = datetimeLastPrice
    this.openPrice = openPrice
    this.closePrice = closePrice
    this.datetimeClosePrice = datetimeClosePrice
    this.performanceAbsolute = performanceAbsolute
    this.performanceRelative = performanceRelative
    this.bid = bid
    this.bidVolume = bidVolume
    this.bidDatetime = bidDatetime
    this.ask = ask
    this.askVolume = askVolume
    this.askDatetime = askDatetime
    this.volumeMoney = volumeMoney
    this.accumulatedVolumeMoney = accumulatedVolumeMoney
    this.volumeInstrument = volumeInstrument
    this.accumulatedVolumeInstrument = accumulatedVolumeInstrument
    this.tend = tend
    this.maxDay = maxDay
    this.minDay = minDay
    this.min52W = min52W
    this.max52W = max52W
    this.pct30D = pct30D
    this.pctRelW52 = pctRelW52
    this.pctRelCY = pctRelCY
  }

  static fromJson(json = {}) {
    return new ResumenPriceModel({
      lastPrice: json.lastPrice ?? 0,
      datetimeLastPrice: json.datetimeLastPrice ?? '',
      openPrice: json.openPrice ?? 0,
      closePrice: json.closePrice ?? 0,
      datetimeClosePrice: json.datetimeClosePrice ?? '',
      performanceAbsolute: json.performanceAbsolute ?? 0,
      performanceRelative: json.performanceRelative ?? 0,
      bid: json.bid ?? 0,
      bidVolume: json.bidVolume ?? 0,
      bidDatetime: json.bidDatetime ?? '',
      ask: json.ask ?? 0,
      askVolume: json.askVolume ?? 0,
      askDatetime: json.askDatetime ?? '',
      volumeMoney: json.volumeMoney ?? 0,
      accumulatedVolumeMoney: json.accumulatedVolumeMoney ?? 0,
      volumeInstrument: json.volumeInstrument ?? 0,
      accumulatedVolumeInstrument: json.accumulatedVolumeInstrument ?? 0,
      tend: json.tend ?? '',
      maxDay: json.maxDay ?? 0,
      minDay: json.minDay ?? 0,
      min52W: json.min52W ?? 0,
      max52W: json.max52W ?? 0,
      pct30D: json.pct30D ?? 0,
      pctRelW52: json.pctRelW52 ?? 0,
      pctRelCY: json.pctRelCY ?? 0,
    })
  }
}
