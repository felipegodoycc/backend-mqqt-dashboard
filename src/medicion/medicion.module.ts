import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MedicionController } from './medicion.controller';
import { MedicionService } from './medicion.service';
import { medicionProviders } from './medicion.providers';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [MedicionController],
    providers: [MedicionService, ...medicionProviders],
    exports: [MedicionService]
})
export class MedicionModule {}
