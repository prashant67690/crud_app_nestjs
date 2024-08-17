import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodo, UpdateTodo } from './types/todoTypes';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    private jwtService: JwtService,
  ) {}

  verify(token: string): number {
    const res = this.jwtService.verify(token, { secret: 'secretKey' });
    console.log(res);
    return res;
  }

  async create(createTodo: CreateTodo, userid: number): Promise<Todo> {
    const todo: Todo = new Todo();
    todo.title = createTodo.title;
    todo.description = createTodo.description;
    todo.userId = userid;
    return this.todoRepository.save(todo);
  }

  find(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  viewTodo(id: number): Promise<Todo> {
    return this.todoRepository.findOneBy({ userId: id });
  }

  update(id: number, updatetodo: UpdateTodo): Promise<Todo> {
    const todo: Todo = new Todo();
    todo.title = updatetodo.title;
    todo.description = updatetodo.description;
    return this.todoRepository.save(todo);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.todoRepository.delete(id);
  }
}
