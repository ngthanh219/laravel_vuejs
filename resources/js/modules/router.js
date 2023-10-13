import { createRouter, createWebHistory } from 'vue-router';

let routerInstance = {
    init(routes) {
        return createRouter({
            history: createWebHistory(),
            routes,
            linkActiveClass: 'active',
            scrollBehavior: (to) => {
                if (to.hash) {
                    return {selector: to.hash}
                } else {
                    return {x: 0, y: 0}
                }
            }
        });
    }
}

export default routerInstance;
