import { FilterQuery } from 'mongoose';
import { IListItem, ListItem } from '../models/list-item.js';

class ListItemService {
    async find(filters: FilterQuery<IListItem>): Promise<IListItem[]> {
        return await ListItem.find(filters);
    }

    async insert(model: IListItem) {
        await ListItem.create(model);
    }

    async update(model: IListItem) {
        await ListItem.findByIdAndUpdate(model);
    }

    async delete(id: string) {
        await ListItem.findByIdAndDelete(id);
    }
}

export default new ListItemService();