(() => {
  'use strict';
  const originalUrl = window.location.href;
  const query = new URL(originalUrl).searchParams;
  const title = document.getElementById('title');
  const message = document.getElementById('message');
  // Keep the short-lived response in this page's memory only. No storage, analytics,
  // network requests, token exchange or application secret is used on this page.
  if (query.has('code') || query.has('state') || query.has('error')) {
    window.history.replaceState(null, '', window.location.pathname);
  }
  if (query.has('error')) {
    title.textContent = 'Etsy izni tamamlanmadı';
    message.textContent = 'Etsy erişim izni vermedi veya işlem iptal edildi. Masaüstü uygulamasından yetkilendirmeyi yeniden başlatın.';
    return;
  }
  if (!query.get('code') || !query.get('state')) {
    if (query.has('code') || query.has('state')) {
      title.textContent = 'Bağlantı eksik';
      message.textContent = 'Yetkilendirmeyi masaüstü uygulamasından yeniden başlatın. Bu sayfayı yenilemek yerine yeni Etsy onay akışını kullanın.';
    }
    return;
  }
  title.textContent = 'Etsy onayı alındı';
  message.textContent = 'Bağlantıyı kopyalayıp açık olan masaüstü uygulamasına yapıştırın. Mağaza bağlantısı masaüstünde doğrulanınca tamamlanır.';
  const field = document.getElementById('callback');
  field.value = originalUrl;
  document.getElementById('result').hidden = false;
  document.getElementById('copy').addEventListener('click', async () => {
    const status = document.getElementById('status');
    try {
      await navigator.clipboard.writeText(originalUrl);
      status.textContent = 'Kopyalandı. Etsy Studio uygulamasına yapıştırabilirsiniz.';
    } catch {
      field.focus();
      field.select();
      status.textContent = 'Bağlantı seçildi. Ctrl+C ile kopyalayıp masaüstü uygulamasına yapıştırın.';
    }
  });
})();
