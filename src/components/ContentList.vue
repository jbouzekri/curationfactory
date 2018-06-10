<template>
    <div>
        <md-card>
            <md-card-header>
                <div class="md-title">Content list in the email</div>
                <div class="md-subhead" v-if="contentList.length > 1">Drag and drop the items to reorganize the email
                </div>
            </md-card-header>

            <md-card-content>
                <draggable v-model="contentList" element="md-list" @end="onEnd" :options="dragOptions"
                           v-if="contentList.length > 0">
                    <md-list-item v-for="item in contentList" :key="item.id">
                        <span class="md-list-item-text">
                            <span><a :href="item.url" target="_blank">{{item.title}}</a></span>
                            <p v-if="item.description">{{item.description}}</p>
                        </span>
                        <md-button class="md-icon-button md-list-action">
                            <md-icon class="md-primary">drag_indicator</md-icon>
                        </md-button>
                    </md-list-item>
                </draggable>
                <span v-if="contentList.length === 0">You have not added any content yet. Use the form above to add one.</span>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        name: 'ContentList',
        components: {
            draggable
        },
        props: ['contents'],
        data: () => ({
            contentList: [],
            dragOptions: {
                handle: ".md-list-action"
            }
        }),
        watch: {
            contents: function (val) {
                this.contentList = val
            }
        },
        methods: {
            onEnd: function () {
                this.$emit('list-sorted', this.contentList)
            }
        }
    }
</script>

<style>
</style>
