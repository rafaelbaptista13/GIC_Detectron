
//Add event listener for mobile navigation to wokr
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
});

//Smooth scrolling animation
const allLinks = document.querySelectorAll("a:link");

for (let i = 0; i < allLinks.length; i++) {
  allLinks[i].addEventListener("click", (event) => {
    event.preventDefault();
    const href = allLinks[i].getAttribute("href");

    //scroll back to top
    if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });
    //scroll to the other sections
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    if (href !== "#" && !href.startsWith("#")) {
      if (href === "mailto:detectron@sapo.pt")
        window.location.href = "mailto:detectron@sapo.pt"
      if (href === "https://github.com/dgCunhaUA/Detectron-PromoWebsite")
        window.location.href = "https://github.com/dgCunhaUA/Detectron-PromoWebsite"
    }
      

    headerEl.classList.toggle("nav-open");
  });
}

//sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    //In the viewport
    root: null, // null means in the viewport
    threshold: 0, //0 is when it moves out completely of the view port. 1 is when it moves in completely on the viewport
    rootMargin: "-80px", //ignore the height of the navbar
  }
);
obs.observe(sectionHeroEl);

var toggle = false;

