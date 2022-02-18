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
        <div class="position-relative contents">
            <div v-show="errorMsg">
                <h6 class="text-info text-center">{{ errorMsg }}</h6>
            </div>
            <div v-if="searching"
                 class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center overlay">
                <svg width="3rem" height="3rem" class="spinner">
                    <circle cx="50%" cy="50%" r="30%"/>
                </svg>
            </div>
            <div v-show="showResult && !errorMsg">
                <h6 v-show="searchResult.Name" class="text-black-50">{{ searchResult.Name }} ({{ searchResult.Symbol }})</h6>
                <div class="d-flex justify-content-start align-items-end mb-1 prices">
                    <h2 class="mr-3 mb-n1">{{ searchResult.LastPrice }}</h2>
                    <h5 class="mr-1 mb-0"
                        v-bind:class="[changeDrop ? 'text-danger' : 'text-success']">{{ searchResult.Change }}</h5>
                    <h5 v-show="searchResult.ChangePercent" class="mb-0"
                        v-bind:class="[changeDrop ? 'text-danger' : 'text-success']">({{ searchResult.ChangePercent }})</h5>
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
        },

        changeDrop() {
            if (this.searchResult.Change) {
                return this.searchResult.Change.includes("-");
            }

            return false;
        }
    },

    methods: {
        async searchSecurity() {
            if (!this.searching) {
                this.searching = true;
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

    .contents {
        min-width: 5rem;
        min-height: 5rem;

	    .overlay {
            top: 0;
            left: 0;
		    background-color: rgba(255, 255, 255, .75);

		    .spinner {
			    fill: none;
			    stroke: #908F8F;
			    stroke-width: .25rem;
			    stroke-dasharray: 120;
			    stroke-dashoffset: 120;
			    stroke-linecap: round;
			    transform: rotateZ(-90deg);
			    animation: spin 1s linear infinite;
		    }
	    }

	    .timestamp {
		    font-size: 70%;
	    }
    }
}

@keyframes spin {
	35% {
		stroke-dashoffset: 50;
		transform: rotateZ(-80deg);
	}

	80% {
		stroke-dashoffset: 120;
		transform: rotateZ(275deg);
	}
}
</style>