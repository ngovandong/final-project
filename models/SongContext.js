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
            addr: { type: types.INTEGER },
            lat: { type: types.FLOAT },
            lng: { type: types.FLOAT },
            desc: { type: types.TEXT },
            zip: { type: types.TEXT },
            title: { type: types.TEXT },
            timeStamp: { type: types.TEXT },
            twp: { type: types.TEXT },
            e: { type: types.TEXT },
        }
    }
}