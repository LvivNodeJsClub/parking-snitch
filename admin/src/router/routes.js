import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Inspectors from '@/views/Inspectors.vue'
import InspectorDetails from '@/views/InspectorDetails.vue'
import InspectorEdit from '@/views/InspectorEdit.vue'
import Notifications from '@/views/Notifications.vue'

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
    },
    {
        path: '/inspectors/:id',
        name: 'inspector-details',
        meta: {
            title: 'Inspector Details',
        },
        component: InspectorDetails
    },
    {
        path: '/inspectors/:id/edit',
        name: 'inspector-edit',
        meta: {
            title: 'Inspector Edit',
        },
        component: InspectorEdit
    },
    {
        path: '/notifications',
        name: 'notifications',
        meta: {
            title: 'Notifications',
        },
        component: Notifications
    }
]
