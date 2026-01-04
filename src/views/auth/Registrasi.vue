<script setup>
import { onMounted, ref } from 'vue'
import http from '../../utils/http'
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const toast = useToast();
const confirm = useConfirm();

const users = ref([]);
const isLoading = ref(false);
const visible = ref(false);
const isEdit = ref(false);

const form = ref({
    id: null,
    username: '',
    password: '',
    role: 'petugas'
});

const roles = [
    { label: 'Administrator', value: 'administrator' },
    { label: 'Petugas', value: 'petugas' }
];

const columns = [
    { field: 'username', header: 'Username' },
    { field: 'role', header: 'Role' },
    { field: 'createdAt', header: 'Created At' }
];

const getAllUsers = async () => {
    try {
        isLoading.value = true;
        const response = await http.get('/auth/users');
        users.value = response.data.data.map(user => ({
            ...user,
            createdAt: new Date(user.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })
        }));
    } catch (err) {
        console.error(err);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch users', life: 3000 });
    } finally {
        isLoading.value = false;
    }
};

const openAdd = () => {
    isEdit.value = false;
    form.value = {
        id: null,
        username: '',
        password: '',
        role: 'petugas'
    };
    visible.value = true;
};

const openEdit = (data) => {
    isEdit.value = true;
    form.value = {
        id: data.id,
        username: data.username,
        password: '', 
        role: data.role
    };
    visible.value = true;
};

const saveUser = async () => {
    if (!form.value.username) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Username is required', life: 3000 });
        return;
    }
    if (!isEdit.value && !form.value.password) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Password is required for new user', life: 3000 });
        return;
    }

    try {
        isLoading.value = true;
        if (isEdit.value) {
            const payload = {
                username: form.value.username,
                role: form.value.role
            };
            if (form.value.password) {
                payload.password = form.value.password;
            }
            await http.put(`/auth/users/${form.value.id}`, payload);
            toast.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully', life: 3000 });
        } else {
            await http.post('/auth/register', form.value);
            toast.add({ severity: 'success', summary: 'Success', detail: 'User created successfully', life: 3000 });
        }
        visible.value = false;
        await getAllUsers();
    } catch (err) {
        console.error(err);
        const msg = err.response?.data?.message || 'Failed to save user';
        toast.add({ severity: 'error', summary: 'Error', detail: msg, life: 3000 });
    } finally {
        isLoading.value = false;
    }
};

const deleteUser = (id) => {
    confirm.require({
        message: 'Are you sure you want to delete this user?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: async () => {
            try {
                isLoading.value = true;
                await http.delete(`/auth/users/${id}`);
                toast.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully', life: 3000 });
                await getAllUsers();
            } catch (err) {
                console.error(err);
                const msg = err.response?.data?.message || 'Failed to delete user';
                toast.add({ severity: 'error', summary: 'Error', detail: msg, life: 3000 });
            } finally {
                isLoading.value = false;
            }
        }
    });
};

onMounted(() => {
    getAllUsers();
});
</script>

<template>
    <div class="card">
        <Toast />
        <ConfirmDialog />
        
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Manajemen User</h2>
            <Button severity="info" icon="pi pi-plus" label="Add New User" size="small" @click="openAdd" />
        </div>

        <data-table-component :data="users" :columns="columns" :loading="isLoading" :rows="5"
            :rowsPerPageOptions="[5, 10, 20]">
            <template #action="{ row }">
                <div class="flex gap-2 justify-center text-start">
                    <Button icon="pi pi-pencil" severity="info" size="small" @click="openEdit(row)" v-tooltip.top="'Edit'" />
                    <Button icon="pi pi-trash" severity="danger" size="small" @click="deleteUser(row.id)" v-tooltip.top="'Hapus'" />
                </div>
            </template>
        </data-table-component>

        <Dialog v-model:visible="visible" modal :header="isEdit ? 'Edit User' : 'Add New User'" :style="{ width: '30rem' }">
            <div class="flex flex-col gap-4 mt-2">
                <div class="flex flex-col gap-2">
                    <label for="username" class="font-semibold">Username</label>
                    <InputText id="username" v-model="form.username" class="w-full" autocomplete="off" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="password" class="font-semibold">Password</label>
                    <Password id="password" v-model="form.password" class="w-full" :feedback="false" toggleMask autocomplete="new-password" placeholder="Leave empty to keep current password" v-if="isEdit" />
                    <Password id="password" v-model="form.password" class="w-full" :feedback="false" toggleMask autocomplete="new-password" v-else />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="role" class="font-semibold">Role</label>
                    <Dropdown id="role" v-model="form.role" :options="roles" optionLabel="label" optionValue="value" class="w-full" />
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" severity="secondary" @click="visible = false" text />
                <Button label="Save" severity="primary" @click="saveUser" :loading="isLoading" />
            </template>
        </Dialog>
    </div>
</template>