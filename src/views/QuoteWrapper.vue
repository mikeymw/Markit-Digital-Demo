<template>
    <div class="mx-auto my-5 home">
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
            <quote v-show="showResult && !errorMsg"
                   v-bind:name="searchResult.Name"
                   v-bind:symbol="searchResult.Symbol"
                   v-bind:last-price="searchResult.LastPrice"
                   v-bind:change="searchResult.Change"
                   v-bind:change-percent="searchResult.ChangePercent"
                   v-bind:timestamp="searchResult.Timestamp"
                   v-bind:quote-details="searchResult.quoteDetails"
                   v-bind:change-drop="changeDrop"
            ></quote>
        </div>
    </div>
</template>

<script>
import SearchBar from "@/components/quote/SearchBar";
import Quote from "@/components/quote/Quote";
import fetchQuotes  from "@/api/quote/get";
import buildQuote from "@/util/format-quote";

export default {
    name: "QuoteWrapper",

    components: {
        SearchBar,
        Quote,
    },

    data() {
        return {
            searchKeywords: "",
            searchResult: {},
            searching: false,
            errorMsg: "",
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
.home {
	width: 20rem;
	max-width: 100%;


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