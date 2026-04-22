document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector("#page-loader");
  const loaderText = loader.querySelector(".loader-text");

  const firstVisit = !sessionStorage.getItem("visited");
  const isTransition = sessionStorage.getItem("pageTransition");
  const nextPage = sessionStorage.getItem("nextPage");

  if (firstVisit) {
    loaderText.textContent = "WELCOME";
  } else if (isTransition && nextPage) {
    loaderText.textContent = nextPage;
  } else {
    loaderText.textContent = "LOADING....";
  }

  sessionStorage.setItem("visited", "true");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
        document.body.classList.remove("loading");

        sessionStorage.removeItem("pageTransition");
        sessionStorage.removeItem("nextPage");
      }, 500);

    }, isTransition ? 300 : (firstVisit ? 2000 : 1000));
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      link.hasAttribute("download")
    ) return;

    e.preventDefault();

    // Extract page name
    let pageName = href
      .replace(".html", "")
      .replace("./", "")
      .toUpperCase();

    if (pageName === "INDEX") pageName = "HOME";

    sessionStorage.setItem("pageTransition", "true");
    sessionStorage.setItem("nextPage", pageName);

    loaderText.textContent = pageName;
    document.body.classList.add("loading");

    loader.style.display = "flex";
    loader.style.opacity = "1";

    setTimeout(() => {
      window.location.href = href;
    }, 800);
  });
});