function onScanSuccess(decodedText, decodedResult) {
    document.getElementById("qr-result").innerText = decodedText;

    // Send scanned data to PostgreSQL (backend API call)
    fetch('/api/mark-attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: decodedText })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}

function startScanner() {
    let scanner = new Html5Qrcode("reader");
    scanner.start(
        { facingMode: "environment" }, // Use back camera
        { fps: 10, qrbox: 250 },
        onScanSuccess
    );
}

window.onload = startScanner;

