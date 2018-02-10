<template>
  <nav class="level">
    <!-- Left side -->
    <div class="level-left">
      <div class="level-item">
        <p class="subtitle is-5">
          <strong>{{ count }}</strong> posts
        </p>
      </div>
      <div class="level-item">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span v-if="filters.category === 'all'">{{ $t('category') }}</span>
            <span v-else>{{ filters.category }}</span>
          </a>
          <div class="navbar-dropdown is-boxed">
            <a
              :class="{ 'navbar-item': true, 'is-active': filters.category === 'all' }"
              href="#"
              @click.prevent="selectCategory('all')"
            >
              {{ $t('all') }}
            </a>
            <a
              :class="{ 'navbar-item': true, 'is-active': filters.category === category }"
              href="#"
              v-for="category in categories"
              @click.prevent="selectCategory(category)"
            >
              {{ category }}
            </a>
          </div>
        </div>
      </div>
      <div class="level-item">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span v-if="filters.country === 'all'">{{ $t('country') }}</span>
            <span v-else>{{ $t('countries.'+filters.country) }}</span>
          </a>
          <div class="navbar-dropdown is-boxed">
            <a
              :class="{ 'navbar-item': true, 'is-active': filters.country === 'all' }"
              href="#"
              @click.prevent="selectCountry('all')"
            >
              {{ $t('all') }}
            </a>
            <a
              class="navbar-item"
              :class="{ 'navbar-item': true, 'is-active': filters.country === country }"
              href="#"
              v-for="country in countries"
              @click.prevent="selectCountry(country)"
            >
              {{ $t('countries.'+country) }}
            </a>
          </div>
        </div>
      </div>
      <div class="level-item">
        <div class="field">
          <p class="control has-icons-left has-icons-right" id="searchCollection">
            <input ref="searchInput" class="input" @keyup="searchQuery" type="text" :value="searchInput" placeholder="Find a collection">
            <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
            <span v-show="searchInput.length" class="icon is-right resetIcon" @click="resetSearchInput">
              <i class="fa fa-times-circle"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Right side -->
    <div class="level-right">
      <p class="level-item"><strong>All</strong></p>
      <p class="level-item"><a>Published</a></p>
      <p class="level-item"><a>Drafts</a></p>
      <p class="level-item"><a>Deleted</a></p>
    </div>
  </nav>
</template>
<script>
import { AVAILABLE_COUNTRIES, AVAILABLE_CATEGORIES } from '../../constans'

export default {
  props: {
    filters: {
      type: Object
    },
    count: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      countries: AVAILABLE_COUNTRIES,
      categories: AVAILABLE_CATEGORIES
    }
  },
  computed: {
    searchInput () {
      return this.filters.search
    }
  },
  methods: {
    selectCategory (category) {
      this.$emit('select-category', category)
    },
    selectCountry (country) {
      this.$emit('select-country', country)
    },
    searchQuery () {
      this.$emit('search-query', this.$refs.searchInput.value)
    },
    resetSearchInput () {
      this.$refs.searchInput.value = ''
      this.$emit('reset')
    }
  }
}
</script>
