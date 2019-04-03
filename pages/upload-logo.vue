<template>
  <form @submit.prevent="create(logo)" method="post" role="form">
    <fieldset>
      <div class="form-group">      
        <label class="col-sm-2">Upload Image</label>    
        <div class="col-sm-10">
            <img :src="placeholder_image" width="400">
        </div>
        <input type="file" @change="onFileChange" class="form-control">

        <span class="d-block invalid-feedback" v-for="error in errors" v-bind:key="error">{{ error }}</span>
      </div>

      <b-button type="submit" variant="success">Save</b-button>

    </fieldset>
  </form>
</template>

<script>
export default {
  methods: {
    create: function(logo) {
      this.$store.dispatch("logos/create", { logo });
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.createImage(files[0]);
      this.$store.commit("logos/SET_IMAGE_FILE_NAME", { file: files[0] });
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;
      reader.onload = e => {
        this.$store.commit("logos/SET_IMAGE", {
          image: e.target.result
        });
      };
      reader.readAsDataURL(file);
    },
  },
  computed: {
    logo() {
      return this.$store.getters["logos/getLogo"];
    },
    placeholder_image() {
      return this.$store.getters["logos/getPlaceholderImage"];
    },
    errors() {
      return this.$store.getters["logos/getErrors"];
    }
  }
};
</script>