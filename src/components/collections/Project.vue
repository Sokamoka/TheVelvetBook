<template>
  <section class="section">
    <div class="container">
      <!-- Main container -->
      <loader :loading="isLoading"></loader>
      <div v-show="!isLoading" class="notification">
        <avatar
          class="avatar"
          :username="project.author || ''"
          src=""
          :size="96"
          background-color="#303030"
        ></avatar>
        <h5 class="is-5 has-text-centered">
          <router-link :to="{ name: 'Staff', params: { username: project.username }}">
            {{ project.author }}
          </router-link>
        </h5>
        <h2 class="title is-2 has-text-centered is-uppercase">{{ project.title }}</h2>
        <h6 class="subtitle is-6 has-text-centered">
          {{ $t('countries.'+project.country) }} - {{ project.date | formatDate }}
        </h6>
        <h6 class="subtitle is-6 has-text-centered">{{ project.description }}</h6>
        <div class="tags">
          <a v-for="tag in project.tags" class="tag is-dark is-rounded">
            {{ tag.name }}
          </a>
        </div>
      </div>
      <nav v-show="!isLoading" class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>{{ imageCount }}</strong> images
            </p>
          </div>
          <p class="level-item"><a class="button" @click.prevent="isVisible=true"><i class="fa fa-play" aria-hidden="true"></i></a></p>
        </div>
        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <a
              :class="{ 'button': true, 'is-active': view == 'grid' }"
              @click.prevent="view='grid'"
              v-tooltip="$t('grid-view')"
            >
              <i class="fa fa-th" aria-hidden="true"></i>
            </a>
          </p>
          <p class="level-item">
            <a
              :class="{ 'button': true, 'is-active': view == 'wide' }"
              @click.prevent="view='wide'"
              v-tooltip="$t('wide-view')"
            >
              <i class="fa fa-th-list" aria-hidden="true"></i>
            </a>
          </p>
        </div>
      </nav>
      <div class="project-items">
        <div
          :class="{ 'columns is-multiline': true }"
        >
          <div
            :class="{ 'column': true, 'is-3': view == 'grid', 'is-8 is-offset-2': view == 'wide' }"
            v-for="(item, index) in images"
          >
            <div class="card collection">
              <div class="card-image">
                <a href="#" @click.prevent="clcikImage(index)">
                  <clazy-load class="image is-4by3" tag="figure" :ratio="0.1" :threshold="[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]" :src="item.thumb">
                    <img :src="item.thumb" :alt="item.title" slot="image">
                  </clazy-load>
                </a>
              </div>
              <div class="card-content">
                <div class="content">
                  <p class="title card-title is-size-7">{{ item.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-0">
        <div class="column is-8 is-offset-2">
          <div class="card" v-show="!isLoading">
            <header class="card-header">
              <p class="card-header-title">
                Credits
              </p>
              <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fa fa-info" aria-hidden="true"></i>
                </span>
              </a>
            </header>
            <div class="card-content">
              <table class="table is-narrow is-fullwidth">
                <tbody>
                  <tr v-for="credit in credits">
                    <td>{{ $t('categories.'+credit.category) }}:</td>
                    <td>
                      <span v-if="credit.staffId === null">{{ credit.creditable }}</span>
                      <router-link v-else :to="{ name: 'Staff', params: { username: credit.staffName }}">{{ credit.creditable }}</router-link>
                    </td>
                    <td><a href="#" target="_blank"><i class="fa fa-link"></i></a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <gallery :images="images" :caption="true"></gallery>
  </section>
</template>
<script>
import loader from '../base/Loader'
import Avatar from 'vue-avatar'
import gallery from '../gallery'

export default {
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  components: {
    gallery,
    loader,
    Avatar
  },
  data () {
    return {
      isLoading: false,
      project: {username: ''},
      images: [],
      credits: [],
      view: 'grid'
    }
  },
  mounted () {
    this.loadProjectData()
  },
  computed: {
    imageCount () {
      return this.images.length || 0
    }
  },
  methods: {
    clcikImage (index) {
      this.$bus.$emit('clickImage', index)
    },
    loadProjectData () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        let response = require('../../assets/data/project.json')
        this.project = response.project
        this.images = response.images
        this.credits = response.credits
      }, 2000)
    }
  }

}
</script>
<style scoped>
  .project-items {
    margin-bottom: 20px;
  }
  .tags {
    justify-content: center;
    margin-bottom: 20px;
  }
  .notification {
    background-color: white;
  }
  .avatar {
    margin: 0 auto 20px auto;
  }
</style>
