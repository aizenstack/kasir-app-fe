import { ref, onMounted, computed} from 'vue'
import {  menu } from '../../services/dinamicMenu'

const menuData = ref(menu)

export const useMenu = () => {
    const sidebar = computed(() => menuData.value.filter(s => s.showInSide))

    return {
        sidebar
    }
}