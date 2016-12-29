<template>
  <div class="ui-search">
    <form class="ui-search-form" method="get" ref="form">
      <div class="input-container">
        <button class="ui-search-button" @click.prevent
          @focus="onFocus" @blur="onBlur"
        ><md-icon>search</md-icon></button>
        <input placeholder="Búsqueda" v-model="query" name="q" role="searchbox"
          type="text" spellcheck="false" autocomplete="off"
          @focus="onFocus" @blur="onBlur" ref="input">
        <button :class="['ui-close-button', showClose]"
          @click.prevent="query = ''" @focus="onFocus" @blur="onBlur"
        ><md-icon>close</md-icon></button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ui-search',
  data() {
    return {
      query: '',
    }
  },
  computed: {
    showClose() {
      return this.query !== '' ? 'show-close' : ''
    }
  },
  methods: {
    onFocus() {
      this.$refs.form.classList.add('focused')
      this.$refs.input.focus()
    },
    onBlur() {
      this.$refs.form.classList.remove('focused')
    },
  }
}
</script>

<style lang="scss">
.ui-search {
  display: inline-block;
  padding-left: 24px;
  vertical-align: middle;
  color: white;
  box-sizing: border-box;
  flex: 1;

  .ui-search-form {
    background: rgba(255,255,255,0.16);
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 4px;
    max-width: 720px;
    position: relative;
    transition: background 100ms ease-in, width 100ms ease-out;

    .input-container {
      height: 46px;
      display: flex;

      input {
        color: rgba(255,255,255,0.7);
        border: none;
        font: normal 16px Roboto,sans-serif;
        height: 24px;
        outline: none;
        padding: 11px 0 11px 16px;
        width: 100%;
        background: transparent;
        box-sizing: content-box;
        flex: 1;

        &::-webkit-input-placeholder {
          color: rgba(255,255,255,0.7);
        }
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0 4px;
        line-height: 0;
        flex: 0;

        i {
          padding: 7px;
          margin: 4px;
          color: white;
          opacity: 1;
          height: 24px;
          width: 24px;
          box-sizing: content-box;
        }

        &.ui-close-button {
          display: none;
          &.show-close {
            display: flex;
          }
        }
      }

    }

    &.focused {
      border: 1px solid rgba(0,0,0,.12);
      background: rgba(255,255,255,1);
      box-shadow: 0 1px 1px rgba(0,0,0,.24);

      .input-container {
        button i {
          color: black;
          opacity: 0.54;
        }

        button:hover i {
          opacity: 1;
        }

        input {
        color: black;
        opacity: 1;

        &:-moz-placeholder {
          color: rgba(0,0,0,0.54);
        }

        &::-webkit-input-placeholder {
          color: rgba(0,0,0,0.54);
        }
      }
      }
    }
  }
}
</style>
