import type { AllowedUserOutputType } from "../types/allowed-user-output-type"
import type { EntityOutputType } from "../types/entity-output-type"
import type { ShoppingListOutputType } from "../types/shopping-list-output-type"
import type { UserOutputType } from "../types/user-output-type"

import { getCurrentUser } from "../auth/auth-store.js"

type MockDB = {
    allowedUsers: AllowedUserOutputType[],
    listItems: EntityOutputType[],
    shoppingLists: ShoppingListOutputType[],
    users: UserOutputType[]
}

const db: MockDB = {
    allowedUsers: [
        {
            _id: "1",
            idShoppingList: "1",
            idUser: "2"
        },
        {
            _id: "2",
            idShoppingList: "2",
            idUser: "1"
        }
    ],
    listItems: [
        {
            _id: "1",
            idShoppingList: "1",
            description: "Rohlíky",
            isDone: false
        },
        {
            _id: "2",
            idShoppingList: "1",
            description: "Máslo",
            isDone: false
        },
        {
            _id: "3",
            idShoppingList: "1",
            description: "Jablka",
            isDone: true
        },
        {
            _id: "4",
            idShoppingList: "2",
            description: "Čaj",
            isDone: false
        },
        {
            _id: "5",
            idShoppingList: "2",
            description: "Brambory",
            isDone: false
        }
    ],
    shoppingLists: [
        {
            _id: "1",
            idOwner: "1",
            name: "Nákupní seznam 2",
            isDeleted: false
        },
        {
            _id: "2",
            idOwner: "2",
            name: "Nákupní seznam 4",
            isDeleted: true
        }
    ],
    users: [
        {
            _id: "1",
            login: "FrantaFlinta"
        },
        {
            _id: "2",
            login: "KarelStodola"
        },
        {
            _id: "3",
            login: "MarieVeliká"
        }
    ]
}

export async function mockFetch(
    url: string,
    options?: RequestInit
): Promise<Response> {
    const user = getCurrentUser()

    const parsedUrl = new URL(url, window.location.origin)
    const pathname = parsedUrl.pathname

    /* --- Allowed Users --- */
    if (pathname === "/allowed-users/find") {
        const id = parsedUrl.searchParams.get("id")
        const idShoppingList = parsedUrl.searchParams.get("idShoppingList")

        let result = id? db.allowedUsers.filter(x => x._id == id) : [...db.allowedUsers]

        result = idShoppingList? result.filter(x => x.idShoppingList == idShoppingList) : result

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    }

    if (pathname === "/allowed-users/insert") {
        const body = JSON.parse(options?.body as string)

        const newItem: AllowedUserOutputType = {
            _id: crypto.randomUUID(),
            ...body,
        }

        db.allowedUsers.push(newItem)

        return new Response(JSON.stringify({ id: newItem._id, message: "Created" }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        })
    }

    if (pathname === "/allowed-users/delete") {
        const body = JSON.parse(options?.body as string)

        const index = db.allowedUsers.findIndex(x => x._id === body.id)
        if (index === -1) {
            return new Response("Not found", { status: 404 })
        }

        db.allowedUsers.splice(index, 1)

        return new Response(JSON.stringify({ message: "Deleted" }), {
            status: 204,
            headers: { "Content-Type": "application/json" },
        })
    }

    /* --- List Items --- */
    if (pathname === "/list-items/find") {
        const id = parsedUrl.searchParams.get("id")
        const idShoppingList = parsedUrl.searchParams.get("idShoppingList")

        let result = id? db.listItems.filter(x => x._id == id) : [...db.listItems]

        result = idShoppingList? result.filter(x => x.idShoppingList == idShoppingList) : result

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    }

    if (pathname === "/list-items/insert") {
        const body = JSON.parse(options?.body as string)

        const newItem: EntityOutputType = {
            _id: crypto.randomUUID(),
            isDone: false,
            ...body,
        }

        db.listItems.push(newItem)

        return new Response(JSON.stringify({ id: newItem._id, message: "Created" }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        })
    }

    if (pathname === "/list-items/update") {
        console.log("Mock fetch - updating list item");
        const body = JSON.parse(options?.body as string)

        console.log("Request body:", body);
        const index = db.listItems.findIndex(x => x._id === body.id)
        if (index === -1) {
            return new Response("Not found", { status: 404 })
        }

        console.log("Before update:", db.listItems[index]);
        db.listItems[index] = {
            ...db.listItems[index],
            ...body
        }

        console.log("After update:", db.listItems[index]);

        return new Response(JSON.stringify({ message: "Updated" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    }

    if (pathname === "/list-items/delete") {
        const body = JSON.parse(options?.body as string)
        console.log("Mock fetch - deleting list item with id:", body.id);

        const index = db.listItems.findIndex(x => x._id === body.id)
        if (index === -1) {
            return new Response("Not found", { status: 404 })
        }

        db.listItems.splice(index, 1)

        return new Response(JSON.stringify({ message: "Deleted" }), {
            status: 204,
            headers: { "Content-Type": "application/json" },
        })
    }

    /* --- Shopping list --- */
    if (pathname === "/shopping-lists/find") {
        const id = parsedUrl.searchParams.get("id")
        const result = id? db.shoppingLists.filter(x => x._id == id) : [...db.shoppingLists]

        result.forEach(list => {
            (list as any).countItems = db.listItems.filter(item => item.idShoppingList === list._id && item.isDone === false).length
        })

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    }

    if (pathname === "/shopping-lists/insert") {
        const body = JSON.parse(options?.body as string)
        const currentUser = db.users.find(x => x.login === user?.login);

        const newItem: ShoppingListOutputType = {
            _id: crypto.randomUUID(),
            idOwner: currentUser?._id || crypto.randomUUID(),
            isDeleted: false,
            ...body,
        }

        db.shoppingLists.push(newItem)

        return new Response(JSON.stringify({ id: newItem._id, message: "Created" }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        })
    }

    if (pathname === "/shopping-lists/update") {
        console.log("Mock fetch - updating shopping list");
        const body = JSON.parse(options?.body as string)

        console.log("Request body:", body);
        const index = db.shoppingLists.findIndex(x => x._id === body.id)
        if (index === -1) {
            return new Response("Not found", { status: 404 })
        }

        console.log("Before update:", db.shoppingLists[index]);
        db.shoppingLists[index] = {
            ...db.shoppingLists[index],
            ...body
        }

        console.log("After update:", db.shoppingLists[index]);
        return new Response(JSON.stringify({ message: "Updated" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    }

    if (pathname === "/shopping-lists/delete") {
        console.log("Mock fetch - deleting shopping list");
        const body = JSON.parse(options?.body as string)

        console.log("Request body:", body);
        const index = db.shoppingLists.findIndex(x => x._id === body.id)
        if (index === -1) {
            return new Response("Not found", { status: 404 })
        }

        db.shoppingLists.splice(index, 1)

        return new Response(JSON.stringify({ message: "Deleted" }), {
            status: 204,
            headers: { "Content-Type": "application/json" },
        })
    }

    /* --- Users --- */
    if (pathname === "/users/find") {
        const id = parsedUrl.searchParams.get("id")
        const result = id? db.users.filter(x => x._id == id) : [...db.users]

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    }

    return new Response("Not found", { status: 404 })
}
