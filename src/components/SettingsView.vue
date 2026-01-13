<template>
  <div>
    Settings

    <ul>
      <li>Focus Count -> number</li>
      <li>
        <InputNumber />
      </li>
      <li>Focus Time -> minutes</li>
        <InputNumber />
      <li>Short Break Time -> minutes</li>
        <InputNumber />
      <li>Long Break -> on/off</li>
        <ToggleSwitch />
      <li>Long Break Time -> minutes</li>
        <InputNumber />
      <li>Sounds -> on/off</li>
        <ToggleSwitch />
      <li>Sounds > -> lofi / white noises</li>
        <ButtonGroup />
      <li>Sound volume -> slider (range input)</li>
      <li>Dark mode -> on/off</li>
        <ToggleSwitch />
      <li>About -> developer, Heroicons, app version</li>
    </ul>
  </div>
</template>

<script setup>
import ButtonGroup from './form/ButtonGroup.vue';
import InputNumber from './form/InputNumber.vue';
import ToggleSwitch from './form/ToggleSwitch.vue';


</script>

<style lang="scss" scoped>

</style>
