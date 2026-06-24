import { useEffect } from 'react';

export default function useSeo(title, description) {
  useEffect(() => {
    // Set Document Title
    document.title = title ? `${title} | HM Occhealth & Holistic Wellness` : 'HM Occhealth & Holistic Wellness';

    // Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || 'Transforming lives through practical, holistic wellness and occupational health medical assessments in Bellville, Cape Town.';

    // Set Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title ? `${title} | HM Occhealth & Holistic Wellness` : 'HM Occhealth & Holistic Wellness';

    // Set Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description || 'Transforming lives through practical, holistic wellness and occupational health medical assessments in Bellville, Cape Town.';
  }, [title, description]);
}
