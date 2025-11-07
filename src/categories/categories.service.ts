import { Injectable } from '@nestjs/common';
import { Category } from './entites/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(title: string) {
    const category = this.categoryRepository.create({ title });
    return this.categoryRepository.save(category);
  }

  async findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    return this.categoryRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return this.categoryRepository.delete(id);
  }

  async update(id: number, title: string) {
    await this.categoryRepository.update(id, { title });
    return this.categoryRepository.findOneBy({ id });
  }
}
