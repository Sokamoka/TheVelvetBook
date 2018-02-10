<template>
  <div class="card collection animated slideInUp">
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
        <div v-show="!isStaff">
            <router-link :to="{ name: 'Staff', params: { username: item.username }}">{{ item.author }}</router-link> <span class="is-size-7">({{ $t('countries.'+item.country) }})</span>
        </div>
        <time class="is-size-7" datetime="2016-01-01">{{ item.date | formatDate }}</time>
        <div class="columns is-clearfix">
          <div class="column">
            <div class="avatar image is-24x24 img-circle">
              <img src="https://assets.awwwards.com/awards/media/cache/thumb_user_retina/default/user4.jpg">
            </div>
          </div>
          <div class="column">
            <a class="button is-rounded is-small is-pulled-right">Megnéz</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      require: true
    },
    isStaff: {
      type: Boolean,
      dafault: false
    }
  },
  data () {
    return {}
  }
}
</script>
