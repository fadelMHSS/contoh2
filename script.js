// Inisialisasi peta di Batang Anai, Padang
var map = L.map('map').setView([-0.582779, 100.253372], 13); // Koordinat Batang Anai, Padang
var lastZoomPosition = map.getCenter(); // Menyimpan posisi zoom terakhir sebelum animasi zoom

// Tambahkan layer peta
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Data marker lokasi warung di Batang Anai dengan informasi tambahan
var locations = [
    { 
        lat: -0.580000, lon: 100.250000, name: "Warung Uniang Mart", 
        openHours: "07:00 - 22:00", 
        employees: 5, 
        facilities: ["Tempat Duduk", "WiFi Gratis"],
        image: "asset/warung1.jpg", // Gambar warung di folder asset
        description: "Warung A menyediakan makanan ringan dan minuman dingin di Batang Anai."
    },
    { 
        lat: -0.585000, lon: 100.260000, name: "Budi Mart", 
        openHours: "08:00 - 23:00", 
        employees: 3, 
        facilities: ["Parkir", "ATM", "WiFi"],
        image: "asset/warung2.jpg", // Gambar warung kedua
        description: "Warung B terletak dekat jalan utama, menawarkan aneka makanan dan kopi."
    },
    {
        lat: -0.590000, lon: 100.255000, name: "Warung Gorengan",
        openHours: "06:00 - 20:00",
        employees: 2,
        facilities: ["Parkir", "Musik", "Outdoor Seating"],
        image: "asset/warung3.jpg", // Gambar warung ketiga
        description: "Warung C terkenal dengan nasi goreng dan suasana santai di Batang Anai."
    }
];

// Menangkap elemen modal
var modal = document.getElementById("detailModal");
var modalTitle = document.getElementById("modal-title");
var modalImage = document.getElementById("modal-image");
var modalInfo = document.getElementById("modal-info");
var span = document.getElementsByClassName("close")[0];

// Fungsi untuk menutup modal dan zoom out
span.onclick = function() {
    modal.style.display = "none";
    map.setView(lastZoomPosition, 13, { animate: true, duration: 1.5 }); // Animasi zoom out ke posisi awal
}

// Tutup modal ketika klik di luar modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        map.setView(lastZoomPosition, 13, { animate: true, duration: 1.5 }); // Animasi zoom out
    }
}

// Tambahkan marker ke peta dan popup dengan tombol detail
locations.forEach(function(location) {
    var marker = L.marker([location.lat, location.lon]).addTo(map);

    // Isi popup dengan tombol detail
    marker.bindPopup(
        "<b>" + location.name + "</b><br>" +
        "Jam Buka: " + location.openHours + "<br>" +
        "Jumlah Pegawai: " + location.employees + "<br>" +
        "Fasilitas: " + location.facilities.join(", ") + "<br>" +
        "<button onclick='showDetails(" + JSON.stringify(location) + ")'>Detail Informasi</button>"
    );
});

// Fungsi untuk menampilkan detail dan animasi zoom
function showDetails(location) {
    // Simpan posisi terakhir sebelum zoom in
    lastZoomPosition = map.getCenter();

    // Tampilkan modal
    modal.style.display = "block";
    
    // Isi modal dengan data lokasi
    modalTitle.innerHTML = location.name;
    modalImage.src = location.image;
    modalImage.style.display = "block"; // Pastikan gambar muncul saat modal dibuka
    modalInfo.innerHTML = "Jam Buka: " + location.openHours + "<br>" +
                          "Jumlah Pegawai: " + location.employees + "<br>" +
                          "Fasilitas: " + location.facilities.join(", ") + "<br>" +
                          "<p>" + location.description + "</p>";
    
    // Zoom ke lokasi dengan animasi
    map.setView([location.lat, location.lon], 17, {
        animate: true,
        duration: 1.5 // Animasi zoom dalam 1.5 detik
    });
}
