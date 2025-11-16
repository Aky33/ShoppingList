import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// EN překlady
import enNavbar from "./locales/en/navbar.json";
import enShoppingListItem from "./locales/en/shopping-list-item.json";
import enEntityListAddForm from "./locales/en/entity-list-add-form.json";

// CS překlady
import csNavbar from "./locales/cs/navbar.json";
import csShoppingListItem from "./locales/cs/shopping-list-item.json";
import csEntityListAddForm from "./locales/cs/entity-list-add-form.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                navbar: enNavbar,
                shoppingListItem: enShoppingListItem,
                entityListAddForm: enEntityListAddForm
            },
            cs: {
                navbar: csNavbar,
                shoppingListItem: csShoppingListItem,
                entityListAddForm: csEntityListAddForm
            },
        },
        lng: "cs",
        fallbackLng: "en",
        ns: ["navbar", "shoppingListItem", "entityListAddForm"], // jména namespaces
        defaultNS: "navbar", // výchozí
        interpolation: { escapeValue: false },
    });

export default i18n;