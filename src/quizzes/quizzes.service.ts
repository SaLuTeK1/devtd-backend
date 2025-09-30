import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuestionType, Quiz } from "@prisma/client";

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateQuizDto): Promise<Quiz> {

    if (!dto.title) {
      throw new BadRequestException('Title is required');
    }

    if (!dto.questions) {
      throw new BadRequestException('Questions are required');
    }

    dto.questions.forEach((q, i) => {
      if (q.type === QuestionType.BOOLEAN && typeof q.correctBoolean !== 'boolean') {
        throw new BadRequestException(`Question #${i + 1}: correctBoolean is required for BOOLEAN.`);
      }
      if (q.type === QuestionType.INPUT && (!q.acceptableAnswers || q.acceptableAnswers.length === 0)) {
        throw new BadRequestException(`Question #${i + 1}: acceptableAnswers must contain at least one value for INPUT.`);
      }
      if (q.type === QuestionType.CHECKBOX) {
        if (!q.options || q.options.length < 2) {
          throw new BadRequestException(`Question #${i + 1}: CHECKBOX requires at least 2 options.`);
        }
        if (!q.options.some(o => o.isCorrect)) {
          throw new BadRequestException(`Question #${i + 1}: CHECKBOX must have at least one correct option.`);
        }
      }
    });

    const questionsData = dto.questions.map((q) => {
      const base = {
        prompt: q.prompt,
        type: q.type,
        order: q.order ?? 0,
       
        correctBoolean: q.type === QuestionType.BOOLEAN ? q.correctBoolean! : null,
        acceptableAnswers: q.type === QuestionType.INPUT ? (q.acceptableAnswers ?? []) : [],
      };

      const checkboxPart =
        q.type === QuestionType.CHECKBOX && q.options?.length
          ? {
              options: {
                create: q.options.map(o => ({
                  label: o.label,
                  isCorrect: !!o.isCorrect,
                  order: o.order ?? 0
                }))
              }
            }
          : {};

      return { ...base, ...checkboxPart };
    });

    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        questions: { create: questionsData }
      },
      include: {
        questions: { include: { options: true } }
      }
    });
  }

  async findAll(): Promise<Quiz[]> {
    return this.prisma.quiz.findMany({
      include: { questions: { include: { options: true } } }
    });
  }

  async findById(id: string): Promise<Quiz> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: { include: { options: true } } }
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    return quiz;
  }

  async delete(id: string): Promise<string> {
    await this.prisma.quiz.delete({
      where: { id }
    });

    return 'Quiz deleted successfully';
  }
}
 