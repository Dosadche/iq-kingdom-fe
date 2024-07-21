import { DBEntity } from "./db-entity.model";

export interface User extends Omit<DBEntity, 'title'>{
    id: string,
    name: string,
    email: string,
    hits: number,
    hp: number,
    xp: number,
    lastRevival: string,
}