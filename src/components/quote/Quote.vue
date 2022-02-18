<template>
    <div class="quote mx-auto">
        <search-bar class="search-bar"
                    v-bind:form-id="'Search Security'"
                    v-bind:form-label="'Symbol Lookup'"
                    v-bind:input-placeholder="'Symbol Lookup'"
                    v-bind:search-keywords="searchKeywords"
                    v-on:search="searchSecurity"
                    v-model="searchKeywords"></search-bar>
        <hr class="bg-dark my-2">
        <div v-show="errorMsg">
            <h6 class="text-info text-center">{{ errorMsg }}</h6>
        </div>
        <div v-show="showResult && !errorMsg">
            <h6 v-show="searchResult.Name" class="text-black-50">{{ searchResult.Name }} ({{ searchResult.Symbol }})</h6>
            <div class="d-flex justify-content-start align-items-end mb-1 prices">
                <h2 class="mr-3 mb-n1">{{ searchResult.LastPrice }}</h2>
                <h5 class="text-success mr-1 mb-0">{{ searchResult.Change }}</h5>
                <h5 v-show="searchResult.ChangePercent" class="text-success mb-0">({{ searchResult.ChangePercent }})</h5>
            </div>
            <p class="text-grey font-weight-custom timestamp">{{ searchResult.Timestamp }}</p>
            <hr class="bg-light mt-2 mb-1">
            <div v-for="{ item, key } in detailItems" v-bind:key="item">
                <div class="d-flex justify-content-between align-items-center px-1">
                    <small class="text-grey font-weight-custom">{{ item }}</small>
                    <small class="font-weight-bold">{{ searchResult[key] }}</small>
                </div>
                <hr class="bg-light my-1">
            </div>
        </div>
    </div>
</template>

<script>
import SearchBar from "@/components/quote/SearchBar";
import fetchQuotes  from "@/api/quote/get";
import buildQuote from "@/util/format-quote";

export default {
    name: "Quote",

    components: {
        SearchBar,
    },

    data() {
        return {
            searchKeywords: "",
            searchResult: {},
            searching: false,
            errorMsg: "",
            detailItems: [
                { item: "Range", key: "Range" },
                { item: "Open", key: "Open" },
                { item: "Volume", key: "Volume" },
                { item: "Market Cap", key: "MarketCap" },
            ]
        }
    },

    computed: {
        showResult() {
            const length = Object.keys(this.searchResult).length;
            return !!length;
        }
    },

    methods: {
        async searchSecurity() {
            if (!this.searching) {
                let controller = new AbortController();

                setTimeout(() => {
                    if (controller) {
                        controller.abort();
                    }
                }, 2000);

                try {
                    const data = await fetchQuotes(this.searchKeywords, controller);
                    this.searchResult = buildQuote(data);
                    this.errorMsg = "";
                    this.searching = false;
                    controller = null;
                } catch ({ Message }) {
                    this.errorMsg = Message ? Message : "Something went wrong, please try again";
                    this.searching = false;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.quote {
    width: 20rem;
    max-width: 100%;

    .font-weight-custom {
        font-weight: 500;
    }

    .search-bar {
        width: 60%;
    }

    .timestamp {
        font-size: 70%;
    }
}
</style>