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

    static filterByTopCategory(top, category)
    {
        const sql = `SELECT * FROM song WHERE top = ? AND category = ?`;
        const params = [top, category];
        return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows);
    }

    static searchByTitle(title)
    {
        const sql = `SELECT * FROM song WHERE title LIKE '%${title}%'`;
        const params = [];
        return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows);
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