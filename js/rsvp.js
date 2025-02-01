document.addEventListener('DOMContentLoaded', function () {
    // Inicializace EmailJS
    emailjs.init('p3SkHlwAZwTqrKqpj'); // Tvůj veřejný klíč

    // Animace formulářových polí při skrolování
    const formFields = document.querySelectorAll('.form-animate');

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('form-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 } // Aktivace při viditelnosti 50 %
    );

    formFields.forEach(field => observer.observe(field));

    // Spustíme funkci pro inicializaci formuláře
    initializeForm();
});

// Funkce pro inicializaci formuláře a jeho funkcionality
function initializeForm() {
    const form = document.getElementById('quote-form');
    const submitButton = document.querySelector('#quote-form button[type="submit"]'); // Tlačítko odeslat
    const successMessage = document.getElementById('success-message'); // Zpráva o úspěchu

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Zabrání obnovení stránky

            // Zakázat tlačítko odeslání, aby se předešlo vícenásobnému odeslání
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Odesílám...'; // Změna textu na tlačítku
            }

            // Načtení hodnot z formuláře
            const name = document.getElementById('gname').value.trim();
            const attendance = document.getElementById('attendance').value;
            const accommodation = document.getElementById('accommodation').value;
            const message = document.getElementById('message').value.trim();

            // Validace formuláře (jméno, účast, ubytování jsou povinné)
            if (!name || !attendance || !accommodation) {
                alert('Prosím, vyplňte všechna povinná pole kromě zprávy.');
                
                // Povolit tlačítko zpět
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Odeslat';
                }
                return;
            }

            // Odeslání dat na EmailJS
            emailjs.send('service_0sx5pnf', 'template_ufve1ft', {
                user_name: name,
                user_attendance: attendance,
                user_accommodation: accommodation,
                user_message: message || 'Bez zprávy' // Pokud je zpráva prázdná, nahradí ji textem
            })
            .then(function () {
                // Zobrazení úspěšné zprávy
                successMessage.classList.remove('d-none');
                successMessage.textContent = 'Formulář byl úspěšně odeslán! Děkujeme za Vaši odpověď.';

                // Skrýt zprávu po 5 sekundách
                setTimeout(() => {
                    successMessage.classList.add('d-none');
                }, 5000);

                form.reset(); // Vyprázdní formulář

                // Povolit tlačítko znovu
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Odeslat';
                }
            }, function (error) {
                console.error('Chyba při odesílání:', error);
                alert('Odeslání se nezdařilo. Zkuste to prosím znovu.');

                // Povolit tlačítko znovu v případě chyby
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Odeslat';
                }
            });
        });
    }

    // Výchozí texty pro jednotlivá pole
    const defaultTexts = {
        gname: "Jméno a příjmení",
        message: "Vaše zpráva"
    };

    // Přidání placeholderů do formulářových polí
    Object.keys(defaultTexts).forEach((id) => {
        const field = document.getElementById(id);
        if (field) {
            field.value = defaultTexts[id];

            field.addEventListener('focus', function () {
                if (field.value === defaultTexts[id]) {
                    field.value = "";
                }
            });

            field.addEventListener('blur', function () {
                if (field.value === "") {
                    field.value = defaultTexts[id];
                }
            });
        }
    });
}
