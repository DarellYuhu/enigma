import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FacebookModule } from './facebook/facebook.module';
import { PrismaService } from './prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler/scheduler.service';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      expandVariables: true,
    }),
    HttpModule,
    ScheduleModule.forRoot(),
    FacebookModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, SchedulerService],
})
export class AppModule {}
