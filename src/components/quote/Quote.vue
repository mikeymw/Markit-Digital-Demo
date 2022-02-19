<template>
    <div>
        <h6 v-show="name" class="text-black-50">{{ name }} ({{ symbol }})</h6>
        <div class="d-flex justify-content-start align-items-end mb-1 prices">
            <h2 class="mr-3 mb-n1">{{ lastPrice }}</h2>
            <h5 class="mr-1 mb-0"
                v-bind:class="[changeDrop ? 'text-danger' : 'text-success']">{{ change }}</h5>
            <h5 v-show="changePercent" class="mb-0"
                v-bind:class="[changeDrop ? 'text-danger' : 'text-success']">({{ changePercent }})</h5>
        </div>
        <p class="text-grey font-weight-custom timestamp">{{ timestamp }}</p>
        <hr class="bg-light mt-2 mb-1">
        <div v-for="{ key, value } in quoteDetails" v-bind:key="key">
            <div class="d-flex justify-content-between align-items-center px-1">
                <small class="text-grey font-weight-custom">{{ key }}</small>
                <small class="font-weight-bold">{{ value }}</small>
            </div>
            <hr class="bg-light my-1">
        </div>
    </div>
</template>

<script>
export default {
    name: "Quote",

    props: {
        name: {
            type: String,
        },

        symbol: {
            type: String,
        },

        lastPrice: {
            type: String,
        },

        change: {
            type: String,
        },

        changePercent: {
            type: String,
        },

        timestamp: {
            type: String,
        },

        quoteDetails: {
            type: Array,
        },

        changeDrop: {
            type: Boolean,
        },
    },
}
</script>

<style lang="scss" scoped>
.font-weight-custom {
	font-weight: 500;
}

.timestamp {
	font-size: 70%;
}
</style>