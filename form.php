<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
</head>

<?php
require_once "backend/mysqli.php";

$countriesSql = "select * from countries";
$countries = mysqli_query(connect(),$countriesSql);

if (isset($_POST['Hinzufügen'])){
  $name= $_POST['name'];
  $adresse = $_POST['adresse'];
  $plz=$_POST['plz'];
  $ort=$_POST['ort'];
  $land= $_POST['land'];
  $platzanzahl=$_POST['platzanzahl'];
  $trinkwasser = $_POST['trinkwasser'];
  $abwasser = $_POST['abwasser'];
  $toilette = $_POST['toilette'];
  $strom = $_POST['strom'];
  $dusche = $_POST['dusche'];
  $wc = $_POST['wc'];
  $wifi = $_POST['wifi'];
  $bemerkungen = $_POST['bemerkungen'];

  if (isset($_POST['submit'])) {

    $sql = "INSERT INTO places(
                   Name,
                   Adresse,
                   Plz,
                   Ort,
                   Land,
                   Platzanzahl,
                   Trinkwasser,
                   Abwasser,
                   Toilettenentsorgung,
                   Strom,
                   Dusche,
                   WC,
                   Wifi,
                   imageType,
                   imageData,
                   Bemerkungen
                   )VALUES(
                           '$name',
                           '$adresse',
                           $plz,
                           '$ort',
                           '$land',
                           $platzanzahl,
                           $trinkwasser,
                           $abwasser,
                           $toilette,
                           $strom,
                           $dusche,
                           $wc,
                           $wifi,
                           '$bemerkungen'
                           )";

    $current_id = mysqli_query(connect(), $sql) or die("<b>Error:</b> Problem on Image Insert<br/>" . mysqli_error(connect()));
    if (isset($current_id)) {
      //header("Location: home");
      echo '<script> location.href = "cards.php"; </script>';
    }
  }
}

if (isset($_GET['id'])){
  $id=$_GET['id'];
  require_once "backend/mysqli.php";
  $sql = "select * from places JOIN countries on countries.code=places.Land where id=$id";
  $result = mysqli_query(connect(),$sql);

  while ($row = mysqli_fetch_assoc($result)) {
    $name= $row['Name'];
    $header=$name;
    $adresse= $row['Adresse'];
    $plz= $row['Plz'];
    $ort = $row['Ort'];
    $land = $row['de'];
    $platzanzahl = $row['Platzanzahl'];
    $trinkwasser = $row['Trinkwasser'];
    $abwasser = $row['Abwasser'];
    $toilette = $row['Toilettenentsorgung'];
    $strom = $row['Strom'];
    $dusche = $row['Dusche'];
    $wc = $row['WC'];
    $wifi = $row['WiFi'];
    $bemerkungen = $row['Bemerkungen'];
    $button = "Speichern";
  }

  if (isset($_POST['Speichern'])){
    //editieren
    $imgData = addslashes(file_get_contents($_FILES['userImage']['tmp_name']));

    $sql = "update places set Name='{$_POST['name']}', Adresse='{$_POST['adresse']}', Plz = {$_POST['plz']}, Ort='{$_POST['ort']}', Land='{$_POST['land']}', Platzanzahl = {$_POST['platzanzahl']},
Trinkwasser = {$_POST['trinkwasser']}, Abwasser = {$_POST['abwasser']}, Toilettenentsorgung = {$_POST['toilette']}, Strom = {$_POST['strom']}, Dusche = {$_POST['dusche']}, WC={$_POST['wc']},
Wifi={$_POST['wifi']}, imageType= 'pdf', imageData='{$imgData}', Bemerkungen = '{$_POST['bemerkungen']}' where id = {$_GET['id']}";

    print_r($sql);
    $sql = mysqli_query(connect(), $sql);
    echo '<script>window.location.href="cards.php"</script>';
  }


}else{
  $header="Neuen Ort hinzufügen";
  $name="";
  $adresse="";
  $plz="";
  $ort="";
  $land="Deutschland";
  $platzanzahl=0;
  $bild="";
  $bemerkungen="";
  $button= "Hinzufügen";
}

?>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css"/>
<!-- jQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!-- Select2 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
<style>
  .select2-container .select2-selection--single {
    height: 40px;
    padding: 4px 0 0 6px;
    border-color: #cccccc;
  }

  #create #player, #create #canvas {
    width: 512px;
    max-width: 100%;
    display: none;
    margin: auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>

<body style="background-color: #ffddd6">
<div style="margin: 20px" id="create">
  <h1><?=$header ?></h1>
  <form name="addPlace" enctype="multipart/form-data" action="" id="form" method="post" class="frmImageUpload">

    <div class="form-group row">
      <label for="Name" class="col-sm-3 col-form-label">Name*</label>
      <div class="col-sm-9"><input required type="text" class="form-control" name="name" id="name" value="<?=$name ?>"></div>
    </div>

    <div class="form-group row">
      <label for="Name" class="col-sm-3 col-form-label">Adresse*</label>
      <div class="col-sm-9"><input required type="text" class="form-control" name="adresse" id="adresse" value="<?=$adresse ?>"></div>
    </div>

    <div class="form-group row">
      <label for="Name" class="col-sm-3 col-form-label">PLZ*</label>
      <div class="col-sm-9"><input required type="text" class="form-control" pattern="[0-9]{5}" name="plz" id="plz" value=<?=$plz ?>></div>
    </div>

    <div class="form-group row">
      <label for="Name" class="col-sm-3 col-form-label">Ort*</label>
      <div class="col-sm-9"><input required type="text" class="form-control" name="ort" id="ort" value=<?=$ort ?>></div>
    </div>

    <div class="form-group row">
      <label for="Name" class="col-sm-3 col-form-label">Land*</label>
      <div class="col-sm-9">
        <select class="form-control" id="land" name="land" style="width: 100%" required>
          <option selected="selected" value="DE"><?=$land?></option><?php foreach ($countries as $country): ?>
            <option value="<?= $country['code'] ?>"><?= $country['de'] ?></option><?php endforeach; ?>
        </select>
      </div>
      <!--Länderauswahl mit Suche-->
      <script type="text/javascript">
        $("#land").select2({});
      </script>
    </div>

    <div class="form-group row">
      <label for="Name" class="col-sm-3 col-form-label">Platzanzahl</label>
      <div class="col-sm-9"><input type="number" class="form-control" name="platzanzahl" id="platzanzahl" value=<?=$platzanzahl ?>></div>
    </div>

    <div class="form-group row">
      <label class="col-sm col-form-label">Trinkwasser?</label>
      <div class="col-sm">
        <input type="hidden" name="trinkwasser" value="0"/><?php if (isset($_GET['id']) && isset($trinkwasser) && $trinkwasser==1): ?>
          <input type="checkbox" name="trinkwasser" value="1" id="check" checked/><?php else: ?>
          <input type="checkbox" name="trinkwasser" id="check" value="1"/><?php endif; ?>
      </div>
      <label class="col-sm col-form-label">Abwasser?</label>
      <div class="col-sm">
        <input type="hidden" name="abwasser" value="0"/><?php if (isset($_GET['id']) && isset($abwasser) && $abwasser==1): ?>
          <input type="checkbox" name="abwasser" value="1" id="check" checked/><?php else: ?>
          <input type="checkbox" name="abwasser" id="check" value="1"/><?php endif; ?>
      </div>
      <label class="col-sm col-form-label">Toilettenentsorgung?</label>
      <div class="col-sm">
        <input type="hidden" name="toilette" value="0"/><?php if (isset($_GET['id']) && isset($toilette) && $toilette==1): ?>
          <input type="checkbox" name="toilette" value="1" id="check" checked/><?php else: ?>
          <input type="checkbox" name="toilette" id="check" value="1"/><?php endif; ?>
      </div>
      <label class="col-sm col-form-label">Strom?</label>
      <div class="col-sm">
        <input type="hidden" name="strom" value="0"/><?php if (isset($_GET['id']) && isset($strom) && $strom==1): ?>
          <input type="checkbox" name="strom" value="1" id="check" checked/><?php else: ?>
          <input type="checkbox" name="strom" id="check" value="1"/><?php endif; ?>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm col-form-label">Duschen?</label>
      <div class="col-sm">
        <input type="hidden" name="dusche" value="0"/><?php if (isset($_GET['id']) && isset($dusche) && $dusche==1): ?>
          <input type="checkbox" name="dusche" value="1" id="check" checked/><?php else: ?>
          <input type="checkbox" name="dusche" id="check" value="1"/><?php endif; ?>
      </div>
      <label class="col-sm col-form-label">WC?</label>
      <div class="col-sm">
        <input type="hidden" name="wc" value="0"/><?php if (isset($_GET['id']) && isset($wc) && $wc==1): ?>
          <input type="checkbox" name="wc" value="1" id="check" checked/><?php else: ?>
          <input type="checkbox" name="wc" id="check" value="1"/><?php endif; ?>
      </div>
      <label class="col-sm col-form-label">WiFi?</label>
      <div class="col-sm">
        <input type="hidden" name="wifi" value="0"/><?php if (isset($_GET['id']) && isset($wifi) && $wifi==1): ?>
          <input type="checkbox" name="wifi" value="1" id="check" checked/><?php else: ?>
          <input type="checkbox" name="wifi" id="check" value="1"/><?php endif; ?>
      </div>
    </div>

    <div class="form-group row">
      <label for="Name" class="col-sm-3 col-form-label">Bemerkungen</label>
      <div class="col-sm-9"><textarea class="form-control" name="bemerkungen" id="bemerkungen"><?=$bemerkungen ?></textarea></div>
    </div>

    <button type="submit" id="submit" name="<?=$button ?>" class="btn btn-success"><?=$button ?>submit</button>
    <button type="submit" id="edit" name="edit" style="display: none" class="btn btn-success"><?=$button ?></button>
    <a href="cards.php"><button type="button" class="btn btn-secondary">Abbrechen</button></a>
  </form>
</div>
</body>

