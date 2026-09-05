import { useEffect } from 'react';

/**
 * Universal SEO hook for managing title, meta tags, canonical links,
 * Open Graph, Twitter Cards, and robots indexing directives.
 *
 * Supports both signatures:
 *   useSeo('Page Title', 'Meta description...', 'keyword, list', '/path')
 *   useSeo({ title: '...', description: '...', keywords: '...', canonical: '...', image: '...', noindex: false })
 */
export default function useSeo(titleOrOptions, legacyDescription, legacyKeywords, legacyCanonical) {
  useEffect(() => {
    let title = '';
    let description = '';
    let keywords = '';
    let canonical = '';
    let image = '';
    let noindex = false;
    let type = 'website';

    if (typeof titleOrOptions === 'object' && titleOrOptions !== null) {
      title = titleOrOptions.title || '';
      description = titleOrOptions.description || '';
      keywords = titleOrOptions.keywords || '';
      canonical = titleOrOptions.canonical || '';
      image = titleOrOptions.image || '';
      noindex = Boolean(titleOrOptions.noindex);
      type = titleOrOptions.type || 'website';
    } else {
      title = titleOrOptions || '';
      description = legacyDescription || '';
      keywords = legacyKeywords || '';
      canonical = legacyCanonical || '';
    }

    const defaultTitle = 'HM Occhealth & Holistic Wellness';
    const siteTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
    const defaultDesc = 'Registered Nurse-led occupational health compliance medicals and holistic wellness coaching in Bellville & Greater Cape Town.';
    const metaDesc = description || defaultDesc;

    // Resolve Origin and Absolute URLs
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://hmhealthwellness.co.za';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : origin;
    const canonicalUrl = canonical
      ? (canonical.startsWith('http') ? canonical : `${origin}${canonical}`)
      : currentUrl.split('?')[0];
    const ogImageUrl = image
      ? (image.startsWith('http') ? image : `${origin}${image}`)
      : `${origin}/hazel.png`;

    // 1. Document Title
    document.title = siteTitle;

    // Helper: set or create a <meta> tag
    const setMetaTag = (attributeName, attributeValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', metaDesc);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 3. Robots Directive
    if (noindex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 4. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. Open Graph Meta Tags
    setMetaTag('property', 'og:title', siteTitle);
    setMetaTag('property', 'og:description', metaDesc);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImageUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', defaultTitle);
    setMetaTag('property', 'og:locale', 'en_ZA');

    // 6. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', siteTitle);
    setMetaTag('name', 'twitter:description', metaDesc);
    setMetaTag('name', 'twitter:image', ogImageUrl);

  }, [titleOrOptions, legacyDescription, legacyKeywords, legacyCanonical]);
}
