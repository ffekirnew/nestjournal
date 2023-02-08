import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const user: User = new User();

        user.salt = bcrypt.genSalt();
        user.username = authCredentialsDto.username;
        user.password = await bcrypt.hash(authCredentialsDto.password, user.salt);

        console.log(user.password);

        try {
            // await this.userRepository.save(authCredentialsDto);
        } catch (error) {
            if (error.code == 23505) {
                throw new ConflictException(`User with the username ${user.username} already exists. Pick another username.`);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
