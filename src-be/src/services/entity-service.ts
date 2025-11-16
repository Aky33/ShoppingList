import { IEntity, Entity } from '../models/entity.js';

class EntityService {
    async list(): Promise<IEntity[]> {
        return await Entity.find();
    }

    async get(id: string): Promise<IEntity | null> {
        return await Entity.findById(id);
    }

    async insert(model: IEntity) {
        await Entity.insertMany(model);
    }
}

export default new EntityService();