import { QuestionType } from "@prisma/client";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested, ArrayMinSize } from 'class-validator'
import {CreateOptionDto} from "./create-option.dto";
import { Type } from 'class-transformer';

export class CreateQuestionDto {
    @IsString()
    prompt: string;
    
    @IsEnum(QuestionType)
    type: QuestionType;

    @IsOptional()
    @IsNumber()
    order?: number;

    @IsOptional()
    @IsBoolean()
    correctBoolean?: boolean;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    acceptableAnswers?: string[];

    @IsOptional()
    @IsArray()
    @ArrayMinSize(2)
    @ValidateNested({ each: true })
    @Type(() => CreateOptionDto)
    options?: CreateOptionDto[];
}