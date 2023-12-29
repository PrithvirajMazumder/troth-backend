import { environment } from '@/configs/environment'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { LoggerMiddleware } from '@/middlewares/logger.middleware'
import { DbModule } from '@/db/db.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { CompaniesModule } from '@/companies/companies.module';
import { BanksModule } from '@/banks/banks.module';
import { UsersModule } from './users/users.module';
import { TaxesModule } from './taxes/taxes.module';
import { UomsModule } from './uoms/uoms.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    DbModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: environment.nodeEnv === 'development'
    }),
    CompaniesModule,
    BanksModule,
    UsersModule,
    TaxesModule,
    UomsModule,
    ItemsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
