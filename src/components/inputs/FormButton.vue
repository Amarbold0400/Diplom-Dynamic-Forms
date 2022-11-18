<template>
	<div>
		<i-button class="form__button">{{ currentField.buttonText }}</i-button>
	</div>
</template>

<script>
export default {
	name: 'Button',
	props: ['currentField'],
}
</script>
