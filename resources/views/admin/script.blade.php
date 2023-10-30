<script src="{{ asset('sources/admin/AdminLTE/plugins/jquery/jquery.min.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/plugins/jquery-ui/jquery-ui.min.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/plugins/chart.js/Chart.min.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/plugins/sparklines/sparkline.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/plugins/jqvmap/jquery.vmap.min.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/plugins/jqvmap/maps/jquery.vmap.usa.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/plugins/jquery-knob/jquery.knob.min.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/plugins/moment/moment.min.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/plugins/daterangepicker/daterangepicker.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/plugins/summernote/summernote-bs4.min.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js') }}"></script>
<script src="{{ asset('sources/admin/AdminLTE/dist/js/adminlte.js') }}"></script>

{{-- <script src="{{ asset('sources/admin/app.js?v=' . time()) }}" defer></script> --}}
@if ($env === 'production')
    <script src="{{ asset('sources/admin/app.js?' . strtotime("now")) }}"></script>
@else
    @vite('resources/js/app/admin/app.js')
@endif

<script defer>
    $.widget.bridge('uibutton', $.ui.button)
</script>
