<template>
    <div class="loading" id="loading"></div>

    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
                <a class="nav-link" data-toggle="dropdown" href="#">
                    {{ 
                        $helpers.store.getAuth() == null 
                        ?
                            '' 
                        : (
                            $helpers.store.getAuth().user.name == null
                            ? 
                                $helpers.store.getAuth().user.email
                            : 
                                $helpers.store.getAuth().user.name) 
                    }}
                </a>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        {{ $helpers.lang.get('layout.header.account_information') }}
                    </a>
                    <a href="#" class="dropdown-item">
                        {{ $helpers.lang.get('layout.header.change_password') }}
                    </a>
                    <div class="dropdown-divider"></div>
                    <!-- <a href="#" class="dropdown-footer">
                        <form>
                            <input type="hidden" name="access_token" value="#">
                            <input type="hidden" name="refresh_token" value="#">
                            <button type="submit" class="border-0 bg-primary d-flex justify-content-center align-items-center w-100" style="border-radius: 3px">Refresh token</button>
                        </form>
                    </a> -->
                    <a href="#" class="dropdown-footer">
                        <form v-on:submit="logout">
                            <button type="submit" class="border-0 bg-danger d-flex justify-content-center align-items-center w-100" style="border-radius: 3px">
                                {{ $helpers.lang.get('layout.header.logout') }}
                            </button>
                        </form>
                    </a>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: 'Header',
        methods: {
            async logout(e) {
                e.preventDefault();

                this.$helpers.store.setPageLoading(true);
                await this.$services.api.call('logout', {}, (data) => {
                    this.$helpers.store.setAuth({
                        user: null,
                        access_token: null
                    });
                });

                this.$helpers.store.setPageLoading(false);
                this.$router.push({path: '/admin/login' });
            }
        }
    }
</script>
