<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Contatos</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          <div class="card-panel red lighten-4">
            Campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
          </div>
        </li>
      </ul>

      <form @submit.prevent="save">
        <label>Nome</label>
        <input type="text" placeholder="Nome" v-model="contact.name" />
        <label>Sexo</label>
        <p>
          <label>
            <input name="gener" type="radio" value="Masculino" v-model="contact.gener"/>
            <span>Masculino</span>
          </label>
        </p>
        <p>
          <label>
            <input name="gener" type="radio" value="Femininio" v-model="contact.gener"/>
            <span>Feminino</span>
          </label>
        </p>
        <label>Telefone</label>
        <input type="text" placeholder="Telefone" v-model="contact.telephone" />
        <label>Email</label>
        <input type="email" placeholder="Valor" v-model="contact.email" />

        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>SEXO</th>
            <th>TELEFONE</th>
            <th>E-MAIL</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="contact of contacts" :key="contact.id">
            <td>{{ contact.name }}</td>
            <td>{{ contact.gener }}</td>
            <td>{{ contact.telephone }}</td>
            <td>{{ contact.email }}</td>
            <td>
              <button
                @click="update(contact)"
                class="waves-effect btn-small blue darken-1"
              >
                <i class="material-icons">create</i>
              </button>
              <button
                @click="remove(contact)"
                class="waves-effect btn-small red darken-1"
              >
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Contact from "./services/contato";

export default {
  name: "app",
  data() {
    return {
      contact: {
        id: "",
        name: "",
        gener: "",
        telephone: "",
        email: "",
      },
      contacts: [],
      errors: [],
    };
  },
  mounted() {
    this.findAll();
  },
  methods: {
    findAll() {
      Contact.findAll()
        .then((resposta) => {
          this.contacts = resposta.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    save() {
      if (!this.contact.id) {
        Contact.save(this.contact)
          .then((resposta) => {
            this.contact = {};
            alert("Cadastrado com sucesso!");
            this.findAll();
            this.errors = {};
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
            window.scrollTo(0,0);
          });
      } else {
        Contact.update(this.contact)
          .then((resposta) => {
            this.contact = {};
            this.errors = {};
            alert("Atualizado com sucesso!");
            this.listar();
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
            window.scrollTo(0,0);
          });
      }
    },
    update(contact) {
      this.contact = contact;
    },
    remove(contact) {
      if (confirm("Deseja excluir o contato?")) {
        Contact.delete(contact)
          .then((resposta) => {
            this.findAll();
            this.errors = {};
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
            window.scrollTo(0,0);
          });
      }
    },
  },
};
</script>

<style>
</style>