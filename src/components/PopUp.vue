<template>
  <div class="pop-up" v-if="opened">
    <div class="pop-up__content content">
      <button type="button" @click="$emit('closePopUp')" class="content__close">
        <svg viewBox="0 0 30 30">
          <path
            d="M7 4a.995.995 0 0 0-.707.293l-2 2a.999.999 0 0 0 0 1.414L11.586 15l-7.293 7.293a.999.999 0 0 0 0 1.414l2 2a.999.999 0 0 0 1.414 0L15 18.414l7.293 7.293a.999.999 0 0 0 1.414 0l2-2a.999.999 0 0 0 0-1.414L18.414 15l7.293-7.293a.999.999 0 0 0 0-1.414l-2-2a.999.999 0 0 0-1.414 0L15 11.586 7.707 4.293A.996.996 0 0 0 7 4z"
          />
        </svg>
      </button>
      <div class="content__title">Name new currency</div>
      <div class="content__block block">
        <select class="h-select" v-model="selectedCurrency">
          <option v-for="(rate, currency) in searchResults" :value="currency" :key="currency">
            {{ currency }}
          </option>
        </select>
      </div>
      <div class="content__button button">
        <button type="button" @click="$emit('closePopUp')" class="button__cancel">
          <span>Cancel</span>
        </button>
        <button type="button" @click="addCurrency" class="button__add">
          <span>Add currency</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      selectedCurrency: 'AMD',
      searchResults: []
    };
  },
  methods: {
    hideAddCurrencyForm() {
      this.showForm = false;
      this.searchTerm = '';
      this.selectedCurrency = '';
      this.searchResults = [];
    },
    addCurrency() {
      this.addNewCurrency(this.selectedCurrency);
      this.$emit('closePopUp');
    },
    ...mapActions(['addNewCurrency'])
  },
  mounted() {
    axios
      .get(`https://api.coinbase.com/v2/exchange-rates`)
      .then((response) => {
        this.searchResults = response.data.data.rates;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  props: {
    opened: {
      type: Boolean,
      required: true
    }
  },
  emits: ['closePopUp']
};
</script>

<style lang="scss" scoped>
.pop-up {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 20;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  .pop-up__content {
    background-color: lightgray;
    border: 1px solid #888;
    position: relative;
    width: 500px;
    .content {
      &__close {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        right: -10px;
        top: -10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid $color-lightgray;
        background: white;
        svg {
          width: 20px;
          height: 20px;
        }
      }
      &__title {
        padding: 20px;
        font-weight: 600;
      }
      &__block {
        margin: 0 20px 20px;
      }
      &__button {
        display: flex;
        align-items: center;
        padding-right: 20px;
        justify-content: flex-end;
        height: 80px;
        gap: 30px;
        font-size: 14px;
        background: $color-green;
        .button__cancel {
          display: flex;
          justify-content: center;
          background: transparent;
          color: white;
          cursor: pointer;
        }
        .button__add {
          width: 130px;
          padding: 10px;
          display: flex;
          justify-content: center;
          border-radius: 20px;
          background: black;
          color: white;
          cursor: pointer;
        }
        span {
          text-transform: uppercase;
        }
      }
    }
  }
}
</style>
