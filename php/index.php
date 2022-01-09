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
    </style>
</head>
<body>
<?php if (@$_COOKIE['num'] === '0') { ?>
    <dev data-websocket_update="4">
        <p>old0</p>
        <p>2</p>
        <p>old1</p>
        <p>old2</p>
        <p>5</p>
        <p>old3</p>
        <p>6</p>
    </dev>
<?php } else { ?>
    <dev data-websocket_update="4">
        <p>new0</p>
        <p>new1</p>
        <p>2</p>
        <p>new2</p>
        <p>5</p>
        <p>6</p>
    </dev>
<?php } ?>

<button id="elem">Go</button>





<script type="module" src="script2.js"></script>
</body>
</html>

