// Variablen
let litersPerSecond = 0; // Liter pro Sekunde, wird später berechnet
let counter = 0; // Zähler für die Liter
let isCounting = false; // Zustand, ob der Zähler läuft oder nicht
let interval; // Variable für den Intervall, der die Schleife steuert
let lastVibration = 0; // Letzter Wert, bei dem vibriert wurde

// Elemente aus dem DOM holen
const calculateButton = document.getElementById('calculate');
const playButton = document.getElementById('playButton');
const stopButton = document.getElementById('stopButton');
const restartButton = document.getElementById('restartButton');
const display = document.getElementById('display');
const litersInput = document.getElementById('liters');
const MAX_LITER = 100000; // Setze eine Obergrenze von 100000 Litern

// Berechnung der Liter pro Sekunde
calculateButton.addEventListener('click', () => {
    const litersPerMinute = parseFloat(litersInput.value); // Hole den numerischen Wert aus dem Input
    if (isNaN(litersPerMinute) || litersPerMinute <= 0) {
        alert('Bitte gib eine gültige Zahl ein, die größer als 0 ist.');
        return;
    }

    // Berechnung der Liter pro Sekunde
    litersPerSecond = litersPerMinute / 600;  // Berechnung der Liter pro Sekunde

    // Den Wert der Liter pro Sekunde im Eingabefeld anzeigen
    litersInput.value = litersPerSecond.toFixed(2);  // Nur die Zahl im Eingabefeld
    // Den Wert mit "l/s" im span daneben anzeigen
    document.getElementById('literDisplay').innerText = ` l/s`;  // Nur anzeigen, wenn berechnet wurde
});

// Start des Zählers
playButton.addEventListener('click', () => {
    if (isCounting) {
        return;
    }
    isCounting = true;
    interval = setInterval(() => {
        counter += litersPerSecond; // Zähler mit Liter pro Sekunde erhöhen

        if (counter >= MAX_LITER) {
            clearInterval(interval); // Stoppe den Zähler, wenn die Grenze erreicht ist
            counter = MAX_LITER; // Begrenze den Zähler auf die maximale Zahl
            display.innerText = `Liter: ${counter.toFixed(2)} L (max)`;
        } else {
            // Vibrationslogik: Prüft, ob eine 500er-Grenze überschritten wurde
            if (Math.floor(counter / 500) > Math.floor(lastVibration / 500)) {
                if (navigator.vibrate) {  // Prüft, ob Vibration auf diesem Gerät unterstützt wird
                    navigator.vibrate(200); // Vibriert für 200ms
                }
                lastVibration = counter; // Speichert den letzten Vibrationswert
            }

            display.innerText = `Liter: ${counter.toFixed(2)} L`; // Zähler im Display anzeigen
        }
    }, 100);
});

// Stoppen des Zählers
stopButton.addEventListener('click', () => {
    clearInterval(interval); // Stoppe den Intervall, damit das Zählen anhält
    isCounting = false;
});

// Neustart des Zählers
restartButton.addEventListener('click', () => {
    clearInterval(interval); // Stoppe den laufenden Intervall
    counter = 0; // Setze den Zähler auf 0 zurück
    lastVibration = 0; // Setzt auch die letzte Vibration zurück
    display.innerText = `Liter: ${counter} L`;  // Zähler im Display anzeigen
    isCounting = false; // Der Zähler läuft nicht mehr
});
