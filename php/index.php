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
        .uploader-update {background-color: green; }
        .uploader-move {background-color: blue; }
        .uploader-move-analytical {background-color: sandybrown; }
        .uploader-update-attribute {background-color: cornflowerblue;}
        .uploader-add {background-color: yellow; }
        .uploader-delete {background-color: red; }
        .uploader-update-tag {background-color: grey; }
        .uploader-update-type {background-color: darkslategrey; }
        p {font-size: 15px;
            margin: 3px;}
    </style>
</head>
<body>
<?php if (@$_COOKIE['num'] === '0') { ?>
    <dev data-websocket_update="4">
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
    </dev>
<?php } else { ?>
    <dev data-websocket_update="4" >
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
        </div>
        <div>
            <p>Update:</p>
            <p>pear</p>
            <p>potato</p>
        </div>
    </dev>
<?php } ?>

<button id="elem">Go</button>





<script type="module" src="script2.js"></script>
</body>
</html>

