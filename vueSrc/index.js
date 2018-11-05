require('./static/normalize')
require('./static/reset')
require('./scss/index.scss');
import Vue from './static/vue';
import BScroll from 'better-scroll';

new Vue({
    el: '#app',
    data: {
        name: 'yunlai',
    },
    methods: {
        changeName() {
            this.name = 'xxxxxxxxx';
        }
    },
    created: function () {
        console.log('created')
    },
    mounted: function () {
        console.log('mounted')
        this.$nextTick(function () {
            console.log('this.$nextTick--', this.$refs.wrapper)
            setTimeout(() => {
                this.$refs.mask.classList.add('hide')
            }, 1000);
            this.scroll = new BScroll(this.$refs.wrapper, {
                mouseWheel: true,
                scrollbar: {
                  fade: false,
                  interactive: true
                },
                dblclick: true,
                probeType: 3
              })
      
              this.scroll.on('scrollStart', () => {
                console.log('scrollStart')
              })
      
              this.scroll.on('scroll', (pos) => {
                console.log('pos:', pos)
              })
      
              this.scroll.on('scrollEnd', () => {
                console.log('scrollEnd')
              })
      
              this.scroll.on('dblclick', (e) => {
                console.log('dblclick:', e)
              })
      
        })

    },
    destroyed() {
        this.scroll && this.scroll.destroy()
    },
})
// newScroll.on('pullingUp', function () {
//     alert('refersh1')
//     newScroll.finishPullUp()
// })
// newScroll.on('pullingDown', function () {
//     alert('refersh')
//     // newScroll.finishPullDown()
//     console.log("下拉更新");
// })

// newScroll.refresh();