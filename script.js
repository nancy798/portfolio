document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".open-iframe").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();

            const lesson = this.closest(".lesson");
            const frameBox = lesson.querySelector(".frameBox");
            const url = this.href;

            // якщо iframe вже є → закрити
            if (frameBox.querySelector("iframe")) {
                frameBox.innerHTML = "";
                return;
            }

            // інакше відкрити
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
