<template>
	<div class="create-form-container container width-100">
		<div class="create-form-content-wrapper">
			<div class="create-form-upper-content flex-line center mt-sm">
				<p class="create-form-upper-content-text">Choose Form Type</p>
			</div>
			<div class="create-form-main-content mt-sm">
				<FormTemplateCard type="blank" />
			</div>
		</div>
	</div>
</template>

<script>
import FormTemplateCard from '@/components/global/formTemplateCard.vue'
export default {
	components: {
		FormTemplateCard: FormTemplateCard,
	},
}
</script>

<style lang="scss">
.create-form-container {
	padding: 0 30px;
	& .create-form-content-wrapper {
		& .create-form-upper-content {
			& .create-form-upper-content-text {
				font-style: normal;
				font-weight: 500;
				font-size: 24px;
				line-height: 30px;
				color: white;
			}
		}
	}
}
</style>
