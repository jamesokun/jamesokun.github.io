// Count opens of PDFs/zips and clicks to external sites (e.g. GitHub repos, press coverage) as GoatCounter events.
// Events show up in the GoatCounter dashboard as e.g. "file:/files/cv.pdf" or "link:github.com/jamesokun/...".
(function () {
  function track(event) {
    if (event.type === "auxclick" && event.button !== 1) return; // only middle-click
    var a = event.target.closest && event.target.closest("a[href]");
    if (!a || !window.goatcounter || !window.goatcounter.count) return;

    var url;
    try { url = new URL(a.getAttribute("href"), location.href); } catch (e) { return; }
    if (!/^https?:$/.test(url.protocol)) return; // skip mailto:, "#" toggles, etc.

    var name;
    if (url.host === location.host) {
      if (!/\.(pdf|zip)$/i.test(url.pathname)) return;
      name = "file:" + url.pathname;
    } else {
      name = "link:" + url.host.replace(/^www\./, "") + url.pathname.replace(/\/$/, "");
    }

    window.goatcounter.count({
      path: name,
      title: (a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 200),
      event: true,
    });
  }

  document.addEventListener("click", track);
  document.addEventListener("auxclick", track);
})();
