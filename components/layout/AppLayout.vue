<template>
  <div class="h-screen flex bg-white overflow-hidden">
    <!-- Sidebar -->
    <LayoutSidebar />
    <!-- Main content area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Topbar -->
      <LayoutTopbar />
      <!-- Page content -->
      <main class="flex-1 p-6 overflow-auto bg-gray-50">
        <div class="mb-4 text-sm text-gray-500">
          <LayoutBreadcrumbs />
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// AppLayout wraps all authenticated pages with sidebar + topbar
</script>
