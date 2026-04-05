export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = `https://{project_redacted}.supabase.co/storage/v1/object/public/cdn${url.pathname}`;

    const response = await fetch(target, {
      headers: request.headers,
      cf: {
        cacheEverything: true,
        cacheTtl: 31536000,
      },
    });

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "public, max-age=31536000");
    headers.set("Accept-Ranges", "bytes");
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }
}
