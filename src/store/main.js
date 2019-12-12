export default {

    state: {
        message: null,
        search: null,
        priorities: ['low', 'middle', 'important']

    },
    getters: {
        // Сообщение об ошибке
        getMessage(state) {
            return state.message;
        },
        // Поиск по строке
        getSearch(state) {
            return state.search;
        },
        getPriorities(state) {
            return state.priorities;
        }

    },

    mutations: {
        // Сообщение об ошибке
        setMessage(state, payload) {
            state.message = payload;
        },

        // Поиск по строке
        setSearch(state, search) {
            state.search = search
        }
    },


    actions: {
        // Поиск по строке
        setSearch({commit}, payload) {
            commit("setSearch", payload)
        }
    }
}