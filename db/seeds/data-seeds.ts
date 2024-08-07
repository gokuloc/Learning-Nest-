import { faker } from '@faker-js/faker';
import { Artist } from 'src/artists/artirt.entity';
import { User } from 'src/users/user.entity';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import { Playlist } from 'src/playlists/playlist.entity';
import { Song } from 'src/songs/song.entity';

export const seedData = async (manager: EntityManager): Promise<void> => {
  await seedUser();
  await seedArtist();
  await seedPlayLists();
  await seedSongs();

  async function seedSongs() {
    const song = new Song();
    song.title = faker.lorem.sentence(3);
    song.lyrics = faker.lorem.sentence(8);
    song.duration = faker.date.anytime();
    song.releasedDate = faker.date.anytime();

    //  Create a new Playlist object
    const playlist = new Playlist();
    playlist.name = faker.music.genre();

    // Assign the playlist to the song
    song.playList = playlist;
  }

  async function seedUser() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();

    await manager.getRepository(User).save(user);
  }

  async function seedArtist() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();

    const artist = new Artist();
    artist.user = user;

    await manager.getRepository(User).save(user);
    await manager.getRepository(Artist).save(artist);
  }

  async function seedPlayLists() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();

    const playList = new Playlist();
    playList.name = faker.music.genre();
    playList.user = user;

    await manager.getRepository(User).save(user);
    await manager.getRepository(Playlist).save(playList);
  }
};
