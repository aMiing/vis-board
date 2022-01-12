import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import EditScreen from './views/edit'
import preview from './views/preview.vue'

let routes = [
    {
        path: '/edit',
        component: EditScreen,
        name: '看板制作',
        hidden: true,
       /* children: [{ path: '/',component: Components, name: '配置项'}]*/
    },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/preview',
        component: preview,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [{ path: '/',component: pannelList, name: '我的可視化'}]
    },
    
  
];

export default routes;