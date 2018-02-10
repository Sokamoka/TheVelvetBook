<template>
  <section class="section">
    <div class="container">
      <!-- Main container -->
      <filter-bar
        :filters="filters"
        :count="filteredList.length"
        @select-category="selectCategory"
        @select-country="selectCountry"
        @search-query="searchQuery"
        @reset="resetSearchInput"
      ></filter-bar>
      <loader :loading="isLoading"></loader>
      <div class="collections">
        <div class="columns is-multiline">
          <div class="column is-3" v-for="item in filteredList">
            <card :item="item"></card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import router from '../../router'
import filterBar from './filters'
import loader from '../base/Loader'
import card from '../Card'

export default {
  props: {
    filters: {
      type: Object,
      default: () => {
        return {
          country: 'all',
          category: 'all',
          search: ''
        }
      }
    }
  },
  components: {
    filterBar,
    card,
    loader
  },
  data () {
    return {
      projects: [],
      isLoading: false
    }
  },
  mounted () {
    this.loadFeedData()
  },
  watch: {
    '$route' (to, from) {
      this.filters = to.query
    }
  },
  computed: {
    filteredList () {
      return this.projects.filter(item => {
        if (this.filters.category === 'all') {
          return item
        } else {
          return item.category === this.filters.category
        }
      }).filter(item => {
        if (this.filters.country === 'all') {
          return item
        } else {
          return item.country === this.filters.country
        }
      }).filter(item => {
        return item.title.toLowerCase().includes(this.filters.search.toLowerCase()) || item.author.toLowerCase().includes(this.filters.search.toLowerCase())
      })
    }
  },
  methods: {
    selectCategory (category) {
      router.push({query: {category: category, country: this.filters.country, search: this.filters.search}})
    },
    selectCountry (country) {
      router.push({query: {category: this.filters.category, country: country, search: this.filters.search}})
    },
    searchQuery (value) {
      router.push({query: {category: this.filters.category, country: this.filters.country, search: value}})
    },
    resetSearchInput () {
      router.push({query: {category: this.filters.category, country: this.filters.country, search: ''}})
    },
    loadFeedData () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        let response = require('../../assets/data/feed.json')
        this.projects = response.projects
      }, 2000)
    }
  }
}
</script>
<style lang="scss">
  #searchCollection {
    .resetIcon {
      pointer-events: visible;
      cursor: pointer;
    }
  }
</style>
