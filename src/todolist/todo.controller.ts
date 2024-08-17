import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { CreateTodo, UpdateTodo } from './types/todoTypes';
import { TodoService } from './todo.service';
import { JwtGuard } from 'src/auth/gaurds';

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  find() {
    return this.todoService.find();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.todoService.viewTodo(+id);
  }

  @Post()
  create(@Body() createTodo: CreateTodo, @Req() req: Request) {
    const token = req.cookies['user_token'];
    const userId = this.todoService.verify(token);
    return this.todoService.create(createTodo, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodo: UpdateTodo) {
    return this.todoService.update(+id, updateTodo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
