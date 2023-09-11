import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddAnnotationCommand } from './annotations/add-annotation';
import { ListAnnotationsCommand } from './annotations/list-annotations';
import { AddAnnotationInput } from './annotations/add-annotation/dtos/add-annotation.input';
import { AnnotationResult } from './annotations/types/annotation-result';

@Controller('/annotations')
export class AnnotationsController {
  constructor(private commandBus: CommandBus) {}

  @Get()
  async getAnnotations(): Promise<AnnotationResult[]> {
    return this.commandBus.execute(new ListAnnotationsCommand());
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async addAnnotation(
    @Body() body: AddAnnotationInput,
  ): Promise<AnnotationResult> {
    return this.commandBus.execute(new AddAnnotationCommand(body));
  }
}
