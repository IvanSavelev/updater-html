<?php if (@$_COOKIE['num'] === '0') {
    setcookie("num", '1');
} else {
    setcookie("num", '0');
}?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .uploader-update {background-color: green!important; }
        .uploader-move {background-color: blue!important; }
        .uploader-move-analytical {background-color: sandybrown!important; }
        .uploader-update-attribute {background-color: cornflowerblue!important;}
        .uploader-add {background-color: yellow!important; }
        .uploader-delete {background-color: red!important; }
        .uploader-update-tag {background-color: black!important; }
        .uploader-update-type {background-color: mediumspringgreen!important; }
        p {font-size: 15px;
            margin: 3px;}
    </style>
</head>
<body>
<?php if (@$_COOKIE['num'] === '0') { ?>
    <dev data-updater_update="3">
        <div>
            <p>Update Tag:</p>
            <p>apple</p>
            <p>orange</p>
        </div>
        <div>
            <p>Update Type:</p>
            <p>apple</p>
            <p>orange</p>
        </div>
        <div>
            <p>Move:</p>
            <p>apple</p>
            <p>orange</p>
        </div>
        <div>
            <p>Move Analytical:</p>
            <p>apple</p>
            <p>orange</p>
        </div>
        <div>
            <p>Delete:</p>
            <p>apple</p>
            <p>orange</p>
        </div>
        <div>
            <p>Add:</p>
            <p>apple</p>
            <p>orange</p>
        </div>
        <div>
            <p>Update:</p>
            <p>apple</p>
            <p>orange</p>
        </div>
        <p style="font-size: 60px">Update Tag:</p>
    </dev>
<?php } else { ?>
    <dev data-updater_update="3">
        <div>
            <p>Update Tag:</p>
            <p class="new">apple</p>
            <p data-change="true">orange</p>
        </div>
        <div>
            <p>Update Type:</p>
            <div>apple</div>
            <div>orange</div>
        </div>
        <div>
            <p>Move:</p>
            <p>orange</p>
            <p>apple</p>
        </div>
        <div>
            <p>Move Analytical:</p>
            <p>orange</p>
            <p>pear</p>
        </div>
        <div>
            <p>Delete:</p>
            <p>apple</p>
        </div>
        <div>
            <p>Add:</p>
            <p>apple</p>
            <p>orange</p>
            <p>pear</p>
            <p>cucumber</p>
        </div>
        <div>
            <p>Update:</p>
            <p>pear</p>
            <p>potato</p>
        </div>
        <p style="font-size: 30px">Update Tag:</p>
    </dev>
<?php } ?>

<button id="elem">Go</button>






<script type="module" src="src/script2.js"></script>

</body>
</html>


