<template>
    <div id="content-form">
        <form novalidate @submit.prevent="validateContent">
            <md-card>
                <md-card-header>
                    <div class="md-title">Content to curate</div>
                    <div class="md-subhead">Set an URL and format how you want to highlight its content in your email.
                    </div>
                </md-card-header>

                <md-card-content>
                    <md-field :class="getValidationClass('url')">
                        <label for="content-form-url">url</label>
                        <md-input type="url" name="url" id="content-form-url" v-model="form.url"/>
                        <span class="md-error" v-if="!$v.form.url.required">The url is required</span>
                        <span class="md-error" v-else-if="!$v.form.url.url">Invalid url</span>
                    </md-field>

                    <md-field :class="getValidationClass('title')">
                        <label for="content-form-title">Title</label>
                        <md-input name="title" id="content-form-title" v-model="form.title"/>
                        <span class="md-error" v-if="!$v.form.title.required">The title is required</span>
                    </md-field>

                    <md-field>
                        <label for="content-form-description">Description</label>
                        <md-textarea name="description" id="content-form-description" v-model="form.description"
                                     md-autogrow></md-textarea>
                    </md-field>
                </md-card-content>

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="this.$v.$invalid">Add to email</md-button>
                </md-card-actions>
            </md-card>
        </form>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, url} from 'vuelidate/lib/validators'

    export default {
        name: 'ContentForm',
        mixins: [validationMixin],
        data: () => ({
            form: {
                url: null,
                title: null,
                description: null
            },
            userSaved: false,
            sending: false,
            lastUser: null
        }),
        validations: {
            form: {
                url: {
                    required,
                    url
                },
                title: {
                    required
                }
            }
        },
        methods: {
            getValidationClass(fieldName) {
                const field = this.$v.form[fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            clearForm() {
                this.$v.$reset()
                this.form.url = null
                this.form.title = null
                this.form.description = null
            },
            saveContent() {
                this.$emit('add-to-email', {url: this.form.url, title: this.form.title})
                this.clearForm()
            },
            validateContent() {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.saveContent()
                }
            }
        }
    }
</script>

<style scoped>
    #content-form {
        margin-bottom: 20px;
    }

    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px #424242 inset;
    }
</style>
