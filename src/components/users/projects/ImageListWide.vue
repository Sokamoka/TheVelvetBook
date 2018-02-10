<template>
  <div class="column is-10 is-offset-1">
    <div class="table-is-responsive">
      <table class="table is-fullwidth image-table is-responsive">
        <thead>
          <tr>
            <th class="col-index">Pos</th>
            <th class="col-order">Order</th>
            <th class="col-select-image">
              <label class="checkbox">
                <input type="checkbox" v-model="checkAll">
              </label>
            </th>
            <th class="col-activate">Activate</th>
            <th class="col-image">Image</th>
            <th class="col-title">Title</th>
            <th class="col-created">Date</th>
            <th class="col-delete">Törlés</th>
          </tr>
        </thead>
        <draggable
          v-model="imageList"
          :options="{ handle: '.drag-button' }"
          :element="'tbody'"
          @update="changed"
          @choose="startSort"
        >
          <tr v-for="(item, index) in imageList" :key="index">
            <th class="col-index">{{ index+1 }}</th>
            <td class="col-order"><button class="button is-white drag-button"><i class="fa fa-bars" aria-hidden="true"></i></button></td>
            <td class="col-select-image">
              <label class="checkbox">
                <input type="checkbox" :id="'img_'+index" :value="item.id" v-model="checkedImages">
              </label>
            </td>
            <td class="col-activate">
              <button
                :class="{'button is-rounded is-small': true, 'is-success': item.active}"
                @click="activate(item.id, item.active, index)"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
              </button>
            </td>
            <td class="col-image">
              <a href="#" @click.prevent="clcikImage(index)">
                <clazy-load class="image is-64x64" tag="figure" :ratio="0.1" :threshold="[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]" :src="item.thumb">
                  <img :src="item.thumb" :alt="item.title" slot="image">
                </clazy-load>
              </a>
            </td>
            <td class="col-title">
              <inline-edit v-model="item.title" :maxlength="64" @change="changeTitle(item.id)"></inline-edit>
            </td>
            <td class="col-created">{{ item.created | formatDate }}</td>
            <td class="col-delete">
              <a class="button is-danger is-rounded is-small is-outlined" @click.prevent="remove(index)">
                <span class="icon is-small">
                  <i class="fa fa-trash-o"></i>
                </span>
                <span>{{ $t('delete') }}</span>
              </a>
            </td>
          </tr>
        </draggable>
      </table>
    </div>
    <div>
      <button
        class="button is-danger is-rounded is-small is-outlined"
        :disabled="!checkedImages.length"
        @click="deleteSelected"
      >
        <span class="icon is-small">
          <i class="fa fa-trash-o"></i>
        </span>
        <span>{{ $t('delete-selected') }} ({{ selectedCount }})</span>
      </button>
      <button
        class="button is-success is-rounded is-small is-outlined"
        :disabled="!checkedImages.length"
        @click="activateSelected"
      >
        <span class="icon is-small">
          <i class="fa fa-check"></i>
        </span>
        <span>{{ $t('activate-selected') }} ({{ selectedCount }})</span>
      </button>
      <button
        class="button is-info is-rounded is-small is-outlined"
        :disabled="!checkedImages.length"
        @click="inactivateSelected"
      >
        <span class="icon is-small">
          <i class="fa fa-check"></i>
        </span>
        <span>{{ $t('inactivate-selected') }} ({{ selectedCount }})</span>
      </button>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
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
      checkedImages: []
    }
  },
  components: {
    draggable,
    inlineEdit
  },
  watch: {
    imageList (value) {
      this.checkedImages = this.value.reduce((newitem, item) => {
        if (this.checkedImages.includes(item.id)) newitem.push(item.id)
        return newitem
      }, [])
    }
  },
  computed: {
    imageList: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    checkAll: {
      get () {
        return this.checkedImages.length === this.value.length && this.value.length
      },
      set (value) {
        if (value) {
          this.checkedImages = this.value.map(value => value.id)
        } else {
          this.checkedImages = []
        }
      }
    },
    selectedCount () {
      return this.checkedImages.length
    }
  },
  methods: {
    remove (index) {
      this.$emit('remove', index)
    },
    clcikImage (index) {
      this.$emit('show-image', index)
    },
    changeTitle (id) {
      this.$emit('change-image-title', id)
    },
    changed () {
      this.$emit('changed')
    },
    startSort () {
      this.checkedImages = []
    },
    deleteSelected () {
      this.$emit('delete-selected', this.checkedImages)
    },
    activate (id, active, index) {
      // console.log('activate', id, active)
      this.imageList[index].active = !active
      if (active) {
        this.$emit('inactivate', id)
      } else {
        this.$emit('activate', id)
      }
    },
    activateSelected () {
      console.log('activate')
      this.imageList.forEach(item => {
        if (this.checkedImages.includes(item.id)) item.active = true
      })
      this.$emit('activate-selected', this.checkedImages)
      this.checkedImages = []
    },
    inactivateSelected () {
      console.log('inactive')
      this.imageList.forEach(item => {
        if (this.checkedImages.includes(item.id)) item.active = false
      })
      this.$emit('inactivate-selected', this.checkedImages)
      this.checkedImages = []
    }
  }
}
</script>
