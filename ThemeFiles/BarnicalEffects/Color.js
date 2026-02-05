let Index = 0,
  Interval = 1000;

const Rand = (Min, Max) => Math.floor(Math.random() * (Max - Min + 1)) + Min;

const Animate = (Star) => {
  Star.style.setProperty("--star-left", `${Rand(-10, 100)}%`);
  Star.style.setProperty("--star-top", `${Rand(-40, 80)}%`);

  Star.style.animation = "none";
  Star.offsetHeight;
  Star.style.animation = "";
};

for (const Star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    Animate(Star);

    setInterval(() => Animate(Star), 1000);
  }, Index++ * (Interval / 3));
}
