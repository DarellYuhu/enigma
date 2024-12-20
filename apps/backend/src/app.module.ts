import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FacebookModule } from './facebook/facebook.module';
import { PrismaService } from './prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler/scheduler.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      expandVariables: true,
    }),
    ScheduleModule.forRoot(),
    FacebookModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, SchedulerService],
})
export class AppModule {}
