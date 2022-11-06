<template>
	<div class="el-tabs__inner">
		<Form
			:model="fieldProperties"
			:rules="rules"
			:label-position="labelPosition"
			ref="fieldProperties"
		>
			<FormItem label="Label" v-show="activeForm.hasOwnProperty('label')">
				<!-- <Input v-model="activeForm.label">{{ activeForm.label }}</Input> -->
				<Input
					v-show="activeForm.hasOwnProperty('label')"
					label="Label"
					v-model="activeForm.label"
					:placeholder="activeForm.label"
				/>
			</FormItem>

			<FormItem
				label="Placeholder"
				v-if="activeForm.hasOwnProperty('isPlaceholderVisible')"
			>
				<i-switch v-model="activeForm.isPlaceholderVisible"></i-switch>
				<Input
					class="mt-ten"
					v-show="activeForm.isPlaceholderVisible"
					v-model="activeForm.placeholder"
				>
					{{ activeForm.placeholder }}
				</Input>
			</FormItem>

			<FormItem
				label="Button text"
				v-show="activeForm.hasOwnProperty('buttonText')"
			>
				<Input v-model="activeForm.buttonText">
					{{ activeForm.buttonText }}
				</Input>
			</FormItem>

			<FormItem
				label="Code view"
				v-show="activeForm.hasOwnProperty('fieldText')"
			>
				<Input v-model="activeForm.fieldText" type="textarea" :rows="10">
					{{ activeForm.fieldText }}
				</Input>
			</FormItem>

			<FormItem
				label="Required field?"
				v-show="activeForm.hasOwnProperty('isRequired')"
			>
				<i-switch v-model="activeForm.isRequired"></i-switch>
			</FormItem>

			<FormItem
				label="Helpblock"
				v-show="activeForm.hasOwnProperty('isHelpBlockVisible')"
			>
				<i-switch v-model="activeForm.isHelpBlockVisible"></i-switch>
				<Input
					class="mt-ten"
					v-show="activeForm.isHelpBlockVisible"
					v-model="activeForm.helpBlockText"
				>
					{{ activeForm.helpBlockText }}
				</Input>
			</FormItem>

			<FormItem label="Options" v-show="activeForm.options">
				<ul style="padding: 0">
					<li
						v-for="(item, index) in activeForm.options"
						:key="index"
						class="properties__optionslist"
					>
						<div class="row">
							<div class="col-md-9">
								<Input v-model="item.optionValue">{{ item.optionValue }}</Input>
							</div>
							<div class="col-md flex-line center">
								<Button
									class="width-100"
									@click="deleteOption(activeForm.options, index)"
									v-show="activeForm.options.length > 1"
								>
									<i
										class="isax isax-close-circle flex-line center"
										style="font-size: 20px"
									></i>
								</Button>
							</div>
						</div>
					</li>
				</ul>

				<Button class="mt-tn" @click="addOption(activeForm.options)">
					<i class="isax isax-add"></i>
					Add more
				</Button>
			</FormItem>
		</Form>
	</div>
</template>

<script>
export default {
	name: 'Properties',
	data() {
		return {
			labelPosition: 'top',
			fieldProperties: {},
			rules: {},
		}
	},
	computed: {
		forms() {
			return this.$store.state.forms
		},
		activeForm() {
			return this.$store.state.activeForm
		},
	},
	methods: {
		deleteOption(option, index) {
			this.$delete(option, index)
		},

		addOption(option) {
			let count = option.length + 1

			option.push({
				optionLabel: 'Option ' + count,
				optionValue: 'Option ' + count,
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.properties__optionslist {
	margin-bottom: 5px;
}
</style>
