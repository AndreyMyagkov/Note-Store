import Vue from "vue";
import Vuex from "vuex";
import notes from "./notes";
import main from "./main";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        notes,
        main
    }
});