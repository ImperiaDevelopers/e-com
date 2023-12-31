import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './model/image.model';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';
import { ValidFileValidator } from '../validators/file-validators';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({ summary: 'Create an image' })
  @ApiResponse({
    status: 201,
    description: 'The image has been successfully created.',
    type: Image,
  })
  @Post('create')
  async createImage(@Body() imageDto: CreateImageDto): Promise<Image> {
    return this.imageService.createImage(imageDto);
  }

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image (png, jpeg)*',
    type: FileUploadDto,
  })
  @ApiOperation({ summary: 'Upload new image' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'succesfully uploaded',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid image',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token is not found',
  })
  @Post('upload-image')
  @HttpCode(HttpStatus.CREATED)
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new ValidFileValidator({})],
      }),
    )
    image: FileUploadDto,
  ) {
    return this.imageService.uploadImage(image);
  }

  @ApiOperation({ summary: 'Get all images' })
  @ApiResponse({
    status: 200,
    description: 'Returns all images.',
    type: [Image],
  })
  @Get('all')
  async getAllImages(): Promise<Image[]> {
    const images = await this.imageService.getAllImages();
    return images;
  }

  @ApiOperation({ summary: 'Get all product  images' })
  @ApiResponse({
    status: 200,
    description: 'Returns all images.',
    type: [Image],
  })
  @Get('products/:id')
  async getAllProductImages(@Param('id') id: number): Promise<Image[]> {
    const images = await this.imageService.getProfuctImageById(id);
    return images;
  }

  @ApiOperation({ summary: 'Get an image by0 ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the image with the specified ID.',
    type: Image,
  })
  @Get(':id')
  async getImageById(@Param('id') id: string): Promise<Image> {
    const image = await this.imageService.getImageById(+id);
    return image;
  }

  @ApiOperation({ summary: 'Delete an image by ID' })
  @ApiResponse({
    status: 200,
    description: 'The image has been successfully deleted.',
    type: Number,
  })
  @Delete(':id')
  async deleteImageById(@Param('id') id: number): Promise<number> {
    return this.imageService.deleteImageById(+id);
  }

  @ApiOperation({ summary: 'Update an image' })
  @ApiResponse({
    status: 200,
    description: 'The image has been successfully updated.',
    type: Image,
  })
  @Put(':id')
  async updateImage(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
  ): Promise<Image> {
    return this.imageService.updateImage(+id, updateImageDto);
  }
}
