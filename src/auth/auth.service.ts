import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async register(username: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ username, password: hashed });
    return this.usersRepo.save(user);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepo.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
