<template>
  <q-page padding>
    <q-table title="Treino com quasar e vue" :rows="posts" :columns="columns" row-key="name">
      <template v-slot:top-right>
        <q-btn color="primary" label="Adicionar" icon="add" padding="1em" :to="{ name: 'formPost' }" />
        <q-btn color="primary" label="Remover" icon="delete" padding="1em" class="q-ml-md" @click="aoDeletar" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" color="info" padding="12px" size="sm" @click="editarProps(props.row.id)" />
          <q-btn icon="delete" color="negative" padding="12px" class="q-ml-md" size="sm"
            @click="deletarProps(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import useApi from '../composables/useApi';
import { useRouter } from 'vue-router';

export function postsService() {
  const { list, post, update, remove, getById } = useApi('posts');

  return {
    list,
    post,
    update,
    remove,
    getById
  };
}

export default defineComponent({
  name: 'indexPage',
  setup() {
    const posts = ref([])
    const { list, remove } = postsService()
    const columns = [
      { name: 'id', field: 'id', label: 'Id', sortable: true, align: 'left', },
      { name: 'title', field: 'title', label: 'Titulo', align: 'left', },
      { name: 'author', field: 'author', label: 'Autor', align: 'left', },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'center' },
    ]

    const $q = useQuasar()
    const router = useRouter()

    const renderizar = async function () {
      const data = await list()
      posts.value = data
    }

    renderizar()

    const aoDeletar = function () {
      posts.value = []
    }

    const editarProps = function (id: number) {
      router.push({ name: 'formPost', params: { id } })
    }

    const deletarProps = async function (id: any) {
      try {
        $q.dialog({
          title: 'Confirmação',
          message: 'Deseja realmente remover o post?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Post removido com sucesso', icon: 'check', color: 'positive', position: 'top' });
          renderizar()
        })
      } catch (error) {
        console.log(error);
        $q.notify('Erro ao remover post');
      }
    }

    return { posts, columns, renderizar, aoDeletar, deletarProps, editarProps };
  }
});
</script>
