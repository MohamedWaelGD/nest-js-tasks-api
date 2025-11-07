import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), CategoriesModule, AuthModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
