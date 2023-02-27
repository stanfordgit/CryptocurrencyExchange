import { createStore } from 'vuex';

import exchange from './modules/exchange.store';

const store = createStore({
  modules: {
    exchange
  }
});

export default store;
