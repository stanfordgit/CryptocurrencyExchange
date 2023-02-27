<template>
  <div class="main">
    <CurrencyExchange />
    <CurrencyRate />
    <button class="h-button" @click="openPopUp">Add new currency</button>
    <PopUp :opened="isPopUp" @closePopUp="closePopUp" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CurrencyExchange from '@/components/CurrencyExchange/CurrencyExchange.vue';
import CurrencyRate from '@/components/CurrencyRate/CurrencyRate.vue';
import PopUp from '@/components/PopUp.vue';

export default {
  name: 'App',
  data() {
    return { isPopUp: false };
  },
  methods: {
    closePopUp() {
      this.isPopUp = false;
    },
    openPopUp() {
      this.isPopUp = true;
    },
    ...mapActions(['loadCurrencyFromLocal'])
  },
  mounted() {
    this.loadCurrencyFromLocal();
  },
  components: { CurrencyExchange, CurrencyRate, PopUp }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  button {
    margin: 0 20px 20px;
    max-width: 450px;
  }
}
</style>
