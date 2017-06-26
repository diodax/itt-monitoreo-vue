<template>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <router-view class="view" keep-alive transition transition-mode="out-in"></router-view>
</div>
<!-- /.content-wrapper -->
</template>

<script>
export default {
  name: 'Content',
  data() {
    return {
      title: 'Default Title',
    };
  },
};
</script>
