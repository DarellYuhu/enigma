import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FacebookModule } from './facebook/facebook.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ['.env.development'] }), FacebookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
