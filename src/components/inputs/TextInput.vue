<template>
	<div>
		<Input
			class="mt-ten mb-tn"
			:placeholder="
				currentField.isPlaceholderVisible ? currentField.placeholder : ''
			"
		>
		</Input>
	</div>
</template>

<script>
export default {
	name: 'TextInput',
	props: ['currentField'],
}
</script>
