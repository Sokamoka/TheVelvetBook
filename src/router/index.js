import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Feed from '@/components/collections/Feed'
import Project from '@/components/collections/Project'
import Staff from '@/components/collections/Staff'
import Profile from '@/components/users/Profile'
import Collection from '@/components/users/Collection'
import AddProject from '@/components/users/AddProject'
import Settings from '@/components/users/Settings'
import Password from '@/components/users/Password'
import Email from '@/components/users/Email'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed,
      meta: {
        forAuth: true
      },
      props: (route) => (route.query.category ? { filters: route.query } : {})
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/profile/:list',
      name: 'Profile',
      component: Profile,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/profile/collections/:id',
      name: 'Collection',
      component: Collection,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/user/project/:id',
      name: 'AddProject',
      component: AddProject,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/user/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/user/password',
      name: 'Password',
      component: Password,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/user/email',
      name: 'Email',
      component: Email,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/u/:username/:id',
      name: 'Project',
      component: Project,
      meta: {
        forAuth: true
      },
      props: true
    },
    {
      path: '/u/:username',
      name: 'Staff',
      component: Staff,
      meta: {
        forAuth: true
      },
      props: true
    }
  ],
  linkActiveClass: 'is-active'
})
