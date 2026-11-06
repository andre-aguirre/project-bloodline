// Copy-the-email button. Everything else on the site works without JavaScript.
document.querySelectorAll("[data-copy]").forEach(function (btn) {
  var status = document.getElementById(btn.getAttribute("aria-controls"));
  btn.addEventListener("click", function () {
    var text = btn.getAttribute("data-copy");
    var done = function () { if (status) status.textContent = btn.getAttribute("data-done"); };
    var fallback = function () {
      var t = document.createElement("textarea");
      t.value = text; t.setAttribute("readonly", ""); t.style.position = "absolute"; t.style.left = "-9999px";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); done(); } catch (e) { if (status) status.textContent = text; }
      document.body.removeChild(t);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else { fallback(); }
  });
});

// Mobile menu
(function () {
  var btn = document.querySelector(".menu-toggle");
  if (!btn) return;
  var header = btn.closest(".site-header");
  btn.addEventListener("click", function () {
    var open = header.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  header.querySelectorAll(".nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      header.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();
