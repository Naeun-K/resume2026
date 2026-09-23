// document.addEventListener("DOMContentLoaded", () => {
//   const skillSection = document.querySelector(".section-tech");
//   const skillBars = document.querySelectorAll(".skill-progress");

//   if (!skillSection || skillBars.length === 0) return;

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (!entry.isIntersecting) return;

//         skillBars.forEach((skillBar) => {
//           const percent = Number(skillBar.dataset.percent);
//           const percentText = skillBar.querySelector(".skill-percent");

//           skillBar.style.width = `${percent}%`;

//           skillBar.addEventListener(
//             "transitionend",
//             () => {
//               if (percentText) {
//                 percentText.textContent = `${percent}%`;
//               }
//             },
//             { once: true },
//           );
//         });

//         observer.unobserve(entry.target);
//       });
//     },
//     {
//       threshold: 0.3,
//     },
//   );

//   observer.observe(skillSection);
// });

document.addEventListener("DOMContentLoaded", () => {
  const skillSection = document.querySelector(".section-tech");
  const skillBars = document.querySelectorAll(".skill-progress");

  if (!skillSection || skillBars.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((skillBar) => {
            const percent = Math.min(
              100,
              Math.max(0, Number(skillBar.dataset.percent) || 0),
            );

            const percentText = skillBar.querySelector(".skill-percent");

            skillBar.style.width = `${percent}%`;

            const handleTransitionEnd = (event) => {
              if (event.propertyName !== "width") return;

              if (percentText) {
                percentText.textContent = `${percent}%`;
              }

              skillBar.removeEventListener(
                "transitionend",
                handleTransitionEnd,
              );
            };

            skillBar.addEventListener("transitionend", handleTransitionEnd);
          });
        } else {
          skillBars.forEach((skillBar) => {
            const percentText = skillBar.querySelector(".skill-percent");

            skillBar.style.width = "0";

            if (percentText) {
              percentText.textContent = "";
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  observer.observe(skillSection);
});
