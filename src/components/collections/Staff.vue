<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="notification" v-show="isProfileLoaded">
          <div class="profile-header">
            <div class="links">
              <a class="button is-large is-outlined">
                <span class="is-size-6">Visit Site</span>
              </a>
            </div>
            <div class="user">
              <avatar
                class="avatar"
                :username="profile.name || ''"
                src=""
                :size="96"
                background-color="#303030"
              ></avatar>
              <div class="username">
                {{ profile.name }}
              </div>
              <div class="location">
                {{ $t('countries.'+profile.country) }}
              </div>
              <div class="description">
                {{ profile.description }}
              </div>
            </div>
            <div class="socials">
              <a class="button is-outlined is-large">
                <span class="icon is-small">
                  <i class="fa fa-facebook"></i>
                </span>
              </a>
              <a class="button is-large is-outlined">
                <span class="icon is-small">
                  <i class="fa fa-instagram"></i>
                </span>
              </a>
              <a class="button is-large is-outlined">
                <span class="icon is-small">
                  <i class="fa fa-github"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div v-show="isProfileLoaded" class="tabs">
          <ul>
            <li :class="{ 'is-active': activeList == 'projects'}">
              <a @click.prevent="activeList = 'projects'">
                {{ $t('projects') }}
              </a>
            </li>
            <li :class="{ 'is-active': activeList == 'collections'}">
              <a @click.prevent="activeList = 'collections'">
                {{ $t('collections') }}
              </a>
            </li>
            <li :class="{ 'is-active': activeList == 'favorites'}">
              <a @click.prevent="activeList = 'favorites'">
                {{ $t('favorites') }}
              </a>
            </li>
          </ul>
        </div>
        <loader :loading="isLoading"></loader>
        <div class="collections">
          <div class="columns is-multiline">
            <div class="column is-3" v-for="item in listData">
              <div class="card collection">
                <card :item="item" :is-staff="true"></card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Avatar from 'vue-avatar'
import card from '../Card'
import loader from '../base/Loader'

export default {
  data () {
    return {
      profile: {},
      listData: [],
      isLoading: false,
      activeList: 'projects'
    }
  },
  components: {
    card,
    Avatar,
    loader
  },
  mounted () {
    this.loadProfile()
    this.loadListData(this.activeList)
  },
  watch: {
    activeList (list) {
      this.loadListData(list)
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    isProfileLoaded () {
      return Boolean(this.profile.name)
    }
  },
  methods: {
    selectList (value) {
      // console.log(value)
      this.activeList = value
    },
    loadProfile () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        let response = require('../../assets/data/staff.json')
        this.profile = response.profile
      }, 2000)
    },
    loadListData (list) {
      this.listData = []
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        let response = ''
        if (list === 'projects') {
          response = require('../../assets/data/userprojects.json')
          this.listData = response.projects
        } else if (list === 'collections') {
          response = require('../../assets/data/mycollections.json')
          this.listData = response.collections
        }
      }, 2000)
    }
  }
}
</script>
