export default {
    state: {
        notes: [{
                title: "First note",
                descr: "descripption for first note",
                date: new Date(Date.now()).toLocaleString(),
                priority: "low"
            },
            {
                title: "Second note",
                descr: "descripption for second note",
                date: new Date(Date.now()).toLocaleString(),
                priority: "middle"
            },
            {
                title: "Third note",
                descr: "descripption for third note",
                date: new Date(Date.now()).toLocaleString(),
                priority: "important"
            }
        ],
        note: {
            title: "",
            descr: "",
            priority: "low"
        }
    },
    getters: {
        getAllNotes(state) {
            return state.notes;
        },

        getEmptytNote(state) {
            return state.note
        },

        getNotesFiltered (state, getters) {
            
            if (!getters.getSearch) return state.notes;

            return state.notes.filter(function (item) {
                if (item.title.toLowerCase().indexOf(getters.getSearch) !== -1) {
                    return item
                }
            })
        }
    },
    mutations: {
        removeNote(state, noteIndx) {
            state.notes.splice(noteIndx, 1);
        },

        addNote(state, note) {
            state.notes.push({
                title: note.title,
                descr: note.descr,
                priority: note.priority,
                date: new Date(Date.now()).toLocaleString()
            });
        },

        setEmptyNote(state){
            state.note = {
                title: '',
                descr: '',
                priority: 'low'
            }
        },

        editNote(state, payload) {
            const note = state.notes[payload.index];
            note[payload.field] = payload.value;
            note.date = new Date(Date.now()).toLocaleString();
        }
    },

    actions: {
        removeNote({commit}, payload) {
            commit('removeNote', payload);
        },

        addNote({commit}, payload) {
            commit('addNote', payload);
        },

        editNote({commit}, payload) {
            commit('editNote', payload);
        }
     }
}