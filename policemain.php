<?php 
 session_start();
 include "dbcon.php";
 if (!isset($_SESSION['role']) || (trim($_SESSION['role']) == '')) {
   header('location:index.php');
   exit();
 }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Crime Reports</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="logooo.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.gstatic.com" rel="preconnect">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet">
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-<hash>" crossorigin="anonymous" />

  <!-- Template Main CSS File -->
  <link href="assets/css/style.css" rel="stylesheet">

  <style>
    .modal1 {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.5);
    }
    .modal-content1 {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      max-width: 600px;
      text-align: center;
      border-radius: 8px;
    }
    .close1 {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
    }
    .close1:hover,
    .close1:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
    .modal-content h2 i {
      margin-right: 18px;
      color: #f0ad4e;
    }
    #bubbleChart {
      width: 100% !important;
      height: 400px;
    }
  </style>
</head>

<body>
  <?php include "nav3.php"; ?>

  <main id="main" class="main">
    <audio id="alertSound" src="alert.mp3" preload="auto"></audio>

    <div class="pagetitle">
      <h1>Dashboard</h1>
      <nav></nav>
    </div><!-- End Page Title -->

    <section class="section dashboard">
      <div class="container">
        <div class="row">
     <div class="col-xxl-3 col-md-6">
      <a href="policereport.php">
      <div class="card info-card customers-card">
         <div class="card-body">
                  <h5 class="card-title">New Reports</h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-person-lines-fill"></i>
                    </div>
                    <div class="ps-3">
                      <h6>1</h6>

                    </div>
                  </div>
                </div>
      </div>
    </a>
    </div>
    <!-- Sales Card -->
    <div class="col-xxl-3 col-md-6">
      <a href="police.php">
      <div class="card info-card sales-card">
       <div class="card-body">
                  <h5 class="card-title">Available Police</h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-people-fill"></i>
                    </div>
                    <div class="ps-3">
                      <h6>2</h6>

                    </div>
                  </div>
                </div>
      </div>
    </a>
    </div>

    <!-- Revenue Card -->
    <div class="col-xxl-3 col-md-6">
      <a href="policecase.php">
      <div class="card info-card sales-card">

         <div class="card-body">
                  <h5 class="card-title">On going Case </h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-houses"></i>
                    </div>
                    <div class="ps-3">
                      <h6>3</h6>

                    </div>
                  </div>
                </div>
      </div>
    </a>
    </div>

    <!-- Customers Card 1 -->
    <div class="col-xxl-3 col-md-6">
        <a href="complainss.php">
      <div class="card info-card customers-card">
         <div class="card-body">
                  <h5 class="card-title">Complaints</span></h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-card-list"></i>
                    </div>
                    <div class="ps-3">
                      <h6>4</h6>
                    

                    </div>
                  </div>
                </div>
      </div>
        </a>
    </div>

    <div class="row">
            <div class="col-12">
              <div id="map" style="height: 445px; width:102%; margin-top: -20px;border-radius: 5px; box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);"></div>
            </div>
          </div>
   
  </div>
</div>

    </section>
    <div id="emergencyAlertModal" class="modal1">
      <div class="modal-content1">
        <span class="close1">&times;</span>
        <h2 style="color:red; font-weight:bolder;"><i class="fa fa-exclamation-triangle"></i>Emergency Alert!</h2>
        <p id="emergencyLocation"></p>
      </div>
    </div>
  </main>

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/chart.js/chart.umd.js"></script>
  <script src="assets/vendor/echarts/echarts.min.js"></script>
  <script src="assets/vendor/quill/quill.min.js"></script>
  <script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
  <script src="assets/vendor/tinymce/tinymce.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const crimeData = [
        { lat: 51.505, lng: -0.09, crimeRate: 10, location: "Location A" },
        { lat: 51.51, lng: -0.1, crimeRate: 20, location: "Location B" },
        { lat: 51.49, lng: -0.08, crimeRate: 30, location: "Location C" },
        { lat: 51.48, lng: -0.1, crimeRate: 40, location: "Location D" },
        { lat: 51.49, lng: -0.1, crimeRate: 50, location: "Location E" },
        { lat: 51.52, lng: -0.09, crimeRate: 60, location: "Location F" },
        { lat: 51.50, lng: -0.11, crimeRate: 70, location: "Location G" },
        { lat: 51.48, lng: -0.07, crimeRate: 80, location: "Location H" },
        { lat: 51.47, lng: -0.12, crimeRate: 90, location: "Location I" },
        { lat: 51.53, lng: -0.10, crimeRate: 100, location: "Location J" },
        { lat: 51.54, lng: -0.08, crimeRate: 110, location: "Location K" },
        { lat: 51.55, lng: -0.07, crimeRate: 120, location: "Location L" },
        { lat: 51.56, lng: -0.09, crimeRate: 130, location: "Location M" },
        { lat: 51.57, lng: -0.1, crimeRate: 140, location: "Location N" },
        { lat: 51.58, lng: -0.11, crimeRate: 150, location: "Location O" },
        { lat: 51.59, lng: -0.12, crimeRate: 160, location: "Location P" },
        { lat: 51.60, lng: -0.13, crimeRate: 170, location: "Location Q" },
        { lat: 51.61, lng: -0.14, crimeRate: 180, location: "Location R" },
        { lat: 51.62, lng: -0.15, crimeRate: 190, location: "Location S" },
        { lat: 51.63, lng: -0.16, crimeRate: 200, location: "Location T" },
        { lat: 51.64, lng: -0.17, crimeRate: 210, location: "Location U" },
        { lat: 51.65, lng: -0.18, crimeRate: 220, location: "Location V" },
        { lat: 51.66, lng: -0.19, crimeRate: 230, location: "Location W" },
        { lat: 51.67, lng: -0.20, crimeRate: 240, location: "Location X" },
        { lat: 51.68, lng: -0.21, crimeRate: 250, location: "Location Y" },
        { lat: 51.69, lng: -0.22, crimeRate: 260, location: "Location Z" },
        { lat: 51.70, lng: -0.23, crimeRate: 270, location: "Location AA" },
        { lat: 51.71, lng: -0.24, crimeRate: 280, location: "Location BB" },
        { lat: 51.72, lng: -0.25, crimeRate: 290, location: "Location CC" },
        { lat: 51.73, lng: -0.26, crimeRate: 300, location: "Location DD" },
        { lat: 51.74, lng: -0.27, crimeRate: 310, location: "Location EE" },
        { lat: 51.75, lng: -0.28, crimeRate: 320, location: "Location FF" },
        { lat: 51.76, lng: -0.29, crimeRate: 330, location: "Location GG" },
        { lat: 51.77, lng: -0.30, crimeRate: 340, location: "Location HH" },
        { lat: 51.78, lng: -0.31, crimeRate: 350, location: "Location II" },
        { lat: 51.79, lng: -0.32, crimeRate: 360, location: "Location JJ" },
        { lat: 51.80, lng: -0.33, crimeRate: 370, location: "Location KK" },
        { lat: 51.81, lng: -0.34, crimeRate: 380, location: "Location LL" },
        { lat: 51.82, lng: -0.35, crimeRate: 390, location: "Location MM" },
        { lat: 51.83, lng: -0.36, crimeRate: 400, location: "Location NN" },
        { lat: 51.84, lng: -0.37, crimeRate: 410, location: "Location OO" },
        { lat: 51.85, lng: -0.38, crimeRate: 420, location: "Location PP" },
        { lat: 51.86, lng: -0.39, crimeRate: 430, location: "Location QQ" },
        { lat: 51.87, lng: -0.40, crimeRate: 440, location: "Location RR" },
        { lat: 51.88, lng: -0.41, crimeRate: 450, location: "Location SS" },
        { lat: 51.89, lng: -0.42, crimeRate: 460, location: "Location TT" },
        { lat: 51.90, lng: -0.43, crimeRate: 470, location: "Location UU" },
        { lat: 51.91, lng: -0.44, crimeRate: 480, location: "Location VV" },
        { lat: 51.92, lng: -0.45, crimeRate: 490, location: "Location WW" },
        { lat: 51.93, lng: -0.46, crimeRate: 500, location: "Location XX" }
      ];

      const maxCrimeRate = Math.max(...crimeData.map(d => d.crimeRate));
      const scaleFactor = 50 / maxCrimeRate;

      crimeData.forEach(data => {
        const circle = L.circle([data.lat, data.lng], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: data.crimeRate * scaleFactor * 50
        }).addTo(map);

        circle.bindPopup(`Location: ${data.location}<br>Crime Rate: ${data.crimeRate}`);
      });

      const alertSound = document.getElementById('alertSound');
      const emergencyAlertModal = document.getElementById('emergencyAlertModal');
      const emergencyLocation = document.getElementById('emergencyLocation');
      const closeModal = document.getElementsByClassName('close1')[0];

      const ws = new WebSocket('ws://localhost:8080');
      ws.onmessage = (event) => {
        const alertData = JSON.parse(event.data);
        const { location, description } = alertData;

        alertSound.play();
        emergencyLocation.textContent = `Location: ${location}`;
        emergencyAlertModal.style.display = 'block';

        // Optionally, center the map on the alert location and add a marker
        map.setView([alertData.lat, alertData.lng], 15);
        L.marker([alertData.lat, alertData.lng]).addTo(map)
          .bindPopup(`Emergency at ${location}: ${description}`)
          .openPopup();
      };

      closeModal.onclick = () => {
        emergencyAlertModal.style.display = 'none';
      };

      window.onclick = (event) => {
        if (event.target === emergencyAlertModal) {
          emergencyAlertModal.style.display = 'none';
        }
      };
    });
  </script>
</body>
</html>
