<template>
	<div>
		<Form label-position="left">
			<Collapse v-model="activeCollapse" accordion>
				<!-- Appearance -->
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
								<ColorPicker v-model="themingVars.globalBackgroundColor" />
							</FormItem>

							<FormItem label="Color">
								<ColorPicker v-model="themingVars.globalFontColor" />
							</FormItem>

							<FormItem label="Link Color">
								<ColorPicker v-model="themingVars.globalLinkColor" />
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
							<ColorPicker v-model="themingVars.inputBorderColor" />
						</FormItem>

						<FormItem label="Hover Border color">
							<ColorPicker v-model="themingVars.inputHoverBorderColor" />
						</FormItem>

						<FormItem label="Focus Border color">
							<ColorPicker v-model="themingVars.inputFocusBorderColor" />
						</FormItem>

						<FormItem label="Shadow color">
							<ColorPicker v-model="themingVars.inputShadowColor" />
						</FormItem>
					</div>
				</Panel>

				<!-- Labels -->
				<Panel title="Labels" name="labels">
					Labels
					<div slot="content">
						<FormItem label="Color">
							<ColorPicker v-model="themingVars.primaryColor" />
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
							<ColorPicker v-model="themingVars.helpTextColor" />
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
							<ColorPicker v-model="themingVars.buttonBackground" />
						</FormItem>

						<FormItem label="Border color">
							<ColorPicker v-model="themingVars.buttonBorderColor" />
						</FormItem>

						<FormItem label="Color">
							<ColorPicker v-model="themingVars.buttonColor" />
						</FormItem>
					</div>
				</Panel>
			</Collapse>
		</Form>
	</div>
</template>

<script>
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
		}
	},
	computed: {
		themingVars() {
			return this.$store.state.themingVars
		},
	},
}
</script>

<style lang="scss"></style>
