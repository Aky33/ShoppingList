import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// EN překlady
import enLoginPage from "./locales/en/login-page.json";
import enNavbar from "./locales/en/navbar.json";
import enShoppingList from "./locales/en/shopping-list.json";
import enShoppingListItem from "./locales/en/shopping-list-item.json";
import enShoppingListAddForm from "./locales/en/shopping-list-add-form.json";
import enEntityListAddForm from "./locales/en/entity-list-add-form.json";
import enAllowedUsersListAddForm from "./locales/en/allowed-users-list-add-form.json";
import enEntityListPieChart from "./locales/en/entityListPieChart.json";

// CS překlady
import csLoginPage from "./locales/cs/login-page.json";
import csNavbar from "./locales/cs/navbar.json";
import csShoppingList from "./locales/cs/shopping-list.json";
import csShoppingListItem from "./locales/cs/shopping-list-item.json";
import csShoppingListAddForm from "./locales/cs/shopping-list-add-form.json";
import csEntityListAddForm from "./locales/cs/entity-list-add-form.json";
import csAllowedUsersListAddForm from "./locales/cs/allowed-users-list-add-form.json";
import csEntityListPieChart from "./locales/cs/entityListPieChart.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                loginPage: enLoginPage,
                navbar: enNavbar,
                shoppingList: enShoppingList,
                shoppingListItem: enShoppingListItem,
                shoppingListAddForm: enShoppingListAddForm,
                entityListAddForm: enEntityListAddForm,
                allowedUsersListAddForm: enAllowedUsersListAddForm,
                entityListPieChart: enEntityListPieChart
            },
            cs: {
                loginPage: csLoginPage,
                navbar: csNavbar,
                shoppingList: csShoppingList,
                shoppingListItem: csShoppingListItem,
                shoppingListAddForm: csShoppingListAddForm,
                entityListAddForm: csEntityListAddForm,
                allowedUsersListAddForm: csAllowedUsersListAddForm,
                entityListPieChart: csEntityListPieChart
            },
        },
        lng: "cs",
        fallbackLng: "en",
        ns: ["loginPage", "navbar", "shoppingList", "shoppingListItem", "shoppingListAddForm", "entityListAddForm", "allowedUsersListAddForm", "entityListPieChart"], // jména namespaces
        defaultNS: "navbar", // výchozí
        interpolation: { escapeValue: false },
    });

export default i18n;