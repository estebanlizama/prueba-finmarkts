export class InfoModel {
  constructor({ name, shortName, countryName, codeInstrument }) {
    this.name = name || ''
    this.shortName = shortName || ''
    this.countryName = countryName || ''
    this.codeInstrument = codeInstrument || ''
  }

  static fromJson(json) {
    return new InfoModel({
      name: json.name,
      shortName: json.shortName,
      countryName: json.countryName,
      codeInstrument: json.codeInstrument,
    })
  }
}

export class ConstituentModel {
  constructor({
    codeInstrument,
    name,
    shortName,
    pctDay,
    pct30D,
    pctCY,
    pct1Y,
    lastPrice,
    datetimeLastPrice,
    volumeMoney,
    accumulatedVolumeMoney,
    tend,
    performanceAbsolute,
    performanceRelative,
  }) {
    this.codeInstrument = codeInstrument || ''
    this.name = name || ''
    this.shortName = shortName || ''
    this.pctDay = pctDay || 0
    this.pct30D = pct30D || 0
    this.pctCY = pctCY || 0
    this.pct1Y = pct1Y || 0
    this.lastPrice = lastPrice || 0
    this.datetimeLastPrice = datetimeLastPrice || ''
    this.volumeMoney = volumeMoney || 0
    this.accumulatedVolumeMoney = accumulatedVolumeMoney || 0
    this.tend = tend || ''
    this.performanceAbsolute = performanceAbsolute || 0
    this.performanceRelative = performanceRelative || 0
  }

  static fromJson(json) {
    return new ConstituentModel({
      codeInstrument: json.codeInstrument,
      name: json.name,
      shortName: json.shortName,
      pctDay: json.pctDay,
      pct30D: json.pct30D,
      pctCY: json.pctCY,
      pct1Y: json.pct1Y,
      lastPrice: json.lastPrice,
      datetimeLastPrice: json.datetimeLastPrice,
      volumeMoney: json.volumeMoney,
      accumulatedVolumeMoney: json.accumulatedVolumeMoney,
      tend: json.tend,
      performanceAbsolute: json.performanceAbsolute,
      performanceRelative: json.performanceRelative,
    })
  }
}
