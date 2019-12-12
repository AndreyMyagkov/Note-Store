<template>
    <div class="new-note">
        <div class="new-note__fields">
            <div class="new-note__title">
                <label for="">Title</label>
                <input type="text" v-model="note.title" />
            </div>
            <div class="new-note__priority">
                <label for="">priority</label>
                <select v-model="note.priority">
                    <option :value="priority" v-for="(priority, i) in priorities" :key="i">{{ priority }}</option>
                </select>
            </div>
        </div>
    <label for="">Description</label>
    <textarea name id cols="30" rows="10" v-model="note.descr"></textarea>
    <button class="btn btnPrimary" @click="addNote">New note</button>
    </div>
</template>

<script>
export default {

    data() {
        return {
            priorities: [],
        };
    },
    created(){
        this.priorities = this.$store.getters.getPriorities;
    },
    computed: {
        note(){
            return this.$store.getters.getEmptytNote
        }
    },
   
    methods:{
        addNote(){
            // Обработка ошибок
            if (!this.note.title) { 
                this.$store.commit('setMessage', 'Title can not be blank.');
                return false
            }
            
            this.$store.commit('setMessage', null);


            // Добавить заметку
            this.$store.dispatch("addNote", this.note);

            // Сброс полей
            this.$store.commit('setEmptyNote');


        }
    }
}
</script>

<style lang="scss">
    .new-note {
        text-align: center;
        margin-bottom: 20px;

    }
    .new-note__fields {
        display: flex;
        justify-content: space-between;
    }
    .new-note__title,
    .new-note__priority {
        flex: 1 1 48%;
        max-width: 48%;
    }
</style>