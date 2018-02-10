<template>
  <div class="navigation">
    <nav class="navbar container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          The Velvet Book
        </a>
        <div class="navbar-burger burger" data-target="navbarTop">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarTop" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="/feed">
            Feed
          </a>
        </div>
        <!-- div class="navbar-center">
          <a class="navbar-item" href="/">
            The Velvet Book
          </a>
        </div -->
        <div class="navbar-end">
          <a class="navbar-item" href="#" @click.prevent="setLocale('hu-HU')">
            HU
          </a>
          <a class="navbar-item" href="#" @click.prevent="setLocale('en-GB')">
            EN
          </a>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link class="navbar-link" :to="{ name: 'Profile', params: { list: 'projects' }}" v-show="isLoggedIn">
              <avatar
                :username="user.name"
                src=""
                :size="32"
                background-color="#303030"
              ></avatar>
              <!-- div class="avatar image is-24x24 img-circle">
                <img src="https://assets.awwwards.com/awards/media/cache/thumb_user_retina/default/user4.jpg">
              </div -->
              {{user.name}}
            </router-link>
            <div class="navbar-dropdown is-boxed">
              <router-link class="navbar-item" :to="{ name: 'Profile', params: { list: 'projects' }}">
                {{ $t('my-projects') }}
              </router-link>
              <router-link class="navbar-item" :to="{ name: 'Settings' }">
                {{ $t('settings') }}
              </router-link>
              <hr class="navbar-divider">
              <a class="navbar-item" href="#" @click.prevent="logout">
                {{ $t('logout') }}
                <span class="icon is-pulled-right">
                  <i class="fa fa-sign-out"></i>
                </span>
              </a>
            </div>
          </div>
          <router-link class="navbar-item" :to="{ name: 'Login' }" v-show="!isLoggedIn">
            Login
          </router-link>
          <router-link class="navbar-item" :to="{ name: 'Register' }" v-show="!isLoggedIn">
            Register
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
  import Avatar from 'vue-avatar'

  export default {
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      },
      user () {
        let storedUser = this.$store.getters.getUser
        return Object.keys(storedUser).length === 0 ? {name: ''} : storedUser
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout').then(res => {
          // console.log('LOGGED-OUT')
          this.$router.push('/')
        })
      },
      setLocale (locale) {
        // Vue.i18n.set(locale)
        this.$store.dispatch('changeLocale', locale)
      }
    },
    components: {
      Avatar
    }
  }
</script>
<style scoped>
  .navigation {
    position: fixed;
    top: 0;
    min-width: 100%;
    z-index: 1024;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1), 0 0 0 1px hsla(0,0%,7%,.1);
    background-color: #FFFFFF;
  }
  .navbar-brand {
    font-family: 'Abel', sans-serif;
    font-size: 28px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .vue-avatar--wrapper {
    margin-right: 5px;
  }
</style>
