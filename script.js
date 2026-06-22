document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".open-iframe").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();

            const lesson = this.closest(".lesson");
            const frameBox = lesson.querySelector(".frameBox");
            const url = this.href;

            if (frameBox.querySelector("iframe")) {
                frameBox.innerHTML = "";
                return;
            }

            
            frameBox.innerHTML = `
                <iframe src="${url}" allowfullscreen></iframe>
            `;
        });
    });
});



window.carousel = () => {
  let handleScroll, timer, cleanup;

  return {
    scrolledStart: false,
    scrolledEnd: false,

    init() {
      handleScroll = () => {
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
          this.scrolledEnd =
            Math.ceil(this.$refs.items.scrollLeft + this.$refs.items.clientWidth) >=
            Math.ceil(this.$refs.items.scrollWidth);

          this.scrolledStart = this.$refs.items.scrollLeft <= 0;
        }, 10);
      };

      handleScroll();
      this.$refs.items.addEventListener("scroll", handleScroll);
      addEventListener("resize", handleScroll);

      cleanup = () => {
        this.$refs.items.removeEventListener("scroll", handleScroll);
        removeEventListener("resize", handleScroll);
      };
    },

    next() {
      this.$refs.items.scrollBy({
        left: this.$refs.items.clientWidth,
        behavior: "smooth"
      });
    },

    prev() {
      this.$refs.items.scrollBy({
        left: -this.$refs.items.clientWidth,
        behavior: "smooth"
      });
    }
  };
};



const form = document.getElementById('contactForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    await fetch("https://formspree.io/f/xaqgwakj", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    // просто очищаємо форму без повідомлень
    form.reset();
  });
