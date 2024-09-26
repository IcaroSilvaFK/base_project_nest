import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: "1d"}
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers:[] ,
})
export class AppModule {}
