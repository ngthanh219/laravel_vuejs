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
                    {{ $helper.getAuth() == null ? '' : ($helper.getAuth().user.name == null ? $helper.getAuth().user.email : $helper.getAuth().user.name) }}
                </a>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">
                        {{ $helper.getLang('layout.header.account_information') }}
                    </a>
                    <a href="#" class="dropdown-item">
                        {{ $helper.getLang('layout.header.change_password') }}
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
                                {{ $helper.getLang('layout.header.logout') }}
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

                this.$helper.setPageLoading(true);
                await this.$store.dispatch('logout', {
                    error: {
                        message: ''
                    }
                })
                .then(res => {
                    this.$helper.setAuth({
                        user: null,
                        access_token: null
                    });
                })
                .catch(err => {
                    
                });
                this.$helper.setPageLoading(false);
                
                this.$router.push({path: '/admin/login' });
            }
        }
    }
</script>