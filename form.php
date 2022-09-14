
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css"/>
<!-- jQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!-- Select2 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
<body style="background-color:#ffddd6">
<div style="margin: 20px" id="create">
  <h1><?=$header ?></h1>
  <form name="addPlace" enctype="multipart/form-data" action="" id="form" method="post" class="frmImageUpload">

    <div class="form-group row">
      <label for="Name" class="col-sm-3 col-form-label">Name*</label>
      <div class="col-sm-9"><input required type="text" class="form-control" name="name" id="name" value="<?=$name ?>"></div>
    </div>

    <div id="map" class="map"></div>

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

    <button type="submit" id="submit" name="<?=$button ?>" class="btn btn-success"><?=$button ?></button>
    <!--<button type="submit" id="edit" name="edit" style="display: none" class="btn btn-success"><?/*=$button */?></button>-->
    <a href="cards.php"><button type="button" class="btn btn-secondary">Abbrechen</button></a>
  </form>
</div>
</body>