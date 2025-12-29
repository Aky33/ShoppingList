import { Button } from "react-bootstrap"
import type { EntityOutputType } from "../../types/entity-output-type"
import { FaTrash } from "react-icons/fa"

type Props = {
    entities: EntityOutputType[]
    update: (entity: EntityOutputType) => void
    remove: (entity: EntityOutputType) => void
}

const EntityList = ({ entities, update, remove }: Props) => {
    return (
        <div>
            {entities.map((item) => (
                <div className={`btn mb-1 col-12 d-flex justify-content-between align-items-center ${item.isDone ? "text-decoration-line-through" : ""}`}>
                    <span onClick={() => update(item)}>{item.description}</span>
                    <Button className="btn btn-danger" onClick={() => remove(item)}><FaTrash /></Button>
                </div>
            ))}
        </div>
    )
}

export default EntityList