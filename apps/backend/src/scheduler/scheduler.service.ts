import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { FacebookGraphResponseDto } from './dto/facebook-graph-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SchedulerService {
  constructor(
    private configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
    private prisma: PrismaService,
  ) {}

  @Cron('*/5 * * * * *', { name: 'getFacebookData' })
  async getFacebookData() {
    try {
      const FACEBOOK_GRAPH_BASE_URL = this.configService.get<string>(
        'FACEBOOK_GRAPH_BASE_URL',
      );

      const metrics = [
        'page_post_engagements',
        'page_lifetime_engaged_followers_unique',
        'page_daily_follows',
        'page_follows',
        'page_impressions',
        'page_posts_impressions',
        'post_clicks',
        'post_impressions',
        'post_impressions_fan',
        'post_reactions_like_total',
        'post_reactions_love_total',
        'post_reactions_wow_total',
        'post_reactions_haha_total',
        'post_reactions_sorry_total',
        'post_reactions_anger_total',
        'page_fans',
        'page_fans_locale',
        'page_fans_city',
        'page_fans_country',
        'page_fan_adds',
        'page_fan_removes',
        'page_video_views',
        'page_video_complete_views_30s',
        'page_views_total',
        'post_video_avg_time_watched',
        'post_video_views',
      ];
      const pageId = '101667115094028';
      const accessToken =
        'EAAGhvlPnuKMBOzMozZCVIUZBdvJMPpFDGhjS23EL5aKeZCPAerOwr1JhhEfCnRN6tY7MoAt6CUmLgZCO1n3ZA5jItEB3ZCAyUQiSwYltaZAZCU0mLucOmH9hj88l6YZANFOtxT01iZCZCVPIRAnpmBc5WrZAZAZCPlOOVlQyweTxRybqd6Y7vSteLB5U40XjhX8f82B8MZD';

      const url = new URL(`/${pageId}/insights`, FACEBOOK_GRAPH_BASE_URL);
      url.searchParams.set('metric', metrics.join(','));
      url.searchParams.set('access_token', accessToken);
      url.searchParams.set('date_preset', 'last_month');
      const response = await fetch(url);

      const data: FacebookGraphResponseDto = await response.json();

      const metricPayload = data.data.flatMap((metric) =>
        metric.values.map((value) => ({
          metricId: metric.id,
          end_time: new Date(value.end_time),
          ...value,
        })),
      );
      await this.prisma.$transaction(async (db) => {
        const page = await db.page.create({
          data: { accessToken, pageId },
        });
        await db.metric.createMany({
          data: data.data.map(({ values, ...metric }) => ({
            ...metric,
            pageId: page.id,
          })),
          skipDuplicates: true,
        });
        //   .finally(() => this.schedulerRegistry.deleteCronJob('getFacebookData'));

        await db.values.createMany({
          data: metricPayload.map((value) => ({
            ...value,
          })),
          skipDuplicates: true,
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.schedulerRegistry.deleteCronJob('getFacebookData');
    }
  }
}
