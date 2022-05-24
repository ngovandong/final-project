import { BaseModel, types } from 'expo-sqlite-orm';
import * as  SQLite from 'expo-sqlite';

export default class TopCategoryContext extends BaseModel
{
    constructor(obj)
    {
        super(obj);
    }

    static get database()
    {
        return async () => SQLite.openDatabase("topcategory.db");
    }

    static get tableName()
    {
        return "topcategory";
    }

    static get columnMapping()
    {
        return {
            id: { type: types.INTEGER, primary_key: true },
            top: { type: types.TEXT },
            category: { type: types.TEXT }
        }
    }
}