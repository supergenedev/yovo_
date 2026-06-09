<script setup>
import { computed, useAttrs, useId } from 'vue'
import Button from './Button.vue'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  clearLabel: { default: 'Clear input' },
  clearable: { default: false },
  description: { default: undefined },
  disabled: { default: undefined },
  id: { default: undefined },
  inputClass: { default: '' },
  label: { default: undefined },
  labelPosition: { default: 'outside' },
  leadingIcon: { default: undefined },
  modelValue: { default: '' },
  onClear: { default: undefined },
  readOnly: { default: undefined },
  shape: { default: 'default' },
  size: { default: 'md' },
  state: { default: 'default' },
  style: { default: undefined },
  trailingIcon: { default: undefined },
  type: { default: 'text' },
})

const emit = defineEmits(['update:modelValue'])

const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)
const descriptionId = computed(() => props.description ? `${inputId.value}-description` : undefined)

const hasInsideLabel = computed(() => Boolean(props.label) && props.labelPosition === 'inside')
const hasOutsideLabel = computed(() => Boolean(props.label) && props.labelPosition === 'outside')
const hasFieldChrome = computed(() => Boolean(props.label || props.description))

const hasLeadingIcon = computed(() => Boolean(props.leadingIcon))
const hasTrailingIcon = computed(() => !props.clearable && Boolean(props.trailingIcon))
const hasWrapper = computed(() => Boolean(hasLeadingIcon.value || hasTrailingIcon.value || props.clearable || hasInsideLabel.value))

const inputClasses = computed(() => [
  hasWrapper.value ? null : 'sg-ds-library-scope',
  'input',
  hasLeadingIcon.value ? 'input--with-leading-icon' : null,
  (hasTrailingIcon.value || props.clearable) ? 'input--with-trailing-icon' : null,
  hasInsideLabel.value ? 'input--with-inside-label' : null,
  props.inputClass,
  (hasWrapper.value || hasFieldChrome.value) ? null : attrs.class,
].filter(Boolean).join(' '))

const wrapperClasses = computed(() => [
  'sg-ds-library-scope',
  'input-wrapper',
  hasFieldChrome.value ? '' : attrs.class,
].filter(Boolean).join(' '))

const fieldClasses = computed(() => [
  'sg-ds-library-scope',
  'input-field',
  attrs.class,
].filter(Boolean).join(' '))

const inputStyle = computed(() => (hasWrapper.value || hasFieldChrome.value) ? undefined : props.style)
const wrapperStyle = computed(() => hasFieldChrome.value ? undefined : props.style)

const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})
</script>

<template>
  <!-- With field chrome (label outside or description) -->
  <div
    v-if="hasFieldChrome"
    v-bind="{ ...inputAttrs, class: undefined, style: undefined }"
    :class="fieldClasses"
    :style="props.style"
    :data-label-position="props.labelPosition"
    :data-size="props.size"
    :data-state="props.state !== 'default' ? props.state : undefined"
  >
    <label
      v-if="hasOutsideLabel"
      class="input-label input-label-outside"
      :for="inputId"
    >{{ props.label }}</label>

    <!-- Wrapper with icons / inside label / clear button -->
    <div
      v-if="hasWrapper"
      :class="wrapperClasses"
      :style="wrapperStyle"
      :data-size="props.size"
      :data-label-position="hasInsideLabel ? 'inside' : undefined"
    >
      <span v-if="hasLeadingIcon" class="input-icon input-icon-leading" aria-hidden="true">
        <slot name="leadingIcon">
          <Icon :name="props.leadingIcon" size="1em" />
        </slot>
      </span>
      <label
        v-if="hasInsideLabel"
        class="input-label input-label-inside"
        :for="inputId"
      >{{ props.label }}</label>
      <input
        v-bind="inputAttrs"
        :id="inputId"
        :type="props.type"
        :class="inputClasses"
        :style="inputStyle"
        :data-size="props.size"
        :data-shape="props.shape === 'pill' ? 'pill' : undefined"
        :data-state="props.state !== 'default' ? props.state : undefined"
        :disabled="props.disabled"
        :aria-disabled="props.disabled || undefined"
        :aria-describedby="descriptionId"
        :readonly="props.readOnly"
        :value="props.modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <span v-if="hasTrailingIcon" class="input-icon input-icon-trailing" aria-hidden="true">
        <slot name="trailingIcon">
          <Icon :name="props.trailingIcon" size="1em" />
        </slot>
      </span>
      <Button
        v-if="props.clearable"
        type="button"
        class="input-clear"
        :aria-label="props.clearLabel"
        :disabled="props.disabled || props.readOnly"
        :icon-only="true"
        :label="props.clearLabel"
        leading-icon="x"
        shape="pill"
        :size="props.size"
        variant="soft"
        @click="props.onClear"
      />
    </div>

    <!-- Bare input (no wrapper needed) -->
    <input
      v-else
      v-bind="inputAttrs"
      :id="inputId"
      :type="props.type"
      :class="inputClasses"
      :style="inputStyle"
      :data-size="props.size"
      :data-shape="props.shape === 'pill' ? 'pill' : undefined"
      :data-state="props.state !== 'default' ? props.state : undefined"
      :disabled="props.disabled"
      :aria-disabled="props.disabled || undefined"
      :aria-describedby="descriptionId"
      :readonly="props.readOnly"
      :value="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />

    <span v-if="props.description" class="input-description" :id="descriptionId">{{ props.description }}</span>
  </div>

  <!-- With wrapper but no field chrome -->
  <div
    v-else-if="hasWrapper"
    v-bind="{ ...inputAttrs, class: undefined, style: undefined }"
    :class="wrapperClasses"
    :style="wrapperStyle"
    :data-size="props.size"
    :data-label-position="hasInsideLabel ? 'inside' : undefined"
  >
    <span v-if="hasLeadingIcon" class="input-icon input-icon-leading" aria-hidden="true">
      <slot name="leadingIcon">
        <Icon :name="props.leadingIcon" size="1em" />
      </slot>
    </span>
    <label
      v-if="hasInsideLabel"
      class="input-label input-label-inside"
      :for="inputId"
    >{{ props.label }}</label>
    <input
      v-bind="inputAttrs"
      :id="inputId"
      :type="props.type"
      :class="inputClasses"
      :style="inputStyle"
      :data-size="props.size"
      :data-shape="props.shape === 'pill' ? 'pill' : undefined"
      :data-state="props.state !== 'default' ? props.state : undefined"
      :disabled="props.disabled"
      :aria-disabled="props.disabled || undefined"
      :aria-describedby="descriptionId"
      :readonly="props.readOnly"
    />
    <span v-if="hasTrailingIcon" class="input-icon input-icon-trailing" aria-hidden="true">
      <slot name="trailingIcon">
        <Icon :name="props.trailingIcon" size="1em" />
      </slot>
    </span>
    <Button
      v-if="props.clearable"
      type="button"
      class="input-clear"
      :aria-label="props.clearLabel"
      :disabled="props.disabled || props.readOnly"
      :icon-only="true"
      :label="props.clearLabel"
      leading-icon="x"
      shape="pill"
      :size="props.size"
      variant="soft"
      @click="props.onClear"
    />
  </div>

  <!-- Bare input (no wrapper, no field chrome) -->
  <input
    v-else
    v-bind="{ ...inputAttrs, class: undefined, style: undefined }"
    :id="inputId"
    :type="props.type"
    :class="inputClasses"
    :style="inputStyle"
    :data-size="props.size"
    :data-shape="props.shape === 'pill' ? 'pill' : undefined"
    :data-state="props.state !== 'default' ? props.state : undefined"
    :disabled="props.disabled"
    :aria-disabled="props.disabled || undefined"
    :aria-describedby="descriptionId"
    :readonly="props.readOnly"
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
