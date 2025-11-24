import { Link } from "react-router-dom"
import type { ShoppingListOutputType } from "../../types/shopping-list-output-type"

type Props = {
    lists: ShoppingListOutputType[]
}

const ShoppingList = ({ lists }: Props) => {
    return (
        <div>
            {lists.map((item) => (
                <div>
                    <Link className="btn btn-light mb-1 col-12" to={`/shopping-list/${item._id}`}>{item.name}</Link>
                </div>
            ))}
        </div>
    )
}

export default ShoppingList