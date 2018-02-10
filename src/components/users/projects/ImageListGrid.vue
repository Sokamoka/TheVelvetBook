<template>
  <div class="columns is-multiline">
    <div class="column is-3" v-for="(item, index) in imageList">
      <div class="card collection">
        <div class="card-image">
          <a href="#" @click.prevent="clcikImage(index)">
            <clazy-load class="image is-4by3" tag="figure" :ratio="0.1" :threshold="[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]" :src="item.thumb">
              <img :src="item.thumb" :alt="item.title" slot="image">
            </clazy-load>
          </a>
        </div>
        <div class="card-content">
          <!-- p class="title is-size-6">{{ item.title }}</p -->
          <inline-edit v-model="item.title" :maxlength="64" @change="changedTitle(item.id, index)" class="title is-size-6 card-title"></inline-edit>
          <time class="is-size-7" :datetime="item.created">{{ item.created | formatDate }}</time>
          <div class="columns is-clearfix">
            <div class="column">
              <button
                :class="{'button is-rounded is-small': true, 'is-success': item.active}"
                @click="activate(item.id, item.active, index)"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
              </button>
            </div>
            <div class="column">
              <a class="button is-danger is-rounded is-small is-outlined is-pulled-right" @click.prevent="remove(index)">
                <span class="icon is-small">
                  <i class="fa fa-trash-o"></i>
                </span>
                <span>{{ $t('delete') }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import inlineEdit from '../../base/InlineEdit'

export default {
  props: {
    value: {
      type: Array,
      default: {}
    }
  },
  data () {
    return {
    }
  },
  components: {
    inlineEdit
  },
  computed: {
    imageList: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    remove (index) {
      this.$emit('remove', index)
    },
    clcikImage (index) {
      this.$emit('show-image', index)
    },
    changedTitle (id, index) {
      this.$emit('change-image-title', id)
    },
    activate (id, active, index) {
      // console.log('activate', id, active)
      this.imageList[index].active = !active
      if (active) {
        this.$emit('inactivate', id)
      } else {
        this.$emit('activate', id)
      }
    }
  }
}
</script>
