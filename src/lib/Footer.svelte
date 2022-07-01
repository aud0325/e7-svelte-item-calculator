<script>
    import { Container } from "sveltestrap";
    import { _ } from "svelte-i18n";
</script>

<footer class="footer mt-auto py-3 bg-light">
    <Container>
        <a href="https://github.com/aud0325/e7-svelte-item-calculator/issues/new">{ $_('Raise a bug / improvements')}</a>
    </Container>
</footer>

<style>
    a {
        text-decoration: none;
    }
</style>