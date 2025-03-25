export async function useRss() {
  const response = await fetch("https://kankeinai.blog.jp/index.rdf");
  const text = await response.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "text/xml");

  const items = xml.getElementsByTagName("item");

  return Array.from(items).map((item) => {
    const getText = (el, ns, tag) => {
      const element = ns ? item.getElementsByTagNameNS(ns, tag)[0] : item.getElementsByTagName(tag)[0];
      return element ? element.textContent : "No data";
    };

    return {
      title: getText(item, null, "title"),
      link: getText(item, null, "link"),
      date: getText(item, "http://purl.org/dc/elements/1.1/", "date"),  // `dc:date`
      subject: getText(item, "http://purl.org/dc/elements/1.1/", "subject"),  // `dc:subject`
      content: getText(item, "http://purl.org/rss/1.0/modules/content/", "encoded"),  // `content:encoded`
    };
  });
}
