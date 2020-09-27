<template>
    <div class="task__add">
        <h2>Добавить задачу</h2>
        <form @submit.prevent="addTask">
            <textarea v-model="title" placeholder="Добавить задачу" required  @keyup.enter="onEnter"></textarea>
            <button class="btn" type="submit">Добавить задачу</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "TaskAdd",
        data: () => ({
            title: ''
        }),
        methods: {
            async addTask() {
                let date = new Date;

                const formData = {
                    key: date.getTime(),
                    status: false,
                    title: this.title
                }
                this.$emit("addTask", formData)
                this.title = ''
            },
            onEnter() {
                this.addTask()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .task {
        &__add {
            margin-bottom: 30px;
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