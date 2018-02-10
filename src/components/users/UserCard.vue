<template>
  <div v-if="type == 'projects'" :class="{'card collection': true, 'inactive': isInactive}">
    <div class="card-image">
      <router-link :to="{ name: 'AddProject', params: { id: item.id }}">
        <clazy-load class="image is-4by3" tag="figure" :ratio="0.2" :threshold="[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]" :src="item.image">
          <img :src="item.image" :alt="item.title" slot="image">
        </clazy-load>
      </router-link>
    </div>
    <div class="card-content">
      <div class="content">
        <p>
          <inline-edit v-model="item.title" :maxlength="64" @change="changeProjectTitle(item)" class="title is-size-6"></inline-edit>
        </p>
        <time class="is-size-7" :datetime="item.date">{{ item.date | formatDate }}</time>
        <div class="columns is-clearfix">
          <div class="column">
            <div>
              <a
                href="#"
                :class="{ 'button is-rounded is-small': true, 'is-success': item.active }"
                v-tooltip="activeTooltipText(item.active)"
                @click.prevent="activateProject(item)"
              ><i class="fa fa-check"></i></a>
            </div>
          </div>
          <div class="column">
            <div class="dropdown is-hoverable is-pulled-right is-up is-right">
              <div class="dropdown-trigger">
                <button class="button is-primary is-outlined is-rounded is-small" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span class="icon is-small">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a href="#" class="dropdown-item" @click.prevent="activateProject(item)">
                    <span
                      :class="{ 'icon is-small': true, 'has-text-success': item.active}"
                    >
                      <i class="fa fa-check"></i>
                    </span>
                    <span v-if="!item.active">{{ $t('activate') }}</span>
                    <span v-else>{{ $t('inactivate') }}</span>
                  </a>
                  <router-link :to="{ name: 'AddProject', params: { id: item.id }}" class="dropdown-item">
                    <span class="icon is-small"><i class="fa fa-pencil"></i></span>
                    <span>{{ $t('edit') }}</span>
                  </router-link>
                  <hr class="dropdown-divider">
                  <a href="#" class="dropdown-item" @click.prevent="deleteProject(item)">
                    <span class="icon is-small"><i class="fa fa-trash-o"></i></span>
                    <span>{{ $t('delete') }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="type == 'collections'" class="card collection">
    <div class="card-image">
      <router-link :to="{ name: 'Collection', params: { id: item.id }}">
        <clazy-load class="image is-4by3" tag="figure" :ratio="0.2" :threshold="[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]" :src="item.image">
          <img :src="item.image" :alt="item.title" slot="image">
        </clazy-load>
      </router-link>
    </div>
    <div class="card-content">
      <div class="content">
        <p class="title is-size-6">
          <inline-edit v-model="item.title" :maxlength="64" @change="changeCollectionTitle(item)" class="title is-size-6"></inline-edit>
        </p>
        <div class="columns is-clearfix">
          <div class="column">
            <router-link :to="{ name: 'Collection', params: { id: item.id }}" class="button is-rounded is-small">
              <span class="icon">
                <i class="fa fa-folder"></i>
              </span>
              <span>5</span>
            </router-link>
          </div>
          <div class="column">
            <div class="dropdown is-hoverable is-pulled-right is-up is-right">
              <div class="dropdown-trigger">
                <button class="button is-primary is-outlined is-rounded is-small" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span class="icon is-small">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <router-link :to="{ name: 'AddProject', params: { id: item.id }}" class="dropdown-item">
                    <span class="icon is-small"><i class="fa fa-pencil"></i></span>
                    <span>{{ $t('edit') }}</span>
                  </router-link>
                  <hr class="dropdown-divider">
                  <a href="#" class="dropdown-item">
                    <span class="icon is-small"><i class="fa fa-trash-o"></i></span>
                    <span>{{ $t('delete') }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="type == 'collection'" class="card collection">
    <div class="card-image">
      <router-link :to="{ name: 'Collection', params: { id: item.id }}">
        <clazy-load class="image is-4by3" tag="figure" :ratio="0.2" :threshold="[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]" :src="item.image">
          <img :src="item.image" :alt="item.title" slot="image">
        </clazy-load>
      </router-link>
    </div>
    <div class="card-content">
      <div class="content">
        <p class="title is-size-6">{{ item.title }}</p>
        <div v-show="isStaff">
          <router-link :to="{ name: 'Staff', params: { username: item.username }}">{{ item.author }}</router-link> <span class="is-size-7">({{ $t('countries.'+item.country) }})</span>
        </div>
        <time class="is-size-7" :datetime="item.date">{{ item.date | formatDate }}</time>
        <div class="columns is-clearfix">
          <div class="column">
            <router-link :to="{ name: 'Collection', params: { id: item.id }}" class="button is-rounded is-small">
              <span class="icon">
                <i class="fa fa-folder"></i>
              </span>
              <span>5</span>
            </router-link>
          </div>
          <div class="column">
            <div class="dropdown is-hoverable is-pulled-right is-up is-right">
              <div class="dropdown-trigger">
                <button class="button is-primary is-outlined is-rounded is-small" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span class="icon is-small">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <router-link :to="{ name: 'AddProject', params: { id: item.id }}" class="dropdown-item">
                    <span class="icon is-small"><i class="fa fa-pencil"></i></span>
                    <span>{{ $t('edit') }}</span>
                  </router-link>
                  <hr class="dropdown-divider">
                  <a href="#" class="dropdown-item">
                    <span class="icon is-small"><i class="fa fa-trash-o"></i></span>
                    <span>{{ $t('delete') }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else :class="{'card collection': true, 'inactive': isInactive}">
    <div class="card-image">
      <router-link :to="{ name: 'Project', params: { username: item.username, id: item.id }}">
        <clazy-load class="image is-4by3" tag="figure" :ratio="0.2" :threshold="[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]" :src="item.image">
          <img :src="item.image" :alt="item.title" slot="image">
        </clazy-load>
      </router-link>
    </div>
    <div class="card-content">
      <div class="content">
        <p class="title is-size-6">{{ item.title }}</p>
        <div v-show="isStaff">
            <router-link :to="{ name: 'Staff', params: { username: item.username }}">{{ item.author }}</router-link> <span class="is-size-7">({{ $t('countries.'+item.country) }})</span>
        </div>
        <time class="is-size-7" :datetime="item.date">{{ item.date | formatDate }}</time>
        <div class="columns">
          <div class="column">
            <button type="button" class="button is-rounded is-small" @click="dislike(item.id)" v-tooltip="$t('dislike')">
              <span class="icon">
                <i class="fa fa-heart"></i>
              </span>
              <span>{{ item.favorite }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../../store'
import inlineEdit from '../base/InlineEdit'
export default {
  components: {
    inlineEdit
  },
  props: {
    item: {
      type: Object,
      require: true
    },
    isStaff: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'projects'
    }
  },
  data () {
    return {}
  },
  watch: {},
  created () { },
  computed: {
    isInactive () {
      // console.log(store.getters.getItem.includes(this.item.id))
      return store.getters.getItem.includes(this.item.id)
    }
  },
  methods: {
    dislike (id) {
      store.dispatch('setInactiveItem', this.item.id)
      this.$emit('dislike', this.item)
    },
    deleteProject (item) {
      this.$emit('delete-project', this.item)
    },
    changeProjectTitle (item) {
      this.$emit('change-project-title', item)
    },
    activateProject (item) {
      console.log('Activate Project:', item)
      item.active = !item.active
      if (item.active) {
        console.log('isActive')
      } else {
        console.log('isInactive')
        // this.$emit('activate-project', item)
      }
      this.$emit('activate-project', item)
    },
    changeCollectionTitle (item) {
      this.$emit('change-collection-title', item)
    },
    activeTooltipText (status) {
      if (status) {
        return this.$t('inactivate')
      } else {
        return this.$t('activate')
      }
    }
  }
}
</script>
<style>
  .inactive {
    pointer-events: none;
    opacity: 0.4;
  }
</style>
