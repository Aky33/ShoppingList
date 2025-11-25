import { IListItem, ListItem } from '../models/list-item.js';

class ListItemService {
    async list(): Promise<IListItem[]> {
        return await ListItem.find();
    }

    async get(id: string): Promise<IListItem | null> {
        return await ListItem.findById(id);
    }

    async insert(model: IListItem) {
        await ListItem.create(model);
    }
}

export default new ListItemService();