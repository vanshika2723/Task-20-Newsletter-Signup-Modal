/* =========================================
   NEWSLETTER SIGNUP MODAL
========================================= */


/* -----------------------------------------
   GET ELEMENTS
----------------------------------------- */

const modalOverlay = document.getElementById("modalOverlay");

const closeModalBtn = document.getElementById("closeModalBtn");

const openModalBtn = document.getElementById("openModalBtn");

const heroSubscribe = document.getElementById("heroSubscribe");

const newsletterForm = document.getElementById("newsletterForm");

const emailInput = document.getElementById("email");

const errorMessage = document.getElementById("errorMessage");

const formContent = document.getElementById("formContent");

const successContent = document.getElementById("successContent");

const successCloseBtn = document.getElementById("successCloseBtn");


/* -----------------------------------------
   STORAGE KEY
----------------------------------------- */

const modalClosedKey = "newsletterModalClosed";


/* -----------------------------------------
   OPEN MODAL
----------------------------------------- */

function openModal() {

    modalOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* -----------------------------------------
   CLOSE MODAL
----------------------------------------- */

function closeModal() {

    modalOverlay.classList.remove("active");

    document.body.style.overflow = "auto";

    /*
       Store the information so that the
       automatic popup does not appear again.
    */

    localStorage.setItem(
        modalClosedKey,
        "true"
    );

}


/* -----------------------------------------
   AUTOMATIC MODAL
----------------------------------------- */

window.addEventListener("load", () => {

    /*
       Check whether the user has already
       closed/submitted the newsletter modal.
    */

    const alreadyClosed =
        localStorage.getItem(modalClosedKey);


    /*
       Show modal after 3 seconds only if
       it has not been closed before.
    */

    if (!alreadyClosed) {

        setTimeout(() => {

            openModal();

        }, 3000);

    }

});


/* -----------------------------------------
   NAVBAR BUTTON
----------------------------------------- */

openModalBtn.addEventListener(
    "click",
    openModal
);


/* -----------------------------------------
   HERO BUTTON
----------------------------------------- */

heroSubscribe.addEventListener(
    "click",
    openModal
);


/* -----------------------------------------
   CLOSE BUTTON
----------------------------------------- */

closeModalBtn.addEventListener(
    "click",
    closeModal
);


/* -----------------------------------------
   OVERLAY CLICK
----------------------------------------- */

modalOverlay.addEventListener(
    "click",
    (event) => {

        /*
           Close only when the actual overlay
           is clicked, not the modal itself.
        */

        if (event.target === modalOverlay) {

            closeModal();

        }

    }
);


/* -----------------------------------------
   ESCAPE KEY
----------------------------------------- */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            modalOverlay.classList.contains("active")
        ) {

            closeModal();

        }

    }
);


/* -----------------------------------------
   EMAIL VALIDATION
----------------------------------------- */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* -----------------------------------------
   FORM SUBMISSION
----------------------------------------- */

newsletterForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const email =
            emailInput.value.trim();


        /*
           Empty email validation
        */

        if (email === "") {

            errorMessage.textContent =
                "Please enter your email address.";

            emailInput.focus();

            return;

        }


        /*
           Email format validation
        */

        if (!isValidEmail(email)) {

            errorMessage.textContent =
                "Please enter a valid email address.";

            emailInput.focus();

            return;

        }


        /*
           Clear error
        */

        errorMessage.textContent = "";


        /*
           Save subscription state
           so automatic popup won't appear again.
        */

        localStorage.setItem(
            modalClosedKey,
            "true"
        );


        /*
           Show success message
        */

        formContent.classList.add("hide");

        successContent.classList.add("show");

    }
);


/* -----------------------------------------
   SUCCESS CLOSE BUTTON
----------------------------------------- */

successCloseBtn.addEventListener(
    "click",
    closeModal
);


/* -----------------------------------------
   CLEAR ERROR WHILE TYPING
----------------------------------------- */

emailInput.addEventListener(
    "input",
    () => {

        errorMessage.textContent = "";

    }
);