import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { CreateFacebookDto } from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';

@Controller('facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @Post()
  create(@Body() createFacebookDto: CreateFacebookDto) {
    return this.facebookService.create(createFacebookDto);
  }

  @Get()
  findAll() {
    return this.facebookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facebookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacebookDto: UpdateFacebookDto) {
    return this.facebookService.update(+id, updateFacebookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facebookService.remove(+id);
  }
}
