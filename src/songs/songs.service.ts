import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './DTO/create-song-dto';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './DTO/update-song-dto';
import {
  Pagination,
  paginate,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artirt.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}
  private readonly songs = [];

  async createSong(songDTO: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.releasedDate = songDTO.releaseDate;
    song.lyrics = songDTO.lyrics;
    song.duration = songDTO.duration;

    const artists = await this.artistRepository.findByIds(songDTO.artists);
    song.artists = artists;

    return await this.songRepository.save(song);
  }

  findAllSong(): Promise<Song[]> {
    return this.songRepository.find();
  }

  findOneSong(id: number): Promise<Song> {
    return this.songRepository.findOneBy({ id });
  }

  async deleteSong(id: number): Promise<DeleteResult> {
    return await this.songRepository.delete(id);
  }

  async updateSong(
    id: number,
    recordToUpdate: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songRepository.update(id, recordToUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    return paginate<Song>(this.songRepository, options);
  }

  async paginatewithSorting(
    options: IPaginationOptions,
  ): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('song');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate(queryBuilder, options);
  }

  async paginateWithSortingAndFiltering(
    options: IPaginationOptions,
    filter: {
      title?: string;
      lyrics?: string;
      artistId?: number;
      startDate?: string;
      endDate?: string;
      order?: number;
    },
  ): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('song');

    if (filter.title) {
      queryBuilder.andWhere('song.title ILIKE :title', {
        title: `%${filter.title}%`,
      });
    }

    if (filter.lyrics) {
      queryBuilder.andWhere('LOWER(song.lyrics) ILIKE :lyrics', {
        lyrics: `%${filter.lyrics.toLowerCase()}%`,
      });
    }

    if (filter.artistId) {
      queryBuilder
        .leftJoin('song.artists', 'artist')
        .andWhere('artist.id = :artistId', { artistId: filter.artistId });
    }

    if (filter.startDate && filter.endDate) {
      queryBuilder.andWhere(
        'song.releasedDate BETWEEN :startDate AND :endDate',
        {
          startDate: filter.startDate,
          endDate: filter.endDate,
        },
      );
    }
    const order = filter.order === -1 ? 'DESC' : 'ASC';
    queryBuilder.orderBy('song.releasedDate', order);

    return paginate(queryBuilder, options);
  }
}
