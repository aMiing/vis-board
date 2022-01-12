export const menuList = [
    {
        path: "/home",
        name: "我的可視化",
        iconCls: "fa fa-bar-chart",
        component: () => import(/* webpackChunkName: "manage" */ "@/views/pannelList.vue"),
    },
    {
        path: "/data",
        name: "我的数据",
        iconCls: "fa fa-database",
        component: () => import(/* webpackChunkName: "data" */ "@/views/nav1/Form.vue"),
    },
    {
        path: "/components",
        component: () => import(/* webpackChunkName: "components" */ "@/views/nav1/user.vue"),
        name: "我的组件库",
        iconCls: "fa fa-address-card",
    },
    {
        path: "/examples",
        component: () => import(/* webpackChunkName: "examples" */ "@/views/charts/echarts.vue"),
        name: "优秀案例教程",
        iconCls: "fa fa-book",
    },
];
