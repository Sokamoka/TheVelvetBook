<template>
  <section class="section">
    <div class="container">
      <!-- Main container -->
      <nav v-show="!isLoading" class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><router-link :to="{ name: 'Profile', params: { list: 'projects' }}">{{ user.name }}</router-link></li>
          <li class="is-active"><a href="#" aria-current="page">{{ projectTitle }}</a></li>
        </ul>
      </nav>
      <!-- loader :loading="isLoading"></loader -->
      <content-loader :loading="isLoading" :rows="placeholderRows"></content-loader>
      <div v-show="!isLoading" class="notification">
        <inline-edit v-model="project.title" :maxlength="64" class="title is-1 has-text-centered" @change="changedTitle" validator="required"></inline-edit>
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <inline-edit v-model="project.description" :maxlength="128" class="subtitle has-text-centered" @change="changedDescription"></inline-edit>
          </div>
          <!-- h2 class="subtitle has-text-centered">{{ project.description }}</h2 -->
        </div>
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <!-- tag-input v-model="project.tags" class="input"></tag-input -->
            <tag-input v-model="project.tags" :limit="5" @update-tag-list="updateTagList" style="padding: 5px 0"></tag-input>
          </div>
        </div>
      </div>
      <nav class="level" v-show="!isLoading">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>{{ imagesCount }}</strong>
              <span v-if="images.length > 0">{{ $t('image-label-more') }}</span>
              <span v-else>{{ $t('image-label') }}</span>
            </p>
          </div>
        </div>
        <!-- Right side -->
        <div class="level-right">
          <div class="level-item">
            <a
              :class="{ 'button is-rounded': true, 'is-active': view == 'grid' }"
              @click.prevent="view='grid'"
              v-tooltip="$t('grid-view')"
            >
              <i class="fa fa-th" aria-hidden="true"></i>
            </a>
          </div>
          <div class="level-item">
            <a
              :class="{ 'button is-rounded': true, 'is-active': view == 'wide' }"
              @click.prevent="view='wide'"
              v-tooltip="$t('wide-view')"
            >
              <i class="fa fa-th-list" aria-hidden="true"></i>
            </a>
          </div>
          <div class="level-item">
            <a class="button is-primary is-rounded" @click.prevent="" v-tooltip="$t('add-new-image')">
              <span class="icon">
                <i class="fa fa-plus"></i>
              </span>
              <span>{{ $t('add-new-image') }}</span>
            </a>
          </div>
        </div>
      </nav>
      <div class="collections" v-show="!isLoading">
        <div class="wide-view" v-show="view == 'wide'">
          <wide-list
            v-model="images"
            @show-image="clcikImage"
            @remove="removeImage"
            @changed="reorderedImageList"
            @delete-selected="removeSelectedImages"
            @change-image-title="changeImageTitle"
            @activate="activateImage"
            @inactivate="inactivateImage"
            @activate-selected="activateSelectedImages"
            @inactivate-selected="inactivateSelectedImages"
          ></wide-list>
        </div>
        <div class="grid-view" v-show="view == 'grid'">
          <grid-list
            v-model="images"
            @show-image="clcikImage"
            @remove="removeImage"
            @change-image-title="changeImageTitle"
            @activate="activateImage"
            @inactivate="inactivateImage"
          ></grid-list>
        </div>
      </div>
      <add-credits v-show="!isLoading" v-model="credits" :saving="isCreditSaving" @add="addCredit" @remove="removeCredit" @save="saveCredits"></add-credits>
    </div>
    <gallery :images="images" :caption="true"></gallery>
  </section>
</template>
<script>
import draggable from 'vuedraggable'
import loader from '../base/Loader'
import contentLoader from '../base/ContentLoader'
import inlineEdit from '../base/InlineEdit'
import * as ProjectService from '../../services/projects'
import gallery from '../gallery'
import addCredits from './projects/addCredits'
import ImageListWide from './projects/ImageListWide'
import ImageListGrid from './projects/ImageListGrid'
import TagInput from './projects/TagInput'
import { TOAST_GOAWAY_TIME } from '../../constans'
import { undoToast } from '../../packages/confirm'
import { MY_PROJECT } from '../base/loaders'

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
    inlineEdit,
    contentLoader,
    addCredits,
    draggable,
    TagInput,
    'wide-list': ImageListWide,
    'grid-list': ImageListGrid
  },
  data () {
    return {
      isLoading: false,
      project: {},
      images: [],
      creditMock: {
        category: '',
        creditname: '',
        url: '',
        id: null
      },
      credits: [],
      view: 'grid',
      placeholderRows: MY_PROJECT,
      toastMessage: '',
      isCreditSaving: false
    }
  },
  mounted () {
    this.loadProjectData()
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    imagesCount () {
      return this.images.length
    },
    projectTitle () {
      return this.project.title
    }
  },
  methods: {
    clcikImage (index) {
      this.$bus.$emit('clickImage', index)
    },
    addCredit () {
      console.log('ADD')
      let item = Object.assign({}, this.creditMock)
      this.credits.push(item)
      /*
      try {
        this.credits.splice(this.credits.length, 0, {})
      } catch (e) {
        console.log(e)
      }
      */
    },
    async removeCredit (index) {
      let so = this.credits.splice(index, 1)
      console.log('remove:', so)
      if (await undoToast(this.$t('delete-credit'))) {
        console.log('RESTORE_CREDIT:', index)
        this.credits.splice(index, 0, so[0])
      } else {
        console.log('DELETE_CREDIT:', index)
      }
    },
    saveCredits () {
      this.isCreditSaving = true
      console.log('postdata:', this.credits)
      ProjectService.updateCredits(this.credits).then(response => {
        console.log('response:', response)
        this.isCreditSaving = false
        this.$toasted.show(this.$t('credits-updated')).goAway(TOAST_GOAWAY_TIME)
      })
    },
    reorderedImageList () {
      this.toastMessage = this.$t('image-list-updated')
      this.updateImageList()
    },
    async removeImage (index) {
      if (await this.$confirm('remove-image', this.$t('are-you-sure-delete-image'))) {
        console.log('REMOVE_IMAGE:', index)
        this.images.splice(index, 1)
        this.toastMessage = this.$t('image-deleted')
        this.updateImageList()
      }
    },
    async removeSelectedImages (indexes) {
      console.log('indexes:', indexes)
      if (await this.$confirm('remove-images', this.$t('are-you-sure-delete-selcted-images'))) {
        this.images = this.images.filter(item => {
          if (!indexes.includes(item.id)) return item
        })
        this.toastMessage = this.$t('selected-images-deleted')
        this.updateImageList()
      }
    },
    updateImageList () {
      console.log('UPDATE:', this.images)
      ProjectService.updateProjectImage(this.images).then(response => {
        console.log('response:', response)
        this.$toasted.show(this.toastMessage).goAway(TOAST_GOAWAY_TIME)
      })
    },
    changedTitle () {
      console.log('postdata:', {id: this.project.id, title: this.project.title})
      ProjectService.modifyProjectTitle({id: this.project.id, title: this.project.title}).then(response => {
        console.log('response:', response)
        this.$toasted.show(this.$t('project-title-updated')).goAway(TOAST_GOAWAY_TIME)
      })
    },
    changedDescription () {
      console.log('postdata:', {id: this.project.id, title: this.project.description})
      ProjectService.modifyDescriptionTitle({id: this.project.id, title: this.project.description}).then(response => {
        console.log('response:', response)
        this.$toasted.show(this.$t('project-description-updated')).goAway(TOAST_GOAWAY_TIME)
      })
    },
    changeImageTitle (id) {
      let selectedItem = this.images.find(item => item.id === id)
      console.log('Change Image Title:', {id: selectedItem.id, title: selectedItem.title})
      ProjectService.modifyImageTitle({id: selectedItem.id, title: selectedItem.title}).then(response => {
        console.log('response:', response)
        this.$toasted.show(this.$t('image-title-updated')).goAway(TOAST_GOAWAY_TIME)
      })
    },
    updateTagList (newtag) {
      console.log('Update Tag List:', {projectId: this.$route.params.id, tags: this.project.tags, tag: newtag})
      ProjectService.updateTagList({projectId: this.$route.params.id, tags: this.project.tags}).then(response => {
        console.log('response:', response)
        let tagItem = this.project.tags.find(item => item.normalize === newtag.normalize)
        tagItem.id = response.data.id
        this.$toasted.show(this.$t('tag-list-updated')).goAway(TOAST_GOAWAY_TIME)
      })
    },
    removeTag () {
      // nem biztos hogy kelleni fog
      console.log('Remove Tag:', {projectId: this.$route.params.id, tags: this.project.tags})
    },
    activateImage (id) {
      console.log('Activate:', id)
      ProjectService.activateImage({projectId: this.$route.params.id, imageId: id}).then(response => {
        console.log('response:', response)
        this.$toasted.show(this.$t('image-active')).goAway(TOAST_GOAWAY_TIME)
      })
    },
    inactivateImage (id) {
      console.log('Inactivate:', id)
      ProjectService.inactivateImage({projectId: this.$route.params.id, imageId: id}).then(response => {
        console.log('response:', response)
        this.$toasted.show(this.$t('image-inactive')).goAway(TOAST_GOAWAY_TIME)
      })
    },
    async activateSelectedImages (list) {
      console.log('Activate:', list)
      for (let item of list) {
        await new Promise(resolve => {
          ProjectService.activateImage({projectId: this.$route.params.id, imageId: item}).then(response => {
            console.log('response:', response)
            resolve()
          })
        })
      }
      this.$toasted.show(this.$t('image-active-selected')).goAway(TOAST_GOAWAY_TIME)
    },
    async inactivateSelectedImages (list) {
      console.log('Inactivate:', list)
      for (let item of list) {
        await new Promise(resolve => {
          ProjectService.inactivateImage({projectId: this.$route.params.id, imageId: item}).then(response => {
            console.log('response:', response)
            resolve()
          })
        })
        // console.log(item)
      }
      this.$toasted.show(this.$t('image-inactive-selected')).goAway(TOAST_GOAWAY_TIME)
    },
    loadProjectData () {
      this.isLoading = true
      ProjectService.getProject({id: this.$route.params.id}).then(response => {
        // console.log('response:', response)
        this.isLoading = false
        this.project = response.data.project
        this.images = response.data.images
      })
    }
  }
}
</script>
