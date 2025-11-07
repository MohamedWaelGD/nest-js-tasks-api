import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTask } from './dto/create-task.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
    private categoriesRepo: CategoriesService,
  ) {}

  async findAll() {
    return this.tasksRepo.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const task = await this.tasksRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async create(dto: Partial<CreateTask>) {
    const category = await this.categoriesRepo.findOne(dto.categoryId!);
    if (!category) throw new NotFoundException('Category not found');

    const task = this.tasksRepo.create({
      title: dto.title,
      description: dto.description,
      category,
    });
    return this.tasksRepo.save(task);
  }

  async update(id: number, dto: Partial<CreateTask>) {
    const task = await this.tasksRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    if (dto.categoryId) {
      const category = await this.categoriesRepo.findOne(dto.categoryId);
      if (!category) throw new NotFoundException('Category not found');
      task.category = category;
    }
    Object.assign(task, dto);
    return this.tasksRepo.save(task);
  }

  async remove(id: number) {
    const task = await this.tasksRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return this.tasksRepo.remove(task);
  }
}
