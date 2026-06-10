import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsArray,
  IsUUID,
  IsUrl,
  IsInt,
  Min,
} from 'class-validator';
import { Trim } from '../../validators/is-in-set.validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @Trim()
  @IsString({ message: 'title is required' })
  @MinLength(3, { message: 'title must be at least 3 characters' })
  @MaxLength(500, { message: 'title must be less than 500 characters' })
  title!: string;

  @Trim()
  @IsString({ message: 'title is required' })
  @MinLength(3, { message: 'desc must be at least 3 characters' })
  @MaxLength(500, { message: 'desc must be less than 500 characters' })
  desc!: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'price is required' })
  @IsInt({ message: 'price must be an integer' })
  @Min(1, { message: 'price must be at least 1' })
  price!: number;

  @IsNotEmpty({ message: 'star is required' })
  @IsInt({ message: 'star must be an integer' })
  @Min(1, { message: 'star must be at least 1' })
  @Type(() => Number)
  star!: number;

  @Type(() => Number)
  @IsNotEmpty({ message: 'discount is required' })
  @IsInt({ message: 'discount must be an integer' })
  @Min(0, { message: 'discount must be at least 0' })
  discount!: number;

  @IsUrl()
  imageCover!: string;

  @IsArray()
  @IsUrl({}, { each: true })
  @Type(() => String)
  images!: string[];

  @IsUUID()
  categoryId!: string;
}
