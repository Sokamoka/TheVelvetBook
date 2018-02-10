<template>
  <div class="tag-input">
    <div class="tags">
      <span class="tag is-success is-rounded is-medium" v-for="tag, index in value">
        {{ tag.name }}
        <button class="delete is-small" @click="remove(index)" style="margin-left: 5px;"></button>
      </span>
      <div class="control has-icons-left" v-show="!tagLimit">
        <!-- input
          ref="newtag"
          class="input"
          type="text"
          :maxlength="maxlength"
          :placeholder="$t('add-tag')"
          @focus="focus"
          @blur="blur"
          @input="input"
          @change="add"
        -->
        <autocomplate
          :suggestions="items"
          v-model="selected"
          suggestion-attribute="name"
          input-class="input input-transparent"
          :placeholder="$t('add-tag')"
          :maxlength="maxlength"
          @change="add"
          @focus="focus"
          @blur="blur"
          @input-keydown="input"
        ></autocomplate>
        <span class="icon is-small is-left">
          <i class="fa fa-tag"></i>
        </span>
      </div>
    </div>
    <div
      :class="{'help limit-indicator': true, 'is-active': indicator}"
      v-show="limit !== 0"
    >
      {{ indicatorText }}
    </div>
  </div>

</template>
<script>
  import Autocomplate from '../../base/Autocomplate'

  export default {
    props: {
      value: {
        type: Array
      },
      limit: {
        type: Number,
        default: 0
      },
      maxlength: {
        type: Number,
        default: 16
      }
    },
    components: {
      Autocomplate
    },
    data () {
      return {
        indicator: false,
        indicatorText: '',
        timer: 0,
        selected: {},
        items: [
          {
            'id': 0,
            'name': 'Weddingcake',
            'normalize': 'weddingcake'
          },
          {
            'id': 1,
            'name': 'Geodecake',
            'normalize': 'geodecake'
          },
          {
            'id': 2,
            'name': 'Nekedcake',
            'normalize': 'nekedcake'
          }
        ]
      }
    },
    computed: {
      tagLimit () {
        if (this.value) {
          return this.value.length === this.limit && this.limit !== 0
        }
        return false
      }
    },
    methods: {
      indicatorString (count, limit) {
        this.indicatorText = `${count}/${limit}`
      },
      add () {
        let newtag = this.selected.name.replace(/(^\s+|\s+$)/g, '')
        let clonedValue = this.value.slice()
        let isExists = clonedValue.map(item => item.normalize).includes(newtag.toLowerCase())
        // console.log('isExists:', isExists, newtag)
        if (!isExists && newtag.length) {
          clonedValue.push({name: newtag, normalize: newtag.toLowerCase()})
          this.$emit('input', clonedValue)
          this.$emit('update-tag-list', {name: newtag, normalize: newtag.toLowerCase()})
          this.selected = {}
        }
        this.indicatorString(clonedValue.length, this.limit)
      },
      remove (index) {
        let clonedValue = this.value.slice()
        clonedValue.splice(index, 1)
        this.$emit('input', clonedValue)
        this.$emit('update-tag-list', this.value[index])
      },
      focus () {
        this.indicatorString(this.value.length, this.limit)
        this.indicator = true
      },
      blur () {
        this.indicator = false
      },
      input (string) {
        this.indicatorString(string.length, this.maxlength)
      }
    }
  }
</script>
<style lang="scss">
.tag-input {
  .control {
    margin-bottom: 8px;
    max-width: 100%;
  }

  .input-transparent {
    background-color: transparent;
    border: 0;
    box-shadow: none;
    height: 32px;
    padding-bottom: 0;
    padding-top: 0;
    width: 100%;
  }

  .tags {
    align-items: flex-start;
  }

  .limit-indicator {
    margin-top: -15px;
  }

  .dropdown-menu {
    .dropdown-content {
      .dropdown-item {
        text-decoration: none;
      }
    }
  }
}

</style>
