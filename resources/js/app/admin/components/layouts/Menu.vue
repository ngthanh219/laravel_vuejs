<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <a class="brand-link">
            <div class="brand-image img-circle elevation-3">DMS</div>
            <span class="brand-text font-weight-light">{{ $helpers.lang.get('layout.menu.title') }}</span>
        </a>
        <div class="sidebar" style="overflow-y: auto;">
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li class="nav-item">
                        <router-link to="/admin/users" class="nav-link">
                            <i class="nav-icon far fa-user"></i>
                            <p>{{ $helpers.lang.get('page.user.title') }}</p>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>

<script>
    export default {
        name: 'Menu'
    }
</script>
