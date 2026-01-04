import { ref, onMounted, computed } from 'vue'
import { menu } from '../../services/dinamicMenu'
import { getRole } from '../../utils/auth'

const menuData = ref(menu)

export const useMenu = () => {
    const sidebar = computed(() => {
        const role = getRole()
        return menuData.value.filter(s => {
            if (!s.showInSide) return false
            if (s.roles && !s.roles.includes(role)) return false
            return true
        })
    })

    return {
        sidebar
    }
}