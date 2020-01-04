export interface Device {
    _id: string;
    name: string;
    type: string;
    deviceid: string;
    apikey: string;
    extra: Extra2;
    __v: number;
    onlineTime: string;
    ip: string;
    location: string;
    offlineTime: string;
    deviceStatus: string;
    tags: Tags;
    settings: Settings;
    devGroups: any[];
    groups: any[];
    params: Params;
    online: boolean;
    createdAt: string;
    group: string;
    sharedTo: any[];
    devicekey: string;
    deviceUrl: string;
    brandName: string;
    showBrand: boolean;
    brandLogoUrl: string;
    productModel: string;
    devConfig: DevConfig;
    uiid: number;
  }

  export interface DevConfig {
  }

  export interface Params {
    pulseWidth: number;
    pulse: string;
    init: number;
    sledOnline: string;
    version: number;
    timers: any[];
    controlType: string;
    partnerApikey: string;
    bindInfos: BindInfos;
    rssi: number;
    staMac: string;
    startup: string;
    fwVersion: string;
    switch: string;
  }

  export interface BindInfos {
    gaction: string[];
  }

  export interface Settings {
    alarmNotify: number;
    opsHistory: number;
    opsNotify: number;
  }

  export interface Tags {
    m_4434_sany: string;
  }

  export interface Extra2 {
    _id: string;
    extra: Extra;
  }

  export interface Extra {
    description: string;
    brandId: string;
    apmac: string;
    mac: string;
    ui: string;
    modelInfo: string;
    model: string;
    manufacturer: string;
    uiid: number;
    staMac: string;
    chipid: string;
  }

  export interface DeviceState {
    status?: string;
    state?: string;
    error?: number;
    msg?: string;
  }

  export interface SwitchCount {
    status?: string;
    switchesAmount?: number;
    error?: number;
    msg?: string;
  }

  export interface TemperatureHumidity {
    status?: string;
    temperature?: number;
    humidity?: number;
    error?: number;
    msg?: string;
  }

  export interface PowerUsage {
    status?: string;
    monthly?: number;
    daily?: Daily[];
    error?: number;
    msg?: string;
  }

  export interface FirmwareVersion {
    status?: string;
    fwVersion?: string;
    error?: number;
    msg?: string;
  }

  export interface LoginInfo {
    at: string;
    rt: string;
    user: User;
    region: string;
  }

  export interface User {
    _id: string;
    email: string;
    appId: string;
    lang: string;
    online: boolean;
    onlineTime: string;
    ip: string;
    location: string;
    offlineTime: string;
    userStatus: string;
    appInfos: AppInfo[];
    isAccepEmailAd: boolean;
    bindInfos: LoginBindInfos;
    createdAt: string;
    apikey: string;
  }

  export interface LoginBindInfos {
    gaction: string[];
  }

  export interface AppInfo {
    appVersion: string;
    os: string;
  }

  export interface Daily {
    day: number;
    usage: number;
  }