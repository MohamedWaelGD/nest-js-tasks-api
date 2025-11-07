import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategory } from './dto/create-category.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Category } from './entites/category.entity';
import { UpdateCategory } from './dto/update-category.dto';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of categories',
    type: [Category],
  })
  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 200, description: 'The category', type: Category })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(+id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'The created category',
    type: Category,
  })
  @Post()
  async create(@Body() createDto: CreateCategory) {
    return this.categoriesService.create(createDto.title);
  }

  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({
    status: 200,
    description: 'The updated category',
    type: Category,
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateCategory) {
    const category = await this.categoriesService.update(+id, updateDto.title);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({
    status: 200,
    description: 'The deleted category',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.categoriesService.remove(+id);
    if (!deleted) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return { message: `Category with ID ${id} deleted successfully` };
  }
}
