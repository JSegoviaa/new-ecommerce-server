import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { CreateTagDto, UpdateTagDto } from './dto';
import { Tag } from './entities';
import { ErrorHandlerService } from '../common/services/error-handler';
import { PaginationDto } from '../common/dtos';
import { Tags } from './interface';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    try {
      const newTag = this.tagsRepository.create({
        ...createTagDto,
        name: createTagDto.name.toLowerCase(),
      });

      return await this.tagsRepository.save(newTag);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Tags> {
    const { limit = 10, offset = 0 } = paginationDto;

    try {
      const [tags, total] = await Promise.all([
        this.tagsRepository.find({
          take: limit,
          skip: offset,
        }),
        this.tagsRepository.count(),
      ]);

      return { total, tags };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findOne(id: number): Promise<Tag> {
    try {
      const tag = await this.tagsRepository.findOneBy({ id });

      if (!tag) {
        throw new NotFoundException(`Tag with id ${id} doest not exist`);
      }
      return tag;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  async remove(id: number): Promise<Tag> {
    try {
      const tag = await this.findOne(id);

      await this.tagsRepository.remove(tag);

      return { ...tag, id };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }
}
