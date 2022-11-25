import { createRouter, createWebHistory } from "vue-router";
import GamePage from "../components/GamePage.vue";
import HomePage from "../components/HomePage.vue";
import AboutPage from "../views/AboutPage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/games",
        name: "Game",
        component: GamePage,
    },
    {
        path: "/about",
        name: "About",
        component: AboutPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;