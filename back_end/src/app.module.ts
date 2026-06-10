import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './guard/authGuard';
import { RolesGuard } from './guard/RolesGuard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaServiceModule } from './prisma.module';
import { HomeController } from './homePage.controller';
import { ProductModule } from './product/product.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    PrismaServiceModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    AdminDashboardModule,
    CartModule,
  ],
  controllers: [HomeController],

  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
