<template>
  <div :class="{ 'tvb-lightbox' : !resetstyles }">
    <div class="tvb-overlay" :class="{ 'open': overlayActive }" @click.self="closeOverlay">
      <div class="holder">
        <div class="slide-wrapper" :style="positionStyle" v-show="overlayActive">
          <div class="slide" v-for="(image, index) in images">
            <clazy-load class="tvb-img" :ratio="0.1" :src="images[index].src">
              <img :src="images[index].src" slot="image">
              <div class="preloader" slot="placeholder">
                <loader :loading="true"></loader>
              </div>
            </clazy-load>
          </div>
        </div>
        <div class="nav" v-if="nav">
          <a class="close" nohref @click="closeOverlay"><span>&times;</span></a>
          <a class="prev" nohref @click="prevImage"><span>&#8592;</span></a>
          <a class="next" nohref @click="nextImage"><span>&#8594;</span></a>
        </div>
        <!-- p v-if="caption && images[currentImage].title">{{ images[currentImage].title }} {{ pageIndicator.index }}/{{ pageIndicator.pages }}</p -->
        <div class="user" v-show="caption">
          <avatar
            username="User Name"
            src=""
            :size="32"
            color="#303030"
            background-color="#F0F0F0"
          ></avatar>
            {{ currentTitle }} ({{ pageIndicator.index }}/{{ pageIndicator.pages }})
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from 'vue-avatar'
import loader from './base/Loader'
import CovTouch from '../utils/cov-touch'

export default {
  props: {
    resetstyles: {
      default: false,
      type: Boolean
    },
    title: {
      type: String,
      default: ''
    },
    images: {
      type: Array
    },
    loop: {
      default: false,
      type: Boolean
    },
    nav: {
      default: true,
      type: Boolean
    },
    caption: {
      deftault: true,
      type: Boolean
    }
  },
  data () {
    return {
      currentImage: 0,
      overlayActive: false,
      position: { x: 0, y: 0, z: 0 },
      swiperRect: {},
      duration: 300,
      $touch: null,
      swiping: false
    }
  },
  created () {
    this.$bus.$on('clickImage', this.clickImage)
  },
  computed: {
    positionStyle () {
      return {
        transform: `translate3d(-${this.position.x}px, 0, 0)`,
        '-webkit-transform': `translate3d(-${this.position.x}px, 0, 0)`,
        'transition-duration': `${this.duration}ms`
      }
    },
    pageIndicator () {
      return {
        index: this.currentImage + 1,
        pages: this.images.length
      }
    },
    currentTitle () {
      return this.images[this.currentImage] ? this.images[this.currentImage].title : ''
    }
  },
  mounted () {
    const self = this
    window.addEventListener('keydown', (e) => {
      self.handleGlobalKeyDown(e)
    })
    window.addEventListener('resize', self.initResize)
    // this.$el.addEventListener('resize', this.init)
    this.initResize()
    this.initSwipe()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.initResize)
  },
  methods: {
    initResize () {
      console.log('INIT', this.$el.getBoundingClientRect())
      this.swiperRect = this.$el.getBoundingClientRect()
      this.position.x = ((this.$el.getBoundingClientRect().left + this.$el.getBoundingClientRect().right) * this.currentImage)
      this.duration = 0
    },
    clickImage (index) {
      this.currentImage = index
      this.overlayActive = true
      this.duration = 300
      this.position.x = ((this.swiperRect.left + this.swiperRect.right) * this.currentImage)
    },
    nextImage () {
      if (this.currentImage === (this.images.length - 1)) {
        if (this.loop) {
          this.currentImage = 0
        }
      } else {
        this.currentImage += 1
      }
      this.duration = 300
      this.position.x = ((this.swiperRect.left + this.swiperRect.right) * this.currentImage)
    },
    prevImage () {
      if (this.currentImage === 0) {
        if (this.loop) {
          this.currentImage = (this.images.length - 1)
        }
      } else {
        this.currentImage -= 1
      }
      this.duration = 300
      this.position.x = ((this.swiperRect.left + this.swiperRect.right) * this.currentImage)
    },
    closeOverlay () {
      this.overlayActive = false
    },
    handleGlobalKeyDown (e) {
      switch (e.keyCode) {
        case 37: this.prevImage(); break
        case 39: this.nextImage(); break
        case 27: this.closeOverlay(); break
        default: break
      }
    },
    initSwipe () {
      console.log(this.$el.querySelector('.slide-wrapper'))
      if (this.$touch) {
        this.$touch.destroy()
      }
      this.$touch = new CovTouch({ el: this.$el.querySelector('.slide-wrapper') })

      this.$touch.listen('swipe-left', null, () => {
        console.log('swipe-left')
        this.swiping = false
        this.nextImage()
      })
      this.$touch.listen('swipe-right', null, () => {
        console.log('swipe-right')
        this.swiping = false
        this.prevImage()
      })

      let movediff = 0
      this.$touch.listen('swiping', null, (start, end) => {
        this.swiping = true
        let move = start.x - end.x
        this.position.x += (move - movediff)
        movediff = move
      })
      this.$touch.listen('swiped', null, (start, end) => {
        movediff = 0
        this.swiping = false
      })
    }

  },
  components: {
    Avatar,
    loader
  }
}
</script>

<style scoped lang="scss">
@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

.tvb-overlay {
  visibility: hidden;
  -webkit-transition: visibility 0s linear 0.3s, opacity 0.3s ease-in-out;
  -moz-transition: visibility 0s linear 0.3s, opacity 0.3s ease-in-out;
  -ms-transition: visibility 0s linear 0.3s, opacity 0.3s ease-in-out;
  -o-transition: visibility 0s linear 0.3s, opacity 0.3s ease-in-out;
  transition: visibility 0s linear 0.3s, opacity 0.3s ease-in-out;
  position: fixed;
  opacity: 0;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.9);
	text-align: center;
  box-sizing: border-box;
  z-index: 2000;

  &.open {
    visibility: visible;
    transition-delay: 0s;
    zoom: 1;
    opacity: 1;
  }

	.holder {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // padding: 25px;

    .tvb-img {
      overflow: hidden;

      &.loaded {
        opacity: 1;
        animation-name: fadeInOpacity;
  	    animation-iteration-count: 1;
  	    animation-timing-function: ease-in-out;
  	    animation-duration: 0.3s
      }
    }

		img {
			// width: 100%;
			// max-width: 600px;
			cursor: pointer;
			box-sizing: border-box;
			display: block;
      // max-height: 100vh;
      width: auto;
      height: auto;
      max-width: 90%;
      max-height: 90%;
      -ms-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      position: absolute;
      left: 50%;
      top: 50%;
		}

		p {
			color: #ffffff;
			margin: 0;
			background-color: rgba(0,0,0,0.4);
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			box-sizing: border-box;
			padding: 10px;
		}
		.nav {
			max-width: 600px;
			margin: 0 auto;
			font-size: 14px;

			a {
				color: white;
				opacity: 0.3;
				-webkit-user-select: none;
				cursor: pointer;

				&:hover {
					opacity: 1;
				}
			}

			.next, .prev {
				position: absolute;
				top: 0;
				bottom: 0;
				padding: 10px;
				width: 50%;
				box-sizing: border-box;
				font-size: 40px;

				span {
					top: 50%;
					transform: translateY(50%);
					position: relative;
				}
			}

			.next {
				right: 0;
				text-align: right;
			}

			.prev {
				left: 0;
				text-align: left;
			}
			.close {
				right: 10px;
				top: 0;
				font-size: 30px;
  				opacity: 0.6;
				z-index: 1000000;
				position: absolute;
				text-align: left;
				box-sizing: border-box;

				&:hover {
					opacity: 1;
				}
			}
		}
    .slide-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      position: relative;
      transition-property: transform;
      transition: transform .3s ease-in-out;

      .slide {
        width: 100%;
        height: 100%;
        position: relative;
        flex-shrink: 0;
      }
    }
    .user {
      display: flex;
      align-self: center;
      position: absolute;
      left: 25px;
      top: 25px;
      color: #F0F0F0;
      background-color: #000000;
      border-radius: 32px;
      padding-right: 12px;
      line-height: 32px;

      .vue-avatar--wrapper {
          margin-right: 10px;
      }
    }
	}
  .preloader {
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
  }
}
</style>
