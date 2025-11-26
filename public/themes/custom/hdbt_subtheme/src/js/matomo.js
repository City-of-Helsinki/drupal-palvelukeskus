((Drupal) => {
  const loadMatomoAnalytics = () => {
    // Load Matomo only if statistics cookies are allowed.
    if (Drupal.cookieConsent.getConsentStatus(['statistics'])) {
      // Matomo Tag Manager
      /** biome-ignore lint/suspicious/noAssignInExpressions: @todo UHF-12501 */
      const _mtm = (window._mtm = window._mtm || []);
      _mtm.push({
        /** biome-ignore lint/complexity/useDateNow: @todo UHF-12501 */
        'mtm.startTime': new Date().getTime(),
        event: 'mtm.Start',
      });
      const d = document;
      const g = d.createElement('script');
      const s = d.getElementsByTagName('script')[0];
      g.type = 'text/javascript';
      g.async = true;
      g.src = '//webanalytics.digiaiiris.com/js/container_SLaxVoOu.js';
      s.parentNode.insertBefore(g, s);
    }
  };

  // Load when cookie settings are changed.
  if (Drupal.cookieConsent.initialized()) {
    loadMatomoAnalytics();
  } else {
    Drupal.cookieConsent.loadFunction(loadMatomoAnalytics);
  }
})(Drupal);
