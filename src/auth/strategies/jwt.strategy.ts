import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/payload.interface';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService, config: ConfigService){

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('SECRET_KEY_JWT'),
            passReqToCallback: true
        });
    }

    async validate(req,payload: JwtPayload, done){
        let rawToken = req.headers.authorization.split('Bearer ')[1];
        return this.authService.validateToken(rawToken)
            .then( _ => {
                done(null,this.authService.validateUser(payload))
            })
            .catch( err => {
                return done('No autorizado',false)               
            })
    }

}