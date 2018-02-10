<template>
  <section class="section">
    <div class="container">
      <!-- Main container -->
      <nav v-show="!isLoading" class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><router-link :to="{ name: 'Profile', params: { list: 'projects' }}">{{ user.name }}</router-link></li>
          <li><router-link :to="{ name: 'Profile', params: { list: 'collections' }}">My Collection</router-link></li>
          <li class="is-active"><a href="#" aria-current="page">{{ projectTitle }}</a></li>
        </ul>
      </nav>
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>{{ projectsCount }}</strong> {{ $t('project') }}
            </p>
          </div>
        </div>
        <!-- Right side -->
        <div class="level-right"></div>
      </nav>

      <content-loader :loading="isLoading" :rows="placeholderRows"></content-loader>
      <div class="collections">
        <div class="columns is-multiline">
          <div class="column is-3" v-for="(item, index) in myCollection" :key="index">
            <card
              :item="item"
              :type="'collection'"
              @dislike="dislike"
            ></card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import contentLoader from '../base/ContentLoader'
import card from './UserCard'
import * as ProjectService from '../../services/projects'
import { MY_PROFILE } from '../base/loaders'

export default {
  components: {
    contentLoader,
    card
  },
  data () {
    return {
      isLoading: false,
      projectTitle: 'sdasd',
      myCollection: [],
      placeholderRows: MY_PROFILE
    }
  },
  mounted () {
    this.loadCollection()
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    projectsCount () {
      return this.myCollection.length || 0
    }
  },
  methods: {
    loadCollection () {
      this.isLoading = true
      ProjectService.getMyCollection({id: this.$route.params.id}).then(response => {
        // console.log('response:', response)
        this.isLoading = false
        this.myCollection = response.data.favorites
      })
    }
  }
}
</script>
