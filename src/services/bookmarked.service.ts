import { DeepPartial } from "typeorm";
import { Bookmark } from "../entities/bookmark.entity";
import { AppDataSource } from "../utils/data-source";

const bookmarkRepository = AppDataSource.getRepository(Bookmark); 



export const addBookmark = async (input: DeepPartial<Bookmark>) => {
    return await bookmarkRepository.save(input);};
