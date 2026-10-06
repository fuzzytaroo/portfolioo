/* =========================================================
   LOADER
========================================================= */

const loader = document.getElementById("loader");
const loaderNumber = document.getElementById("loaderNumber");
const loaderBar = document.getElementById("loaderBar");

let progress = 0;

if (loader && loaderNumber && loaderBar) {

  const loading = setInterval(() => {

    progress += Math.floor(Math.random() * 8) + 2;

    if (progress >= 100) {

      progress = 100;

      clearInterval(loading);

      loaderNumber.textContent = "100";
      loaderBar.style.width = "100%";

      setTimeout(() => {

        loader.classList.add("hide");
        document.body.classList.add("loaded");

      }, 700);

      return;
    }

    loaderNumber.textContent =
      String(progress).padStart(2, "0");

    loaderBar.style.width =
      progress + "%";

  }, 55);

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
  document.getElementById("menuToggle");

const navLinks =
  document.querySelector(".nav-links");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

  });


  document
    .querySelectorAll(".nav-links a")
    .forEach((link) => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

      });

    });

}


/* =========================================================
   ACTIVE NAV
========================================================= */

const sections =
  document.querySelectorAll("section[id]");

const links =
  document.querySelectorAll(".nav-links a");

function updateActiveNav() {

  let current = "";

  sections.forEach((section) => {

    const top =
      section.offsetTop - 180;

    const bottom =
      top + section.offsetHeight;

    if (
      window.scrollY >= top &&
      window.scrollY < bottom
    ) {
      current = section.id;
    }

  });


  links.forEach((link) => {

    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );

  });

}

window.addEventListener(
  "scroll",
  updateActiveNav
);

updateActiveNav();


/* =========================================================
   ORBIT
========================================================= */

const orbit =
  document.getElementById("orbit");

if (orbit) {

  const cards =
    orbit.querySelectorAll(".orbit-card");

  let angle = 0;

  const baseAngles = [
    -90,
    180,
    0,
    90
  ];


  function rotateOrbit() {

    angle += 0.18;

    const centerX =
      orbit.clientWidth / 2;

    const centerY =
      orbit.clientHeight / 2;

    const radiusX =
      orbit.clientWidth * 0.34;

    const radiusY =
      orbit.clientHeight * 0.38;


    cards.forEach((card, index) => {

      const currentAngle =
        baseAngles[index] + angle;

      const radians =
        currentAngle * Math.PI / 180;

      const x =
        centerX +
        Math.cos(radians) * radiusX -
        card.offsetWidth / 2;

      const y =
        centerY +
        Math.sin(radians) * radiusY -
        card.offsetHeight / 2;


      card.style.left =
        `${x}px`;

      card.style.top =
        `${y}px`;

    });


    requestAnimationFrame(
      rotateOrbit
    );

  }


  rotateOrbit();

}


/* =========================================================
   CUSTOM ANIME CURSOR
========================================================= */

const cursor =
  document.getElementById("cursor");

const cursorImage =
  cursor?.querySelector("img");


if (
  cursor &&
  cursorImage &&
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches
) {

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;


  window.addEventListener(
    "mousemove",
    (event) => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;

    }
  );


  function moveCursor() {

    cursorX +=
      (mouseX - cursorX) * 0.15;

    cursorY +=
      (mouseY - cursorY) * 0.15;


    cursor.style.left =
      `${cursorX}px`;

    cursor.style.top =
      `${cursorY}px`;


    requestAnimationFrame(
      moveCursor
    );

  }


  moveCursor();


  window.addEventListener(
    "mousedown",
    () => {

      cursorImage.src =
        "cursor-click.png";

    }
  );


  window.addEventListener(
    "mouseup",
    () => {

      cursorImage.src =
        "cursor-normal.png";

    }
  );


  window.addEventListener(
    "blur",
    () => {

      cursorImage.src =
        "cursor-normal.png";

    }
  );


  /* Cursor berubah ketika hover link/button */

  const cursorTargets =
    document.querySelectorAll(
      "a, button, .project-card, .skill-row, .orbit-card"
    );


  cursorTargets.forEach((element) => {

    element.addEventListener(
      "mouseenter",
      () => {

        cursor.style.transform =
          "translate(-10px, -10px) scale(1.15)";

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        cursor.style.transform =
          "translate(-10px, -10px) scale(1)";

      }
    );

  });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealItems =
  document.querySelectorAll(".reveal");

if (revealItems.length) {

  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "show"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealItems.forEach((item) => {

    revealObserver.observe(item);

  });

}


/* =========================================================
   PROJECT PARALLAX
========================================================= */

const projectCards =
  document.querySelectorAll(
    ".project-card"
  );


projectCards.forEach((card) => {


  card.addEventListener(
    "mousemove",
    (event) => {

      if (window.innerWidth <= 768) {
        return;
      }


      const rect =
        card.getBoundingClientRect();


      const x =
        event.clientX -
        rect.left;

      const y =
        event.clientY -
        rect.top;


      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;


      const rotateX =
        (y - centerY) / 30;

      const rotateY =
        (centerX - x) / 30;


      card.style.transform =
        `translateY(-15px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform = "";

    }
  );

});


/* =========================================================
   SKILL CLICK
========================================================= */

const skillRows =
  document.querySelectorAll(
    ".skill-row"
  );


skillRows.forEach((skill) => {


  skill.addEventListener(
    "click",
    () => {

      const isActive =
        skill.classList.contains(
          "active"
        );


      skillRows.forEach((item) => {

        item.classList.remove(
          "active"
        );

        item.style.removeProperty(
          "--skill-percent"
        );

      });


      if (!isActive) {

        const percent =
          skill.dataset.percent;


        if (percent) {

          skill.style.setProperty(
            "--skill-percent",
            percent + "%"
          );

        }


        skill.classList.add(
          "active"
        );

      }

    }
  );

});


/* =========================================================
   REAL CHAT ANIMATION - LOOP
========================================================= */

const chatRows =
  document.querySelectorAll(
    ".chat-row"
  );

const chatBox =
  document.querySelector(
    ".chat-box"
  );


if (
  chatRows.length &&
  chatBox
) {

  let currentChat = 0;


  function createTyping() {

    const typingRow =
      document.createElement(
        "div"
      );


    typingRow.className =
      "chat-row right typing-row";


    typingRow.innerHTML = `

      <div class="chat-bubble typing-bubble">

        <span></span>
        <span></span>
        <span></span>

      </div>

    `;


    chatBox.appendChild(
      typingRow
    );


    return typingRow;

  }


  function showNextChat() {

    if (
      currentChat >=
      chatRows.length
    ) {

      setTimeout(
        () => {
          restartChat();
        },
        2000
      );

      return;

    }


    const row =
      chatRows[currentChat];


    if (currentChat === 0) {

      row.classList.add(
        "chat-show"
      );

      currentChat++;


      setTimeout(
        showNextChat,
        1200
      );

      return;

    }


    const typingRow =
      createTyping();


    setTimeout(
      () => {

        typingRow.remove();

        row.classList.add(
          "chat-show"
        );

        currentChat++;


        setTimeout(
          showNextChat,
          1200
        );

      },
      1000
    );

  }


  function restartChat() {

    chatRows.forEach(
      (row) => {

        row.classList.remove(
          "chat-show"
        );

      }
    );


    currentChat = 0;


    setTimeout(
      () => {

        showNextChat();

      },
      1000
    );

  }


  const chatObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              showNextChat();

              chatObserver.disconnect();

            }

          }
        );

      },
      {
        threshold: 0.2
      }
    );


  chatObserver.observe(
    chatBox
  );

}


/* =========================================================
   FIRMAN TYPING ANIMATION
========================================================= */

const typingName =
  document.getElementById(
    "typingName"
  );


if (typingName) {

  const name = "FIRMAN";

  let index = 0;

  let deleting = false;


  function typeName() {

    if (!deleting) {

      typingName.textContent =
        name.slice(
          0,
          index
        );


      index++;


      if (
        index >
        name.length
      ) {

        deleting = true;


        setTimeout(
          typeName,
          1800
        );


        return;

      }


      setTimeout(
        typeName,
        180
      );


    } else {

      typingName.textContent =
        name.slice(
          0,
          index
        );


      index--;


      if (index < 0) {

        index = 0;

        deleting = false;


        setTimeout(
          typeName,
          600
        );


        return;

      }


      setTimeout(
        typeName,
        130
      );

    }

  }


  typeName();

}


/* =========================================================
   HERO BUTTON MICRO EFFECT
========================================================= */

const heroButtons =
  document.querySelectorAll(
    ".hero-btn"
  );


heroButtons.forEach((button) => {

  button.addEventListener(
    "mouseenter",
    () => {

      button.style.letterSpacing =
        "2px";

    }
  );


  button.addEventListener(
    "mouseleave",
    () => {

      button.style.letterSpacing =
        "";

    }
  );

});


/* =========================================================
   PROJECT PREVIEW HOVER
========================================================= */

const previews =
  document.querySelectorAll(
    ".project-preview"
  );


previews.forEach((preview) => {

  preview.addEventListener(
    "mouseenter",
    () => {

      preview.style.transform =
        "scale(1.02)";

    }
  );


  preview.addEventListener(
    "mouseleave",
    () => {

      preview.style.transform =
        "";

    }
  );

});


/* =========================================================
   CONTACT SOCIAL HOVER
========================================================= */

const socialButtons =
  document.querySelectorAll(
    ".contact-social"
  );


socialButtons.forEach(
  (social) => {

    social.addEventListener(
      "mouseenter",
      () => {

        social.style.letterSpacing =
          "2px";

      }
    );


    social.addEventListener(
      "mouseleave",
      () => {

        social.style.letterSpacing =
          "";

      }
    );

  }
);


/* =========================================================
   SMOOTH ANCHOR
========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute(
            "href"
          );


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* =========================================================
   PAGE READY
========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-ready"
    );

  }
);