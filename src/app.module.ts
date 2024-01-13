import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { MealPlannerModule } from './meal_planner/meal_planner.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('Database is connected !');
        });
        connection._events.connected();
        return connection;
      },
    }),
    AuthModule,
    UsersModule,
    WorkoutsModule,
    MealPlannerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
