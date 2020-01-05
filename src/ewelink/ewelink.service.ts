import { Injectable } from '@nestjs/common';
import { Device, PowerUsage, DeviceState } from './interfaces/device.interface';
// import eWelink from 'ewelink-api';
const eWelink = require('ewelink-api');

@Injectable()
export class EwelinkService {
    private connection;

    constructor(){
        this.connection = new eWelink({
            email: 'felipe.godoy@ceinf.cl',
            password: 'pipeaxe96'
        })
        this.getDevices();
    }

    async getRegion(){
        const region = await this.connection.getRegion();
        console.log(region)
    }

    async getDevices(): Promise<Device[]>{
        const dispositivos = await this.connection.getDevices(); 
        console.log("Dispositivos conectados: ", dispositivos.length)
        return dispositivos;
    }

    async toogleDevice(deviceID: string, channel:string): Promise<DeviceState> {
        const status = await this.connection.toggleDevice(deviceID, channel);
        return status;
    }

    async getPowerUsage(deviceID: string): Promise<PowerUsage> {
        const usage = await this.connection.getDevicePowerUsage(deviceID);
        return usage
    }

    async getDeviceState(deviceID: string): Promise<DeviceState> {
        const status = await this.connection.getDevicePowerState(deviceID);
        return status;
    }

    async setDeviceState(devideID: string, status: string, body): Promise<DeviceState> {
        const channel = body.channel || "1";
        const new_status = await this.connection.setDevicePowerState(devideID,status,channel);
        return new_status;
    }


}
