<template>
  <div class="md-table-pagination">
    <span class="md-table-pagination-label">{{ nbxLabel }}</span>
    <md-select v-model="currentSize" md-menu-class="md-pagination-select"
      @change="changeSize" v-if="pageOptions">
      <md-option v-for="amount in pageOptions" :value="amount">{{ amount }}</md-option>
    </md-select>

    <span>{{ ((currentPage - 1) * currentSize) + 1 }}-{{ subTotal }} {{ nbxSeparator }} {{ totalItems }}</span>

    <md-button class="md-icon-button md-table-pagination-previous"
      @click="previousPage" :disable="currentPage == 1">
      <md-icon>keyboard_arrow_left</md-icon>
    </md-button>
    <md-button class="md-icon-button md-table-pagination-next" @click="nextPage" :disabled="currentSize * currentPage >= totalItems">
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
      totalItems: !isNaN(this.nbxTotal) && this.nbxTotal || Number.MAX_SAFE_INTEGER,
      pageOptions: false,
    }
  },
  props: {
    nbxSize: {
      type: [Number, String],
      default: 10,
    },
    nbxPageOptions: [Array, Boolean],
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
    },
    changeSize() {
    },
    previousPage() {
    },
    nextPage() {
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.subTotal = this.currentPage * this.currentSize
      this.pageOptions = this.nbxPageOptions || [10, 25, 50, 100]
      this.currentSize = this.nbxPageOptions[0]
      this.canFireEvents = true
    })
  },
}
</script>
