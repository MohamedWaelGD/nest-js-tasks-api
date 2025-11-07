import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTask } from './dto/create-task.dto';
import { UpdateTask } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('api/tasks')
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of all tasks',
    type: [Task],
  })
  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }

  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found task',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The created task',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  @Post()
  async create(@Body() dto: CreateTask) {
    return this.tasksService.create(dto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'The updated task',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Task or category not found',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTask) {
    return this.tasksService.update(+id, dto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tasksService.remove(+id);
    return { message: `Task with ID ${id} deleted successfully` };
  }
}
