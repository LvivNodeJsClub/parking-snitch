import Home from '@/views/Home.vue'
import Inspectors from '@/views/Inspectors.vue'
import InspectorDetails from '@/views/InspectorDetails.vue'
import InspectorEdit from '@/views/InspectorEdit.vue'
import InspectorAdd from '@/views/InspectorAdd.vue'
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
        path: '/inspectors',
        name: 'inspectors',
        meta: {
            title: 'Inspectors',
        },
        component: Inspectors,
    },
    {
        path: '/inspectors/add',
        name: 'inspector-add',
        meta: {
            title: 'Inspector Add',
        },
        component: InspectorAdd,
    },
    {
        path: '/inspectors/:id',
        name: 'inspector-details',
        meta: {
            title: 'Inspector Details',
        },
        component: InspectorDetails,
    },
    {
        path: '/inspectors/:id/edit',
        name: 'inspector-edit',
        meta: {
            title: 'Inspector Edit',
        },
        component: InspectorEdit,
    },
    {
        path: '/notifications',
        name: 'notifications',
        meta: {
            title: 'Notifications',
        },
        component: Notifications,
    },
]
