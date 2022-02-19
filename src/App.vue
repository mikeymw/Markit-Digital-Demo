<template>
    <div id="app">
        <quote-wrapper></quote-wrapper>
    </div>
</template>

<script>
import QuoteWrapper from "@/views/QuoteWrapper";

export default {
    components: {
        QuoteWrapper,
    }
}
</script>

<style lang="scss">
$theme-colors: (
    "grey": #B3B3B3,
);
@import "~bootstrap/scss/bootstrap";
@import "~bootstrap-vue/src/index";

html,
body {
	margin: 0;
	background-color: #FFFFFF;
	font-family:
			-apple-system,
			BlinkMacSystemFont,
			Segoe UI,
			Roboto,
			Helvetica Neue,
			Arial,
			"Microsoft JhengHei",
			sans-serif,
			Apple Color Emoji,
			Segoe UI Emoji,
			Segoe UI Symbol,
			Noto Color Emoji;
}
</style>
