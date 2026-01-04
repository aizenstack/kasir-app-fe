<script setup>
import { formatRupiah } from '../utils/currency'
defineProps({
    data: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Array,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    paginator: {
        type: Boolean,
        default: true
    },
    rows: {
        type: Number,
        default: 10
    },
    rowsPerPageOptions: {
        type: Array,
        default: () => [5, 10, 20, 50]
    }
})

const skeletonData = Array.from({ length: 5 })
</script>

<template>
    <DataTable :value="loading ? skeletonData : data" tableStyle="min-width: 50rem" size="small" :paginator="paginator"
        :rows="rows" :rowsPerPageOptions="rowsPerPageOptions">
        <Column header="No" style="width: 5%; text-align: center">
            <template #body="{ index }">
                <Skeleton v-if="loading" width="2rem" />
                <span v-else>{{ index + 1 }}</span>
            </template>
        </Column>

        <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header"
            :style="{ textAlign: col.align || 'left' }">
            <template #body="slotProps">
                <Skeleton v-if="loading" height="1.2rem" />
                <span v-else>
                    {{ col.type === 'currency' ? formatRupiah(slotProps.data[col.field]) : slotProps.data[col.field] }}
                </span>
            </template>
        </Column>

        <Column v-if="$slots.action" header="Aksi" style="width: 8%;">
            <template #body="slotProps">
                <Skeleton v-if="loading" width="4rem" height="1.5rem" />
                <slot v-else name="action" :row="slotProps.data" />
            </template>
        </Column>
    </DataTable>
</template>

<style scoped>
:deep(.p-datatable) {
    font-family: system-ui, -apple-system, sans-serif;
    border-radius: 12px;
    overflow: hidden;
    background: white;
}

:deep(.p-datatable .p-datatable-header) {
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    padding: 1rem;
    font-weight: 600;
    color: #1e293b;
}

:deep(.p-datatable-thead > tr > th) {
    background: #2563eb !important;
    color: white !important;
    padding: 1rem !important;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border: none !important;
}

:deep(.p-datatable-tbody > tr > td) {
    padding: 1rem !important;
    background: white;
    transition: background-color 0.2s;
}

:deep(.p-datatable-tbody > tr:nth-child(even) > td) {
    background-color: #f8faff;
}

:deep(.p-datatable-tbody > tr:hover > td) {
    background-color: #eff6ff !important;
}

:deep(.p-datatable-scrollable-body::-webkit-scrollbar) {
    height: 8px;
}

:deep(.p-datatable-scrollable-body::-webkit-scrollbar-thumb) {
    background-color: #93c5fd;
    border-radius: 4px;
}

:deep(.p-datatable-scrollable-body::-webkit-scrollbar-track) {
    background: #f1f5f9;
}
</style>
