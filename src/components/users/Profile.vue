<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="tabs">
          <ul>
            <li :class="{ 'is-active': activeList == 'projects'}">
              <router-link :to="{ name: 'Profile', params: { list: 'projects' }}">
                {{ $t('projects') }}
              </router-link>
            </li>
            <li :class="{ 'is-active': activeList == 'collections'}">
              <router-link :to="{ name: 'Profile', params: { list: 'collections' }}">
                {{ $t('collections') }}
              </router-link>
            </li>
            <li :class="{ 'is-active': activeList == 'favorites'}">
              <router-link :to="{ name: 'Profile', params: { list: 'favorites' }}">
                {{ $t('favorites') }}
              </router-link>
            </li>
          </ul>
        </div>
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ projectsCount }}</strong> {{ $t(activeList) }}
              </p>
            </div>
          </div>
          <!-- Right side -->
          <div class="level-right">
            <p v-show="activeList === 'projects'" class="level-item"><a class="button is-primary" @click.prevent="isVisible=true">{{ $t('add-new-project') }}</a></p>
          </div>
        </nav>
        <!-- loader :loading="isLoading"></loader -->
        <content-loader :loading="isLoading" :rows="placeholderRows"></content-loader>
        <div class="collections">
          <div class="columns is-multiline">
            <div class="column is-3" v-for="(item, index) in myLists" :key="index">
              <card
                :item="item"
                :is-staff="!isProject"
                :type="activeList"
                @dislike="dislike"
                @delete-project="deleteProject"
                @change-project-title="changeProjectTitle"
                @change-collection-title="changeCollectionTitle"
              ></card>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ADD COLLECTION MODAL -->
    <modal :toggle="isVisible" @close:toggle="val => isVisible = val">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{ $t('add-new-project') }}
          </p>
        </header>
        <div class="card-content">
          <!-- CONTENT START -->
          <div class="field">
            <label class="label">{{ $t('title') }}</label>
            <div class="control has-icons-right" v-input-count="{ model: 'titleCount', max: 50 }">
              <input
                :class="{'input': true, 'input-count__input': true, 'is-danger': errors.has('title') }"
                name="title"
                type="text"
                :placeholder="$t('title')"
                v-validate="'required'"
                v-model="title"
              >
              <span v-show="errors.has('title')" class="icon is-small is-right has-text-danger">
                <i class="fa fa-warning"></i>
              </span>
              <p class="help input-count__label">{{ $t('remaining-characters', {count: titleCount}) }}</p>
              <p :class="{ 'help is-danger': true, 'is-active': errors.has('title') }">
                {{ errors.first('title') }}
              </p>
            </div>
          </div>
          <div class="field">
            <label class="label">{{ $t('description') }}</label>
            <div class="control has-icons-right" v-input-count="{ model: 'descriptionCount', max: 150 }">
              <textarea
                id="description"
                :class="{'textarea': true, 'input-count__input': true,'is-danger': errors.has('description') }"
                name="description"
                :placeholder="$t('description')"
                v-model="description"
                v-validate="'required'"
                rows="4"
              ></textarea>
              <span v-show="errors.has('description')" class="icon is-small is-right has-text-danger">
                <i class="fa fa-warning"></i>
              </span>
              <p class="help input-count__label">{{ $t('remaining-characters', {count: descriptionCount}) }}</p>
              <p :class="{ 'help is-danger': true, 'is-active': errors.has('description') }">
                {{ errors.first('description') }}
              </p>
            </div>
          </div>
          <div class="is-clearfix">
            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <button class="button is-rounded" @click="isVisible = false">{{ $t('cancel') }}</button>
              </div>
              <div class="control">
                <button
                  type="submit"
                  class="button is-primary is-rounded"
                >
                  {{ $t('save') }}
                </button>
              </div>
            </div>
          </div>
          <!-- CONTENT END -->
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import store from '../../store'
import contentLoader from '../base/ContentLoader'
import { inputCount } from '../../directives/input-count.js'
import * as ProjectService from '../../services/projects'
import { TOAST_GOAWAY_TIME } from '../../constans'
import { undoToast } from '../../packages/confirm'
import loader from '../base/Loader'
import modal from '../base/Modal'
import card from './UserCard'
import { MY_PROFILE } from '../base/loaders'

export default {
  data () {
    return {
      isLoading: false,
      myLists: [],
      isVisible: false,
      titleCount: 0,
      descriptionCount: 0,
      title: '',
      description: '',
      activeList: this.$route.params.list,
      placeholderRows: MY_PROFILE
    }
  },
  components: {
    card,
    modal,
    loader,
    contentLoader
  },
  directives: {
    inputCount
  },
  mounted () {
    this.loadListData(this.activeList)
  },
  watch: {
    '$route' (to, from) {
      this.activeList = to.params.list
      this.loadListData(this.activeList)
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    projectsCount () {
      return this.myLists.length || 0
    },
    isProject () {
      return this.activeList === 'projects'
    }
  },
  methods: {
    selectPanel (list) {
      this.activeList = list
      this.loadListData(list)
    },
    async dislike (item) {
      if (await undoToast(`${this.$t('dislike')} (${item.title})`)) {
        // console.log('RESTORE_FAV:', item)
        store.dispatch('resetInactiveItem', item.id)
      } else {
        // console.log('DISLIKE:', item)
        store.dispatch('resetInactiveItem', item.id)
        let index = this.myLists.findIndex(elem => elem.id === item.id)
        this.myLists.splice(index, 1)
        // Call Service
      }
    },
    async deleteProject (item) {
      console.log('Delete Project:', item)
      if (await this.$confirm('remove-project', `${this.$t('are-you-sure-delete-project')} (${item.title})`)) {
        console.log('YES!')
      }
    },
    changeProjectTitle (item) {
      console.log('Change title:', item)
      ProjectService.modifyProjectTitle({id: item.id, title: item.title}).then(response => {
        console.log('response:', response)
        this.$toasted.show(this.$t('project-title-updated')).goAway(TOAST_GOAWAY_TIME)
      })
    },
    changeCollectionTitle (item) {
      console.log('Change collection title:', item)
    },
    loadListData (list) {
      this.myLists = []
      this.isLoading = true
      this.$toasted.clear()
      store.dispatch('inactiveItemsInit')
      if (list === 'projects') {
        this.getMyProjects()
      } else if (list === 'collections') {
        this.getMyColections()
      } else {
        this.getMyFavorites()
      }
    },
    getMyProjects () {
      ProjectService.getMyProjects({id: this.$route.params.id}).then(response => {
        this.isLoading = false
        this.myLists = response.data.projects
      })
    },
    getMyColections () {
      ProjectService.getMyColections({id: this.$route.params.id}).then(response => {
        this.isLoading = false
        this.myLists = response.data.collections
      })
    },
    getMyFavorites () {
      ProjectService.getMyFavorites({id: this.$route.params.id}).then(response => {
        this.isLoading = false
        this.myLists = response.data.favorites
      })
    }
  }

}
</script>
