import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import store from '@/store/store'
import Layout from '@/layout/index'


Vue.use(Router);

export const currencyRoutes = [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {title: '登录页'},
            hidden: true
        },
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/error-page/404.vue'),
            hidden: true
        },
        {
            path: '/',
            name: 'home',
            component: Layout,
            redirect: '/dashbord',
            children: [
                {
                    path: 'dashbord',
                    name: 'Dashbord',
                    component: () => import('@/views/dashboard'),
                    meta: {title: '首页', icon: 'el-icon-s-data'}
                }
            ]
        },
    ];

export const asyncRoutes = [
    {
        path: '/webdata',
        name: 'Webdata',
        component: Layout,
        redirect: '/webdata/contact-page',
        meta: { title: '网站资源', icon: 'el-icon-lock'},
        children: [
            {
                path: 'contact-page',
                name: 'ContactPage',
                component: () => import('@/views/webdata/contact-page'),
                meta: {title: '联系人列表', icon: 'el-icon-s-tools'}
            },
            {
                path: 'order-list',
                name: 'OrderList',
                component: () => import('@/views/webdata/order-list'),
                meta: {title: '样品订单列表', icon: 'el-icon-s-tools'}
            },
            {
                path: 'file-list',
                name: 'FileList',
                component: () => import('@/views/webdata/file-list'),
                meta: {title: '文件管理', icon: 'el-icon-s-tools'}
            },
            {
                path: 'image-list',
                name: 'ImageList',
                component: () => import('@/views/webdata/image-list'),
                meta: {title: '图片管理', icon: 'el-icon-s-tools'}
            }
        ]
    },
    {
        path: '/website',
        name: 'Website',
        component: Layout,
        redirect: '/website/product-page',
        meta: {title: '网站管理', icon: 'el-icon-lock'},
        children: [
            {
                path: 'home-page',
                name: 'HomePage',
                component: () => import('@/views/website/home/home-page'),
                meta: {title: '首页管理', icon: 'el-icon-user'}
            },
            {
                path: 'product-page',
                name: 'ProductPage',
                component: () => import('@/views/website/product/product-page'),
                meta: {title: '产品页管理', icon: 'el-icon-user'},
                children: [
                    {
                        path: 'product-edit-page',
                        name: 'ProductEditPage',
                        component: () => import('@/views/website/product/product-edit-page'),
                        meta: {title: '编辑产品', icon: 'el-icon-user'},
                        hidden: true
                    },
                ]
            },
            {
                path: 'news-page',
                name: 'NewsPage',
                component: () => import('@/views/website/news/news-page'),
                meta: {title: '新闻页管理', icon: 'el-icon-s-tools'},
                children: [
                    {
                        path: 'news-edit-page',
                        name: 'NewsEditPage',
                        component: () => import('@/views/website/news/news-edit-page'),
                        meta: {title: '编辑产品', icon: 'el-icon-user'},
                        hidden: true
                    },
                ]
            },
            {
                path: 'application-page',
                name: 'ApplicationPage',
                component: () => import('@/views/website/application/application-page'),
                meta: {title: '应用页管理', icon: 'el-icon-s-tools'},
                children: [
                    {
                        path: 'application-edit-page',
                        name: 'ApplicationEditPage',
                        component: () => import('@/views/website/application/application-edit-page'),
                        meta: {title: '编辑应用页', icon: 'el-icon-user'},
                        hidden: true
                    },
                ]
            },
            {
                path: 'contact-page',
                name: 'ContactPage',
                component: () => import('@/views/website/contact/contact-page'),
                meta: {title: '联系页管理', icon: 'el-icon-s-tools'},
            },
            {
                path: 'customize-page',
                name: 'CustomizePage',
                component: () => import('@/views/website/customize/customize-page'),
                meta: {title: '自定义页管理', icon: 'el-icon-s-tools'},
                children: [
                    {
                        path: 'customize-edit-page',
                        name: 'CustomizeEditPage',
                        component: () => import('@/views/website/customize/customize-edit-page'),
                        meta: {title: '编辑自定义页面', icon: 'el-icon-user'},
                        hidden: true
                    },
                ]
            },
        ]
    },
    {
        path: '/permission',
        name: 'Permission',
        component: Layout,
        redirect: '/permission/page-user',
        meta: {title: '权限许可', icon: 'el-icon-lock'},
        children: [
            {
                path: 'page-user',
                name: 'PageUser',
                component: () => import('@/views/permission/page-user'),
                meta: {title: '用户管理', icon: 'el-icon-user'}
            },
            {
                path: 'roles',
                name: 'Roles',
                component: () => import('@/views/permission/roles'),
                meta: {title: '权限设置', icon: 'el-icon-s-tools'}
            }
        ]
    },
];

const creatRouter = () => {
    return new Router({
        mode: 'history',
        routes: [...currencyRoutes, ...asyncRoutes],
        scrollBehavior() {
            return {x: 0, y: 0}
        }
    })
};

const router = creatRouter();

// 解决addRoute不能删除动态路由问题
export function resetRouter() {
    const reset = creatRouter();
    router.matcher = reset.matcher
}


// 导航守卫
router.beforeEach(async (to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        if (store.getters.token) {
            if(store.state.routes.length === 0){
                store.state.routes = [...currencyRoutes, ...asyncRoutes];
            }
            next();
            // const hasRoles = store.getters.roles.length > 0;
            // if (hasRoles) {
            //   next()
            // } else {
            //   try {
            //     const { roles } = await store.dispatch('user/_getInfo')
            //     const addRoutes = await store.dispatch(
            //         'permission/getAsyncRoutes',
            //         roles
            //     )
            //     router.addRoutes(addRoutes)
            //
            //     // hack method to ensure that addRoutes is complete
            //     // set the replace: true, so the navigation will not leave a history record
            //     next({ ...to, replace: true })
            //   } catch (error) {
            //     Message.error(error)
            //   }
            // }
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }
})
export default router
