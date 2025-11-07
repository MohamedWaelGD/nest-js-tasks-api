import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entites/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @ApiProperty({ example: 1, description: 'The unique identifier of the task' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Complete project documentation',
    description: 'The title of the task',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 'Finish writing the documentation for the new project by Friday.',
    description: 'The detailed description of the task',
  })
  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Category, (category) => category.tasks, {
    onDelete: 'CASCADE',
  })
  category: Category;
}
