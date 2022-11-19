<template>
	<div>
		<Form label-position="left">
			<FormItem prop="user">
				<label style="color: white">Link:</label>
				<Input type="text" label="Link" v-model="link" placeholder="Username">
				</Input>
			</FormItem>
			<FormItem prop="user">
				<label style="color: white"
					>Use the code in order to embed your form:</label
				>
				<Input
					type="textarea"
					:rows="4"
					label="Link"
					v-model="code"
					placeholder="Username"
				>
				</Input>
			</FormItem>

			<!-- <FormItem prop="user">
				<label style="color: white">Component</label>
				<Input type="textarea" v-model="component" placeholder="Username">
				</Input>
			</FormItem>
			<FormItem prop="user">
				<label style="color: white">Script</label>
				<Input type="textarea" v-model="script" placeholder="Username"> </Input>
			</FormItem> -->
		</Form>
	</div>
</template>

<script>
import Repository from '../../repository/repoFactory'
const testRepo = Repository.get('test')
export default {
	name: 'Share',
	data() {
		return {
			activeCollapse: ['appearance'],
			borderWidthOptions: [
				{
					value: 'thin',
					label: 'Thin',
				},
				{
					value: 'medium',
					label: 'Medium',
				},
				{
					value: 'thick',
					label: 'Thick',
				},
			],
			fontOptions: [
				{
					label: 'Sans Serif',
					options: [
						{
							value: 'Arial',
							label: 'Arial',
						},
						{
							value: 'Arial Black',
							label: 'Arial Black',
						},
						{
							value: 'Tahoma',
							label: 'Tahoma',
						},
						{
							value: 'Trebuchet MS',
							label: 'Trebuchet MS',
						},
						{
							value: 'Verdana',
							label: 'Verdana',
						},
					],
				},
				{
					label: 'Serif ',
					options: [
						{
							value: 'Georgia',
							label: 'Georgia',
						},
						{
							value: 'Times',
							label: 'Times',
						},
						{
							value: 'Times New Roman',
							label: 'Times New Roman',
						},
					],
				},
				{
					label: 'Monospace',
					options: [
						{
							value: 'Courier',
							label: 'Courier',
						},
						{
							value: 'Courier New',
							label: 'Courier New',
						},
					],
				},
			],
			colors: null,
			isLoading: false,
			urlInput: 'https://www.',
			code: '<link href="./dist/css/app.72c6d56d.css" rel="stylesheet" /> <vue-widget id="app" title="Vuidget live example"></vue-widget> <script src="/dist/js/app.5f7f7a99.js" />',
		}
	},

	computed: {
		// model(){
		//     return '<link>'
		// },
		themingVars() {
			return this.$store.state.themingVars
		},
		extractedColors() {
			return this.$store.getters.extractedColors
		},
		link() {
			return 'url/' + this.$route.params.id
		},
	},

	// async fetch() {
	// 	this.items = await fetch('http://localhost:3333/extractTest').then((res) =>
	// 		res.json()
	// 	)
	// },
	methods: {
		// async testExtract() {
		// 	// Loader Start
		// 	this.$Loading.start()
		// 	this.$vs.loading({
		// 		background: 'rgba(28, 28, 28, 0.6)',
		// 	})

		// 	const { colors } = await fetch('http://localhost:3333/extractCss').then(
		// 		(res) => res.json()
		// 	)
		// 	this.$store.dispatch('saveExtractColors', colors)

		// 	// Loader End
		// 	this.$Loading.finish()
		// 	this.$vs.loading.close()
		// },
		async testExtract() {
			try {
				this.$Loading.start()
				this.$vs.loading({
					background: 'rgba(28, 28, 28, 0.6)',
				})
				const { data } = await testRepo.extractCss({ url: this.urlInput })
				this.$store.dispatch('saveExtractColors', data.colors)
			} catch (e) {
				console.log(e)

				this.$Loading.finish()
				this.$vs.loading.close()
			}

			this.$Loading.finish()
			this.$vs.loading.close()
		},
	},
}
</script>

<style lang="scss">
.ivu-color-picker-confirm {
	& .ivu-btn-default {
		& > span {
			display: none;
		}

		&:after {
			content: 'Clear';
		}
	}

	& .ivu-btn-primary {
		& > span {
			display: none;
		}

		&:after {
			content: 'Select';
		}
	}
}
</style>
