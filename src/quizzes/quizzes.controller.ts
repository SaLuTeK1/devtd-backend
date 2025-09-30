import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizzesService } from './quizzes.service';
import { Quiz } from '@prisma/client';

@Controller('quizzes')
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) {}

    @Post()
    create(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
        return this.quizzesService.create(createQuizDto);
    }

    @Get()
    findAll(): Promise<Quiz[]> {
        return this.quizzesService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<Quiz> {
        return this.quizzesService.findById(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<string> {
        return this.quizzesService.delete(id);
    }
}
