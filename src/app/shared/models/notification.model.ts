import { FightResults } from "../enums/fight-results.enum";
import { DBEntity } from "./db-entity.model";

export interface Notification extends Omit<DBEntity, 'name'>{
    title: FightResults,
    content: string,
    type: string,
    userId: string,
    senderId: string,
    isRead: boolean,
}