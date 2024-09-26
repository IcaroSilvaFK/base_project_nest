import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler'

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
    ThrottlerModule.forRoot([
      {
        name: "short",
        ttl: 1000,
        limit: 3
      },
      {
        name: 'medium',
        ttl:1000,
        limit: 20
      },
      {
        name: "long",
        ttl: 60000,
        limit: 100
      }
    ])
    ,
    DatabaseModule,
  ],
  controllers: [],
  providers:[] ,
})
export class AppModule {}
