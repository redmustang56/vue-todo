<template>
    <div class="container">
        <loader v-if="loading" />
        <form v-else class="task__edit" @submit.prevent="editTask">
            <h2>Редактировать задачу</h2>

            <textarea v-model="taskList.title" placeholder="Редактировать задачу" required  @keyup.enter="onEnter"></textarea>
            <button class="btn" type="submit">Сохранить</button>

        </form>
    </div>
</template>

<script>
    import loader from '@/components/loader'
    import { db } from '../db'

    export default {
        name: "Task",
        data: () => ({
            title: '',
            loading: true,
            taskList: [],
        }),
        components: {
            loader
        },
        methods: {
            async editTask () {
                const updateRef = await db.collection('tasklist').doc(this.$route.params.id)
                updateRef.set({
                    title: this.taskList.title,
                    status: this.taskList.status
                })
                await this.$router.push('/task/page/1');
            },
            onEnter() {
                this.addTask()
            }
        },
        async created () {
            const ref = db.collection('tasklist').doc(this.$route.params.id);
            ref.get().then((doc) => {
                if (doc.exists) {
                    this.taskList = doc.data();
                    this.loading = false
                }
            });
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        padding: 80px 15px;
        @media(max-width: 767px) {
            padding: 30px 10px;
        }
    }
    .task {
        &__edit {
            margin: 30px 0;
            box-shadow: 0 0 10px rgba(209, 220, 236, 0.5);
            border-radius: 5px;
            padding: 30px 35px;

            @media(max-width: 767px) {
                padding: 20px 15px;
            }
            h2 {
                text-align: left;
            }
            form {
                display: flex;
                flex-direction: column;
            }
            textarea {
                min-height: 120px;
                max-height: 120px;
                border-radius: 5px;
                padding: 10px 15px;
                resize: none;
                margin: 0;
                font-size: 16px;
                outline: none;
            }
            .btn {
                margin: 30px 0;
                max-width: 300px;
            }
        }
    }
</style>