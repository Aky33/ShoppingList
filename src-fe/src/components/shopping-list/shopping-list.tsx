import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import type { ShoppingListOutputType } from "../../types/shopping-list-output-type"
import { FaEye, FaArchive, FaTrash } from "react-icons/fa"
import ConfirmModal from "../common/confirm-modal"
import { useState } from "react"
import { useTranslation } from "react-i18next";

type Props = {
    lists: ShoppingListOutputType[]
    update: (list: ShoppingListOutputType) => void
    remove: (list: ShoppingListOutputType) => void
}

const ShoppingList = ({ lists, update, remove }: Props) => {
    const { t } = useTranslation("shoppingList");

    const [listToDelete, setListToDelete] = useState<ShoppingListOutputType | null>(null)
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)

    const openConfirmDelete = (shoppingList: ShoppingListOutputType) => {
        setListToDelete(shoppingList)
        setShowDeleteConfirmModal(true)
    }

    const closeConfirmDelete = () => {
        setListToDelete(null)
        setShowDeleteConfirmModal(false)
    }

    /*const update = async(list: ShoppingListOutputType) => {
        updateShoppingList({
            id: list._id,
            idOwner: list.idOwner,
            name: list.name,
            isDeleted: !list.isDeleted
        })
    }
    
    const remove = async(list: ShoppingListOutputType) => {
        deleteShoppingList(list._id)
    }*/

    return (
        <div>
            {lists.map((item) => (
                <div className={`btn mb-1 col-12 d-flex justify-content-between align-items-center ${item.isDeleted ? "text-decoration-line-through" : ""}`}>
                    <span>{item.name} [{item.countItems? item.countItems : 0}]</span>
                    <span>
                        <Link className="btn btn-secondary sm" to={`/shopping-list/${item._id}`}><FaEye /></Link>
                        {!item.isDeleted && <Button className="btn btn-secondary" onClick={() => update(item)}><FaArchive /></Button>}
                        {!item.isDeleted && <Button className="btn btn-danger" onClick={() => openConfirmDelete(item)}><FaTrash /></Button>}
                    </span>
                </div>
            ))}

            <ConfirmModal 
                show={showDeleteConfirmModal} 
                title={t("deleteModalTitle")}
                message={t("deleteModalMessage")}
                confirmText={t("deleteModalConfirm")}
                cancelText={t("deleteModalCancel")}
                variant="danger"
                onConfirm={() => {
                    if (listToDelete) 
                        remove(listToDelete)
                    
                    closeConfirmDelete()
                }}
                onCancel={() => closeConfirmDelete()}
            />
        </div>
    )
}

export default ShoppingList