$(function () {
    const dropdown = document.querySelector(".dropdown");
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const selected = dropdown.querySelector(".selected");

    // Click handler to close dropdown when clicked outside
    const handleOutsideClick = (e) => {
        if (!menu.contains(e.target)) {
            closeDropdown();
        }
    };

    // Function to open dropdown
    function openDropdown() {
        select.classList.add("select-clicked");
        caret.classList.add("caret-rotate");
        menu.classList.add("menu-open");

        const selectRect = select.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - selectRect.bottom;
        const spaceAbove = selectRect.top;

        if (spaceAbove > spaceBelow) {
            menu.classList.add("upwards");
            menu.classList.remove("downwards");
            menu.style.maxHeight = `${spaceAbove - 64}px`;
        } else {
            menu.classList.add("downwards");
            menu.classList.remove("upwards");
            menu.style.maxHeight = `${spaceBelow - 64}px`;
        }

        // Scroll to active item
        const activeItem = menu.querySelector("li.active");
        if (activeItem) {
            activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }

        // Attach outside click handler
        document.addEventListener("click", handleOutsideClick);
    }

    // Function to close dropdown
    function closeDropdown() {
        select.classList.remove("select-clicked");
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open", "upwards", "downwards");
        menu.style.maxHeight = null;

        // Remove outside click handler
        document.removeEventListener("click", handleOutsideClick);
    }

    // Toggle on click
    select.addEventListener("click", (e) => {
        // Prevent immediate self-close
        e.stopPropagation();

        if (menu.classList.contains("menu-open")) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    // Option selection
    menu.addEventListener("click", (e) => {
        const option = e.target.closest("li");
        if (!option) return;

        const value = option.dataset.value || option.getAttribute("data-value") || "";
        selected.setAttribute("data-value", value);

        const icon = option.querySelector(".item-icon");
        const iconHtml = icon ? icon.outerHTML.replace("item-icon", "selected-item-icon") : "";
        const label = option.querySelector(".label");
        const labelHtml = label ? label.outerHTML : option.textContent;
        selected.innerHTML = iconHtml + " " + labelHtml;

        menu.querySelectorAll("li").forEach(opt => opt.classList.remove("active"));
        option.classList.add("active");

        closeDropdown();
    });
});
