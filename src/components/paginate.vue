<template>
    <div class="pg">
        <router-link class="page"
             v-for="(page, index) in pages"
             :key="page"
             :to="{taskList: 'taskEdit', params: { id: page }}"
             @click="pageClick(page)"
             :class="page === pageNumber ? 'active' : ''"
        >
            {{ page }}
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "paginate",
        props: {
            pages: {
                type: Number,
                default: 1
            },
            pageNumber: {
                type: Number,
                default: 1
            }
        },
        data: () => ({

        }),
        methods: {
            pageClick(page) {
                this.$emit('pageClick', page)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .pg {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 25px;
        padding: 10px 0;
    }
    .page {
        padding: 10px;
        cursor: pointer;
        transition: all ease .3s;
        min-width: 30px;
        min-height: 20px;
        margin: 0 5px;
        border-radius: 5px;
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);

        &:hover {
            background: #efefef;

        }
        &.active {
            background: #22a8e8;
            color: #fff;
        }
    }
</style>