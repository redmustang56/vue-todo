<template>
    <div class="container">
        <div class="task">
            <h1>Задачи</h1>
            <taskAdd @addTask="addTask"/>

            <div class="task__bl">
                <h2>Список задач</h2>
                <div class="sort" :class="isSortActive ? 'active' : ''" @click="sortList"></div>
            </div>

            <loader v-if="loading" />

            <div class="task__l" v-else>
                <div class="task__i"
                     v-for="(task, index) in paginatedList"
                     :key="task.key"
                     :class="task.status === true ? 'active' : ''"
                >
                    <div class="check" @click="taskDone(task)" :class="task.status ? 'active' : ''"></div>
                    <div class="task__i-title">{{ index + 1 }}) {{ task.title }}</div>
                    <router-link :to="{name: 'taskEdit', params: { id: task.id }}" class="task__i-edit"></router-link>
                    <div class="task__i-del" @click="taskDelete(task.id)"></div>
                </div>
            </div>

            <pagination :pages="pages" :pageNumber="pageNumber" @pageClick="pageClick"/>

        </div>
    </div>
</template>

<script>
    import taskAdd from '@/components/task/TaskAdd'
    import pagination from '@/components/paginate'
    import loader from '@/components/loader'
    import { db } from '../db'

    export default {
        name: "TaskList",
        data: () => ({
            isSortActive: false,
            taskPage: 10,
            pageNumber: 1,
            taskList: [],
            loading: true,
            status: false
        }),
        components: {
            taskAdd,
            pagination,
            loader
        },
        computed: {
            pages() {
                return Math.ceil(this.taskList.length / 10)
            },
            paginatedList() {
                let pageNumberRoute = Number(this.$route.params.id)
                this.pageNumber = pageNumberRoute

                let from = (this.pageNumber - 1) * this.taskPage,
                    to = from + this.taskPage;

                return this.$store.state.taskList.slice(from, to)
            },
        },
        methods: {
            async taskDelete(payload) {
                await this.$store.dispatch("deleteTask", payload);
            },
            async taskDone(payload) {
                this.status = !this.status
                payload.status = this.status
                await this.$store.dispatch("taskDone", payload);
            },
            async addTask(formData) {
                if(this.$route.params.id != 1) {
                    await this.$store.dispatch("addTask", formData)
                    await this.$router.push('/task/page/1');
                } else {
                    await this.$store.dispatch("addTask", formData)
                }
            },
            async pageClick(page) {
                this.pageNumber = page
            },
            sortList() {
                this.isSortActive = !this.isSortActive
                this.paginatedList.reverse()
            },
        },
        async created() {
            await this.$store.dispatch("bindTaskList");
            this.taskList = this.$store.state.taskList
            this.loading = false
        },
    }
</script>

<style lang="scss" scoped>
    .check {
        position: relative;
        display: block;
        transform: scale(var(--ggs,1));
        width: 22px;
        height: 22px;
        border: 2px solid;
        border-radius: 100px;
        cursor: pointer;
        &.active {
            &:before {
                content: "";
                display: block;
                box-sizing: border-box;
                position: absolute;
                left: 3px;
                top: -1px;
                width: 6px;
                height: 10px;
                border-color: currentColor;
                border-width: 0 2px 2px 0;
                border-style: solid;
                transform-origin: bottom left;
                transform: rotate(45deg)
            }
        }
    }
    .sort {
        position: relative;
        transform: scale(var(--ggs, 1));
        width: 40px;
        height: 40px;
        border: 2px solid transparent;
        border-radius: 100px;
        cursor: pointer;

        &:after {
            content: "";
            display: block;
            position: absolute;
            width: 10px;
            height: 10px;
            border-bottom: 2px solid;
            border-right: 2px solid;
            transform: rotate(45deg);
            left: 4px;
            top: 2px;
        }

        &.active {
            &:after {
                transform: rotate(-135deg);
                top: 7px;
            }
        }
    }

    .task {
        &__bl {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__l {

        }

        &__i {
            display: grid;
            grid-template-columns: 30px auto 50px 50px;
            grid-template-rows: 60px;
            align-items: center;
            background: #fff;
            box-shadow: 0 0 10px rgba(209, 220, 236, .5);
            padding: 0 15px;
            border-radius: 5px;
            margin-bottom: 15px;
            transition: all ease .3s;

            &:hover {
                box-shadow: 0 10px 30px #d1dcec;
            }

            &-title {
                font-size: 18px;
                font-weight: 400;
                text-align: left;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            &.active {
                background: #edf9e5;
                .task__i-title {
                    color: #87da55;
                }
            }


            &-edit {
                position: relative;
                display: block;
                transform: rotate(-45deg) scale(var(--ggs, 1));
                width: 14px;
                height: 4px;
                border-right: 2px solid transparent;
                box-shadow: 0 0 0 2px,
                inset -2px 0 0;
                border-top-right-radius: 1px;
                border-bottom-right-radius: 1px;
                margin: 0 auto;
                cursor: pointer;

                &:after, &:before {
                    content: "";
                    display: block;
                    position: absolute;
                }

                &:before {
                    background: currentColor;
                    border-left: 0;
                    right: -6px;
                    width: 3px;
                    height: 4px;
                    border-radius: 1px;
                    top: 0;
                }

                &:after {
                    width: 8px;
                    height: 7px;
                    border-top: 4px solid transparent;
                    border-bottom: 4px solid transparent;
                    border-right: 7px solid;
                    left: -11px;
                    top: -2px;
                }
            }

            &-del {
                position: relative;
                display: block;
                transform: scale(var(--ggs, 1));
                width: 22px;
                height: 22px;
                border: 2px solid;
                border-radius: 4px;
                transition: all ease .3s;
                cursor: pointer;
                margin: 0 auto;

                &:after,
                &:before {
                    content: "";
                    display: block;
                    position: absolute;
                    width: 12px;
                    height: 2px;
                    background: currentColor;
                    transform: rotate(45deg);
                    border-radius: 5px;
                    top: 8px;
                    left: 3px;
                    transition: all ease .3s;
                }

                &:after {
                    transform: rotate(-45deg)
                }

                &:hover {
                    border: 2px solid #ef5436;

                    &:after, &:before {
                        background: #ef5436;
                    }
                }
            }
        }
    }
</style>