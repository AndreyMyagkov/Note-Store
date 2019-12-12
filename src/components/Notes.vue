<template>
    <!-- note-list -->
    <div class="notes">
        <div class="note" 
            :class="[{ full: !grid}, 'priority_'+note.priority]" 
            v-for="(note, index) in notes"
            :key="index">

            <div class="note-header" :class="{ full: !grid}">
                
                <!-- title -->
                <div >
                    <div @click="editField(index, 'title')" v-if="editor.field!='title' || index!=editor.id">{{ note.title }}</div>
                    <input class="title__edit-area"
                        v-if="editor.field=='title' && index==editor.id"
                        v-model="editor.value"
                        @blur="saveField(index, 'title')"
                        v-on:keyup.enter="saveField(index, 'title')"
                        v-on:keyup.esc="rollbackField()"
                        v-focus
                    >
                    
                </div>

                <div style="cursor:pointer;" @click="removeNote(index)">x</div>
            </div>

            <!-- descr  -->
            <div class="note-body">
                <p @click="editField(index, 'descr')" v-if="editor.field!='descr' || index!=editor.id">{{note.descr}}</p>
                <input class="title__edit-area"
                    v-if="editor.field=='descr' && index==editor.id"
                    v-model="editor.value"
                    @blur="saveField(index, 'descr')"
                    v-on:keyup.enter="saveField(index, 'descr')"
                    v-on:keyup.esc="rollbackField()"
                    v-focus
                >
            </div>

            <!-- date  -->
            <div class="note-date">
                <p>{{note.date}}</p>
            </div>
        </div>
    </div>   
</template>

<script>
export default {
    props: {
        notes: {
            type: Array,
            required: true
        },
        grid: {
            type: Boolean,
            required: true            
        }
    },
    data (){
        return{
            editor: {           
                id: null,      // id редактируемой записи. Null - если ничего не радактируется
                field: '',     // Редактируемое поле
                value:''       // Новое значение поля
            }
        }
    },

    methods:{
        removeNote(index){
            this.$store.dispatch("removeNote", index);
        },

        /*
        * Активирует режим редактирования поля
        */
        editField(index, field){
            this.editor.id = index;
            this.editor.field = field;
            this.editor.value=this.notes[index][field];
        },

        /*
        * Сохраняет поле
        */
        saveField(index, field){
            // Нельзя сохранить пустой заголовок
            if (!this.editor.value.trim().length){
                this.rollbackField();
                return
            }
       
            this.rollbackField();
            this.$store.dispatch("editNote", {index, field, value:this.editor.value});
        },

        /*
        * Откатывает поле
        */
        rollbackField(){
            this.editor.id = null;
            this.editor.field = '';
        }

    },
    
    directives: {
        focus: {
            inserted: function(el) {
              el.focus();
            }
        }
    }


}
</script>

<style lang="scss">
    .notes {
        display:flex;
        align-items:  center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 40px 0;
    }
    .note {
        width: 48%;
        padding: 18px 20px;
        margin-bottom: 20px;
        background-color: #fff;
        transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
        box-shadow: 0 30px 30px rgba(0,0,0,0.02);
        &:hover{
            box-shadow: 0 30px 30px rgba(0,0,0,0.04);
            transform: translate(0, -6px);
            transition-delay: 0s !important;
        }
        &.full {
            width:100%;
            text-align: center;
        }
    }
    .priority_low{
        border:solid 2px #fff;
    }
    .priority_middle{
        border:solid 2px #f5b000;
    }
    .priority_important{
        border:solid 2px #e92b2b
    }
    .note-header {
        display:flex;
        align-items:  center;
        justify-content: space-between;
        margin-bottom: 30px;
        h1 {
            font-size :32px;
        }

        >div {
            color: #402caf;
            font-size: 20px;
        }

        svg {
            margin-right: 12px;
            color:#999;
            &:last-child {
                margin-right:0;
            }
            &.active {
                color:#402caf;
            }
        }
        &.full {
            justify-content: center;
            p{
                margin-right: 16px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
    .note-body {
        margin-bottom: 30px;
        p{
            font-size: 18px;
            color:#333;
           
        }
        
    }

    .note-date {
        p{
            font-size: 14px;
            color:#999;
        }
        
    }
    .title__edit-area {
        padding:0;
        margin:0;
        border-radius:3px;
        padding: 0 0.25em;
        height: 28px;
        font-size: 16px;
    }

</style>