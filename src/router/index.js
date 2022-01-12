import Login from "@/views/Login.vue";
import NotFound from "@/views/404.vue";
import Home from "@/views/Home.vue";
import { menuList } from "./menu.js";

let routes = [
    {
        path: "/edit",
        component: () => import(/* webpackChunkName: "edit-screen"  */ "@/views/edit/index.vue"),
        name: "看板制作",
        hidden: true,
    },
    {
        path: "/preview",
        component: () => import(/* webpackChunkName: "preview-screen" */ "@/views/preview/index.vue"),
        name: "预览",
        hidden: true,
    },
    {
        path: "/",
        component: Home,
        name: "home",
        iconCls: "fa fa-bar-chart",
        leaf: true, //只有一个节点
        redirect: "/home",
        children: menuList,
    },
    {
        path: "/login",
        component: Login,
        name: "登录",
        hidden: true,
    },
    {
        path: "/404",
        component: NotFound,
        name: "404",
        hidden: true,
    },
];

export default routes;
