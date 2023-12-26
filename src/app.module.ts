import { environment } from '@/configs/environment'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { UserModule } from '@/user/user.module'
import { LoggerMiddleware } from '@/middlewares/logger.middleware'
import { DbModule } from '@/db/db.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { CompaniesModule } from './companies/companies.module';
import { BanksModule } from './banks/banks.module';

@Module({
  imports: [
    UserModule,
    DbModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: environment.nodeEnv === 'development'
    }),
    CompaniesModule,
    BanksModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
