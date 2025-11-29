import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import type { ShoppingListOutputType } from "../../types/shopping-list-output-type"
import { FaEye, FaArchive, FaTrash } from "react-icons/fa"
import ConfirmModal from "../common/confirm-modal"
import { useState } from "react"
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/use-auth"
import type { UserOutputType } from "../../types/user-output-type"
import { useError } from "../../hooks/use-error"

type Props = {
    lists: ShoppingListOutputType[]
    setShoppingListsData: React.Dispatch<React.SetStateAction<ShoppingListOutputType[]>>
    users: UserOutputType[]
}

const ShoppingList = ({ lists, setShoppingListsData, users }: Props) => {
    const { t } = useTranslation("shoppingList");
    const { user: currentAuthenticatedUser } = useAuth();
    const { setError } = useError();

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

    const update = async(list: ShoppingListOutputType) => {
        setShoppingListsData(prev =>
            prev.map(item => 
                item._id == list._id ? { ...item, isDeleted: !list.isDeleted } : item
            )
        )
    }
    
    const remove = async(list: ShoppingListOutputType) => {
        const current = users.filter(item => item.login == currentAuthenticatedUser?.login)[0]

        if (current._id != list.idOwner) {
            setError(new Error(t("onlyOwnerCanDelete")))
            throw new Error(t("onlyOwnerCanDelete"))
        }

        setShoppingListsData(prev => {
            let arr: ShoppingListOutputType[] = []

            prev.forEach(item => {
                if (item._id != list._id) arr.push(item)
            })

            return arr
        })
    }

    return (
        <div>
            {lists.map((item) => (
                <div className={`btn btn-light mb-1 col-12 d-flex justify-content-between align-items-center ${item.isDeleted ? "text-decoration-line-through" : ""}`}>
                    <span>{item.name}</span>
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