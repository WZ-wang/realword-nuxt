module.exports = {
    router: {
        // middleware: ['authenticated', 'notAuthenticated'],
        linkActiveClass: "active",
        extendRoutes(routes, resolve) {
            routes.splice(0)
            routes.push(...[{
                path: "/",
                component: resolve(__dirname, "pages/layout/"),
                children: [{
                        path: "",
                        name: "home",
                        component: resolve(__dirname, "pages/home/")
                    },
                    {
                        path: "/login",
                        name: "login",
                        component: resolve(__dirname, "pages/login/")
                    },
                    {
                        path: "/register",
                        name: "register",
                        component: resolve(__dirname, "pages/login/")
                    },
                    {
                        path: "/settings",
                        name: "settings",
                        component: resolve(__dirname, "pages/settings/")
                    },
                    {
                        path: "/editor",
                        name: "editor",
                        component: resolve(__dirname, "pages/editor/")
                    },
                    {
                        path: "/article/:slug",
                        name: "article",
                        component: resolve(__dirname, "pages/article/")
                    },
                    {
                        path: "/profile/:username",
                        name: "profile",
                        component: resolve(__dirname, "pages/profile/")
                    },
                ]
            }])
        }
    },
    server:{
        port: 3000,
        host:"0.0.0.0"
    },
    plugins: [
        { src: '~/plugins/request.js' },
        { src: '~/plugins/dayjs.js' },
    ]
}