<script type="text/ecmascript-6">

    export default {
        name: 'activity',
        data () {
            return {
                loading: false,
                banners: [],
                picsLeft: [],
                picsRight: [],
                viewVisible: false,
                pointSrc: '',
                pointSrcBlur: '',
                flickityOptions: {
                    "autoPlay": 3000,
                    "pageDots": false,
                    "resize": true,
                    "prevNextButtons": false,
                    "wrapAround": true
                }
            }
        },
        computed: {
            hasBanner () {
                return this.banners.length > 0
            },
            hasPic () {
                return this.picsLeft.length > 0
            }
        },
        created () {
            window.actId = window.location.pathname.substring(1).split('/')[0]
        },
        mounted () {
            this.getBanners()
            this.getPics()
        },
        methods: {
            async getBanners () {
                let res = await this.api.getBanners(window.actId)
                if (res.success) {
                    this.banners = res.data.results
                }
            },
            async getPics (page = 1) {
                let res = await this.api.getJXPhotoList(page, window.actId)
                if (res.success) {
                    let left = []
                    let right = []
                    res.data.results.forEach((e, i) => {
                        (i + 1) % 2 === 0
                            ? left.push(e)
                            : right.push(e)
                    })
                    this.picsLeft = left
                    this.picsRight = right

                }
            },
            viewImg (src) {
                this.viewVisible = true
                this.pointSrc = src + '?imageView2/2/w/900/h/3000/q/75'
                this.pointSrcBlur = src + '?imageView2/2/w/40/h/3000/q/20'
            },
            hideView () {
                this.pointSrc = ''
                this.viewVisible = false
            }
        },
        components: {}
    };
</script>

<template>
  <div class="activity">
    <header class="activity__head">
      <div class="activity__banner-box">
        <carousel :perPage="1" paginationActiveColor="#f90">
          <slide class="activity__banner" v-for="banner in banners" :key="banner.id"
                 :style="{backgroundImage: `url(${banner.file + '?imageView2/2/w/800/h/3000/q/75'})`}">

          </slide>
          <slide v-if="!hasBanner" class="activity__banner--empty">
            活动未上传banner

          </slide>
        </carousel>
      </div>
    </header>

    <h1 class="activity__title">直播现场</h1>

    <div v-if="hasPic" class="activity__pic-wrapper" layout="row top-justify">
      <div class="activity__pic-column">
        <div v-for="pic in picsLeft" @click="viewImg(pic.file)">
          <progressive-img
                  class="activity__pic"
                  :blur="30"
                  :key="pic.id"
                  :src="pic.file + '?imageView2/2/w/400/h/3000/q/75'"
                  :placeholder="pic.file + '?imageView2/2/w/90/h/3000/q/50'"
          ></progressive-img>
        </div>
      </div>
      <div class="activity__pic-column">
        <div v-for="pic in picsRight" @click="viewImg(pic.file)">
          <progressive-img
                  class="activity__pic"
                  :blur="30"
                  :key="pic.id"
                  :src="pic.file + '?imageView2/2/w/400/h/3000/q/75'"
                  :placeholder="pic.file + '?imageView2/2/w/90/h/3000/q/50'"
          ></progressive-img>
        </div>
      </div>
    </div>

    <h3 class="activity__empty" v-else>
      当前没有照片
    </h3>

    <div class="activity__pic-view" layout="row center-center" v-if="viewVisible" @click="hideView">
      <progressive-img
              class="activity__pic-big"
              :src="pointSrc"
              :placeholder="pointSrcBlur"
      ></progressive-img>
    </div>
  </div>
</template>

<style lang="scss">
  @import "../sass/index";

  .VueCarousel-slide {
    position: relative;
    color: #fff;
    font-size: 24px;
    text-align: center;
    min-height: 100px;
  }

  .VueCarousel-wrapper {
    outline: 1px solid $a;
  }

</style>