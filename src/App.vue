<template>
    <div id="app">
        <md-toolbar class="main-header">
            <h3 class="md-title" style="flex: 1;">Curation Factory</h3>
            <md-button><md-icon>settings</md-icon> Settings</md-button>
            <md-button href="https://github.com/jbouzekri/curationfactory" target="_blank" class="md-icon-button">
                <md-icon md-src="/assets/icon-github.svg"></md-icon>
            </md-button>
        </md-toolbar>

        <div class="md-layout md-gutter md-alignment-center-center">
            <!-- centered block -->
            <div class="md-layout-item md-layout md-gutter md-size-80">

                <!-- left column -->
                <div class="md-layout-item md-layout md-gutter md-size-50">

                    <!-- form block -->
                    <div class="md-layout-item md-size-100">
                        <content-form v-on:add-to-email="addContentToEmail"></content-form>
                    </div>
                    <!-- /form block -->

                    <div class="md-layout-item md-size-100">
                        <content-list v-bind:contents="contents" v-on:list-sorted="onListSorted"></content-list>
                    </div>
                </div>
                <!-- /left block -->

                <!-- right column -->
                <div class="md-layout-item md-size-50">
                    Right Column
                </div>
                <!-- /right column -->
            </div>
            <!-- /centered block -->
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import ContentForm from './components/ContentForm.vue'
    import ContentList from "./components/ContentList";

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    export default {
        name: 'app',
        components: {
            ContentList,
            ContentForm,
            draggable
        },
        data: () => ({
            contents: [],
        }),
        computed: {
            dragOptions() {
                return {
                    handle: ".md-list-action"
                };
            }
        },
        methods: {
            addContentToEmail(content) {
                content.id = getRandomInt(100000)
                content.title += content.id
                this.contents.push(content)
            },
            onListSorted(sortedList) {
                this.contents = sortedList
            }
        }
    }
</script>

<style>
    #app {
        padding: 20px;
        width: 100vw;
        height: 100vh;
    }

    #app > .md-layout {
        height: 100%;
        width: 100%;
    }

    .main-header {
        margin: auto;
        max-width: 100%;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 3;
        transition: .3s cubic-bezier(.4,0,.2,1),box-shadow .4s cubic-bezier(.25,.8,.25,1) .1s;
        will-change: box-shadow,max-width,background-color;
    }
</style>
