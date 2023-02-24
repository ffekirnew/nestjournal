import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const user: User = new User();

        user.salt = await bcrypt.genSalt();
        user.username = authCredentialsDto.username;
        user.password = await bcrypt.hash(authCredentialsDto.password, user.salt);

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === "23505") {
                throw new ConflictException(`User with the username ${user.username} already exists. Pick another username.`);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const user: User = await this.validateUser(authCredentialsDto);

        const payload: JwtPayload = { username: user.username };
        const accessToken: string = this.jwtService.sign( payload );

        return { accessToken };
    }

    async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;

        const user: User = await this.userRepository.findOne({ where: { username }});

        if (!user) {
            throw new NotFoundException(`User ${username} doesn't exist.`);
        } 
        
        const passwordChecks: boolean = await user.validatePassword( password )

        if ( !passwordChecks ) {
            throw new UnauthorizedException(`Password is wrong. Check again.`);
        } 
        
        return user;
    }
}
