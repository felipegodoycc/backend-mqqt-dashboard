import { Injectable } from '@nestjs/common';
import { Device, PowerUsage, DeviceState } from './interfaces/device.interface';
import { ConfigService } from '../config/config.service';

const eWelink = require('ewelink-api');

@Injectable()
export class EwelinkService {
    private connection;

    constructor(private configService: ConfigService) {
        this.connection = new eWelink({
            email: configService.get('EWELINK_USER'),
            password: configService.get('EWELINK_PASSWORD'),
        });
    }

    async getRegion() {
        const region = await this.connection.getRegion();
        console.log(region);
    }

    async getDevice(deviceID: string): Promise<Device> {
        const device = await this.connection.getDevice(deviceID);
        return device;
    }

    async getDevices(): Promise<Device[]> {
        const dispositivos = await this.connection.getDevices();
        return dispositivos;
    }

    async toogleDevice(deviceID: string, channel: string): Promise<DeviceState> {
        const status = await this.connection.toggleDevice(deviceID, channel);
        return status;
    }

    async getPowerUsage(deviceID: string): Promise<PowerUsage> {
        const usage = await this.connection.getDevicePowerUsage(deviceID);
        return usage;
    }

    async getDeviceState(deviceID: string): Promise<DeviceState> {
        const status = await this.connection.getDevicePowerState(deviceID);
        return status;
    }

    async setDeviceState(devideID: string, status: string, body): Promise<DeviceState> {
        const channel = body.channel || '1';
        const newStatus = await this.connection.setDevicePowerState(devideID, status, channel);
        return newStatus;
    }

}
