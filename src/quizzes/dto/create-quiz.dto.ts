import {IsArray, IsString, ValidateNested, ArrayMinSize} from 'class-validator'
import {CreateQuestionDto} from './create-question.dto';
import { Type } from 'class-transformer';

export class CreateQuizDto {
    @IsString()
    title: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    questions: CreateQuestionDto[];
}
  