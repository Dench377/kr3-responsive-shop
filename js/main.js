// Инициализация обработчиков после полной загрузки DOM-дерева
document.addEventListener("DOMContentLoaded", () => {
  // 1. Адаптивное доступное мобильное меню (бургер)
  const menuToggle = document.querySelector(".site-header__menu-toggle");
  const siteNav = document.getElementById("site-nav");

  if (menuToggle && siteNav) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !siteNav.classList.contains("site-nav--open");
      siteNav.classList.toggle("site-nav--open", isOpen);
      menuToggle.classList.toggle("site-header__menu-toggle--active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    menuToggle.addEventListener("click", () => toggleMenu());

    // Закрытие меню при клике по навигационной ссылке
    siteNav.querySelectorAll(".site-nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        if (siteNav.classList.contains("site-nav--open")) {
          toggleMenu(false);
        }
      });
    });

    // Закрытие при клике вне меню
    document.addEventListener("click", (e) => {
      if (
        siteNav.classList.contains("site-nav--open") &&
        !siteNav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });

    // Закрытие мобильного меню по нажатию клавиши Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && siteNav.classList.contains("site-nav--open")) {
        toggleMenu(false);
        menuToggle.focus();
      }
    });
  }

  // 2. Доступное модальное окно заявки
  const modal = document.getElementById("order-modal");
  const openButtons = document.querySelectorAll("[data-modal-open]");
  const closeButtons = document.querySelectorAll("[data-modal-close]");

  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add("modal--active");
        document.body.style.overflow = "hidden";
        const firstInput = modal.querySelector("input, button, select, textarea");
        if (firstInput) firstInput.focus();
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.remove("modal--active");
        document.body.style.overflow = "";
      }
    });
  });

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("modal--active");
        document.body.style.overflow = "";
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("modal--active")) {
      modal.classList.remove("modal--active");
      document.body.style.overflow = "";
    }
  });
});
