import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './createCity.dto';

export class UpdateCityDto extends PartialType(CreateCityDto) {}
