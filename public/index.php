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
    <div class="navbar navbar-default pos-3" role="navigation" id="menu" data-updater_update="3">
        <div class="container">
            <div class="navbar-header">

                <a class="baner_mini" > </a>
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".cat-nav">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <span class="navbar-brand visible-xs" data-toggle="collapse" data-target=".cat-nav">Категории</span>
            </div>
            <div class="collapse navbar-collapse cat-nav collapses">
                <ul class="nav navbar-nav navbar-left">
                    <li class="dropdown ">
                        <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">Все Скамейки и Лавки <span class="caret"></span></a>
                        <div class="dropdown-menu keep_open">
                            <div class="dropdown-inner parent-category">
                                <div class="text-neutral">
                                    Купи у нас деревянные скамейки и лавки. Самый большой интернет магазин деревянной мебели, где можно купить деревянные лавки и скамейки по очень приемлемой цене. Наши лавки прочны и долговечны, срок службы в защищенном от прямого попадания влаги месте, более 20-25 лет.

                                    Для каждой деревянной ск..</div>            </div>
                            <div class="clearfix"></div>
                            <div class="dropdown-inner children-category">
                                <ul class="list-unstyled" style="width: 32.333333333333%">
                                    <li><a href="https://nordston.ru/skameiki-i-lavki/sadovye-skameiki-i-lavki/"><div class="img-thumbnail-transparent text-center"><img alt="Садовые Скамейки и Лавки" src="https://nordston.ru/image/cache/data/categorii/categor-skameuki-dlya-sada-80x80.png" /></div>Садовые Скамейки и Лавки</a></li>
                                </ul>
                                <ul class="list-unstyled" style="width: 32.333333333333%">
                                    <li><a href="https://nordston.ru/skameiki-i-lavki/skameiki-i-lavki-dlya-bani/"><div class="img-thumbnail-transparent text-center"><img alt="Скамейки и Лавки для бани" src="https://nordston.ru/image/cache/data/categorii/categor-lavki-dlya-bani-80x80.png" /></div>Скамейки и Лавки для бани</a></li>
                                </ul>
                                <ul class="list-unstyled" style="width: 32.333333333333%">
                                    <li><a href="https://nordston.ru/skameiki-i-lavki/skameiki-i-lavki-dlya-dachi/"><div class="img-thumbnail-transparent text-center"><img alt="Скамейки и Лавки для дачи" src="https://nordston.ru/image/cache/data/categorii/categor-dachnue-skameuki-lavki-80x80.png" /></div>Скамейки и Лавки для дачи</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li ><a href="https://nordston.ru/stoly/">Столы</a></li>
                    <li ><a href="https://nordston.ru/stulya/">Стулья</a></li>


                </ul>
                <a class="baner" href="https://nordston.ru/skidki"> </a>

            </div>

        </div>
    </div>
    <dev data-updater_update="4">
        <div style="padding: 40px; background: red">
            <div style="padding: 40px; background: aliceblue" data-updater_hook=true>
                <p>Update Tag:</p>
                <p>Update T34534543543534ag21343:</p>
            </div>
        </div>
    </dev>
<?php } else { ?>
    <div class="navbar navbar-default pos-3" role="navigation" id="menu" data-updater_update="3">
        <div class="container">
            <div class="navbar-header">

                <a class="baner_mini" href="https://nordston.ru/skidki">  </a>
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".cat-nav">
                    
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <span class="navbar-brand visible-xs" data-toggle="collapse" data-target=".cat-nav">Категориfghfghfghи</span>
            </div>
            <div class="collapse navbar-collapse cat-nav collapses">
                <ul class="nav navbar-nav navbar-left">
                    <li class="dropdown ">
                        <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">Все Скамейки и Лавки <span class="caret"></span></a>
                        <div class="dropdown-menu keep_open">
                            <div class="dropdown-inner parent-category">
                                <a href="https://nordston.ru/skameiki-i-lavki/">fghfgh<div class="text-centergfh" style="width: 32.333333333333%"><img alt="Все Скамейки и Лавки" src="https://nordston.ru/image/cache/data/categorii/categor-derevannye-lavki-skameuki-80x80.png" /></div><span>Все Скамейки и Лавки</span></a>
                                <div class="text-neutral">
                                    Купи у нас деревянные скамейки и лавки. ожно купить деревянные лавки и скамейки по очень приемлемой цене. Наши лавки прочны и долговечны, срок службы в защищенном от прямого попадания влаги месте, более 20-25 лет.

                                    Для каждой деревянной ск..</div>            </div>
                            <div class="clearfix"></div>
                            <div class="dropdown-inner children-category">
                                <ul class="list-unstyled" style="width: 32.333333333333%">
                                    <li><a href="https://nordston.ru/skameiki-i-lavki/sadovye-skameiki-i-lavki/"><div class="img-thumbnail-transparent text-center"><img alt="Садовые Скамейки и Лавки" src="https://nordston.ru/image/cache/data/categorii/categor-skameuki-dlya-sada-80x80.png" /></div>Садовые Скамейки и Лавки</a></li>
                                </ul>
                                <ul class="list-unstyled" style="width: 32.333333333333%">
                                    <li><a href="https://nordston.ru/skameiki-i-lavki/skameiki-i-lavki-dlya-bani/"><div class="img-thumbnail-transparent text-center"><img alt="Скамейки и Лавки для бани" src="https://nordston.ru/image/cache/data/categorii/categor-lavki-dlya-bani-80x80.png" /></div>Скамейки и Лавки для бани</a></li>
                                </ul>
                                <ul class="list-unstyled" style="width: 32.333333333333%">
                                    <li><a href="https://nordston.ru/skameiki-i-lavki/skameiki-i-lavki-dlya-dachi/"><div class="img-thumbnail-transparent text-center"><img alt="Скамейки и Лавки для дачи" src="https://nordston.ru/image/cache/data/categorii/categor-dachnue-skameuki-lavki-80x80.png" /></div>Скамейки и Лавки для дачи</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li ><a href="https://nordston.ru/stoly/">Столы</a></li>
                    <li ><a href="https://nordston.ru/stulya/">Стулья</a></li>


                </ul>
                <a class="baner" href="https://nordston.ru/skidki">  </a>

            </div>

        </div>
    </div>
    <dev data-updater_update="4" >
        <div style="padding: 40px; background: red">
            <div style="padding: 40px; background: aliceblue" data-updater_hook=true>
                <p>Update Tag:</p>
            </div>
        </div>
    </dev>
<?php } ?>

<button id="elem">Go</button>






<script type="module" src="src/script2.js"></script>

</body>
</html>

