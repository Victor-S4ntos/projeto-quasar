<template>
  <q-page padding>
    <q-form @submit="onSubmit" @reset="onReset" class="row justify-center q-gutter-md">
      <q-input margin outlined v-model="form.title" label="Seu nome *" lazy-rules class="col-lg col-md-6 col-12"
        :rules="[val => val && val.length > 0 || 'Por favor, insira seu nome']" />
      <q-input margin outlined v-model="form.author" label="Autor *" lazy-rules class="col-lg col-md-6 col-12"
        :rules="[val => val && val.length > 0 || 'Por favor, insira o nome do autor']" />
      <div class="col-lg-12 col-xs-12">
        <q-editor v-model="form.content" min-height="5rem" />
      </div>

      <div class="col-12">
        <q-btn label="salvar" type="submit" color="primary" class="float-right q-ml-md" padding="1em" icon="save" />
        <q-btn label="cancelar" color="black" class="float-right" padding="1em" text-color="white" icon="cancel"
          :to="{ name: 'home' }" />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { postsService } from './IndexPage.vue'
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
export default defineComponent({
  name: 'formPost',
  setup() {
    const { post, getById, update } = postsService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      title: '',
      content: '',
      author: ''
    });

    onMounted(async function () {
      if (route.params.id) {
        getPost(route.params.id)
      }
    });

    const getPost = async function (id: any) {
      try {
        const response = await getById(id)
        form.value = response
      } catch (error) {
        console.error(error)
      }
    }

    const onSubmit = async function () {
      try {
        if (form.value.id) {
          await update(form.value)
        } else {
          await post(form.value)
        }
        $q.notify({
          color: 'positive',
          message: 'Post atualizado com sucesso',
          icon: 'done',
          position: 'top'
        })
        router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
        $q.notify({
          color: 'negative',
          message: 'Erro ao atualizar o post',
          icon: 'error',
          position: 'top'
        })
      }
    };

    const onReset = () => {
      console.log('reset');
    };

    return {
      form,
      onSubmit,
      onReset,
    };
  },
});

</script>
