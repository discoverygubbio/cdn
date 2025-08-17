<script>
  const baseUrl = "https://gpx.studio";

  document.querySelectorAll('[href], [src], [action]').forEach(el => {
    ['href', 'src', 'action'].forEach(attr => {
      const val = el.getAttribute(attr);
      if (val && val.startsWith('/')) {
        el.setAttribute(attr, baseUrl + val);
      }
    });
  });
</script>
