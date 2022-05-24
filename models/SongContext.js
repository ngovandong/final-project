import { BaseModel, types } from 'expo-sqlite-orm';
import * as  SQLite from 'expo-sqlite';

export default class SongContext extends BaseModel
{
    constructor(obj)
    {
        super(obj);
    }

    static get database()
    {
        return async () => SQLite.openDatabase("song.db");
    }

    static get tableName()
    {
        return "song";
    }

    static get columnMapping()
    {
        return {
            id: { type: types.INTEGER, primary_key: true },
            avatar: { type: types.TEXT },
            bgImage: { type: types.TEXT },
            coverImage: { type: types.TEXT },
            creator: { type: types.TEXT },
            lyric: { type: types.TEXT },
            music: { type: types.TEXT },
            title: { type: types.TEXT },
            url: { type: types.TEXT },
            top: { type: types.TEXT },
            category: { type: types.TEXT }
        }
    }
}