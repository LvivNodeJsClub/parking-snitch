import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Inspectors from '@/views/Inspectors.vue'

export default [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'Home Page',
        },
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        meta: {
            title: 'About',
        },
        component: About
    },
    {
        path: '/inspectors',
        name: 'inspectors',
        meta: {
            title: 'Inspectors',
        },
        component: Inspectors
    }
]