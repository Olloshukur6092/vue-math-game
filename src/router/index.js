import { createRouter, createWebHistory } from "vue-router";
import GamePage from "../components/GamePage.vue";
import HomePage from "../components/HomePage.vue";

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;