<template>
  <div class="btn btn-rect" id="button-13">
    <input type="checkbox" class="checkbox" />
    <div class="knob">
      <span></span>
    </div>
    <div class="btn-bg"></div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.btn.btn-rect {
  border-radius: 2px;
}

.checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.knob {
  z-index: 2;
}

.btn-bg {
  width: 100%;
  background-color: #ebf7fc;
  transition: 0.3s ease all;
  z-index: 1;
}

.btn {
  position: relative;
  top: 50%;
  width: 74px;
  height: 36px;
  margin: -20px auto 0 auto;
  overflow: hidden;
}

.knob,
.btn-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

#button-13 .knob:before,
#button-13 .knob:after,
#button-13 .knob span {
  position: absolute;
  top: 4px;
  width: 20px;
  height: 10px;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  padding: 9px 4px;
  border-radius: 2px;
  transition: 0.3s ease all;
}

#button-13 .knob:before,
#button-13 .knob:after {
  color: #4e4e4e;
  z-index: 1;
}

#button-13 .knob:before {
  content: "YES";
  left: 4px;
}

#button-13 .knob:after {
  content: "NO";
  right: 4px;
}

#button-13 .knob span {
  width: 25px;
  left: 37px;
  background-color: #03a9f4;
  z-index: 2;
}

#button-13 .checkbox:checked + .knob span {
  left: 4px;
  background-color: #f44336;
}

#button-13 .checkbox:checked ~ .btn-bg {
  background-color: #fcebeb;
}
</style>
