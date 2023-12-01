import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

const connectionMongodb = MongooseModule.forRoot(
  'mongodb://127.0.0.1:27017/Fitness',
  {
    connectionFactory: (connection) => {
      connection.on('connected', () => {
        console.log('Database is connected !');
      });
      connection.on('error', (error) => {
        console.log('DB connection failed! for error: ', error);
      });
      connection._events.connected();
      return connection;
    },
  },
);

@Module({
  imports: [AuthModule, connectionMongodb],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
