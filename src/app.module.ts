import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/entites/category.entity';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT!, 10) ?? 5432,
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'password',
      database: process.env.DB_NAME ?? 'tasks_db',
      entities: [Category, Task, User],
      synchronize: true, // auto-create tables (safe for dev only)
    }),
    CategoriesModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
