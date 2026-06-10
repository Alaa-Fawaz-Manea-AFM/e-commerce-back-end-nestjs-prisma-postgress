import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';
import sendResponsive from '../utils/sendResponsive';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories() {
    const categories = await this.prisma.category.findMany({
      orderBy: { category: 'asc' },
      select: {
        id: true,
        category: true,
      },
    });

    return sendResponsive(categories, 'Categories retrieved successfully');
  }

  async createCategory(dataCategoryDto: CreateCategoryDto) {
    const newCategory = await this.prisma.category.create({
      data: dataCategoryDto,
    });

    return sendResponsive(newCategory, 'Category created successfully');
  }

  async updateCategory(categoryId: string, data: UpdateCategoryDto) {
    await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data,
    });

    return sendResponsive(null, 'Category updated successfully');
  }

  async deleteCategory(categoryId: string, userId: string) {
    return this.prisma.$transaction(async (prisma) => {
      await Promise.all([
        prisma.category.delete({
          where: { id: categoryId },
        }),
        prisma.user.update({
          where: { id: userId },
          data: {
            productCounts: {
              decrement: 1,
            },
          },
        }),
      ]);

      return sendResponsive(null, 'category deleted successfully');
    });
  }
}
