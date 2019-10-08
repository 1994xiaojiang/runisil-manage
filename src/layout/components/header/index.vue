<template>
  <div class="header">
    <div class="header_l">
      <a href="javascript:;" class="logoLink"><img src="./Runisil-1.png" alt="logo" />Runisil</a
      >
    </div>
    <div class="header_r">
      <div class="headr_d1">
        <side-collapse class="sidecoll"></side-collapse>
        <bread-crumb class="bread"></bread-crumb>
      </div>
      <div class="headr_d2">

      </div>
    </div>
  </div>
</template>

<script>
import SideCollapse from '@/components/SideCollapse'
import BreadCrumb from '@/components/BreadCrumb'
export default {
  components: {
    SideCollapse,
    BreadCrumb
  },
  methods: {

  }
}
</script>
