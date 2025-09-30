import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateOptionDto {
    @IsString()
    label: string;

    @IsOptional()
    @IsBoolean()
    isCorrect?: boolean; 

    @IsOptional()
    @IsNumber()
    order?: number;      
  }