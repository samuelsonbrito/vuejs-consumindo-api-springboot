import { http } from './config'

export default {

    save: (contact) => {
        return http.post('contato', contact);
    },

    update: (contact) => {
        return http.put('contato', contact);
    },

    findAll: () => {
        return http.get('contatos')
    },

    delete: (contact) => {
        return http.delete(`contato/${contact.id}`)
    }
}