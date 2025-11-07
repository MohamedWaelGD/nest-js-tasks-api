import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the category.',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Work', description: 'The title of the category.' })
  @Column()
  title: string;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}
