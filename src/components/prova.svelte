<script>
    let current = $state("foo");
</script>

<button class = {`${current === 'foo' ? 'bg-red-500' : ''}`} onclick={() => (current = 'foo')}>foo</button>

<button class = {`${current === 'bar' ? 'bg-red-500' : ''}`} onclick={() => (current = 'bar')}>bar</button>

<button class = {`${current === 'baz' ? 'bg-red-500' : ''}`} onclick={() => (current = 'baz')}>baz</button>