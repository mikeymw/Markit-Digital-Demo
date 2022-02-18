<template>
    <div>
        <form v-bind:id="formId" v-on:submit.prevent="$emit('search')">
            <b-form-group label-sr-only v-bind:label="formLabel" v-bind:label-for="`${formId}-Input`">
                <b-input-group size="sm">
                    <b-form-input type="text" class="shadow-none"
                                  v-bind:id="`${formId}-Input`"
                                  v-bind:disabled="disabled"
                                  v-bind:placeholder="inputPlaceholder"
                                  v-bind:value="searchKeywords"
                                  v-on:update="$emit('input', $event)">
                    </b-form-input>
                    <b-input-group-append>
                        <button type="submit" class="btn btn-light border px-3 shadow-none" v-bind:disabled="disabled">
                            <font-awesome-icon v-bind:icon="['fas', 'magnifying-glass']"></font-awesome-icon>
                        </button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </form>
    </div>
</template>

<script>
import { BFormGroup, BFormInput, BInputGroup, BInputGroupAppend } from "bootstrap-vue";

export default {
    name: "SearchBar",

    components: {
        BFormGroup,
        BFormInput,
        BInputGroup,
        BInputGroupAppend,
    },

    props: {
        formId: {
            type: String,
            required: true,
        },

        formLabel: {
            type: String,
            required: true,
        },

        inputPlaceholder: {
            type: String,
            required: true,
        },

        disabled: {
            type: Boolean,
            default: false,
        },

        searchKeywords: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
.form-group {
    margin-bottom: .75rem;
}
</style>