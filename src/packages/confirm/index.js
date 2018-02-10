import Vue from 'vue'
import ModalDialogs from 'vue-modal-dialogs'
import VueToasted from 'vue-toasted'

import confirmModal from '../../components/base/ConfirmModal'
import undoToaster from '../../components/base/UndoToaster'

Vue.use(ModalDialogs)

Vue.use(VueToasted, {
  position: 'top-center',
  iconPack: 'fontawesome' // set your iconPack, defaults to material. material|fontawesome
})

export const undoToast = ModalDialogs.makeDialog(undoToaster, 'title')

export const confirm = ModalDialogs.makeDialog(confirmModal, 'title', 'content')
Vue.prototype.$confirm = confirm
