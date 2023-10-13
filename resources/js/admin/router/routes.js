import Login from "../components/pages/auth/Login.vue";

import Layout from "../components/Layout.vue";
import NotFoundV1 from "../components/pages/not-found/NotFoundV1.vue";
import User from "../components/pages/users/User.vue";

const routes = [
    {
        path: '/admin/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/admin',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: 'users',
                name: 'User',
                component: User
            },
            {
                path: ':pathMatch(.*)*',
                name: 'NotFoundV1',
                component: NotFoundV1
            }
        ]
    }
]

export default routes;
