export const strict = false

export const state = () => ({
  logo: {
    filename: '',
    file: ''
  },
  errors: {},
  placeholder_image: 'http://placehold.it/750x300'
})

export const actions = {
  create({ commit, dispatch }, payload) {
    const formData = new FormData();
    if (payload.logo.file) {
      formData.append('file', payload.logo.file);
    }
    this.$axios.post('http://homestead3.test/api/logos', formData)
    .then((response) => {
      commit('CLEAR_ERRORS');
      commit('EMPTY_FIELDS');
      this.$router.push(`/success`);
    }).catch((error) => {
      if (error.response.status === 422) {
        commit('SHOW_ERRORS', { response: error.response });
      }
    })
  },
}

export const mutations = {
  SET_IMAGE_FILE_NAME(state, { file }) {
    state.logo.file = file;
  },
  SET_IMAGE(state, { image }) {
    state.placeholder_image = image;
  },
  CLEAR_ERRORS(state) {
    state.errors = {};
  },
  SHOW_ERRORS(state, { response }) {
    state.errors = response.data.errors;
  },
  EMPTY_FIELDS(state) {
    // clear form and reset objects
    state.logo = {
      filename: '',
      file: ''
    }
  },
}

export const getters = {
  getErrors: state => state.errors,
  getLogo: state => state.logo,
  getPlaceholderImage: state => state.placeholder_image,
}