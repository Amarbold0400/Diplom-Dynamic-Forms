<template>
	<div>
		<Form label-position="left">
			<Collapse v-model="activeCollapse" accordion>
				<!-- Appearance -->
				<Panel>
					Custom Colors
					<div slot="content">
						<Form>
							<FormItem label="Extract Colors From A Site">
								<Input v-model="urlInput" placeholder="Enter URL..."></Input>
								<Button class="mr-tn" @click="testExtract">Extract</Button>
								<ColorPicker
									class="mt-tn"
									v-model="themingVars.globalFontColor"
									:colors="extractedColors"
								/>
							</FormItem>
						</Form>
					</div>
				</Panel>
				<Panel>
					Appearance
					<div slot="content">
						<Form>
							<!-- <FormItem label="Font Family">
							<i-select
								v-model="themingVars.globalFontFamily"
								placeholder="Select font family"
							>
								<Dropdown>
									<DropdownMenu slot="list">
										<DropdownItem
											v-for="group in fontOptions"
											:key="group.label"
											:label="group.label"
											>{{ group }}</DropdownItem
										>
									</DropdownMenu>
								</Dropdown>
							</i-select>
						</FormItem> -->

							<FormItem label="Font Size">
								<InputNumber
									v-model="themingVars.globalFontSize"
									:min="0"
									:max="50"
								></InputNumber>
							</FormItem>

							<FormItem label="Background Color">
								<ColorPicker
									v-model="themingVars.globalBackgroundColor"
									:colors="extractedColors"
								/>
							</FormItem>

							<FormItem label="Color">
								<ColorPicker
									v-model="themingVars.globalFontColor"
									:colors="extractedColors"
								/>
							</FormItem>

							<FormItem label="Link Color">
								<ColorPicker
									v-model="themingVars.globalLinkColor"
									:colors="extractedColors"
								/>
							</FormItem>
						</Form>
					</div>
				</Panel>

				<!-- Inputs -->
				<Panel>
					Inputs
					<div slot="content">
						<FormItem label="Border radius">
							<InputNumber
								v-model="themingVars.inputBorderRadius"
								:min="0"
								:max="50"
							></InputNumber>
						</FormItem>

						<FormItem label="Border color">
							<ColorPicker
								v-model="themingVars.inputBorderColor"
								:colors="extractedColors"
							/>
						</FormItem>

						<FormItem label="Hover Border color">
							<ColorPicker
								v-model="themingVars.inputHoverBorderColor"
								:colors="extractedColors"
							/>
						</FormItem>

						<FormItem label="Focus Border color">
							<ColorPicker
								v-model="themingVars.inputFocusBorderColor"
								:colors="extractedColors"
							/>
						</FormItem>

						<FormItem label="Shadow color">
							<ColorPicker
								v-model="themingVars.inputShadowColor"
								:colors="extractedColors"
							/>
						</FormItem>
					</div>
				</Panel>

				<!-- Labels -->
				<Panel title="Labels" name="labels">
					Labels
					<div slot="content">
						<FormItem label="Color">
							<ColorPicker
								v-model="themingVars.primaryColor"
								:colors="extractedColors"
							/>
						</FormItem>

						<FormItem label="Font weight">
							<RadioGroup
								v-model="themingVars.labelFontWeight"
								type="button"
								button-style="solid"
							>
								<Radio label="Normal"></Radio>
								<Radio label="Bold"></Radio>
							</RadioGroup>
						</FormItem>

						<FormItem label="Font size">
							<InputNumber
								v-model="themingVars.labelFontSize"
								:min="1"
								:max="50"
							></InputNumber>
						</FormItem>

						<FormItem label="Margin bottom">
							<InputNumber
								v-model="themingVars.labelMarginBottom"
								:min="0"
								:max="50"
							></InputNumber>
						</FormItem>
					</div>
				</Panel>

				<!-- Help block -->
				<Panel title="Help Text" name="helptext">
					Help Text
					<div slot="content">
						<FormItem label="Color">
							<ColorPicker
								v-model="themingVars.helpTextColor"
								:colors="extractedColors"
							/>
						</FormItem>

						<FormItem label="Font size">
							<InputNumber
								v-model="themingVars.helpTextFontSize"
								:min="1"
								:max="50"
							></InputNumber>
						</FormItem>

						<FormItem label="Margin top">
							<InputNumber
								v-model="themingVars.helpTextMarginTop"
								:min="0"
								:max="50"
							></InputNumber>
						</FormItem>
					</div>
				</Panel>

				<!-- Buttons -->
				<Panel title="Buttons" name="buttons">
					Buttons
					<div slot="content">
						<FormItem label="Background">
							<ColorPicker
								v-model="themingVars.buttonBackground"
								:colors="extractedColors"
							/>
						</FormItem>

						<FormItem label="Border color">
							<ColorPicker
								v-model="themingVars.buttonBorderColor"
								:colors="extractedColors"
							/>
						</FormItem>

						<FormItem label="Color">
							<ColorPicker
								v-model="themingVars.buttonColor"
								:colors="extractedColors"
							/>
						</FormItem>
					</div>
				</Panel>
			</Collapse>
		</Form>
	</div>
</template>

<script>
import Repository from '../../repository/repoFactory'
const testRepo = Repository.get('test')
export default {
	name: 'Design',
	data() {
		return {
			activeCollapse: ['appearance'],
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
		}
	},
	computed: {
		themingVars() {
			return this.$store.state.themingVars
		},
		extractedColors() {
			return this.$store.getters.extractedColors
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
				console.log(data.colors)
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

<style lang="scss"></style>
