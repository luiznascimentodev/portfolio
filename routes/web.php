<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('site.portfolio'); // Ajuste para usar ponto ao invés de barra
});
