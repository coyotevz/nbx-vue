<template>
  <div class="md-table-pagination">
    <span class="md-table-pagination-label">{{ nbxLabel }}</span>
    <md-select v-model="currentSize" md-menu-class="md-pagination-select"
      @change="changeSize" v-if="nbxPageOptions">
      <md-option v-for="amount in nbxPageOptions" :value="amount">{{ amount }}</md-option>
    </md-select>

    <span>{{ ((currentPage - 1) * currentSize) + 1 }}-{{ subTotal }} {{ nbxSeparator }} {{ totalItems }}</span>

    <md-button class="md-icon-button md-table-pagination-previous"
      @click="previousPage" :disabled="currentPage == 1">
      <md-icon>keyboard_arrow_left</md-icon>
    </md-button>
    <md-button class="md-icon-button md-table-pagination-next"
      @click="nextPage"
      :disabled="currentSize * currentPage >= totalItems">
      <md-icon>keyboard_arrow_right</md-icon>
    </md-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subTotal: 0,
      currentSize: parseInt(this.nbxSize, 10),
      currentPage: parseInt(this.nbxPage, 10),
      totalItems: !isNaN(this.nbxTotal) ? this.nbxTotal : Number.MAX_SAFE_INTEGER,
    }
  },
  props: {
    nbxSize: {
      type: [Number, String],
      default: 10,
    },
    nbxPageOptions: {
      type: [Array, Boolean],
      default() {
        return [10, 25, 50, 100]
      },
    },
    nbxPage: {
      type: [Number, String],
      default: 1,
    },
    nbxTotal: {
      type: [Number, String],
      default: 'Many'
    },
    nbxLabel: {
      type: String,
      default: 'Rows per page',
    },
    nbxSeparator: {
      type: String,
      default: 'of',
    }
  },
  methods: {
    emitPaginationEvent() {
      if (this.canFireEvents) {
        const sub = this.currentPage * this.currentSize
        this.subTotal = sub > this.nbxTotal ? this.nbxTotal : sub
        this.$emit('pagination', {
          size: this.currentSize,
          page: this.currentPage,
        })
      }
    },
    changeSize() {
      if (this.canFireEvents) {
        this.$emit('size', this.currentSize)
        this.emitPaginationEvent()
      }
    },
    previousPage() {
      if (this.canFireEvents) {
        this.currentPage--
        this.$emit('page', this.currentPage)
        this.emitPaginationEvent()
      }
    },
    nextPage() {
      if (this.canFireEvents) {
        this.currentPage++
        this.$emit('page', this.currentPage)
        this.emitPaginationEvent()
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.subTotal = this.currentPage * this.currentSize
      if (this.nbxPageOptions) {
        if (!this.nbxPageOptions.includes(this.currentSize)) {
          console.error('[VueMaterial warn]: nbxPageOptions dont\'t match with currentSize')
        }
      }
      this.canFireEvents = true
    })
  },
}
</script>
