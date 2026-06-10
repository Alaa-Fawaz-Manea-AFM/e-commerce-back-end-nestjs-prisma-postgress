import { GetAllProductAdminDto } from './dto/GetAllProductAdmin.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import sendResponsive from '../utils/sendResponsive';
import { PrismaService } from '../prisma.service';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class AdminDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [users, totalPages] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          role: Role.user,
        },
        take: limit,
        skip,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count({
        where: {
          role: Role.user,
        },
      }),
    ]);

    return sendResponsive(
      {
        meta: {
          totalPages: Math.ceil(totalPages / limit),
          page,
          limit,
        },
        users,
      },
      'Get All Users successfully',
    );
  }

  async getProduct(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        title: true,
        desc: true,
        imageCover: true,
        images: true,
        price: true,
        star: true,
        discount: true,
        category: {
          select: {
            id: true,
            category: true,
          },
        },
      },
    });

    if (!product) throw new NotFoundException('product not found');

    return sendResponsive(product, 'product retrieved successfully');
  }

  async getAllProducts(getAllProductAdminDto: GetAllProductAdminDto) {
    const { search, page = 1, limit = 10 } = getAllProductAdminDto;

    const skip = (page - 1) * limit;
    const where: Prisma.ProductWhereInput = {
      ...(search && {
        title: {
          contains: search,
          mode: 'insensitive',
        },
        desc: {
          contains: search,
          mode: 'insensitive',
        },
      }),
    };

    const [products, totalPages] = await Promise.all([
      this.prisma.product.findMany({
        where,
        take: limit,
        skip,

        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          imageCover: true,
          price: true,
          star: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              category: true,
            },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return sendResponsive(
      {
        meta: {
          totalPages: Math.ceil(totalPages / limit),
          page,
          limit,
        },
        products,
      },
      'products retrieved successfully',
    );
  }

  async findAllProductAndOrdersAndUsersCounts() {
    const [productCounts, userCounts] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.user.count(),
    ]);
    return sendResponsive(
      {
        productCounts,
        orderCounts: 0,
        userCounts,
      },
      'Admin dashboard data fetched successfully',
    );
  }
}
