import { Link } from "react-router-dom"
import type { KategorieOutputType } from "../types/KategorieOutputType"

type Props = {
    lists: KategorieOutputType[]
}

const ShoppingList = ({ lists }: Props) => {
    return (
        <div>
            {lists.map((item) => (
                <div>
                    <Link className="btn btn-light mb-1 col-12" to={`/shopping-list/${item.id}`}>{item.nazev}</Link>
                </div>
            ))}
        </div>
    )
}

export default ShoppingList