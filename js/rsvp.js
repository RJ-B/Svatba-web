document.addEventListener('DOMContentLoaded', function () {
    // Inicializace EmailJS
    emailjs.init('p3SkHlwAZwTqrKqpj');

    // Připojení posluchače události k formuláři
    const form = document.getElementById('quote-form');
    const successMessage = document.getElementById('success-message'); // Zpráva o úspěchu
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Zabrání obnovení stránky

            // Validace formuláře
            const name = document.getElementById('gname').value.trim();
            const attendance = document.getElementById('attendance').value;
            const accommodation = document.getElementById('accommodation').value;
            const message = document.getElementById('message').value.trim(); // Pole může zůstat prázdné

            if (!name || !attendance || !accommodation) {
                alert('Prosím, vyplňte všechna pole kromě zprávy.');
                return;
            }     
            // Odeslání dat na EmailJS
            emailjs.send('service_0sx5pnf', 'template_ufve1ft', {
                user_name: name,
                user_attendance: attendance,
                user_accommodation: accommodation,
                user_message: message || 'Bez zprávy' // Přidej výchozí text, pokud je zpráva prázdná
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
            }, function (error) {
                console.error('Chyba při odesílání:', error);
                alert('Odeslání se nezdařilo. Zkuste to prosím znovu.');
            });
        });
    }
});
