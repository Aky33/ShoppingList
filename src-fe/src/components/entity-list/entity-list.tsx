import { Button } from "react-bootstrap"
import type { EntityOutputType } from "../../types/entity-output-type"
import { FaTrash } from "react-icons/fa"

type Props = {
    entities: EntityOutputType[]
    setEntitiesData: React.Dispatch<React.SetStateAction<EntityOutputType[]>>
}

const EntityList = ({ entities, setEntitiesData }: Props) => {
    const update = async(entity: EntityOutputType) => {
        setEntitiesData(prev =>
            prev.map(item => 
                item._id == entity._id ? { ...item, isDone: !entity.isDone } : item
            )
        )
    }

    const remove = async(entity: EntityOutputType) => {
        setEntitiesData(prev => {
            let arr: EntityOutputType[] = []

            prev.forEach(item => {
                if (item._id != entity._id) arr.push(item)
            })

            return arr
        })
    }

    return (
        <div>
            {entities.map((item) => (
                <div className={`btn btn-light mb-1 col-12 d-flex justify-content-between align-items-center ${item.isDone ? "text-decoration-line-through" : ""}`} onClick={() => update(item)}>
                    <span>{item.description}</span>
                    <Button className="btn btn-danger" onClick={() => remove(item)}><FaTrash /></Button>
                </div>
            ))}
        </div>
    )
}

export default EntityList