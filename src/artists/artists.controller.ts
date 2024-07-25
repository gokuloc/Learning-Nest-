import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('artists')
@ApiTags('Artist Routes')
export class ArtistsController {
  constructor() {}
  @Get()
  getArtists() {
    return 'hello this is artist routes';
  }
}
