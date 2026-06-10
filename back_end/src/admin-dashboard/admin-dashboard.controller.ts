import { GetAllProductAdminDto } from './dto/GetAllProductAdmin.dto';
import { AdminDashboardService } from './admin-dashboard.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import QueryPageDto from '../validators/queryPageDto';
import ParamsDto from '../validators/params.dto';

@Controller('admin-dashboard')
export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  @Get('users')
  getAllUsers(@Query() queryPageDto: QueryPageDto) {
    return this.adminDashboardService.getAllUsers(
      queryPageDto.page,
      queryPageDto.limit,
    );
  }

  @Get('products')
  getAllProducts(@Query() getAllProductAdminDto: GetAllProductAdminDto) {
    return this.adminDashboardService.getAllProducts(getAllProductAdminDto);
  }

  @Get(':productId')
  getproduct(@Param() ParamsDto: ParamsDto) {
    return this.adminDashboardService.getProduct(ParamsDto.productId);
  }

  @Get()
  findAllProductAndOrdersAndUsersCounts() {
    return this.adminDashboardService.findAllProductAndOrdersAndUsersCounts();
  }
}
